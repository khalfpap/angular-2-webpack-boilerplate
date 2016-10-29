import { Injectable } from '@angular/core';
const readme = require('../../../README.md');

@Injectable()
export class ReadmeService {
  constructor() { }

  public getReadmeHTML(): string {
    return readme;
  }
}
