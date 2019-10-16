import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';





const firebaseConfig = {
  apiKey: "AIzaSyDItnlpB5z6ydnKZT1jfwEPNHYTO5La9aA",
  authDomain: "chatapp-bd9d1.firebaseapp.com",
  databaseURL: "https://chatapp-bd9d1.firebaseio.com",
  projectId: "chatapp-bd9d1",
  storageBucket: "chatapp-bd9d1.appspot.com",
  messagingSenderId: "762422706339",
  appId: "1:762422706339:web:4accbaaecbae8ea6"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,AngularFirestoreModule.enablePersistence(),AngularFireStorageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
