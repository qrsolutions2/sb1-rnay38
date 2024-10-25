const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

process.stdout.write('Express version: ' + express.version + '\n');
process.stdout.write('QRCode version: ' + QRCode.toString() + '\n');
process.stdout.write('Path module: ' + path.sep + '\n');

process.stdout.write('All required modules loaded successfully.\n');