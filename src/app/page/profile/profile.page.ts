import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  User = {
    name: " ",
    username: " ",
    displayName: " ",
    bio: " ",
    age: " "
  }
   post = {} as Post;
  userList;
 ref;
 task: any;
 uploadState: any;
 uploadProgress: any;
 downloadURL: any;
 id;
 name;
 url
 users: AngularFirestoreDocument;
 sub;
 photoURL:any;
 displayName;
 age;
 bio;
 existingProfile: Profile;
  uid: any;


 constructor(public Storage: AngularFireStorage,private ofAuth:AngularFireAuth, private afs :AngularFirestore, private router: Router,private userServ: UserService) {
   this.ofAuth.auth.currentUser.photoURL;
   this.name=ofAuth.auth.currentUser.displayName;
   this.users=afs.doc(`users/${this.ofAuth.auth.currentUser.uid}`)
   this.sub=this.users.valueChanges().subscribe(event=>{
   this.photoURL = event.photoURL
    this.displayName=event.displayName;
    this.age=event.age;
    this.bio=event.bio;
    this.userList=event;
    console.log(this.userList)
   })
 
   const key = this.ofAuth.auth.currentUser.uid;
   this.userServ.getUser(key).subscribe( data =>{
     this.userList = data;
     console.log(data)
   })
 }
 ngOnInit() {
  const key = this.ofAuth.auth.currentUser.uid;
 }

 Onpost(post:Post){
  const key = this.ofAuth.auth.currentUser.uid;
 return
}
 upload(event) {
   const file= event.target.files[0];
    this.id = Math.random().toString(36).substring(2);
   const filepath=this.id;
   this.ref = this.Storage.ref(filepath);
   const task = this.Storage.upload(filepath, file);
   this.uploadState = task.percentageChanges();
   task.snapshotChanges().pipe(
     finalize(() => {
       this.downloadURL = this.ref.getDownloadURL().subscribe(url=>{
         console.log(url);
         this.ofAuth.auth.currentUser.updateProfile({
           photoURL: url
         })
         this.users.update({
           photoURL: url
         })
       })
     })
   ).subscribe();
 }
 update(userList) {
  this.router.navigate(['/update'], {queryParams:{uid:this.ofAuth.auth.currentUser.uid,displayName: userList.displayName , age:userList.age , bio: userList.bio}})
}
async logout(){
  await this.ofAuth.auth.signOut();
  return this.router.navigate(['/']);
}
}