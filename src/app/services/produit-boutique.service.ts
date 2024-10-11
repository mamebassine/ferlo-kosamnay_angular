import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { apiUrl } from './apiUrl';


export interface ProduitBoutique {
  id: number;
  produit_id: number;
  boutique_id: number;
  quantite: number;
  produit?: { id: number; nom: string };
  boutique?: { id: number; nom: string };
}

@Injectable({
  providedIn: 'root'
})
export class ProduitBoutiqueService {
  private apiUrl = 'http://localhost:8000/api/produitBoutique'; // Mettez à jour l'URL selon votre configuration
  //private apiUrl = "https://ferlo-kosamnay.mamebassine06.simplonfabriques.com/api/produitBoutique";


  constructor(private http: HttpClient) {}

  // Récupérer toutes les associations produit-boutique
  getAll(): Observable<ProduitBoutique[]> {
    return this.http.get<ProduitBoutique[]>(this.apiUrl);
  }

  // Créer une nouvelle association
  create(data: ProduitBoutique): Observable<ProduitBoutique> {
    return this.http.post<ProduitBoutique>(this.apiUrl, data);
  }

  // Afficher une association spécifique
  getById(id: number): Observable<ProduitBoutique> {
    return this.http.get<ProduitBoutique>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une association existante
  update(id: number, data: ProduitBoutique): Observable<ProduitBoutique> {
    return this.http.put<ProduitBoutique>(`${this.apiUrl}/${id}`, data);
  }

  // Supprimer une association
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  

  

}
