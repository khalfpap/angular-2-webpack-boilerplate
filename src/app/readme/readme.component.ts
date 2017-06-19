import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReadmeService } from './readme.service';

@Component({
  selector: 'awb-readme',
  styles: [require('./readme.component.sass').toString()],
  templateUrl: './readme.component.html',
})
export class ReadmeComponent implements OnInit, AfterViewChecked {
  @ViewChild('container')
  private container: ElementRef;

  public title: string;
  public content: string;
  public restoredToFragmentLocation: boolean;

  constructor(
    private route: ActivatedRoute,
    private readmeService: ReadmeService,
  ) { }

  public restoreToFragmentLocation(): void {
    if(this.container && !this.restoredToFragmentLocation && this.route.snapshot.fragment) {
      this.restoredToFragmentLocation = true;
      this.container.nativeElement
        .querySelector(`#${this.route.snapshot.fragment}`)
        .scrollIntoView();
    }
  }

  public ngAfterViewChecked(): void {
    this.restoreToFragmentLocation();
  }

  public ngOnInit(): void {
    this.title = `README.md`;
    this.content = this.readmeService.getReadmeHTML();
  }
}
