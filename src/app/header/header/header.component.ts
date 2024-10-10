import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Pour gérer la navigation
// import { AuthService } from '../services/auth.service';  // Chemin à adapter selon ton projet

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }



  // isLoggedIn: boolean = false;

  // constructor(private authService: AuthService) {
  //   // Vérifie si l'utilisateur est connecté au chargement du composant
  //   this.isLoggedIn = this.authService.isAuthenticated();
  // }

  // logout() {
  //   this.authService.logout();
  //   // Redirection ou actualisation après la déconnexion
  //   // this.router.navigate(['/']);  // Exemple de redirection
  // }
}

