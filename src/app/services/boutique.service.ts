import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface pour une Boutique
export interface Boutique {
  id?: number;
  nom: string;
  adresse: string;
  telephone: string;
  region_id: string|undefined;
  user_id?: string;
  representant?: string; // Ajoutez cette ligne si representant est une propriété de Boutique

  region?: any; // Vous pouvez définir une interface Region si nécessaire
  produits?: any[]; // Vous pouvez définir une interface Produit si nécessaire
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private apiUrl = 'http://localhost:8000/api/boutiques'; 

  constructor(private http: HttpClient) { }

  // Récupère la liste de toutes les boutiques
  getBoutiques(): Observable<{ boutiques: Boutique[] }> {
    return this.http.get<{ boutiques: Boutique[] }>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Récupère les détails d'une boutique spécifique
  getBoutique(id: number): Observable<{ boutique: Boutique }> {
    return this.http.get<{ boutique: Boutique }>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Ajoute une nouvelle boutique
  addBoutique(boutique: Boutique): Observable<{ message: string, boutique: Boutique }> {
    return this.http.post<{ message: string, boutique: Boutique }>(this.apiUrl, boutique)
      .pipe(catchError(this.handleError));
  }

  // Met à jour une boutique existante
  updateBoutique(id: number, boutique: Partial<Boutique>): Observable<{ message: string, boutique: Boutique }> {
    return this.http.put<{ message: string, boutique: Boutique }>(`${this.apiUrl}/${id}`, boutique)
      .pipe(catchError(this.handleError));
  }

  // Supprime une boutique
  deleteBoutique(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Gestion des erreurs HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue est survenue!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      if (error.error.message) {
        errorMessage = `Erreur: ${error.error.message}`;
      } else {
        errorMessage = `Erreur Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(errorMessage);
    
  }
}