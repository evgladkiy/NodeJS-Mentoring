import yargs from 'yargs';

const yargsOptionsConfig = {
  action: {
    alias: 'a',
    describe: 'Еnter one of the available functions to be called',
    choices: ['reverse', 'transform', 'outputFile', 'convertFromFile', 'convertToFile', 'cssBundler'],
    requiresArg: true,
    required: true,
  },
  file: {
    alias: 'f',
    describe: 'Specify file, will be used as argument in function specified in action',
    requiresArg: true,
  },
  path: {
    alias: 'p',
    describe: 'Specify files path, will be used as argument in function specified in action',
    requiresArg: true,
  },
  help: {
    describe: 'Show help',
    alias: 'h',
    default: false,
    hidden: false,
  },
};

export default class CommandArguments {
  constructor() {
    this.helpKeys = ['help', 'h'];
    this.args = this.configureArgs();
  }

  configureArgs() {
    const args = yargs
      .usage('Description of the use of the Utils module')
      .help(false)
      .version(false)
      .options(yargsOptionsConfig)
      .parse();

    const [firstCommand] = Object.keys(args).slice(1, 2);

    if (this.helpKeys.includes(firstCommand)) {
      yargs.showHelp();
      process.exit(0);
    }

    return args;
  }
}
