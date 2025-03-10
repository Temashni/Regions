import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }
}