// Importation des modules et services nécessaires depuis Angular et RxJS
import { Injectable } from '@angular/core'; // Importation du décorateur Injectable pour définir ce service comme injectable
import { HttpClient } from '@angular/common/http'; // Importation du service HttpClient pour effectuer des requêtes HTTP
import { Observable } from 'rxjs'; // Importation de l'interface Observable de RxJS pour gérer les données asynchrones

// Décorateur Injectable qui indique que ce service peut être injecté dans d'autres composants ou services
@Injectable({
  providedIn: 'root' // Spécifie que ce service est fourni au niveau racine de l'application, le rendant disponible partout
})
export class UserService {
  
  // Déclaration de l'URL de base de l'API backend
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de l'API backend où les requêtes seront envoyées

  // Constructeur du service qui injecte le service HttpClient d'Angular
  constructor(private http: HttpClient) { }

  /**
   * Méthode pour inscrire un nouvel utilisateur.
   * @param data - Objet contenant les informations de l'utilisateur à inscrire
   * @returns Observable<any> - Observable qui émet la réponse de l'API après la requête POST
   */
  signup(data: any): Observable<any> {
    // Effectue une requête POST vers l'endpoint '/register' de l'API en envoyant les données de l'utilisateur
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
