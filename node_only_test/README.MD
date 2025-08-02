# hCaptcha Test Project

This project demonstrates how to integrate and verify hCaptcha responses using a simple HTML frontend and a Node.js backend.

## Prerequisites

* Node.js (v18+ recommended)
* An hCaptcha account: [https://www.hcaptcha.com](https://www.hcaptcha.com)
* A test site key and secret key from the hCaptcha dashboard

## File Structure

```
.
├── hcaptcha.html       # Frontend form with hCaptcha widget
├── testhcaptcha.js      # Node.js backend to verify hCaptcha token
├── package.json        # Project config
└── README.md           # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install node-fetch
```

### 2. Create and Configure `package.json`

Make sure your `package.json` includes:

```json
{
  "type": "module"
}
```

This enables ES module syntax.

### 3. Edit `hcaptcha.html`

Update the following line with your **site key**:

```html
<script src="https://hcaptcha.com/1/api.js" async defer></script>
<div class="h-captcha" data-sitekey="your-site-key"></div>
```

When the user submits the form, the browser sends the hCaptcha token to your server.

### 4. Create `testhcaptcha.js`

Update this file with your **secret key**:

```js
const secret = 'your-secret-key';
```

This file verifies the hCaptcha token using the hCaptcha API.

### 5. Run the Server Test

Use the browser to open `hcaptcha.html`, complete the captcha, then manually submit the token to your server or modify the page to POST the form automatically.

Then run:

```bash
node testhcaptcha.js
```

You should see verification results in the console.

## Troubleshooting

* If you see `missing-input-response`, ensure the form is submitting the token.
* If you see `missing-input-secret`, ensure your secret key is correctly added in the Node.js file.
* Always verify the response server-side—never trust client-side only.

## License

MIT
