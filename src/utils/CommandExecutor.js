import through2 from 'through2';

export default class CommandExecutor {
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

  outputFile(file) {
    console.log(file);
    console.log('outputFile');
  }

  convertFromFile(file) {
    console.log(file);
    console.log('convertFromFile');
  }

  convertToFile(file) {
    console.log(file);
    console.log('convertFromFile');
  }

  cssBundler(path) {
    console.log(path);
    console.log('cssBundler');
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
      return next();
    });
  }
}
