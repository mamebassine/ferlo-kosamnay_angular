// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// export interface Region {
//   id: number;
//   nom: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class RegionService {
//   private apiUrl = 'http://localhost:8000/api/regions'; // Remplacez par votre URL API

//   constructor(private http: HttpClient) {}

//   getAllRegions(): Observable<Region[]> {
//     return this.http.get<Region[]>(this.apiUrl)
//       .pipe(catchError(this.handleError));
//   }

//   createRegion(region: Region): Observable<Region> {
//     return this.http.post<Region>(this.apiUrl, region)
//       .pipe(catchError(this.handleError));
//   }

//   updateRegion(id: number, region: Region): Observable<Region> {
//     return this.http.put<Region>(`${this.apiUrl}/${id}`, region)
//       .pipe(catchError(this.handleError));
//   }

//   getRegion(id: number): Observable<Region> {
//     return this.http.get<Region>(`${this.apiUrl}/${id}`) // Correction ici
//       .pipe(catchError(this.handleError));
//   }

//   deleteRegion(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`)
//       .pipe(catchError(this.handleError));
//   }

//   private handleError(error: HttpErrorResponse) {
//     console.error('Une erreur s\'est produite:', error.error || error.message);
//     return throwError(() => new Error('Quelque chose s\'est mal passé; veuillez réessayer plus tard.'));
//   }
// }







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
  private apiUrl = 'http://localhost:8000/api/regions'; // Remplacez par votre URL API

  constructor(private http: HttpClient) {}

  /**
   * Méthode pour récupérer toutes les régions.
   * @returns Observable<Region[]> - Observable qui émet la liste des régions
   */
  getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * Méthode pour créer une nouvelle région.
   * @param region - Objet contenant les informations de la région à créer
   * @returns Observable<Region> - Observable qui émet la région créée
   */
  createRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.apiUrl, region)
      .pipe(catchError(this.handleError));
  }

  /**
   * Méthode pour mettre à jour une région existante.
   * @param id - ID de la région à mettre à jour
   * @param region - Objet contenant les nouvelles informations de la région
   * @returns Observable<Region> - Observable qui émet la région mise à jour
   */
  updateRegion(id: number, region: Region): Observable<Region> {
    return this.http.put<Region>(`${this.apiUrl}/${id}`, region)
      .pipe(catchError(this.handleError));
  }

  /**
   * Méthode pour récupérer une région spécifique par ID.
   * @param id - ID de la région à récupérer
   * @returns Observable<Region> - Observable qui émet la région récupérée
   */
  getRegion(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.apiUrl}/${id}`) // Correction ici
      .pipe(catchError(this.handleError));
  }

  /**
   * Méthode pour supprimer une région par ID.
   * @param id - ID de la région à supprimer
   * @returns Observable<void> - Observable qui complète la suppression
   */
  deleteRegion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Gestion des erreurs des requêtes HTTP
   * @param error - L'erreur capturée
   * @returns Observable<never> - Un observable d'erreur
   */
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error.error || error.message);
    return throwError(() => new Error('Quelque chose s\'est mal passé; veuillez réessayer plus tard.'));
  }
}
