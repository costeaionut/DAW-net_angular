import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Painting } from '../../shared/interfaces/paintings/painting';
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

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') _baseUrl: string,
    private _authService: AuthenticationService,
    private _paintService: PaintingsService
  ) {
    this.baseUrl = _baseUrl
  }

  ngOnInit() {
    this.getPaintingsList();
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
