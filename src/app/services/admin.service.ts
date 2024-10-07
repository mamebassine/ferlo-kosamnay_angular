import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';


@Injectable({
  providedIn: 'root'
})
export class AdminService {  

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> { // Déclarer le type de retour
    return this.http.get<any[]>(`${apiUrl}/users`); // Utilisez le type de retour pour la sécurité
  }
}
