import fs from 'fs';
import path from 'path';
import request from 'request';
import csvParse from 'csv-parse';
import through2 from 'through2';
import { promisify } from 'util';

const readDir = promisify(fs.readdir);

export default class CommandExecutor {
  constructor() {
    this.csvFolderPath = `${__dirname}/../../data/csv/`;
    // acceess to file in tasks (https://epa.ms/nodejs18-hw3-css) forbidden;
    this.cssUrl = 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css';
    this.cssBundleName = 'bundle.css';
  }

  reverse() {
    console.log('Type something to reverse, please:');
    process.stdin
      .pipe(this.reverseInput())
      .pipe(process.stdout);
  }

  transform() {
    console.log('Type something to transforme, please:');
    process.stdin
      .pipe(this.toUpperCase())
      .pipe(process.stdout);
  }

  outputFile(csvName) {
    if (!csvName) {
      console.error('File is not specified');
      return;
    }

    const csvPath = this.getFullCsvPath(csvName);

    fs.createReadStream(csvPath)
      .pipe(csvParse())
      .pipe(this.csvToString())
      .pipe(process.stdout);
  }

  convertFromFile(csvName) {
    if (!csvName) {
      console.error('File is not specified');
      return;
    }

    const csvPath = this.getFullCsvPath(csvName);

    fs.createReadStream(csvPath)
      .pipe(csvParse())
      .pipe(this.csvToObject())
      .pipe(this.objectToString())
      .pipe(process.stdout);
  }

  convertToFile(csvName) {
    if (!csvName) {
      console.error('File is not specified');
      return;
    }
    const csvPath = this.getFullCsvPath(csvName);
    const writeStream = fs.createWriteStream(csvPath.replace(/csv/g, 'json'));

    fs.createReadStream(csvPath)
      .pipe(csvParse())
      .pipe(this.csvToObject())
      .pipe(this.objectToString())
      .pipe(writeStream);
  }

  cssBundler(directory) {
    if (!directory) {
      console.error('Path is not specified');
      return;
    }

    const outputFile = path.resolve(`${directory}/${this.cssBundleName}`);

    readDir(directory)
      .then(files => files.filter(fileName => fileName.indexOf('.css') !== -1 && fileName !== this.cssBundleName))
      .then(files => {
        files.forEach(file => {
          const writeStream = fs.createWriteStream(outputFile, { flags: 'a' });
          const readStream = fs.createReadStream(`${directory}/${file}`);

          return readStream.pipe(writeStream);
        });
      })
      .then(() => {
        request(this.cssUrl).pipe(fs.createWriteStream(outputFile, { flags: 'a' }));
      })
      .catch(err => console.error(`something went wrong, Error: ${err.message}`));
  }

  // private methods below
  /* eslint-disable func-names */
  reverseInput() {
    return through2.obj(function(chunk, encoding, next) {
      const reversedInput = chunk
        .toString()
        .trim()
        .split('')
        .reverse()
        .join('');

      this.push(`${reversedInput}\n`);
      next();
    });
  }

  toUpperCase() {
    return through2.obj(function(chunk, encoding, next) {
      const transformedText = chunk
        .toString()
        .toUpperCase();

      this.push(transformedText);
      next();
    });
  }

  csvToString() {
    return through2.obj(function(chunk, encoding, next) {
      const lineText = `${chunk.toString()}\n`;
      this.push(lineText);
      next();
    });
  }

  csvToObject() {
    let titles = null;

    return through2.obj(function(chunk, encoding, next) {
      if (!titles && chunk) {
        titles = chunk;
      } else {
        const value = titles.reduce((acc, item, index) => {
          acc[item] = chunk[index];
          return acc;
        }, {});
        this.push(value);
      }
      next();
    });
  }

  objectToString() {
    return through2.obj(function(chunk, encoding, next) {
      this.push(JSON.stringify(chunk, null, 2));
      next();
    });
  }

  getFullCsvPath(file) {
    const fullPath = path.resolve(`${this.csvFolderPath}${file}`);

    if (!fs.existsSync(fullPath)) {
      console.error(`Cannot find file by puth: ${fullPath}`);
      console.error('Please check it and try again');
      process.exit(1);
    }

    return fullPath;
  }
}
