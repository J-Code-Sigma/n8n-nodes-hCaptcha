const axios = require('axios');

class MockNodeExecution {
	constructor(items) {
		this.items = items;
	}

	getInputData() {
		return this.items;
	}

	getNodeParameter(name, index) {
		return this.items[index].json[name];
	}

	continueOnFail() {
		return false;
	}

	getNode() {
		return { name: 'hCaptchaProxy' };
	}
}

async function execute() {
	const items = [
		{
			json: {
				secretKey: '0x0000000000000000000000000000000000000000', // Replace with real key
				response: '', // Replace with real response found in console.log after submit is clicked
			},
		},
	];

	const mockThis = new MockNodeExecution(items);

	const results = [];

	for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
		try {
			const secretKey = mockThis.getNodeParameter('secretKey', itemIndex);
			const response = mockThis.getNodeParameter('response', itemIndex);

			console.log(' secretKey ' + secretKey);
			console.log(' response ' + response);

			console.log(`[hCaptcha] Verifying response for item ${itemIndex}`);

			const verificationResponse = await axios.post(
				'https://hcaptcha.com/siteverify',
				new URLSearchParams({
					secret: secretKey,
					response: response,
				}).toString(),
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);

			console.log(`[hCaptcha] Verification result:`, verificationResponse.data);

			results.push({
				json: {
					success: verificationResponse.data.success,
					...verificationResponse.data,
				},
			});
		} catch (error) {
			console.error(`[hCaptcha] Error verifying item ${itemIndex}:`, error.message);
			if (mockThis.continueOnFail()) {
				results.push({ json: { error: error.message }, pairedItem: itemIndex });
			} else {
				throw error;
			}
		}
	}

	console.log('\nFinal Results:', results);
}

execute();
