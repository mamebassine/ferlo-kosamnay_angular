import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from  './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser(); // Récupère l'utilisateur connecté
    if (user && user.role === 'admin') { // Vérifie si l'utilisateur est un administrateur
      return true; // Autorise l'accès
    } else {
      this.router.navigate(['/login']); // Redirige vers la page de connexion si non autorisé
      return false;
    }
  }
}
