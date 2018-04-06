import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild } from '@angular/core';

@Component({
  selector: 'awb-input-dialog',
  styles: [require('./dialog.component.sass').toString()],
  templateUrl: './input-dialog.component.html',
})
// this can be replaced by MdDialog when it is ready
export class InputDialogComponent implements AfterViewInit {
  @Input() public cancelText: string;
  @Input() public okText: string;
  @Input() public placeholder: string;
  @Input() public title: string;
  @Input() public value: string;

  @Output() public valueEmitted = new EventEmitter<string>();

  @ViewChild('input') public input;

  constructor() {
    this.okText = 'OK';
    this.cancelText = 'Cancel';
  }

  public emitValue(value: string): void {
    this.valueEmitted.emit(value);
  }

  public ngAfterViewInit() {
    setTimeout(() => this.input.nativeElement.focus(), 0);
  }
}
