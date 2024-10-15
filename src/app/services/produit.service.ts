import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

//private apiUrl = "https://ferlo-kosamnay.mamebassine06.simplonfabriques.com/api/produits";
   
constructor(private http: HttpClient) {}

  getProduits(): Observable<Produit[]> {
    console.log('Appel API: GET', this.apiUrl);
    return this.http.get<Produit[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProduit(id: number): Observable<Produit> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Appel API: GET', url);
    return this.http.get<Produit>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createProduit(formData: FormData): Observable<Produit> {
    console.log('Appel API: POST', this.apiUrl);
    formData.forEach((value, key) => {
      console.log(`FormData key: ${key}, value:`, value);
    });
    return this.http.post<Produit>(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // updateProduit(id: number, formData: FormData): Observable<Produit> {
  //   const url = `${this.apiUrl}/${id}`;
  //   console.log('Appel API: PUT', url);
  //   console.log('Données à mettre à jour:', formData);
  //   return this.http.put<Produit>(url, formData)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }


  updateProduit(id: number, formData: FormData): Observable<Produit> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Appel API: PUT', url);
    console.log('Données à mettre à jour:', formData);
    return this.http.post<Produit>(url, formData)
      .pipe(
        catchError(this.handleError)
      );
}




  deleteProduit(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Appel API: DELETE', url);
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur HTTP:', error);
    
    if (error.error instanceof ErrorEvent) {
      console.error('Erreur côté client:', error.error.message);
    } else {
      console.error(`Erreur côté serveur: Code ${error.status}, Message: ${error.message}`);
      console.error('Détails de l\'erreur:', error.error);
    }

    let errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    if (error.error instanceof Object && error.error.message) {
      errorMessage = error.error.message;
    } else if (typeof error.error === 'string') {
      errorMessage = error.error;
    }

    return throwError(() => new Error(errorMessage));
  }
}
