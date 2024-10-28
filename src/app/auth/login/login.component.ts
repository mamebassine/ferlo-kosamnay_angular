// // Importation des modules et services nécessaires
// import { Component, inject } from '@angular/core'; // Importation des décorateurs et fonctions de base d'Angular
// import { AuthService } from '../../services/auth.service'; // Service d'authentification personnalisé
// import { UserModel } from '../../Models/user.model'; // Modèle de données pour l'utilisateur
// import { Router } from '@angular/router'; // Service de routage d'Angular
// import { CommonModule } from '@angular/common'; // Module commun d'Angular (directives, pipes, etc.)
// import { FormsModule } from '@angular/forms'; // Module pour la gestion des formulaires

// @Component({
//   selector: 'app-login', // Sélecteur utilisé dans les templates pour intégrer ce composant
//   standalone: true, // Indique que ce composant est autonome et ne fait pas partie d'un module Angular
//   imports: [CommonModule, FormsModule], // Modules importés nécessaires pour ce composant
//   templateUrl: './login.component.html', // Chemin vers le template HTML du composant
//   styleUrls: ['./login.component.css'] // Chemins vers les fichiers CSS du composant
// })
// export class LoginComponent {

//   // Injection du service d'authentification via le constructeur
//   constructor(private authService: AuthService) { }

//   // Utilisation de la fonction `inject` pour injecter le service de routage
//   private router = inject(Router);

//   // Initialisation de l'objet utilisateur avec des valeurs vides pour les propriétés requises
//   userObjet: UserModel = {
//     email: '',
//     password: ''
//   };

//   /**
//    * Méthode appelée lors de la tentative de connexion de l'utilisateur.
//    * Vérifie que les champs email et password sont remplis,
//    * puis appelle le service d'authentification pour effectuer la connexion.
//    */
//   connexion() {
//     console.log(this.userObjet); // Affiche l'objet utilisateur dans la console pour débogage

//     // Vérifie que les champs email et password ne sont pas vides
//     if (this.userObjet.email && this.userObjet.password) {
      
//       // Création d'un nouvel objet contenant uniquement les propriétés nécessaires pour la connexion
//       const loginData = {
//         email: this.userObjet.email,
//         password: this.userObjet.password
//       };

//       // Appel du service d'authentification pour tenter de se connecter
//       this.authService.login(this.userObjet).subscribe(
//         (response: any) => {
//           // Log pour voir toute la structure de la réponse
//           console.log('Response structure:', response);

//           // Vérifie si le token est directement dans la réponse
//           if (response.token) {
//             console.log('Token:', response.token);
//             localStorage.setItem("token", response.token); // Stocke le token dans le localStorage
//             // Navigation vers la page "/dashbord" après une connexion réussie
//             this.router.navigateByUrl("/dashboard");
//           } 
//           // Sinon, vérifie si le token est dans une structure de données imbriquée
//           else if (response.data && response.data.token) { 
//             console.log('Token in data:', response.data.token);
//             localStorage.setItem("token", response.data.token); // Stocke le token dans le localStorage
//             this.router.navigateByUrl("/inscription_user"); // Navigation vers la page d'inscription utilisateur
//           } 
//           // Si aucun token n'est trouvé, affiche une erreur dans la console
//           else {
//             console.error('No token in the response');
//           }
//         },
//         (error: any) => {
//           // Gestion des erreurs lors de la tentative de connexion
//           console.error('Error during login:', error);
//         }
//       );
//     }
//   }



//   // logout() {
//   //   this.authService.logout().subscribe(
//   //     (response: any) => {
//   //       console.log(response);
//   //       localStorage.removeItem('access_token');
//   //       localStorage.removeItem('user');
//   //       this.router.navigateByUrl('/login');
//   //     },
//   //     (error: any) => {
//   //       console.error(error);
//   //     }
//   //   );
//   // }
// }


import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../Models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
// Ajout d'une propriété pour stocker le message d'erreur
errorMessage: string = '';

  constructor(private authService: AuthService) { }

  private router = inject(Router);

  userObjet: UserModel = {
    email: '',
    password: ''
  };

  connexion() {
    console.log(this.userObjet);
// Réinitialise le message d'erreur avant chaque connexion
    this.errorMessage = ''

    // Vérifie que les champs email et password ne sont pas vides

    if (this.userObjet.email && this.userObjet.password) {
      const loginData = {
        email: this.userObjet.email,
        password: this.userObjet.password
      };
this.authService.login(this.userObjet).subscribe(
        (response: any) => {
          console.log('Response structure:', response);
          // Vérifie si le token est présent dans la réponse

          if (response.token) {
            console.log('Token:', response.token);
            localStorage.setItem("token", response.token);

                        // Redirection en fonction du rôle de l'utilisateur

            // if(response.role =='client'){
            //   this.router.navigateByUrl("/produit");
            // }
            // else if(response.role = 'admin'){
            //    this.router.navigateByUrl("/dashboard");
            // }
            // else if(response.role = 'representant'){
            //   this.router.navigateByUrl("/dashboardrepresentant");

            // }
            if (response.role === 'client') {
              console.log('Redirection vers /produit');
              this.router.navigateByUrl("/produit");
            } else if (response.role === 'admin') {
              console.log('Redirection vers /dashboard');
              this.router.navigateByUrl("/dashboard");
            } else if (response.role === 'representant') {
              console.log('Redirection vers /dashboardrepresentant');
              this.router.navigateByUrl("/dashboardrepresentant");
            }
            



          } else if (response.data && response.data.token) {
            console.log('Token in data:', response.data.token);
            localStorage.setItem("token", response.data.token);
            this.router.navigateByUrl("/inscription_user");
          } else {
            console.error('Aucun token dans la réponse');
          }
        },
        (error: any) => {
          console.error('Erreur lors de la connexion :', error);
          this.errorMessage = 'Erreur d\'authentification : email ou mot de passe incorrect.'; // Ajout du message d'erreur
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.'; // Message si les champs sont vides
    }
      
    }
  

 
}
