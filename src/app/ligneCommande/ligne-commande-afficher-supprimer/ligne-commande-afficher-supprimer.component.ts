import { Component, OnInit } from '@angular/core';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface LigneCommande {
  id?: number;
  produit_boutique_id: number;
  user_id: string;
  date: string;
  statut: string;
  quantite_totale: number;
  prix_totale: number;
}

@Component({
  selector: 'app-ligne-commande-afficher-supprimer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ligne-commande-afficher-supprimer.component.html',
  styleUrls: ['./ligne-commande-afficher-supprimer.component.css']
})
export class LigneCommandeAfficherSupprimerComponent implements OnInit {
  lignesCommandes: LigneCommande[] = [];
  errorMessage: string | null = null;

  constructor(private ligneCommandeService: LigneCommandeService) {}

  ngOnInit(): void {
    console.log('ngOnInit: Composant chargé, préparation pour charger les lignes de commande.');
    this.loadLignesCommandes();
  }

  // Charger toutes les lignes de commande
  loadLignesCommandes(): void {
    console.log('loadLignesCommandes: Chargement des lignes de commande...');
    this.ligneCommandeService.getLignesCommandes().subscribe(
      (data: LigneCommande[]) => {
        console.log('loadLignesCommandes: Lignes de commande chargées avec succès.', data);
        this.lignesCommandes = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des lignes de commande', error);
        console.log('loadLignesCommandes: Lignes pas vu.');

        this.errorMessage = 'Erreur lors de la récupération des lignes de commande.';
      }
    );
  }

  // Supprimer une ligne de commande
  deleteLigneCommande(id: number): void {
    console.log(`deleteLigneCommande: Tentative de suppression de la ligne de commande avec ID: ${id}`);
    this.ligneCommandeService.deleteLigneCommande(id).subscribe(
      () => {
        console.log(`deleteLigneCommande: Ligne de commande avec ID: ${id} supprimée avec succès.`);
        this.loadLignesCommandes(); // Recharger la liste après suppression
      },
      (error: any) => {
        console.error(`Erreur lors de la suppression de la ligne de commande avec ID: ${id}`, error);
        this.errorMessage = 'Erreur lors de la suppression de la ligne de commande.';
      }
    );
  }
}
