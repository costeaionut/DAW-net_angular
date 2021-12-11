import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { Painting } from '../../shared/interfaces/paintings/painting';
import { UserInfo } from '../../shared/interfaces/user/userInfo';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { PaintingsService } from '../../shared/services/paintings.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  
  baseUrl: string;
  paintingsList: Array<Painting>;
  currentUser: UserInfo;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') _baseUrl: string,
    private _authService: AuthenticationService,
    private _paintService: PaintingsService,
    private _router: Router
  ) {
    this.baseUrl = _baseUrl
  }

  ngOnInit() {
    this.getPaintingsList();

    this._authService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    }, err => console.error(err))

  }

  public checkIfPageIsLoaded() {
    if (this.currentUser && this.paintingsList)
      return true;

    return false;
  }

  public getPaintingsList() {
    this._paintService.getPaintingsList()
      .subscribe(res => {
        this.paintingsList = res;
        console.log(this.paintingsList)
      }, err => {
        console.log(err)
      })
  }

}
