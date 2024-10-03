import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {
  private apiUrl = 'http://localhost:8000/api/lignes_commandes';  // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les lignes de commande
  getLignesCommandes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Récupérer une ligne de commande par ID (Détails)
  getLigneCommandeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une nouvelle ligne de commande
  createLigneCommande(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Modifier une ligne de commande par ID
  updateLigneCommande(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Supprimer une ligne de commande par ID
  deleteLigneCommande(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
