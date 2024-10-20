import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { AuthService } from '../../services/auth.service';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component";

interface Card {
  title: string;
  value: string | number;
  color: string;
  position: string;
}

interface LigneCommande {
  id?: number;
  produit_boutique_id: number;
  user_id: number;
  date: string;
  statut: string;
  quantite_totale: number;
  prix_totale: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarAdminComponent], // Include RouterModule here
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cards: Card[] = [];
  lignesCommandes: LigneCommande[] = [];
  
  errorMessage: string | null = null;

  private router = inject(Router);
  private authService = inject(AuthService);
  private ligneCommandeService = inject(LigneCommandeService);

  ngOnInit(): void {
    // Mise à jour du tableau des cartes avec les informations demandées en français
    this.cards = [
      { title: 'Voir Toutes les Ventes', value: '1500', color: '#007bff', position: 'top-left' },
      { title: 'Produits les Mieux Vendus', value: 'Lait', color: '#dc3545', position: 'top-right' },
      { title: 'Nombre de Produits sur le Site', value: 200, color: '#28a745', position: 'bottom-left' },
      { title: 'Produits Restants', value: 50, color: '#ffc107', position: 'bottom-right' }
    ];
  
    this.loadLignesCommandes();
  }
  

  loadLignesCommandes(): void {
    this.ligneCommandeService.getLignesCommandes().subscribe(
      (data) => {
        // this.lignesCommandes = data;
      },
      (error: any) => {
        // this.errorMessage = 'Erreur lors de la récupération des lignes de commande.';
      }
    );
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

  deleteLigneCommande(id: number): void {
    // Implémentez la logique pour supprimer la ligne de commande ici
    this.ligneCommandeService.deleteLigneCommande(id).subscribe(
      () => {
        this.loadLignesCommandes(); // Recharger les lignes de commande après la suppression
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Erreur lors de la suppression de la ligne de commande.';
      }
    );
  }
}
