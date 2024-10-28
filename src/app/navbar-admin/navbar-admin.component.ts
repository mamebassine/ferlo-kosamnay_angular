import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  notifications: any[] = []; // Tableau pour stocker les notifications
  notificationCount: number = 0; // Compteur pour les notifications
  
  ngOnInit(): void {
    this.loadNotifications(); // Charger les notifications à l'initialisation
  }

  loadNotifications(): void {
    this.notificationService.getAllNotifications().subscribe(
      data => {
        this.notifications = data.data; // Assurez-vous que vous accédez aux données correctement
        this.notificationCount = this.notifications.length; // Mettre à jour le compteur de notifications
      },
      error => {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    );
  }

  showModal: boolean = false; // Ajouter une propriété pour gérer l'état du modal

openNotificationsModal(): void {
    this.showModal = true; // Ouvrir le modal
}

closeNotificationsModal(): void {
    this.showModal = false; // Fermer le modal
}






  logout(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Aucun token trouvé, impossible de déconnecter.');
      return;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }

  
}
