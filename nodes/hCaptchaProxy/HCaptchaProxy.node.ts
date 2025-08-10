import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class HCaptchaProxy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'hCaptcha Proxy',
		name: 'hCaptchaProxy',
		group: ['transform'],
		version: 1,
		description: 'Proxy service for verifying hCaptcha responses',
		defaults: {
			name: 'hCaptcha Proxy',
		},
		icon: 'file:hcaptcha.svg',
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'hCaptchaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Response',
				name: 'response',
				type: 'string',
				default: '',
				placeholder: 'hCaptcha response token',
				description: 'The response token from hCaptcha',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const results: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const credentials = await this.getCredentials('hCaptchaApi');
				const response = this.getNodeParameter('response', itemIndex) as string;

				// 🔍 Debug logging
				console.log(`[hCaptcha] Item ${itemIndex} credentials.secret:`, credentials.secret);
				console.log(`[hCaptcha] Item ${itemIndex} response token:`, response);

				console.log(`[hCaptcha] Sending verification request for item ${itemIndex}...`);

				const postBody = new URLSearchParams({
					secret: String(credentials.secret),
					response,
				}).toString();

				console.log(`[hCaptcha] Item ${itemIndex} POST body:`, postBody);

				const verificationResponse = await this.helpers.httpRequest({
					method: 'POST',
					url: 'https://hcaptcha.com/siteverify',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: postBody,
					json: true, // automatically parses JSON
				});

				console.log(`[hCaptcha] Verification raw response for item ${itemIndex}:`, verificationResponse);

				results.push({
					json: {
						success: verificationResponse.success,
						...verificationResponse,
					},
				});
			} catch (error) {
				console.error(`[hCaptcha] Error verifying item ${itemIndex}:`, error);
				if (this.continueOnFail()) {
					results.push({ json: { error: (error as Error).message }, pairedItem: itemIndex });
				} else {
					throw new NodeOperationError(this.getNode(), error, { itemIndex });
				}
			}
		}

		return [results];
	}
}
