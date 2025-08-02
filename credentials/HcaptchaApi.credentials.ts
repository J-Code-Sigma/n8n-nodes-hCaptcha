import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class HcaptchaApi implements ICredentialType {
  name = 'hCaptchaApi';
  displayName = 'hCaptcha API';
  documentationUrl = 'https://docs.hcaptcha.com/';
  properties: INodeProperties[] = [
    {
      displayName: 'Secret Key',
      name: 'secretKey',
      type: 'string',
      default: '',
      typeOptions: { password: true },
    },
  ];
}


