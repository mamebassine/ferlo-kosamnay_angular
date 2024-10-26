import { Component, inject } from '@angular/core'; 
import { AuthService } from '../../services/auth.service'; 
import { UserModel } from '../../Models/user.model'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AlertShowMessage } from '../../services/alertMessage'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register', 
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router); 

  userObject: UserModel = {
    nom_complet: '', 
    telephone: '', 
    email: '', 
    adresse: '', 
    password: '', 
    password_confirmation: '' 
  };

  alertMessage: string = "";
  errorMessages: any = {
    nom_complet: '',
    telephone: '',
    email: '',
    adresse: '',
    password: '',
    password_confirmation: ''
  };

  register() {
    // Réinitialiser les messages d'erreur
    this.errorMessages = {
      nom_complet: '',
      telephone: '',
      email: '',
      adresse: '',
      password: '',
      password_confirmation: ''
    };

    // Vérifie si tous les champs requis sont remplis
    if (!this.userObject.nom_complet) {
      this.errorMessages.nom_complet = "Le nom complet est requis.";
    }
    if (!this.userObject.telephone) {
      this.errorMessages.telephone = "Le numéro de téléphone est requis.";
    } else if (!/^\d{9,}$/.test(this.userObject.telephone)) { // Vérifie que le numéro de téléphone est valide
      this.errorMessages.telephone = "Numéro de téléphone invalide.";
    }
    if (!this.userObject.email) {
      this.errorMessages.email = "L'email est requis.";
    }
    if (!this.userObject.adresse) {
      this.errorMessages.adresse = "L'adresse est requise.";
    }
    if (!this.userObject.password) {
      this.errorMessages.password = "Le mot de passe est requis.";
    }
    if (this.userObject.password !== this.userObject.password_confirmation) {
      this.errorMessages.password_confirmation = "Les mots de passe ne correspondent pas.";
    }

    // Si des erreurs existent, ne pas soumettre le formulaire
    if (Object.values(this.errorMessages).some(msg => msg)) {
      AlertShowMessage("alert-danger");
      return;
    }

    console.log(this.userObject);
    
    this.authService.signup(this.userObject).subscribe(
      (response: any) => {
        console.log('Réponse du serveur :', response); 
        this.router.navigate(['/login']); 
        this.alertMessage = "Inscription réussie !";
        AlertShowMessage("alert-success"); 
      },
      (error: any) => {
        this.alertMessage = error.error.message || "Erreur lors de l'inscription";
        AlertShowMessage("alert-danger");
      }
    );
  }
}
