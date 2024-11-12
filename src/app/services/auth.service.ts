import { Injectable } from '@angular/core'; // Importation du décorateur Injectable
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importation de HttpClient et HttpHeaders pour les requêtes HTTP
import { Observable, BehaviorSubject, throwError } from 'rxjs'; // Importation de Observable, BehaviorSubject et throwError de RxJS
import { tap, catchError } from 'rxjs/operators'; // Importation des opérateurs tap et catchError de RxJS
import { apiUrl } from './apiUrl';
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
  private redirectUrl: string | null = null;

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  clearRedirectUrl() {
    this.redirectUrl = null;
  }

  // Déclaration de l'URL de base de l'API backend
  private apiUrl = 'http://localhost:8000/api/login'; 
  
// private apiUrl = "https://ferlo-kosamnay.mamebassine06.simplonfabriques.com/api/"

  // BehaviorSubject pour stocker l'état actuel de l'utilisateur
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private loggedIn: boolean = false;


  constructor(private http: HttpClient) { 
    // Récupérer les informations utilisateur stockées dans le localStorage, si disponibles
    const userJson = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<User | null>(userJson ? JSON.parse(userJson) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  
  
  }
  isAuthenticated(): boolean {
    // Implémentez votre logique d'authentification ici
    if (localStorage.getItem('token')) {
      return this.loggedIn=true;
    }
    return this.loggedIn=false;
  }


  /**
   * Méthode pour inscrire un nouvel utilisateur.
   * @param data - Objet contenant les informations de l'utilisateur à inscrire
   * @returns Observable<any> - Observable qui émet la réponse de l'API après la requête POST
   */
  signup(data: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/register`, data)
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
    return this.http.post<any>(`${apiUrl}/login`, credentials)
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
  //  */
  // logout(): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  //   return this.http.post<any>(`${apiUrl}/logout`, {}, { headers })
  //     .pipe(
  //       tap(() => {
  //         // Supprimer le token et les informations utilisateur du localStorage
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('user');
  //         // Mettre à jour le BehaviorSubject pour indiquer que l'utilisateur est déconnecté
  //         this.currentUserSubject.next(null);
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  logout() {
    const token = localStorage.getItem('token');
    
    // Vérifier si le token existe
    if (!token) {
      console.error('Aucun token trouvé, utilisateur non authentifié.');
      return; // Arrêter ici si aucun token n'est présent
    }
  
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    // Utiliser la méthode POST pour la déconnexion
    return this.http.post(`${apiUrl}/logout`, { headers });
  }
  
  /**
   * Méthode pour récupérer la liste des utilisateurs.
   * @returns Observable<User[]> - Observable qui émet la liste des utilisateurs
   */
  getUsers(): Observable<User[]> {
    // Assurez-vous que votre backend expose une route GET /api/users
    return this.http.get<User[]>(`${apiUrl}/representants`)
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
