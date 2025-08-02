curl -X POST http://localhost:5678/webhook-test/cab44adb-6038-47f7-a338-025fccab5266 \
  -H "Content-Type: application/json" \
  -d '{
    "secretKey": "0x0000000000000000000000000000000000000000",
    "response": "PASTE_YOUR_HCAPTCHA_RESPONSE_TOKEN_HERE"
  }'