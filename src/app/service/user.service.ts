import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUID() {
    throw new Error("Method not implemented.");
  }
  getUsername() {
    throw new Error("Method not implemented.");
  }

  private userDoc: AngularFirestoreDocument<User>;
 constructor(private angularfire:AngularFirestore, private afAuth: AngularFireAuth) { }
 getUser(key){
   this.userDoc = this.angularfire.doc<User>('users/'+key);
   return this.userDoc.valueChanges();
 }
 update(User, key){
    this.userDoc=this.angularfire.doc<User>('users/'+key);
   this.userDoc.update(User);
 }
 updateEmail(newemail: string) {
  return this.afAuth.auth.currentUser.updateEmail(newemail + '@codedamn.com')
}
}
