import {Component, Input, OnInit} from '@angular/core';
import {LogService} from "../log.service";

@Component({
  selector: 'app-log-output',
  templateUrl: './log-output.component.html',
  styleUrls: ['./log-output.component.scss']
})
export class LogOutputComponent implements OnInit {

  @Input()
  maxWidth?: string;

  @Input()
  maxHeight?: string;

  @Input()
  overflow?: string;

  constructor(
    public logService: LogService
  ) { }

  ngOnInit(): void {}

  formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString();
  }

}
