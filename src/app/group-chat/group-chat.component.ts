import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../chat/chat.service'
import { AuthService } from "../auth/auth.service";


@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit {
  @ViewChild('popup', {static: false}) popup: any;

  public roomId: string;
  public messageText: string;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray = [];

  public userName:string;
  public showScreen = false;
  public phone: string;
  public currentUser;
  public selectedUser;
  public usersNumber;
  public usersListFromDb;

  public finalList=[]
  public userList2=[]
  public userList3=[]
  public userList4=[]
  public userList5=[]










  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.userName=this.authService.getUserName();
    this.currentUser=this.authService.getUserId();
    this.usersListFromDb=this.authService.getUsers(this.currentUser);
    this.usersNumber=this.usersListFromDb.length;


    if (this.usersNumber==1){
      this.finalList=null;

    }else{

    let rooms=[]

    for(let i=0;i<this.usersNumber;i++){
      for(let j=0;j<this.usersNumber;j++){

        rooms[j]='room-1'

      }
      let arr=[]
      let u={
        userId:this.usersListFromDb[i]._id,
        id: i,
        name: this.usersListFromDb[i].name,
        phone: `${this.usersListFromDb[i].phone.toString()}`,
        image: 'assets/proImg/pro_img.png',
        roomId:rooms
      }
      this.finalList.push(u)
        rooms=[]

    }

  }





    this.chatService.getMessage()
      .subscribe((data: { user: string, room: string, message: string }) => {
        // this.messageArray.push(data);
        if (this.roomId) {
          setTimeout(() => {
            this.storageArray = this.chatService.getStorage();
            const storeIndex = this.storageArray
              .findIndex((storage) => storage.roomId === this.roomId);
            this.messageArray = this.storageArray[storeIndex].chats;
          }, 500);
        }
      });
  }

  ngAfterViewInit(): void {
    this.openPopup(this.popup);
  }

  openPopup(content: any): void {
    this.modalService.open(content, {backdrop: 'static', centered: true});
  }

  login(dismiss: any): void {
    this.currentUser = this.finalList.find(user => user.phone === this.phone.toString());
    this.finalList = this.finalList.filter((user) => user.phone !== this.phone.toString());

    if (this.currentUser) {
      this.showScreen = true;
      dismiss();
    }
  }

  selectUserHandler(phone: string): void {
    this.selectedUser = this.finalList.find(user => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.name,
          message: this.messageText
        }]
      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }

}
