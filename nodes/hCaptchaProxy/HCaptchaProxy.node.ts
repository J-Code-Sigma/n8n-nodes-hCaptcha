import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import axios from 'axios';

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
				const credentials = await this.getCredentials('hcaptchaApi');
				const response = this.getNodeParameter('response', itemIndex) as string;

				console.log(`[hCaptcha] Verifying response for item ${itemIndex}`);

				const verificationResponse = await axios.post(
					'https://hcaptcha.com/siteverify',
					new URLSearchParams({
					secret: String(credentials.secret),
					response,
					}).toString(),
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
					}
				);

				console.log(`[hCaptcha] Verification result for item ${itemIndex}:`, verificationResponse.data);

				results.push({
					json: {
						success: verificationResponse.data.success,
						...verificationResponse.data,
					},
				});
			} catch (error) {
				console.error(`[hCaptcha] Error verifying item ${itemIndex}:`, error);
				if (this.continueOnFail()) {
					results.push({ json: { error: error.message }, pairedItem: itemIndex });
				} else {
					throw new NodeOperationError(this.getNode(), error, { itemIndex });
				}
			}
		}

		return [results];
	}
}
