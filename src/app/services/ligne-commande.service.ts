import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface LigneCommande {
  id?: number; // L'ID peut être optionnel pour les nouvelles commandes
  produit_boutique_id: number;
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
  private apiUrl = 'http://localhost:8000/api/lignes_commandes'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer toutes les lignes de commande
  getLignesCommandes(): Observable<LigneCommande[]> {
    const headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + localStorage.getItem('token') // Ajoutez le token d'authentification si nécessaire
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
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
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
