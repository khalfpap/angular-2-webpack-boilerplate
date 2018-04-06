import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild } from '@angular/core';
import { MatButton }  from '@angular/material';

@Component({
  selector: 'awb-alert-dialog',
  styles: [require('./dialog.component.sass').toString()],
  templateUrl: './alert-dialog.component.html',
})
// this can be replaced by MdDialog when it is ready
export class AlertDialogComponent implements AfterViewInit {
  @Input() public cancelText: string;
  @Input() public okText: string;
  @Input() public title: string;
  @Input() public message: string;

  @Output() public valueEmitted = new EventEmitter<string>();

  @ViewChild('cancel') public cancel: MatButton;

  constructor() {
    this.okText = 'OK';
    this.cancelText = 'Cancel';
  }

  public emitValue(value: string): void {
    this.valueEmitted.emit(value);
  }

  public ngAfterViewInit() {
    // wait for MdInput to initialize; otherwise this breaks the component
    setTimeout(() => this.cancel.focus(), 0);
  }
}
