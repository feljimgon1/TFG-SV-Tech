import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SocketioService } from 'src/app/services/socketio/socketio.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  selectedUser: any;
  users: any = [];

  //Chat
  public roomId: any;
  public messageText: any;
  public messageArray: any = [];
  public currentUser: any = [];

  constructor(
    public authService: AuthService,
    private adminService: AdminService,
    private socketService: SocketioService,
    private profileService: ProfileService
  ) {
    this.profileService.getProfile().subscribe((profile: any) => {
      this.currentUser = profile.user
      if (this.currentUser.rol == 'ADMIN') {
        this.adminService.getPrem().subscribe((res: any) => { this.users = res; })
      } if (this.currentUser.rol == 'PREMIUM') {
        this.adminService.getAdmin().subscribe((res: any) => {
          this.users = res;
          this.selectUserHandler(this.users[0]._id)
          
        })
      }
    })
  }

  ngOnInit() {

    this.socketService.setupSocketConnection(localStorage?.getItem('token') || '{}');

    this.socketService.getMessage().subscribe((data: any) => {
      setTimeout(() => {
        this.messageArray.push(data)
        setTimeout(() => {
          var elem = document.getElementById('chat-body');
          elem!.scrollTop = elem!.scrollHeight;
        }, 100);
      }, 100)
    })

  }

  selectUserHandler(id: any) {
    this.selectedUser = this.users.find((user: any) => user._id === id);
    if (this.currentUser.rol == 'ADMIN') {
      this.roomId = this.selectedUser._id;
    }
    if (this.currentUser.rol == 'PREMIUM') {
      this.roomId = this.currentUser._id
    }

    //Instanciar los mensajes
    this.adminService.getMessages(this.currentUser._id, this.selectedUser._id).subscribe((res: any) => {
      
      let sorted = res.sort((x:any, y:any) => +new Date(x.createdAt) - +new Date(y.createdAt));

      this.messageArray = sorted;

    })

    setTimeout(() => {
      var elem = document.getElementById('chat-body');
      elem!.scrollTop = elem!.scrollHeight;
    }, 20);

    this.join(this.currentUser, this.roomId);
  }

  join(currentUser: any, roomId: any) {
    this.socketService.joinRoom({ user: currentUser._id, roomId: roomId })
  }

  sendMessage() {
    console.log('hola')
    let roomId;
    if (this.currentUser.rol == 'ADMIN') {
      roomId = this.selectedUser._id
    } else {
      roomId = this.currentUser._id
    }
    let newMessage = {
      srcUserId: this.currentUser._id,
      dstUserId: this.selectedUser._id,
      roomId: roomId,
      message: this.messageText
    };
    this.socketService.sendMessage(newMessage);
    this.messageText = ''
    setTimeout(() => {
      var elem = document.getElementById('chat-body');
      elem!.scrollTop = elem!.scrollHeight;
    }, 100);
  }

}
