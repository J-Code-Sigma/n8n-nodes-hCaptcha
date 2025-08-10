rm -rf dist
npm i
npm run lint
npm run build            # Clean + compile + gulp tasks
cp -r nodes/ dist/nodes  # Copy source folders AFTER build
cp -r credentials/ dist/credentials

npm link
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y
npm link n8n-nodes-hcaptcha

n8n start
