import { Component, OnInit } from '@angular/core';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// import { LigneCommandeService, LigneCommande } from '../ligne-commande.service';
// import { LigneCommandeService, LigneCommande } from './ligne-commandes.service';

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
  selector: 'app-ligne-commande-afficher-supprimer',
  standalone: true,
  imports:[CommonModule, RouterLink],
  templateUrl: './ligne-commande-afficher-supprimer.component.html',
  styleUrls: ['./ligne-commande-afficher-supprimer.component.css']
})
export class LigneCommandeAfficherSupprimerComponent implements OnInit {
  lignesCommandes: LigneCommande[] = [];
  newLigneCommande: LigneCommande = {
    produit_boutique_id: 0,
    user_id: 0,
    date: '',
    statut: '',
    quantite_totale: 0,
    prix_totale: 0
  };

  errorMessage: string | null = null; // Pour afficher les messages d'erreur

  constructor(private ligneCommandeService: LigneCommandeService) {}

  ngOnInit(): void {
    this.loadLignesCommandes();
  }

  // Charger toutes les lignes de commande
  loadLignesCommandes(): void {
    this.ligneCommandeService.getLignesCommandes().subscribe(
      (data: LigneCommande[]) => { // Préciser le type ici
        this.lignesCommandes = data;
      },
      (error: any) => { // Préciser le type ici
        console.error('Erreur lors de la récupération des lignes de commande', error);
        this.errorMessage = 'Erreur lors de la récupération des lignes de commande.';
      }
    );
  }

  // Ajouter une nouvelle ligne de commande
  addLigneCommande(): void {
    this.ligneCommandeService.createLigneCommande(this.newLigneCommande).subscribe(
      (data: LigneCommande) => { // Préciser le type ici
        this.lignesCommandes.push(data);
        this.resetNewLigneCommande();
        this.errorMessage = null; // Réinitialiser le message d'erreur en cas de succès
      },
      (error: any) => { // Préciser le type ici
        console.error('Erreur lors de la création de la ligne de commande', error);
        this.errorMessage = 'Une erreur est survenue lors de l\'ajout de la ligne de commande.';
      }
    );
  }

  // Mettre à jour une ligne de commande
  updateLigneCommande(ligneCommande: LigneCommande): void {
    if (ligneCommande.id) { // Vérifier si l'ID est présent
      this.ligneCommandeService.updateLigneCommande(ligneCommande.id, ligneCommande).subscribe(
        (data: LigneCommande) => { // Préciser le type ici
          const index = this.lignesCommandes.findIndex(l => l.id === data.id);
          if (index !== -1) {
            this.lignesCommandes[index] = data;
          }
        },
        (error: any) => { // Préciser le type ici
          console.error('Erreur lors de la mise à jour de la ligne de commande', error);
          this.errorMessage = 'Erreur lors de la mise à jour de la ligne de commande.';
        }
      );
    } else {
      this.errorMessage = 'ID de la ligne de commande non valide.';
    }
  }

  // Supprimer une ligne de commande
  deleteLigneCommande(id: number): void {
    this.ligneCommandeService.deleteLigneCommande(id).subscribe(
      () => {
        this.lignesCommandes = this.lignesCommandes.filter(l => l.id !== id);
      },
      (error: any) => { // Préciser le type ici
        console.error('Erreur lors de la suppression de la ligne de commande', error);
        this.errorMessage = 'Erreur lors de la suppression de la ligne de commande.';
      }
    );
  }

  // Réinitialiser le formulaire de nouvelle ligne de commande
  resetNewLigneCommande(): void {
    this.newLigneCommande = {
      produit_boutique_id: 0,
      user_id: 0,
      date: '',
      statut: '',
      quantite_totale: 0,
      prix_totale: 0
    };
  }
}
