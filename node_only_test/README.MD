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

### 2. Use hCaptcha Test Keys

**For local development and testing, always use the official hCaptcha test keys:**

- **Test Site Key:**  
  ```
  10000000-ffff-ffff-ffff-000000000001
  ```
- **Test Secret Key:**  
  ```
  0x0000000000000000000000000000000000000000
  ```

These keys are safe for development and will always return a successful verification.

### 3. Serve the HTML File Locally

To view and test the `hcaptcha.html` file in your browser, use the [`serve`](https://www.npmjs.com/package/serve) package:

1. Install `serve` globally (if you haven't already):

   ```bash
   npm install -g serve
   ```

2. In your terminal, navigate to the project directory:

   ```bash
   cd /Users/jane/Documents/VS Code Projects/n8n/n8n-nodes-hCaptcha/node_only_test
   ```

3. Start the server:

   ```bash
   serve .
   ```

4. Open your browser and go to [http://localhost:3000/hcaptcha.html](http://localhost:3000/hcaptcha.html).

### 4. Edit `hcaptcha.html`

Update the following line with the **test site key**:

```html
<script src="https://hcaptcha.com/1/api.js" async defer></script>
<div class="h-captcha" data-sitekey="10000000-ffff-ffff-ffff-000000000001"></div>
```

When the user submits the form, the browser sends the hCaptcha token to your server.

### 5. Edit `testhcaptcha.js`

Update this file with the **test secret key**:

```js
const secret = '0x0000000000000000000000000000000000000000';
```

This file verifies the hCaptcha token using the hCaptcha API.

### 6. Run the Server Test

Use the browser to open `hcaptcha.html`, complete the captcha, then manually copy the token from the browser console and paste it into your Node.js test file.

Then run:

```bash
node testhcaptcha.js
```

You should see verification results in the console.

---

**Note:**  
When you are ready for production, replace the test keys with your real site key and secret key from the hCaptcha dashboard.

## Troubleshooting

* If you see `missing-input-response`, ensure the form is submitting the token.
* If you see `missing-input-secret`, ensure your secret key is correctly added in the Node.js file.
* Always verify the response server-side—never trust client-side only.

## License

MIT