import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Importation de 'tap'


interface CommandeDetail {
  // Définissez ici la structure exacte de 'CommandeDetail' selon la réponse de votre API
  id: number;
  produit_boutique_id: number;
  ligne_commande_id: number;
  quantite: number;
  montant: string;
  lignesCommandes: any[];  // Vous pouvez spécifier un type plus précis si nécessaire
}

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private apiUrl = 'http://localhost:8000/api'; 

  //private apiUrl = "https://ferlo-kosamnay.mamebassine06.simplonfabriques.com/api/";


  constructor(private http: HttpClient) {}

  
  // Méthode pour récupérer toutes les commandes
getCommandes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/listcommandes`);
}

  // Méthode pour récupérer les commandes de l'utilisateur authentifié
  getMesCommandes(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Récupérer le token depuis localStorage

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });

    return this.http.get<any[]>(`${this.apiUrl}/listDeMescommandes`, { headers });
  }


 // Fonction pour récupérer les détails d'une commande
//  getCommandeDetails(id: number): Observable<any> {
//   return this.http.get(`${this.apiUrl}/${id}`);
// }

// Fonction pour récupérer les détails d'une commande
// getCommandeDetails(id: number): Observable<any> {
//   return this.http.get<any>(`${this.apiUrl}/voirdetailcommandes/${id}`);
// }

  // Fonction pour récupérer les détails d'une commande
  getCommandeDetails(id: number): Observable<CommandeDetail> {  // Définition du type explicite
    return this.http.get<CommandeDetail>(`${this.apiUrl}/voirdetailcommandes/${id}`).pipe(
      tap((data: CommandeDetail) => {
        console.log('Réponse de l\'API:', data);
      })
    );
  }


  

// Supprimer une ligne de commande
supprimerLigneCommande(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/ligne/commandes/${id}`);
}




  
// POUR NOMBRE DE PRODUITS

  getNombreProduits(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nombre/produits`);
  }

  getproduitPlusCommande(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/produit-plus-commande`);
  }

  getNombreTotalRepresentants(): Observable<any> {
   return this.http.get<any>(`${this.apiUrl}/nombre/total-representants`);
   }

 getnombreBoutiquesActuelles(): Observable<any> {
   return this.http.get<any>(`${this.apiUrl}/nombre/boutiques`);
   }

// getNombreProduitsParMois(): Observable<any> {
//    return this.http.get<any>(`${this.apiUrl}/nombre/produits/mois`);

//   } 


  // Méthode pour obtenir les statistiques des produits par intervalle de temps
  getNombreProduitsTemps(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nombre/produits/temps`);
  }
}