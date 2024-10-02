import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/api/users '; // Remplacez par votre API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> { // Déclarer le type de retour
    return this.http.get<any[]>(`${this.apiUrl}/users`); // Utilisez le type de retour pour la sécurité
  }
}
