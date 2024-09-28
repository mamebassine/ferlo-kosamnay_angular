// src/app/services/region.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Region {
  id: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiURL = 'http://localhost:8000/api/regions'; // URL de votre API Laravel

  constructor(private http: HttpClient) { }

  // Obtenir toutes les régions
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiURL)
      .pipe(catchError(this.handleError));
  }

  // Obtenir une région par ID
  getRegion(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.apiURL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Ajouter une nouvelle région
  addRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.apiURL, region)
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour une région
  updateRegion(id: number, region: Region): Observable<Region> {
    return this.http.put<Region>(`${this.apiURL}/${id}`, region)
      .pipe(catchError(this.handleError));
  }

  // Supprimer une région
  deleteRegion(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Gérer les erreurs
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Une erreur est survenue:', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Code de retour ${error.status}, ` +
        `corps: ${JSON.stringify(error.error)}`);
    }
    return throwError('Quelque chose a mal tourné; veuillez réessayer plus tard.');
  }
}
