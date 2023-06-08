import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {DefaultEventsMap} from "socket.io-client/build/typed-events";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap>;

export interface ServerUser {

  id: string;
  username: string;
  moderator: boolean;

}

export interface TransactionRequest {

  token: string;
  id: string;
  body: any;

}

export interface TransactionResponse<R> {

  token: string;
  id: string;
  data: R;

}

export interface TransactionResult<R> {

  data: R;
  error?: string;
  status: number;

}

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private userid?: string;
  private tokenId = 0;

  connection$: BehaviorSubject<ServerUser | null> = new BehaviorSubject<ServerUser | null>(null);
  transactionDistributer$: BehaviorSubject<TransactionResponse<any> | null> = new BehaviorSubject<TransactionResponse<any> | null>(null);

  socket?: SocketType;

  constructor() {}

  connect(address: string, port: number, data: any): Observable<ServerUser | null> {
    this.socket = io(`${address}:${port}`, {reconnectionAttempts: 1, extraHeaders: data});

    this.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err}`);

      alert('Failed to connect: timeout. Try again later.');
    });

    this.socket.on('connection-refused', reason => {
      console.log('Connection refused:', reason);

      this.connection$.next(null);
    });

    this.socket.on('connection-success', user => {
      console.log('Established connection with user id=' + user.id);

      this.userid = user.id;
      this.connection$.next(user);
    });

    this.socket.on('transaction', (data: TransactionResponse<any>) => {
      console.log(`<< Transaction [${data.token}] '${data.id}' =>`, data.data);

      this.transactionDistributer$.next(data);
    });

    return this.connection$;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.userid = undefined;
    }
  }

  listen(event: string, fn: (data: any) => void): void {
    if (this.socket)
      this.socket.on(event, fn);
  }

  emit(event: string, body?: any): void {
    if (this.socket)
      this.socket.emit(event, body);
  }

  transaction<T>(name: string, body: any): Observable<TransactionResult<T>> {
    const token = `token_${Date.now()}_${this.userid || '?'}`;

    if (this.socket)
      this.socket.emit('transaction', { token: token, id: name, body } as TransactionRequest);

    return this.transactionDistributer$.pipe(filter((x: any) => x && x.token && x.token === token), map((x: TransactionResponse<T>) => {
      return { status: 200, data: x.data };
    }));
  }

  isConnected(): boolean {
    return this.userid !== undefined;
  }

}
