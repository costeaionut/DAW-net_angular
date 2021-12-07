import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Painting } from '../interfaces/paintings/painting';

@Injectable({
  providedIn: 'root'
})
export class PaintingsService {

  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') _baseUrl: string
  ) {
    this.baseUrl = _baseUrl
  }

  public getPaintingsList() {
    return this.http.get<Array<Painting>>(this.baseUrl + "api/Painting/GetAllPaintings");
  }

  public getPaintingById(paintingId: string) {
    return this.http.get<Painting>(this.baseUrl + "api/Painting/GetPainting/" + paintingId)
  }

}
