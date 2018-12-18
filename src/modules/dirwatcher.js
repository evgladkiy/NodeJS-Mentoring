import * as fs from 'fs';
import EventEmitter from 'events';
import { debounce } from 'lodash';

export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.changedEvent = 'dirwatcher:changed';
  }

  watch(path, delay) {
    const watchHandler = (eventType, filename) => {
      this.emit(this.changedEvent, eventType, filename);
    };

    fs.watch(path, debounce(watchHandler, delay));
  }
}
