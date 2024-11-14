import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  //private apiUrl = "https://ferlo-kosamnay.mamebassine06.simplonfabriques.com/api/notifications";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Méthode pour récupérer toutes les notifications
getAllNotifications(): Observable<{ status: boolean; data: any[] }> {
  const headers = this.getHeaders(); // Récupération des headers avec le token
  return this.http.get<{ status: boolean; data: any[] }>(`${this.apiUrl}/notifications`, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

 // Méthode pour récupérer les statistiques des commandes
//  getCommandStatistics(): Observable<any> {
//   return this.http.get<any>(`${this.apiUrl}/statistiques/commandes`)
//     .pipe(
//       catchError(this.handleError)
//     );
// }

// Méthode pour obtenir les statistiques des commandes en attente
getCommandesEnAttente(): Observable<any> {
  return this.http.get(`${this.apiUrl}/statistiques/commandes/en-attente`)
  .pipe(
    catchError(this.handleError)
  );
}

// Méthode pour obtenir les statistiques des commandes livrées
getCommandesLivrees(): Observable<any> {
  return this.http.get(`${this.apiUrl}/statistiques/commandes/livree`)
  .pipe(
    catchError(this.handleError)
  );
}

// Méthode pour obtenir les statistiques des commandes en cours de traitement
getCommandesEnCours(): Observable<any> {
  return this.http.get(`${this.apiUrl}/statistiques/commandes/en-cours-de-traitement`)
  .pipe(
    catchError(this.handleError)
  );
}









private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error.message);
    if (error.error && error.error.errors) {
      console.error('Erreurs de validation:', error.error.errors);
    }
    return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer plus tard.'));
  }


  getLigneCommandeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}ligne-commandes/${id}`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${userId}`); // Replace with your actual user endpoint
  }
  
}
