import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categorie } from './categorie.service';
import { Boutique } from './boutique.service';
import { ProduitBoutique } from './produit-boutique.service';
// import { apiUrl } from './apiUrl';


export interface Produit {
  id?: number;
  categorie_id: number;
  image: string;
  description: string;
  prix: number;
  quantite: number;
  reference: string;
  nom: string;
  categorie?: Categorie;
  produit_boutique: ProduitBoutique[]; 
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:8000/api/produits';

  constructor(private http: HttpClient) {}

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit)
      .pipe(catchError(this.handleError));
  }

  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit)
      .pipe(catchError(this.handleError));
  }

  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // private handleError(error: HttpErrorResponse) {
  //   console.error('Erreur:', error);
  //   return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer plus tard.'));
  // }




  private handleError(error: HttpErrorResponse) {
    console.error('Erreur:', error);
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    if (error.error instanceof ErrorEvent) {
        // Erreur côté client
        errorMessage = `Erreur : ${error.error.message}`;
    } else {
        // Erreur côté serveur
        errorMessage = `Erreur ${error.status} : ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
}

}
