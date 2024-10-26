

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { RouterModule } from '@angular/router'; 
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-representant-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule,  RouterModule,],
  templateUrl: './representant-dashboard.component.html',
  styleUrls: ['./representant-dashboard.component.css']
})
export class RepresentantDashboardComponent implements OnInit {
  private authService = inject(AuthService);

  activeLink = 'accueil';
  notifications: any[] = [];
  showModal = false;
  
  cards = [
    { title: 'Commandes Reçues', value: '12' },
    { title: 'Commandes Traitées', value: '8' },
    { title: 'Commandes en Attente', value: '4' }
  ];

  receivedEmails: any[] = [];

  constructor(private http: HttpClient, private router: Router, private notificationsService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationsService.getAllNotifications().subscribe(
      data => {
        this.notifications = data.data; // Extraire le tableau de notifications
        console.log('Notifications récupérées:', this.notifications);
      },
      error => {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    );
  }
  

  setActiveLink(link: string): void {
    this.activeLink = link;
  }


  cardClicked(card: any) {
    this.activeLink = 'commandes';

    console.log('Changement de lien actif à :', this.activeLink); 
  }




  openNotificationsModal(): void {
    this.showModal = true;
  }

  closeNotificationsModal(): void {
    this.showModal = false;
  }
   

  logout(): void {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Aucun token trouvé, impossible de déconnecter.');
      return;
    } else {
      console.log('Déconnexion en cours...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
      console.log('Déconnexion réussie, redirection vers la page de connexion.');
    }
  }
  
}
