

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { apiUrl } from './apiUrl';


export interface region {
  id: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class regionService {
   //private apiUrl = 'http://localhost:8000/api/regions'; // Remplacez par votre URL API
  private apiUrl = "https://ferlo-kosamnay.mamebassine06.simplonfabriques.com/api/regions";


  constructor(private http: HttpClient) {}

  /**
   * Méthode pour récupérer toutes les régions.
   * @returns Observable<region[]> - Observable qui émet la liste des régions
   */
  getAllregions(): Observable<region[]> {
    return this.http.get<region[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * Méthode pour créer une nouvelle région.
   * @param region - Objet contenant les informations de la région à créer
   * @returns Observable<region> - Observable qui émet la région créée
   */
  createregion(region: region): Observable<region> {
    return this.http.post<region>(this.apiUrl, region)
      .pipe(catchError(this.handleError));
  }

  /**
   * Méthode pour mettre à jour une région existante.
   * @param id - ID de la région à mettre à jour
   * @param region - Objet contenant les nouvelles informations de la région
   * @returns Observable<region> - Observable qui émet la région mise à jour
   */
  updateregion(id: number, region: region): Observable<region> {
    return this.http.put<region>(`${this.apiUrl}/${id}`, region)
      .pipe(catchError(this.handleError));
  }

  /**
   * Méthode pour récupérer une région spécifique par ID.
   * @param id - ID de la région à récupérer
   * @returns Observable<region> - Observable qui émet la région récupérée
   */
  getregion(id: number): Observable<region> {
    return this.http.get<region>(`${this.apiUrl}/${id}`) // Correction ici
      .pipe(catchError(this.handleError));
  }

  /**
   * Méthode pour supprimer une région par ID.
   * @param id - ID de la région à supprimer
   * @returns Observable<void> - Observable qui complète la suppression
   */
  deleteregion(id: number): Observable<void> {
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
