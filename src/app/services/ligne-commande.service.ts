import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Import de catchError

export interface LigneCommande {
  id?: number; // L'ID peut être optionnel pour les nouvelles commandes
  user_id: number;
  date: string; // Utilisez un type Date si nécessaire
  statut: string;
  quantite_totale: number;
  prix_totale: number;
}

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {
  private apiUrl = 'http://localhost:8000/api/lignes_commandes'; 
  
//private apiUrl = "https://ferlo-kosamnay.mamebassine06.simplonfabriques.com/api/lignes_commandes";
  constructor(private http: HttpClient) {}

  // Méthode pour récupérer toutes les lignes de commande
  getLignesCommandes(): Observable<LigneCommande[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    return this.http.get<LigneCommande[]>(this.apiUrl, { headers });
  }

  // Méthode pour récupérer une ligne de commande spécifique par ID
  getLigneCommandeById(id: number): Observable<LigneCommande> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<LigneCommande>(`${this.apiUrl}/${id}`, { headers });
  }

  // Méthode pour créer une nouvelle ligne de commande

  createLigneCommande(ligneCommande: LigneCommande): Observable<LigneCommande> {
    const token = localStorage.getItem('token');  // Récupérez le token depuis le localStorage
    
    // Vérifiez si le token est disponible avant d'envoyer la requête
    if (!token) {
      console.error('Token non disponible !');
      return throwError('Token non disponible.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json'
    });
  
    return this.http.post<LigneCommande>(this.apiUrl, ligneCommande, { headers });
  }


// Méthode pour mettre à jour une ligne de commande
  
  update(id: number, ligneCommande: LigneCommande): Observable<LigneCommande> {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non disponible !');
        return throwError('Token non disponible.');
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
  
      const url = `${this.apiUrl}/${id}`; // URL de l'API pour la mise à jour
      return this.http.put<LigneCommande>(url, ligneCommande, { headers }).pipe(
        catchError((error) => {
          console.error('Erreur lors de la mise à jour de la ligne de commande:', error);
          return throwError(error);
        })
      );
    }
//  update(id: number, data: LigneCommande): Observable<LigneCommande> {
//     return this.http.put<LigneCommande>(`${this.apiUrl}/ligne/commandes/${id}`, data);
//   }
  
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}lignes_commandes/${userId}`); // Replace with your actual user endpoint
  }


 
//Méthode pour supprimer une ligne de commande par ID
  deleteLigneCommande(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }



  // deleteLigneCommande(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }
  
}
