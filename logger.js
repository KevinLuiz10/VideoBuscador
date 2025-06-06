// logger.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logFile = path.join(__dirname, 'error.log');

export async function logError(errorMessage) {
  try {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ERROR: ${errorMessage}\n`;
    await fs.appendFile(logFile, logMessage);
  } catch (err) {
    console.error('Falha ao Escrever arquivo:', err);
  }
}