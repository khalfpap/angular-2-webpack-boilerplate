import { Component, OnInit } from '@angular/core';

import { ReadmeService } from './readme.service';

@Component({
  selector: 'awb-readme',
  styles: [require('./readme.component.sass').toString()],
  templateUrl: './readme.component.html',
})
export class ReadmeComponent implements OnInit {
  public title: string;
  public content: string;
  constructor(
    private readmeService: ReadmeService
  ) { }

  public ngOnInit(): void {
    this.title = `README.md`;
    this.content = this.readmeService.getReadmeHTML();
  }
}
