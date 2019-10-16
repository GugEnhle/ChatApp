import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { AngularFireAuth } from '@angular/fire/auth';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  main: any;
  user = {} as User

  constructor(private httpClient: HttpClient,private storage: Storage,private ofAuth: AngularFireAuth) { }
  // const avatarURL = "http://127.0.0.1:3000/uploads/avatar.png";
  public async updateUserAvatar(userData: any): Promise<any>{
    const userId = userData.userId;
    const avatarURL = userData.avatarURL;
    return this.main.updateUser({id:userId, avatarURL:avatarURL});
  }
  // logOut() { 
  //   this.online.removeOnlineUser().then(() => {
  //     this.ofAuth.auth.signOut();
  //   })
  // }

  getAuthenticatedUser() {
    return this.ofAuth.authState;
  }

  async createUserWithEmailAndPassword(user: User){

    try {
      return {
        result: await this.ofAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      }
    } catch (e) {
      return {
        error: e
      };
    }

  }
  async signInWithEmailAndPassword(user: User) {
    try {
      return {
        result: await this.ofAuth.auth
          .signInWithEmailAndPassword(user.email, user.password)
      }
    } catch (e) {
      return{
        error: e
      };
    }
  }

}
 