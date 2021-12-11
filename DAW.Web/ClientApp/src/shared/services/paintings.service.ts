import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public createNewPainting(painting: Painting) {
    return this.http.post<Painting>(this.baseUrl + "api/Painting/CreatePainting", painting)
  }

  public deletePainting(painting: Painting) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: painting
    }
    return this.http.delete(this.baseUrl + "api/Painting/DeletePainting", options);
  }

}
