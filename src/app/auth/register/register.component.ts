import { Component, inject } from '@angular/core';
import { UserService } from '../../services/auth.service';
import { UserModel } from '../../Models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertShowMessage } from '../../services/alertMessage';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  authService = inject(UserService);

  // Déclaration des variables
  userObject: UserModel = {
    nom_complet: '',
    telephone: '',
    email: '',
    password: '',
    password_confirmation: ''
  };
  alertMessage: string = "";

  // Déclaration des méthodes
  register() {
    if (!this.userObject.nom_complet || !this.userObject.telephone || !this.userObject.email || !this.userObject.password || !this.userObject.password_confirmation) {
      this.alertMessage = "Veuillez remplir les champs";
      AlertShowMessage("alert-danger");
    } else {
      console.log(this.userObject);
      this.authService.signup(this.userObject).subscribe(
        (response: any) => {
          console.log(response);
          // Afficher un message de succès ou rediriger l'utilisateur
        },
        (error: any) => {
          console.error('Erreur lors de l\'inscription', error);
          this.alertMessage = error.error.message || "Erreur lors de l'inscription";
          AlertShowMessage("alert-danger");
        }
      );
    }
  }
}
