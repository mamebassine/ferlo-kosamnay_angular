import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private baseUrl = 'http://localhost:8000/api'; // Remplace par l'URL de ton backend Laravel

  constructor(private http: HttpClient) { }

  /// Méthode pour effectuer le paiement d'une commande existante
  effectuerPaiement(ligneCommandeId: number, totalAmount: number, currentDate: string, paymentType: string): Observable<any> {
    const url = `${this.baseUrl}/paiements`;

    // Récupère le token depuis le localStorage
    const token = localStorage.getItem('token');

    // Si le token existe, l'ajoute dans les en-têtes de la requête
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajoute le token dans l'en-tête
      'Content-Type': 'application/json'   // Optionnel : Définis le type de contenu
    });

    const paiementData = {
      ligne_commande_id: ligneCommandeId,
      montant: totalAmount,
      date: currentDate,
      type: paymentType
    };

    return this.http.post<any>(url, paiementData, { headers });
  }
}
