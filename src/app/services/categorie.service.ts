import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categorie {
  id?: number;
  image: string;
  nom_complet: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:8000/api/categories';

  // private apiUrl = 'https://ferlo-kosamnay.mamebassine06.simplonfabriques.com/api/categories';

  constructor(private http: HttpClient) { }

  // ================================
  // RÉCUPÉRER TOUTES LES CATÉGORIES
  // ================================
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  // ================================
  // RÉCUPÉRER UNE CATÉGORIE
  // ================================
  getCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  // ================================
  // CRÉER UNE CATÉGORIE
  // ================================
  createCategorie(
    nom_complet: string,
    description: string,
    image: File
  ): Observable<any> {

    const formData = new FormData();

    formData.append('nom_complet', nom_complet);
    formData.append('description', description);
    formData.append('image', image);

    return this.http.post<any>(
      this.apiUrl,
      formData
    );
  }

  // ================================
  // MODIFIER UNE CATÉGORIE
  // ================================
  updateCategorie(
    id: number,
    nom_complet: string,
    description: string,
    image?: File
  ): Observable<any> {

    const formData = new FormData();

    formData.append('nom_complet', nom_complet);
    formData.append('description', description);

    if (image) {
      formData.append('image', image);
    }

    /*
     * Laravel reçoit normalement une requête POST
     * avec _method=PUT lorsqu'on utilise FormData.
     */
    formData.append('_method', 'PUT');

    return this.http.post<any>(
      `${this.apiUrl}/${id}`,
      formData
    );
  }

  // ================================
  // SUPPRIMER UNE CATÉGORIE
  // ================================
  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
