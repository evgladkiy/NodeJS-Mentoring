import { Importer, DirWatcher } from './modules';

const csvPath = `${__dirname}/data/csv`;
const carsCsvPath = `${__dirname}/data/csv/cars.csv`;

const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher, csvPath);

dirWatcher.watch(csvPath, 500);

console.log(`=== import csv sync ===`);
console.log(importer.importSync(carsCsvPath));

importer
  .import(carsCsvPath)
  .then(data => {
    console.log(`=== import csv async ===`);
    console.log(data);
  })
  .catch(err => console.log(err));
