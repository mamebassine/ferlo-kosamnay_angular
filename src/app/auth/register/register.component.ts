// import { Component, inject } from '@angular/core'; 
// import { AuthService } from '../../services/auth.service'; 
// import { UserModel } from '../../Models/user.model'; 
// import { FormsModule } from '@angular/forms'; 
// import { CommonModule } from '@angular/common'; 
// import { AlertShowMessage } from '../../services/alertMessage'; 
// import { Router } from '@angular/router'; 

// @Component({
//   selector: 'app-register', 
//   standalone: true, 
//   imports: [CommonModule, FormsModule], 
//   templateUrl: './register.component.html', 
//   styleUrls: ['./register.component.css'] 
// })
// export class RegisterComponent {
//     // Injection des services nécessaires pour l'authentification et la navigation

//   authService = inject(AuthService);
//   router = inject(Router); 

//   userObject: UserModel = {
//     nom_complet: '', 
//     telephone: '', 
//     email: '', 
//     adresse: '', 
//     password: '', 
//     password_confirmation: '' 
//   };

//   alertMessage: string = "";
//   errorMessages: any = {
//     nom_complet: '',
//     telephone: '',
//     email: '',
//     adresse: '',
//     password: '',
//     password_confirmation: ''
//   };

//   register() {
//     // Réinitialiser les messages d'erreur
//     this.errorMessages = {
//       nom_complet: '',
//       telephone: '',
//       email: '',
//       adresse: '',
//       password: '',
//       password_confirmation: ''
//     };

//     // Vérifie si tous les champs requis sont remplis
//     if (!this.userObject.nom_complet) {
//       this.errorMessages.nom_complet = "Le nom complet est requis.";
//     }
//     if (!this.userObject.telephone) {
//       this.errorMessages.telephone = "Le numéro de téléphone est requis.";
//     } else if (!/^\d{9,}$/.test(this.userObject.telephone)) { // Vérifie que le numéro de téléphone est valide
//       this.errorMessages.telephone = "Numéro de téléphone invalide.";
//     }
//     if (!this.userObject.email) {
//       this.errorMessages.email = "L'email est requis.";
//     }
//     if (!this.userObject.adresse) {
//       this.errorMessages.adresse = "L'adresse est requise.";
//     }
//     if (!this.userObject.password) {
//       this.errorMessages.password = "Le mot de passe est requis.";
//     }
//     if (this.userObject.password !== this.userObject.password_confirmation) {
//       this.errorMessages.password_confirmation = "Les mots de passe ne correspondent pas.";
//     }

//     // Si des erreurs existent, ne pas soumettre le formulaire
//     if (Object.values(this.errorMessages).some(msg => msg)) {
//       AlertShowMessage("alert-danger");
//       return;
//     }

//     console.log(this.userObject);
    
//     this.authService.signup(this.userObject).subscribe(
//       (response: any) => {
//         console.log('Réponse du serveur :', response); 
//         this.router.navigate(['/login']); 
//         this.alertMessage = "Inscription réussie !";
//         AlertShowMessage("alert-success"); 
//       },
//       (error: any) => {
//         this.alertMessage = error.error.message || "Erreur lors de l'inscription";
//         AlertShowMessage("alert-danger");
//       }
//     );
//   }
// }




import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertShowMessage } from '../../services/alertMessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Injection des services nécessaires pour l'authentification et la navigation
  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  // Déclaration du formulaire de type FormGroup
  signupForm: FormGroup;
  alertMessage: string = '';
  formSubmitted: boolean = false; // Assurez-vous que cette ligne est présente


  constructor() {
    // Initialisation du formulaire avec les contrôles et leurs validations
    this.signupForm = this.formBuilder.group({
      nom_complet: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],         
      email: ['', [Validators.required, Validators.email]], // Ajout du champ email
      adresse: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],  
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    }, { validator: this.passwordMatchValidator }); // Application du validateur pour les mots de passe
  }

  // Validateur personnalisé pour vérifier si le mot de passe et sa confirmation sont identiques
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Méthode raccourcie pour accéder aux contrôles du formulaire dans le template
  get f() { return this.signupForm.controls; }

  // Méthode pour gérer la soumission du formulaire
  register() {
    this.formSubmitted = true; // Indique que le formulaire a été soumis



    // Vérification de la validité du formulaire avant soumission
    if (this.signupForm.invalid) {
      console.log('Formulaire invalide :', this.signupForm.errors); // Affiche les erreurs de validation
      AlertShowMessage("alert-danger");
      return;
    }

    // Envoi des données d'inscription
    console.log('Données d\'inscription :', this.signupForm.value); // Affiche les données à soumettre
    this.authService.signup(this.signupForm.value).subscribe(
      (response: any) => {
        console.log('Réponse du serveur :', response);
        this.router.navigate(['/login']); // Redirection vers la page de connexion après succès
        this.alertMessage = "Inscription réussie !";
        AlertShowMessage("alert-success");
      },
      (error: any) => {
        console.log('Erreur lors de l\'inscription :', error); // Affiche l'erreur reçue
        this.alertMessage = error.error.message || "Erreur lors de l'inscription";
        AlertShowMessage("alert-danger");
      }
    );
  }
}
