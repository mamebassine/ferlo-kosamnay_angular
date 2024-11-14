import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { forkJoin } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { CommandeService } from '../../../services/commande.service';
@Component({
  selector: 'app-representant-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, HttpClientModule],
  templateUrl: './representant-dashboard.component.html',
  styleUrls: ['./representant-dashboard.component.css']
})
export class RepresentantDashboardComponent implements OnInit {
  private authService = inject(AuthService);

  activeLink = 'accueil';
  notifications: any[] = [];
  showModal = false;

  commandes: any[] = [];

  
  cards = [
    { title: 'Commandes Reçues', value: 0 },
    { title: 'Commandes Livrées', value: 0 },
    { title: 'Commandes Annulées', value: 0 }
  ];

  constructor(private http: HttpClient,
              private router: Router, 
              private notificationsService: NotificationService,
              private commandeService: CommandeService) { }

  ngOnInit(): void {
    console.log("Chargement des notifications et statistiques...");
    this.loadNotifications();
    this.fetchStatistiques();
    this.loadCommandes(); // Charge les commandes ici pour les afficher sur le dashboard

  }
  
  // Fonction de récupération des notifications
  loadNotifications(): void {
    console.log('Chargement des notifications...');
    this.notificationsService.getAllNotifications().subscribe(
      data => {
        console.log('Données de l\'API reçues:', data);
  
        // Vérifiez que `data.data` existe et est un tableau
        if (data && Array.isArray(data.data)) {
          this.notifications = data.data;  // Extraire le tableau de notifications
          console.log('Notifications récupérées:', this.notifications);
  
          // Mettre à jour les cartes avec les statistiques
          this.updateCardsStatistics(data.data);
        } else {
          console.error('Les données de l\'API sont mal formées', data);
        }
      },
      error => {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    );
  }
  



  // Ajout de la méthode updateCardsStatistics
  updateCardsStatistics(notificationsData: any[]): void {
    console.log('Mise à jour des statistiques des notifications...');
    // Exemple de logique pour compter le nombre de notifications par type
    const commandesRecues = notificationsData.filter(notification => notification.type === 'recu').length;
    const commandesLivrees = notificationsData.filter(notification => notification.type === 'livree').length;
    const commandesAnnulees = notificationsData.filter(notification => notification.type === 'annulee').length;

    console.log('Statistiques mises à jour :', commandesRecues, commandesLivrees, commandesAnnulees);

    // Met à jour les valeurs dans le tableau `cards`
    // this.cards[0].value = commandesRecues;
    // this.cards[1].value = commandesLivrees;
    // this.cards[2].value = commandesAnnulees;
  }

  fetchStatistiques(): void {
    console.log('Chargement des statistiques des commandes...');
    // Récupérer les statistiques des commandes en attente
    this.notificationsService.getCommandesEnAttente().subscribe(
      data => {
        console.log('Statistiques des commandes en attente reçues:', data);
        // Vérifiez que `data.total` existe avant de mettre à jour la carte
        if (data && data.total !== undefined) {
          this.cards[0].value = data.total;
        } else {
          console.error('Données invalides pour les commandes en attente');
        }
      },
      error => console.error('Erreur lors de la récupération des commandes en attente:', error)
    );
  
    // Récupérer les statistiques des commandes livrées
    this.notificationsService.getCommandesLivrees().subscribe(
      data => {
        console.log('Statistiques des commandes livrées reçues:', data);
        if (data && data.total !== undefined) {
          this.cards[1].value = data.total;
        } else {
          console.error('Données invalides pour les commandes livrées');
        }
      },
      error => console.error('Erreur lors de la récupération des commandes livrées:', error)
    );
  
    // Récupérer les statistiques des commandes en cours
    this.notificationsService.getCommandesEnCours().subscribe(
      data => {
        console.log('Statistiques des commandes en cours reçues:', data);
        if (data && data.total !== undefined) {
          this.cards[2].value = data.total;
        } else {
          console.error('Données invalides pour les commandes en cours');
        }
      },
      error => console.error('Erreur lors de la récupération des commandes en cours:', error)
    );
  }
  
  setActiveLink(link: string): void {
    console.log('Changement de lien actif à :', link);
    this.activeLink = link;
  }

  cardClicked(card: any) {
    this.activeLink = 'commandes';
    console.log('Changement de lien actif à :', this.activeLink); 
  }

  openNotificationsModal(): void {
    this.showModal = true;
    console.log('Modal des notifications ouverte');
  }

  closeNotificationsModal(): void {
    this.showModal = false;
    console.log('Modal des notifications fermée');
  }



  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.commandes = this.commandes.filter(commande => commande.id !== id);
      console.log('Commande supprimée:', id);
    }
  }


  
  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe(
      (data) => {
        this.commandes = data;
        console.log('Commandes récupérées:', this.commandes);
        console.log('Image produit:', this.commandes[0]?.produit_boutique.produit.image);  // Vérifiez si l'URL de l'image est bien là
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes', error);
      }
    );
  }
  


  onVoirDetail(commande: any): void {
    // Logique pour rediriger vers la page de détail de la commande
    console.log('Voir Détail de la commande:', commande);
    this.router.navigate(['/voirdetailcommandes', commande.id]); // Rediriger vers /commande-detail/:id
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
