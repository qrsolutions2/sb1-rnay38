const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}\n`;
  fs.appendFileSync('server.log', logMessage);
}

log('Starting server initialization...');

const app = express();
const port = process.env.PORT || 3000;

try {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.urlencoded({ extended: true }));

  log('Middleware set up complete.');

  app.get('/', (req, res) => {
    log('Rendering landing page...');
    res.render('landing');
  });

  app.get('/dashboard', (req, res) => {
    log('Rendering dashboard page...');
    res.render('dashboard');
  });

  app.post('/generate-qr', async (req, res) => {
    log('Generating QR code...');
    const { url } = req.body;
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      res.json({ qrCode: qrCodeDataUrl });
    } catch (error) {
      log('Error generating QR code: ' + error.message);
      res.status(500).json({ error: 'Failed to generate QR code' });
    }
  });

  app.use((err, req, res, next) => {
    log('Error: ' + err.message);
    log('Stack: ' + err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(port, () => {
    log(`Server running at http://localhost:${port}`);
  });

  log('Server setup complete. Waiting for connections...');
} catch (error) {
  log('Error during server initialization: ' + error.message);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  log('Uncaught Exception: ' + err.message);
  log('Stack: ' + err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log('Unhandled Rejection at: ' + promise + ' reason: ' + reason);
  process.exit(1);
});