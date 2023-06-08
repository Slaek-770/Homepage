import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

export interface LogElement {

  content: string;
  styleClasses: string[];
  style?: string;

}

export interface LogEntry {

  timestamp: number;
  elements: LogElement[];

}

export class Logger {

  elements: LogElement[] = [];
  element: LogElement | null = null;

  constructor(initialElement: LogElement) {
    this.element = initialElement;
  }

  static begin(message: string): Logger {
    return new Logger({ content: message, styleClasses: [] });
  }

  next(message: string): Logger {
    if (this.element) {
      this.elements.push(this.element);
    }

    this.element = { content: message, styleClasses: [] };

    return this;
  }

  colored(color: string): Logger {
    if (this.element) {
      if (this.element.style) {
        this.element.style = this.element.style + '; ';
      } else {
        this.element.style = '';
      }

      this.element.style = this.element.style + 'color: ' + color;
    }

    return this;
  }

  log(logService: LogService): void {
    if (this.element) {
      this.elements.push(this.element);
    }

    logService.log({
      timestamp: Date.now(),
      elements: this.elements
    });
  }

}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private fullLog: LogEntry[] = [];
  log$: BehaviorSubject<LogEntry[]> = new BehaviorSubject<LogEntry[]>([]);

  constructor() {
  }

  log(message: LogEntry): void {
    this.fullLog.push(message);
    this.log$.next(this.fullLog);
  }

}
