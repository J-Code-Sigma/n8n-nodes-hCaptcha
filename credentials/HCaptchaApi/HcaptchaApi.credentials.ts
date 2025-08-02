import {
  ICredentialType,
  INodeProperties,
  Icon
} from 'n8n-workflow';


export class HcaptchaApi implements ICredentialType {
  name = 'hCaptchaApi';
  displayName = 'hCaptcha API';
  documentationUrl = 'https://docs.hcaptcha.com/';
  icon: Icon = {
      light: 'file:hcaptcha.svg',
      dark: 'file:hcaptcha.svg',
    };
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


