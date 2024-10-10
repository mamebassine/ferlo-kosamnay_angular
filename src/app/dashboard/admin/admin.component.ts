import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Import AdminService when you're ready to use it
// import { AdminService } from '../../services/admin.service';

// Interface for Card structure
interface Card {
  title: string;
  value: string | number;
  color: string;
  position: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cards: Card[] = [];
  private router = inject(Router)
  private authService = inject(AuthService)

  ngOnInit(): void {
    // Initialize sample card data
    this.cards = [
      { title: 'Total Users', value: 1000, color: '#007bff', position: 'top-left' },
      { title: 'Active Orders', value: 500, color: '#dc3545', position: 'top-right' },
      { title: 'Revenue', value: '$10,000', color: '#28a745', position: 'bottom-left' },
      { title: 'New Products', value: 50, color: '#ffc107', position: 'bottom-right' }
    ];
  }
  logout(): void {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Aucun token trouvé, impossible de déconnecter.');
      return; // Arrêtez la méthode si aucun token n'est présent
    }
  else{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
    // this.authService.logout().subscribe(
    //   () => {
    //     localStorage.removeItem('token');
    //     this.router.navigate(['/login']);
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error('Erreur de déconnexion', error);
    //     alert('Erreur lors de la déconnexion. Veuillez réessayer.'); // Notification d'erreur à l'utilisateur
    //   }
    // );
  }
  
  
  
  
}
