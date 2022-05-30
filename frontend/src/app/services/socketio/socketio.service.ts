import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket?: Socket;

  constructor(private http: HttpClient) {
  }

  setupSocketConnection(token: string) {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      auth: {
        token
      },
      transports: ['websocket', 'polling', 'flashsocket']
    });
  }

  joinRoom(data: any) {
    this.socket?.emit('join', data);
  }

  sendMessage(data:any): void {
    this.socket?.emit('message', data);
  }

  getMessage(): Observable<any>{
    return new Observable<{user: string, message: string}>(observer => {
      this.socket?.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket?.disconnect();
      }
    });
  }

  getMessagesByUser(user:any){
    return this.http.get('api/messages/roomId/' + user, user);
  }

}
