import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-one',
  templateUrl: './one.page.html',
  styleUrls: ['./one.page.scss'],
})
export class OnePage implements OnInit {

  text: string;
  chatRef: any;
  uid: string;
  
  user: any;
  sendto;
  userid
  displayName;



  constructor(private storage: AngularFireStorage,private router: Router, private ofAuth: AngularFireAuth, private fs: AngularFirestore, private route: ActivatedRoute) { 
   
this.uid=this.ofAuth.auth.currentUser.uid;
this.chatRef = this.fs.collection('chat',ref=>ref.orderBy('Timestamp')).valueChanges();
console.log(this.uid)


    this.route.queryParams
    .subscribe(params => {
      this.displayName=params.displayName;
      this.sendto=params.userid;
      console.log("users "+ this.sendto);
    });
  }

 


  send(){
    if(this.text != ''){
      this.fs.collection('chat').add({
        displayName: this.displayName,
        message: this.text,
        userid: this.ofAuth.auth.currentUser.uid,
        sendTo: this.sendto,
        Timestamp: Date.now(),
      });
      this.text="";
    
    }
  }

  ngOnInit() {
    
   
  }

}
