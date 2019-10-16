import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  User = {
    displayName: '',
    age:'',
    bio:'',
    photoURL:'',
    uid:'',
  };
  constructor(private route: ActivatedRoute,private userServ: UserService,private router: Router,private ofAuth: AngularFireAuth) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params =>
       { console.log(params);
   
     this.User.uid = params.uid,
        
    this.User.displayName = params.displayName,

    this.User.age = params.age,

    this.User.bio =params.bio

  console.log(this.User.displayName,this.User.bio, this.User.age)
  });
  }
  onUpdate(User){
    const key = this.ofAuth.auth.currentUser.uid;
    this.userServ.update(User, key);
    alert('profile updated')
    this.router.navigateByUrl('profile')
  }
 }