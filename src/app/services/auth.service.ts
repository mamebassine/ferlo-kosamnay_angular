// // Importation des modules et services nécessaires depuis Angular et RxJS
// import { Injectable } from '@angular/core'; // Importation du décorateur Injectable pour définir ce service comme injectable
// import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importation de HttpClient et HttpHeaders pour les requêtes HTTP
// import { Observable, BehaviorSubject, throwError } from 'rxjs'; // Importation de Observable, BehaviorSubject et throwError de RxJS
// import { tap, catchError } from 'rxjs/operators'; // Importation des opérateurs tap et catchError de RxJS

// // Définition de l'interface User pour le typage
// export interface User {
//   id?: number;
//   nom_complet?: string;
//   telephone?: string;
//   adresse?: string;
//   email?: string;
//   role?: string;
// }

// @Injectable({
//   providedIn: 'root' // Spécifie que ce service est fourni au niveau racine de l'application, le rendant disponible partout
// })
// export class AuthService {
  
//   // Déclaration de l'URL de base de l'API backend
//   private apiUrl = 'http://127.0.0.1:8000/api'; // Remplacez par l'URL de votre API si nécessaire

//   // BehaviorSubject pour stocker l'état actuel de l'utilisateur
//   private currentUserSubject: BehaviorSubject<User | null>;
//   public currentUser: Observable<User | null>;

//   constructor(private http: HttpClient) { 
//     // Récupérer les informations utilisateur stockées dans le localStorage, si disponibles
//     const userJson = localStorage.getItem('user');
//     this.currentUserSubject = new BehaviorSubject<User | null>(userJson ? JSON.parse(userJson) : null);
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   /**
//    * Méthode pour inscrire un nouvel utilisateur.
//    * @param data - Objet contenant les informations de l'utilisateur à inscrire
//    * @returns Observable<any> - Observable qui émet la réponse de l'API après la requête POST
//    */
//   signup(data: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, data)
//       .pipe(
//         tap(response => {
//           if (response.token && response.user) {
//             // Stocker le token dans le localStorage
//             localStorage.setItem('token', response.token);
//             // Stocker les informations de l'utilisateur
//             localStorage.setItem('user', JSON.stringify(response.user));
//             // Mettre à jour le BehaviorSubject avec l'utilisateur connecté
//             this.currentUserSubject.next(response.user);
//           }
//         }),
//         catchError(this.handleError)
//       );
//   }

//   /**
//    * Méthode pour connecter un utilisateur existant.
//    * @param credentials - Objet contenant les informations d'identification (email et mot de passe)
//    * @returns Observable<any> - Observable qui émet la réponse de l'API après la requête POST
//    */
//   login(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, credentials)
//       .pipe(
//         tap(response => {
//           if (response.token && response.user) {
//             // Stocker le token dans le localStorage
//             localStorage.setItem('token', response.token);
//             // Stocker les informations de l'utilisateur
//             localStorage.setItem('user', JSON.stringify(response.user));
//             // Mettre à jour le BehaviorSubject avec l'utilisateur connecté
//             this.currentUserSubject.next(response.user);
//           }
//         }),
//         catchError(this.handleError)
//       );
//   }

//   /**
//    * Méthode pour déconnecter l'utilisateur.
//    * @returns Observable<any> - Observable qui émet la réponse de l'API après la requête POST
//    */
//   logout(): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });
//     return this.http.post<any>(`${this.apiUrl}/logout`, {}, { headers })
//       .pipe(
//         tap(() => {
//           // Supprimer le token et les informations utilisateur du localStorage
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           // Mettre à jour le BehaviorSubject pour indiquer que l'utilisateur est déconnecté
//           this.currentUserSubject.next(null);
//         }),
//         catchError(this.handleError)
//       );
//   }

//   /**
//    * Gestion des erreurs des requêtes HTTP
//    * @param error - L'erreur capturée
//    * @returns Observable<never> - Un observable d'erreur
//    */
//   private handleError(error: any): Observable<never> {
//     let errorMessage = 'Une erreur inconnue est survenue!';
//     if (error.error instanceof ErrorEvent) {
//       // Erreur côté client
//       errorMessage = `Erreur: ${error.error.message}`;
//     } else {
//       // Erreur côté serveur
//       errorMessage = error.error?.message || error.message || errorMessage;
//     }
//     return throwError(errorMessage);
//   }

