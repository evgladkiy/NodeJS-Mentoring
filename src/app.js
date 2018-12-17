import config from './config/config.json';
import { User, Product } from './models';

// eslint-disable-next-line no-console;
console.log(config.name);

var user = new User();
var product = new Product();
