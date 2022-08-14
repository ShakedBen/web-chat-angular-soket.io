
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from './chat.service'
import { AuthService } from "../auth/auth.service";




@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('popup', {static: false}) popup: any;

  public roomId: string;
  public messageText: string;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray = [];

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
    this.currentUser=this.authService.getUserId();
    this.usersListFromDb=this.authService.getUsers(this.currentUser);
    this.usersNumber=this.usersListFromDb.length;










    if (this.usersNumber==1){
      this.finalList=null;
    }

    if (this.usersNumber==2)
    {
      this.finalList=this.userList2;
      this.userList2 =
      [
         {
        userId:this.usersListFromDb[0]._id,
        id: 1,
        name: this.usersListFromDb[0].name,
        phone: `${this.usersListFromDb[0].phone.toString()}`,
        image: 'assets/proImg/pro_img.png',
        roomId: {
          2: 'room-1'

        }
      },
      {
        userId:this.usersListFromDb[1]._id,
        id: 2,
        name: this.usersListFromDb[1].name,
        phone: `${this.usersListFromDb[1].phone.toString()}`,
        image: 'assets/proImg/pro_img.png',
        roomId: {
          1: 'room-1'

        }
      }
    ];


    }
    if (this.usersNumber==3)
    {

      this.userList3 = [    {
        userId:this.usersListFromDb[0]._id,
        id: 1,
        name: this.usersListFromDb[0].name,
        phone: `${this.usersListFromDb[0].phone.toString()}`,
        image: 'assets/proImg/pro_img.png',
        roomId: {
          2: 'room-1',
          3: 'room-2'

        }
      },
      {
        userId:this.usersListFromDb[1]._id,
        id: 2,
        name: this.usersListFromDb[1].name,
        phone: `${this.usersListFromDb[1].phone.toString()}`,
        image: 'assets/proImg/pro_img.png',
        roomId: {
          1: 'room-1',
          3: 'room-4'

        }
      },
      {
        userId:this.usersListFromDb[2]._id,
        id: 3,
        name: this.usersListFromDb[2].name,
        phone: `${this.usersListFromDb[2].phone.toString()}`,
        image: 'assets/proImg/pro_img.png',
        roomId: {
          1: 'room-2',
          2: 'room-4'

        }}

      ];


      this.finalList=this.userList3;
    }

    if (this.usersNumber==4){

this.userList4 = [ {
  userId:this.usersListFromDb[0]._id,
  id: 1,
  name: this.usersListFromDb[0].name,
  phone: `${this.usersListFromDb[0].phone.toString()}`,
  image: 'assets/proImg/pro_img.png',
  roomId: {
    2: 'room-1',
    3: 'room-2',
    4: 'room-3'
  }
},
{
  userId:this.usersListFromDb[1]._id,
  id: 2,
  name: this.usersListFromDb[1].name,
  phone: `${this.usersListFromDb[1].phone.toString()}`,
  image: 'assets/proImg/pro_img.png',
  roomId: {
    1: 'room-1',
    3: 'room-4',
    4: 'room-5'
  }
},
{
  userId:this.usersListFromDb[2]._id,
  id: 3,
  name: this.usersListFromDb[2].name,
  phone: `${this.usersListFromDb[2].phone.toString()}`,
  image: 'assets/proImg/pro_img.png',
  roomId: {
    1: 'room-2',
    2: 'room-4',
    4: 'room-6'
  }
},
{
  userId:this.usersListFromDb[3]._id,
  id: 4,
  name: this.usersListFromDb[3].name,
  phone: `${this.usersListFromDb[3].phone.toString()}`,
  image: 'assets/proImg/pro_img.png',
  roomId: {
    1: 'room-3',
    2: 'room-5',
    3: 'room-6'
  }}];


      this.finalList=this.userList4;
    }
    if (this.usersNumber==5)
    {
    this.userList5 = [  {
      userId:this.usersListFromDb[0]._id,
      id: 1,
      name: this.usersListFromDb[0].name,
      phone: `${this.usersListFromDb[0].phone.toString()}`,
      image: 'assets/proImg/pro_img.png',
    roomId: {
      2: 'room-1',
      3: 'room-2',
      4: 'room-3',
      5:'room-7'
    }
  },
  {
    userId:this.usersListFromDb[1]._id,
    id: 2,
    name: this.usersListFromDb[1].name,
    phone: `${this.usersListFromDb[1].phone.toString()}`,
    image: 'assets/proImg/pro_img.png',
    roomId: {
      1: 'room-1',
      3: 'room-4',
      4: 'room-5',
      5:'room-8'
    }
  },
  {
    userId:this.usersListFromDb[2]._id,
    id: 3,
    name: this.usersListFromDb[2].name,
    phone: `${this.usersListFromDb[2].phone.toString()}`,
    image: 'assets/proImg/pro_img.png',
    roomId: {
      1: 'room-2',
      2: 'room-4',
      4: 'room-6',
      5:'room-9'
    }
  },
  {
    userId:this.usersListFromDb[3]._id,
    id: 4,
    name: this.usersListFromDb[3].name,
    phone: `${this.usersListFromDb[3].phone.toString()}`,
    image: 'assets/proImg/pro_img.png',
    roomId: {
      1: 'room-3',
      2: 'room-5',
      3: 'room-6',
      5:'room-10'
    }
  },
  {
    userId:this.usersListFromDb[4]._id,
    id: 5,
    name: this.usersListFromDb[4].name,
    phone: `${this.usersListFromDb[4].phone.toString()}`,
    image: 'assets/proImg/pro_img.png',
    roomId: {
      1: 'room-7',
      2: 'room-8',
      3: 'room-9',
      4:'room-10'
    }
  }];
      this.finalList=this.userList5;
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
/*A function that checks which room you are in and sends the messages to the person you have chosen to talk to */
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
