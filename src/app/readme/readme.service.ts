import { Injectable } from '@angular/core';
const readme = require('../../../README.md');

@Injectable()
export class ReadmeService {
  public getReadmeHTML(): string {
    return readme;
  }
}
