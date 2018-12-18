import { Importer, DirWatcher } from './modules';

const csvPath = `${__dirname}/data/csv`;
const carsCsvPath = `${__dirname}/data/csv/cars.csv`;

const importer = new Importer(new DirWatcher(), csvPath, 500);

console.log(`=== import csv sync ===`);
console.log(importer.importSync(carsCsvPath));

importer
  .import(carsCsvPath)
  .then(data => {
    console.log(`=== import csv async ===`);
    console.log(data);
  })
  .catch(err => console.log(err));
