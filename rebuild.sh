cp -r nodes/hCaptchaProxy/ dist/nodes/hCaptchaProxy/


npm run build


mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y
npm link n8n-nodes-hcaptcha

n8n start