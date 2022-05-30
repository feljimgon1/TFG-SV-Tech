import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  _id: String = '';
  email: String = '';
  surname: String = '';
  message:any;
  name:any;
  rol: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.profileService.getProfile().subscribe((profile: { user: { _id: String, email: String; name: any; surname: String; rol: any }; })=>{
      this._id = profile.user._id,
      this.email = profile.user.email,
      this.name = profile.user.name,
      this.surname = profile.user.surname,
      this.rol = profile.user.rol
    });
  }

}
