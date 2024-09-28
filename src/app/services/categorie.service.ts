
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Categorie {
  id?: number;
  nom_complet: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:8000/api/categories'; 
  
  constructor(private http: HttpClient) { }

  // Récupérer toutes les catégories
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  // Récupérer une catégorie par ID
  getCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle catégorie
  createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, categorie);
  }

  // Mettre à jour une catégorie
  updateCategorie(id: number, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/${id}`, categorie);
  }

  // Supprimer une catégorie
  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