//   /**
//    * Méthode pour obtenir l'utilisateur actuel.
//    * @returns User | null - L'utilisateur connecté ou null si aucun utilisateur n'est connecté
//    */
//   getCurrentUser(): User | null {
//     return this.currentUserSubject.value;
//   }

//   /**
//    * Méthode pour vérifier si l'utilisateur est connecté.
//    * @returns boolean - True si l'utilisateur est connecté, sinon False
//    */
//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }
// }



















// src/app/services/auth.service.ts

import { Injectable } from '@angular/core'; // Importation du décorateur Injectable
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importation de HttpClient et HttpHeaders pour les requêtes HTTP
import { Observable, BehaviorSubject, throwError } from 'rxjs'; // Importation de Observable, BehaviorSubject et throwError de RxJS
import { tap, catchError } from 'rxjs/operators'; // Importation des opérateurs tap et catchError de RxJS

// Définition de l'interface User pour le typage
export interface User {
  id?: number;
  nom_complet?: string;
  telephone?: string;
  adresse?: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root' // Spécifie que ce service est fourni au niveau racine de l'application
})
export class AuthService {
  
  // Déclaration de l'URL de base de l'API backend
  private apiUrl = 'http://127.0.0.1:8000/api'; // Remplacez par l'URL de votre API si nécessaire

  // BehaviorSubject pour stocker l'état actuel de l'utilisateur
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) { 
    // Récupérer les informations utilisateur stockées dans le localStorage, si disponibles
    const userJson = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<User | null>(userJson ? JSON.parse(userJson) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Méthode pour inscrire un nouvel utilisateur.
   * @param data - Objet contenant les informations de l'utilisateur à inscrire
   * @returns Observable<any> - Observable qui émet la réponse de l'API après la requête POST
   */
  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data)
      .pipe(
        tap(response => {
          if (response.token && response.user) {
            // Stocker le token dans le localStorage
            localStorage.setItem('token', response.token);
            // Stocker les informations de l'utilisateur
            localStorage.setItem('user', JSON.stringify(response.user));
            // Mettre à jour le BehaviorSubject avec l'utilisateur connecté
            this.currentUserSubject.next(response.user);
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Méthode pour connecter un utilisateur existant.
   * @param credentials - Objet contenant les informations d'identification (email et mot de passe)
   * @returns Observable<any> - Observable qui émet la réponse de l'API après la requête POST
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token && response.user) {
            // Stocker le token dans le localStorage
            localStorage.setItem('token', response.token);
            // Stocker les informations de l'utilisateur
            localStorage.setItem('user', JSON.stringify(response.user));
            // Mettre à jour le BehaviorSubject avec l'utilisateur connecté
            this.currentUserSubject.next(response.user);
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Méthode pour déconnecter l'utilisateur.
   * @returns Observable<any> - Observable qui émet la réponse de l'API après la requête POST
   */
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { headers })
      .pipe(
        tap(() => {
          // Supprimer le token et les informations utilisateur du localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Mettre à jour le BehaviorSubject pour indiquer que l'utilisateur est déconnecté
          this.currentUserSubject.next(null);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Méthode pour récupérer la liste des utilisateurs.
   * @returns Observable<User[]> - Observable qui émet la liste des utilisateurs
   */
  getUsers(): Observable<User[]> {
    // Assurez-vous que votre backend expose une route GET /api/users
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Gestion des erreurs des requêtes HTTP
   * @param error - L'erreur capturée
   * @returns Observable<never> - Un observable d'erreur
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur inconnue est survenue!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = error.error?.message || error.message || errorMessage;
    }
    return throwError(errorMessage);
  }

  /**
   * Méthode pour obtenir l'utilisateur actuel.
   * @returns User | null - L'utilisateur connecté ou null si aucun utilisateur n'est connecté
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Méthode pour vérifier si l'utilisateur est connecté.
   * @returns boolean - True si l'utilisateur est connecté, sinon False
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
