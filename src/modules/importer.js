import * as fs from 'fs';

import { csvToJson, filenameFromPath } from '../utils';

export default class Importer {
  constructor(watcher, dirPath) {
    this.dirPath = dirPath;
    this.deleteEventType = 'rename';
    this.isInitialImport = true;
    watcher.on(watcher.changedEvent, this.changeEventHandler.bind(this));
  }

  import(path) {
    if (this.isInitialImport) {
      return this.importAllCsv().then(result => {
        this.isInitialImport = false;
        return result;
      });
    }

    return this.importCsv(path);
  }

  importSync(filePath) {
    const csv = fs.readFileSync(filePath);

    return this.getImportResult(csv, filePath);
  }

  importCsv(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, csv) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.getImportResult(csv, path));
        }
      });
    });
  }

  importAllCsv() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.dirPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          const promises = Promise.all(files.map(file => this.importCsv(`${this.dirPath}/${file}`)));

          promises.then((...data) => {
            resolve(...data);
          });
        }
      });
    });
  }

  changeEventHandler(eventType, filename) {
    if (eventType !== this.deleteEventType) {
      this.import(`${this.dirPath}/${filename}`).then(result => {
        console.log(`=== import csv async by event ===`);
        console.log(result);
      });
    } else {
      console.log(`=== file ${filename} deleted, nothing to import ===`);
    }
  }

  getImportResult(csv, filePath) {
    const json = csvToJson(csv.toString());
    const filename = filenameFromPath(filePath);

    return { filename, json };
  }
}
