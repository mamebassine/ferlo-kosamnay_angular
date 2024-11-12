import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  
import { AuthService } from '../../services/auth.service';  
import { CartService } from '../../services/cart.service';
import { CommandeService } from '../../services/commande.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  cartItemCount = 0;
  isMenuOpen: boolean = false; // État d'ouverture du menu
  
  isModalOpen: boolean = false;

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  
constructor(private authService: AuthService, private router: Router, private cartService: CartService) {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

 
 // Méthode pour ouvrir/fermer le menu
 toggleMenu(): void {
  this.isMenuOpen = !this.isMenuOpen;
}
  logout(): void {
    this.authService.logout();
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  // Méthode pour vérifier si le lien est actif
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  
}
