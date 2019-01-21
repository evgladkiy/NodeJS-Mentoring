// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register');

const CommandExecutor = require('./CommandExecutor').default;
const CommandArguments = require('./CommandArguments').default;

// Usage:
// node ./streams.js -a reverse
// node ./streams.js --action=transform
// node ./streams.js -a outputFile --file=users.csv
// node ./streams.js -a convertFromFile -f cards.csv
// node ./streams.js --action=convertToFile -f cars.csv
// node ./streams.js -a cssBundler --path=../assets/css

class Streams {
  constructor() {
    this.commandExecutor = new CommandExecutor();
    this.arguments = new CommandArguments().args;
  }

  init() {
    const { action, path, file } = this.arguments;

    switch (action) {
      case 'reverse':
        this.commandExecutor.reverse();
        break;
      case 'transform':
        this.commandExecutor.transform();
        break;
      case 'outputFile':
        this.commandExecutor.outputFile(file);
        break;
      case 'convertFromFile':
        this.commandExecutor.convertFromFile(file);
        break;
      case 'convertToFile':
        this.commandExecutor.convertToFile(file);
        break;
      case 'cssBundler':
        this.commandExecutor.cssBundler(path);
        break;
      default:
        break;
    }
  }
}

const streams = new Streams();

streams.init();
