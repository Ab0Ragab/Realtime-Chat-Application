import { Component } from '@angular/core';
import {ChatService} from './chat.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers:[ChatService]
})
export class AppComponent {

    user:String;
    room:String;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];
    constructor(private _chatService:ChatService){
        this._chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
    }

    join(){
        if(this.user === undefined && this.room === undefined) {
            window.alert("Please enter your name & room");
            return;
        }
        this._chatService.joinRoom({user:this.user, room:this.room});
        window.alert(`Hi ${this.user} you joined to ${this.room} room successfully!`);
    }

    leave(){
        this._chatService.leaveRoom({user:this.user, room:this.room});
        window.alert(`Hi ${this.user} you leave from ${this.room} room successfully!`);
    }

    sendMessage()
    {
        this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    }

}