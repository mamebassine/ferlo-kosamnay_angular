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
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  private router = inject(Router);

  userObjet: UserModel = {
    email: '',
    password: ''
  };

  connexion() {
    this.errorMessage = '';
    if (this.userObjet.email && this.userObjet.password) {
      const loginData = {
        email: this.userObjet.email,
        password: this.userObjet.password
      };

      this.authService.login(this.userObjet).subscribe(
        (response: any) => {
          if (response.token) {
            localStorage.setItem("token", response.token);

            // Vérifiez s'il y a une URL de redirection enregistrée
            const redirectUrl = this.authService.getRedirectUrl();
            if (redirectUrl) {
              this.router.navigateByUrl(redirectUrl);
              this.authService.clearRedirectUrl();
            } else {
              // Rediriger selon le rôle si aucune URL de redirection n'est enregistrée
              if (response.role === 'client') {
                this.router.navigateByUrl("/produit");
              } else if (response.role === 'admin') {
                this.router.navigateByUrl("/dashboard");
              } else if (response.role === 'representant') {
                this.router.navigateByUrl("/dashboardrepresentant");
              }
            }
          } else {
            console.error('Aucun token dans la réponse');
          }
        },
        (error: any) => {
          console.error('Erreur lors de la connexion :', error);
          this.errorMessage = 'Erreur d\'authentification : email ou mot de passe incorrect.';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }
}
