// src/app/components/header/header.component.ts
import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  
import { AuthService } from '../../services/auth.service';  // Chemin à adapter selon votre projet
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  cartItemCount = 0;
  
  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {
    // Vérifie si l'utilisateur est connecté au chargement du composant
    this.isLoggedIn = this.authService.isAuthenticated();
  }
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']); // Redirection après la déconnexion
  }
}
