import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket: Socket;
  constructor(
    private apiService: ApiService
  ) {
    this.socket = io(environment.baseUrl);
    console.log('hello', this.socket);
  }
  joinChat(senderID: any, reciverId: any) {
    console.log('senderID,reciverId==.', senderID, reciverId)
    this.socket.emit('join', {
      senderID: parseInt(senderID),
      reciverId: reciverId
    });
  }
  joinGroup(groupId) {
    this.socket.emit('join', {
      groupId: groupId
    });
  }
  sendGroupMessage(message: any) {
    console.log('hello abhi', message)
    this.apiService.storeGroupMessage(message).then(res => {
    }).catch(err => {
      console.log('some server issues i you face issues we will try solve this issues')
    })
    this.socket.emit('group_message', message);
  }
  getGroupMessage() {
    return new Observable((observer) => {
      this.socket.on('group_message', (msg) => {
        console.log('msg====>', msg)
        observer.next(msg);
      });
    });
  }
  sendMessage(message: any) {
    console.log('helo you message__', message)
    this.socket.emit('chat_message', message);
    this.apiService.storeChatMessage(message).then(res => {
    }).catch(err => {
      console.log('some server issues i you face issues we will try solve this issues')
    })
  }
  onMessage() {
    return new Observable((observer) => {
      this.socket.on('chat_message', (msg) => {
        observer.next(msg);
      });
    });
  }
}