import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../shared/interfaces/user/userInfo';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  currentUser: UserInfo;

  constructor(private userService: AuthenticationService) {

  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res
    })
  }

}
