import app from './app.js';
import crypto from 'crypto'

const port = process.env.NODE_ENV === "production" ?
  process.env.PORT || 80 :
  8000;

app.listen(port, () => {
  console.log(`Clocks listening on port ${port}! 🚀`)

  // const secret_message = "123"
  // console.log("TCL: secret_message", secret_message)

  // let cipher = crypto.createCipheriv('aes-256-cbc', process.env.KEY_CRYPTO, process.env.IV);
  // let encrypted = cipher.update(secret_message, 'utf-8', 'hex');
  // encrypted += cipher.final('hex');

  // console.log('encrypted: ' + encrypted)

  // const encrypted = '53a9a0a2e9bf24c2866f5674d3b3e8bd'

  // let decipher = crypto.createDecipheriv('aes-256-cbc', process.env.KEY_CRYPTO, process.env.IV);
  // let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  // decrypted += decipher.final('utf-8');

  // console.log('decrypted: ' + decrypted)

});