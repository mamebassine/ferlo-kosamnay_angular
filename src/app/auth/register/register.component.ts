// // Importation des modules et services nécessaires depuis Angular et les services personnalisés
// import { Component, inject } from '@angular/core'; // Importation du décorateur Component et de la fonction inject
// import { AuthService } from '../../services/auth.service'; // Nouveau code
// import { UserModel } from '../../Models/user.model'; // Importation du modèle d'utilisateur
// import { FormsModule } from '@angular/forms'; // Importation du module de formulaires Angular
// import { CommonModule } from '@angular/common'; // Importation du module commun d'Angular
// import { AlertShowMessage } from '../../services/alertMessage'; // Importation du service de messages d'alerte personnalisé


// // Définition du composant RegisterComponent avec son sélecteur, ses imports, son template et ses styles
// @Component({
//   selector: 'app-register', // Sélecteur utilisé dans le HTML pour intégrer ce composant
//   standalone: true, // Indique que le composant est autonome et peut être utilisé sans module parent
//   imports: [CommonModule, FormsModule], // Modules importés pour ce composant
//   templateUrl: './register.component.html', // Chemin vers le fichier template HTML du composant
//   styleUrls: ['./register.component.css'] // Chemin vers le fichier CSS du composant
// })
// export class RegisterComponent {

//   // Injection du service d'authentification via la fonction inject d'Angular
//   authService = inject(AuthService);

//   // Déclaration des variables utilisées dans le composant

//   // Objet utilisateur initialisé avec des valeurs vides
//   userObject: UserModel = {
//     nom_complet: '', 
//     telephone: '', 
//     email: '', 
//     password: '', 
//     password_confirmation: '' 
//   };

//   // Message d'alerte pour afficher les erreurs ou informations à l'utilisateur
//   alertMessage: string = "";

//   // Méthode appelée lors de la soumission du formulaire d'inscription
//   register() {
//     // Vérifie si tous les champs requis sont remplis
//     if (!this.userObject.nom_complet || !this.userObject.telephone || !this.userObject.email || !this.userObject.password || !this.userObject.password_confirmation) {
//       // Si un champ est vide, affiche un message d'alerte d'erreur
//       this.alertMessage = "Veuillez remplir les champs";
//       AlertShowMessage("alert-danger"); // Appel au service pour afficher l'alerte
//     } else {
//       // Si tous les champs sont remplis, affiche l'objet utilisateur dans la console pour le débogage
//       console.log(this.userObject);
      
//       // Appelle la méthode signup du service d'authentification en passant l'objet utilisateur
//       this.authService.signup(this.userObject).subscribe(
//         (response: any) => {
//           // Si la requête est réussie, affiche la réponse dans la console
//           console.log(response);
//           // Ici rediriger l'utilisateur ok
//         },
//             // this.router.navigateByUrl("/portail");

//                 // // Redirige l'utilisateur vers la page de connexion
//                 // this.router.navigate(['/login']); // Redirection vers la route 'login'
                          
//                 // // Affiche un message de succès (optionnel)
//                 // this.alertMessage = "Inscription réussie !";
//                 // AlertShowMessage("alert-success"); // Message d'alerte pour succès
//                 // },

//         (error: any) => {
//           // Si la requête échoue, affiche l'erreur dans la console
//           // console.error('Erreur lors de l\'inscription', error);
//           // Met à jour le message d'alerte avec le message d'erreur reçu du serveur ou un message générique
//           this.alertMessage = error.error.message || "Erreur lors de l'inscription";
//           // Appel au service pour afficher l'alerte d'erreur
//           AlertShowMessage("alert-danger");
//           console.log(this.userObject);          
//         }
//       );
//     }
//   }
// }






// Importation des modules et services nécessaires depuis Angular et les services personnalisés
import { Component, inject } from '@angular/core'; // Importation du décorateur Component et de la fonction inject
import { AuthService } from '../../services/auth.service'; // Nouveau code
import { UserModel } from '../../Models/user.model'; // Importation du modèle d'utilisateur
import { FormsModule } from '@angular/forms'; // Importation du module de formulaires Angular
import { CommonModule } from '@angular/common'; // Importation du module commun d'Angular
import { AlertShowMessage } from '../../services/alertMessage'; // Importation du service de messages d'alerte personnalisé
import { Router } from '@angular/router'; // Importation du service Router d'Angular pour la redirection


// Définition du composant RegisterComponent avec son sélecteur, ses imports, son template et ses styles
@Component({
  selector: 'app-register', // Sélecteur utilisé dans le HTML pour intégrer ce composant
  standalone: true, // Indique que le composant est autonome et peut être utilisé sans module parent
  imports: [CommonModule, FormsModule], // Modules importés pour ce composant
  templateUrl: './register.component.html', // Chemin vers le fichier template HTML du composant
  styleUrls: ['./register.component.css'] // Chemin vers le fichier CSS du composant
})
export class RegisterComponent {

  // Injection du service d'authentification et du service Router
  authService = inject(AuthService);
  router = inject(Router); // Injecter Router ici

  // Déclaration des variables utilisées dans le composant

  // Objet utilisateur initialisé avec des valeurs vides
  userObject: UserModel = {
    nom_complet: '', 
    telephone: '', 
    email: '', 
    adresse: '', 
    password: '', 
    password_confirmation: '' 
  };

  // Message d'alerte pour afficher les erreurs ou informations à l'utilisateur
  alertMessage: string = "";

  // Méthode appelée lors de la soumission du formulaire d'inscription
  register() {
    // Vérifie si tous les champs requis sont remplis
    if (!this.userObject.nom_complet || !this.userObject.telephone || !this.userObject.email|| !this.userObject.adresse || !this.userObject.password || !this.userObject.password_confirmation) {
      // Si un champ est vide, affiche un message d'alerte d'erreur
      this.alertMessage = "Veuillez remplir les champs";
      AlertShowMessage("alert-danger"); // Appel au service pour afficher l'alerte
    } else {
      // Si tous les champs sont remplis, affiche l'objet utilisateur dans la console pour le débogage
      console.log(this.userObject);
      
      // Appelle la méthode signup du service d'authentification en passant l'objet utilisateur
      this.authService.signup(this.userObject).subscribe(
        (response: any) => {
          // Si la requête est réussie, affiche la réponse dans la console
          console.log('Réponse du serveur :', response); // Vérifiez la réponse

          // Redirige l'utilisateur vers la page de connexion
          this.router.navigate(['/login']); // Redirection vers la route 'login'

          // Affiche un message de succès (optionnel)
          this.alertMessage = "Inscription réussie !";
          AlertShowMessage("alert-success"); // Message d'alerte pour succès
          console.log(this.userObject);          

        },
        (error: any) => {
          // Si la requête échoue, affiche l'erreur dans la console
          // console.error('Erreur lors de l\'inscription', error);
          // Met à jour le message d'alerte avec le message d'erreur reçu du serveur ou un message générique
          this.alertMessage = error.error.message || "Erreur lors de l'inscription";
          // Appel au service pour afficher l'alerte d'erreur
          AlertShowMessage("alert-danger");
          console.log(this.userObject);          
        }
      );
    }
  }
}
