npm i

npm run lint

cp -r nodes/ dist/nodes
cp -r credentials/ dist/credentials


npm run build

npm link

mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y
npm link n8n-nodes-hcaptcha

n8n start