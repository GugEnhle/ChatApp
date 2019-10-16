import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
UserPost: any;
Username: string;
Password: string;

text: string;
chatRef: any;
uid: string;


constructor(private socialSharing: SocialSharing, public ofAuth: AngularFireAuth, public fs: AngularFirestore) {

this.uid=this.ofAuth.auth.currentUser.uid;
this.chatRef = this.fs.collection('chat',ref=>ref.orderBy('Timestamp')).valueChanges();
console.log(this.uid)
}

send(){
if(this.text != ''){
this.fs.collection('chat').add({
Name: this.ofAuth.auth.currentUser.displayName,
Message: this.text,
UserID: this.ofAuth.auth.currentUser.uid,
Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
});
this.text='';
}
}
share(chat){
  this.socialSharing.share(chat.Message, chat.Image).then(()=>{
  }).catch(()=>{
  })
}

ngOnInit() {
}


}

