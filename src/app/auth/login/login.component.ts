// Importation des modules et services nécessaires
import { Component, inject } from '@angular/core'; // Importation des décorateurs et fonctions de base d'Angular
import { AuthService } from '../../services/auth.service'; // Service d'authentification personnalisé
import { UserModel } from '../../Models/user.model'; // Modèle de données pour l'utilisateur
import { Router } from '@angular/router'; // Service de routage d'Angular
import { CommonModule } from '@angular/common'; // Module commun d'Angular (directives, pipes, etc.)
import { FormsModule } from '@angular/forms'; // Module pour la gestion des formulaires

@Component({
  selector: 'app-login', // Sélecteur utilisé dans les templates pour intégrer ce composant
  standalone: true, // Indique que ce composant est autonome et ne fait pas partie d'un module Angular
  imports: [CommonModule, FormsModule], // Modules importés nécessaires pour ce composant
  templateUrl: './login.component.html', // Chemin vers le template HTML du composant
  styleUrls: ['./login.component.css'] // Chemins vers les fichiers CSS du composant
})
export class LoginComponent {

  // Injection du service d'authentification via le constructeur
  constructor(private authService: AuthService) { }

  // Utilisation de la fonction `inject` pour injecter le service de routage
  private router = inject(Router);

  // Initialisation de l'objet utilisateur avec des valeurs vides pour les propriétés requises
  userObjet: UserModel = {
    email: '',
    password: ''
  };

  /**
   * Méthode appelée lors de la tentative de connexion de l'utilisateur.
   * Vérifie que les champs email et password sont remplis,
   * puis appelle le service d'authentification pour effectuer la connexion.
   */
  connexion() {
    console.log(this.userObjet); // Affiche l'objet utilisateur dans la console pour débogage

    // Vérifie que les champs email et password ne sont pas vides
    if (this.userObjet.email && this.userObjet.password) {
      
      // Création d'un nouvel objet contenant uniquement les propriétés nécessaires pour la connexion
      const loginData = {
        email: this.userObjet.email,
        password: this.userObjet.password
      };

      // Appel du service d'authentification pour tenter de se connecter
      this.authService.login(this.userObjet).subscribe(
        (response: any) => {
          // Log pour voir toute la structure de la réponse
          console.log('Response structure:', response);

          // Vérifie si le token est directement dans la réponse
          if (response.token) {
            console.log('Token:', response.token);
            localStorage.setItem("token", response.token); // Stocke le token dans le localStorage
            // Navigation vers la page "/portail" après une connexion réussie
            this.router.navigateByUrl("/dashboard");
          } 
          // Sinon, vérifie si le token est dans une structure de données imbriquée
          else if (response.data && response.data.token) { 
            console.log('Token in data:', response.data.token);
            localStorage.setItem("token", response.data.token); // Stocke le token dans le localStorage
            this.router.navigateByUrl("/inscription_user"); // Navigation vers la page d'inscription utilisateur
          } 
          // Si aucun token n'est trouvé, affiche une erreur dans la console
          else {
            console.error('No token in the response');
          }
        },
        (error: any) => {
          // Gestion des erreurs lors de la tentative de connexion
          console.error('Error during login:', error);
        }
      );
    }
  }
}
