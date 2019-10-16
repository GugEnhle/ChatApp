import { Component, OnInit } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // user = {} as User;
  age: string;
  bio: string;
  username: string;
  email: any;
  password;

  constructor( private ofAuth:AngularFireAuth,public nav: NavController, private router: Router,public fs: AngularFirestore ) { }
  ngOnInit() {
  }
  register() {
    this.ofAuth.auth.createUserWithEmailAndPassword(this.email,this.password).then(()=>{
      localStorage.setItem('userid', this.ofAuth.auth.currentUser.uid);
      this.fs.collection('users').doc(this.ofAuth.auth.currentUser.uid).set({

        age: this.age,
     bio: this.bio,
     displayName: this.username,

        uid: this.ofAuth.auth.currentUser.uid,
        Timestamp:firestore.FieldValue.serverTimestamp(),
        Email:this.email,
        photoURL:''
        
      }).catch(error=>{
        alert(error.message)
      })
      this.ofAuth.auth.currentUser.updateProfile({
        displayName: this.username,
        photoURL: ''
      }).then (()=>{
         this.nav.navigateRoot('/tabs');
    }).catch(error=>{
      alert(error.message)
    })
   }).catch(error =>{
    alert(error.message)
   })
   }
   home(){
     this.nav.navigateForward('/home');
   }
   }