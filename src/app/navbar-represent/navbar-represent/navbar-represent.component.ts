import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbar-represent',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './navbar-represent.component.html',
  styleUrls: ['./navbar-represent.component.css']
})
export class NavbarRepresentComponent implements OnInit {
  private authService = inject(AuthService);

  activeLink = 'accueil';
  notifications: any[] = [];
  showModal = false;


  
  

  constructor(private http: HttpClient,
              private router: Router, 
              private notificationsService: NotificationService,
              ) { }

  ngOnInit(): void {
    console.log("Chargement des notifications et statistiques...");
    this.loadNotifications();


  }
  loadNotifications(): void {
    this.notificationsService.getAllNotifications().subscribe(
      (data: { status: boolean; data: any[] }) => { // Type explicite pour data
        this.notifications = data.data; // Ajustement selon votre structure de données
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des notifications :', error);
      }
    );
  }

  openNotificationsModal(): void {
    this.showModal = true;
  }

  closeNotificationsModal(): void {
    this.showModal = false;
  }



  
  onCardClick(commande: any): void {
    console.log(`Carte cliquée pour la commande ID: ${commande.id}`);
  }






  logout(): void {
    const token = localStorage.getItem('token');
    console.log('Tentative de déconnexion...');
  
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
