import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/service/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
	
	uid:any;
	users:any;
	 constructor(public nav:NavController, public user:UserService,private ofAuth: AngularFireAuth,public afs:AngularFirestore,private route: Router) {
		   this.users=afs.collection('users').valueChanges();
		//    this.uid=ofAuth.auth.currentUser.uid;
	 }
	 ngOnInit() {
	 }
	 message(key){
	   this.route.navigate(['/profile'] ,{ queryParams :{displayName: key.displayName , userid: key.uid}})
	 }
	 
	}
  
  
