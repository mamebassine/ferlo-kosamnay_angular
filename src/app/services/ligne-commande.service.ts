import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

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
  // createLigneCommande(ligneCommande: LigneCommande): Observable<LigneCommande> {
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + localStorage.getItem('token')
  //   });
  //   return this.http.post<LigneCommande>(this.apiUrl, ligneCommande, { headers });
  // }
  createLigneCommande(ligneCommande: LigneCommande): Observable<LigneCommande> {
    const token = localStorage.getItem('token');  // Récupérez le token depuis le localStorage
    
    // Vérifiez si le token est disponible avant d'envoyer la requête
    if (!token) {
      console.error('Token non disponible !');
      return throwError('Token non disponible.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajoutez le token JWT
      'Content-Type': 'application/json'
    });
  
    return this.http.post<LigneCommande>(this.apiUrl, ligneCommande, { headers });
  }
  

  // Méthode pour mettre à jour une ligne de commande existante
  updateLigneCommande(id: number, ligneCommande: LigneCommande): Observable<LigneCommande> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<LigneCommande>(`${this.apiUrl}/${id}`, ligneCommande, { headers });
  }

  // Méthode pour supprimer une ligne de commande par ID
  deleteLigneCommande(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
