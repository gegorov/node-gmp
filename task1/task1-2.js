import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE_NAME = 'nodejs-hw1-ex1.csv';
const OUTPUT_FILE_NAME = 'output.txt';
const INPUT_DIR_NAME = 'csv';
const OUTPUT_DIR_NAME = 'output';

const outputDirPath = path.join(__dirname, OUTPUT_DIR_NAME);

if (!fs.existsSync(outputDirPath)) {
  fs.mkdirSync(outputDirPath);
}

const readStream = fs.createReadStream(path.join(__dirname, INPUT_DIR_NAME, INPUT_FILE_NAME));
const writeStream = fs.createWriteStream(path.join(outputDirPath, OUTPUT_FILE_NAME));

pipeline(
  readStream,
  csv(),
  writeStream,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  },
);
