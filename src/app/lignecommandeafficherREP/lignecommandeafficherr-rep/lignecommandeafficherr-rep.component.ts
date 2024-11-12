// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-lignecommandeafficherr-rep',
//   standalone: true,
//   imports: [],
//   templateUrl: './lignecommandeafficherr-rep.component.html',
//   styleUrl: './lignecommandeafficherr-rep.component.css'
// })
// export class LignecommandeafficherrREPComponent {

// }
import { Component, OnInit } from '@angular/core';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component"; 
import { NavbarRepresentComponent } from '../../navbar-represent/navbar-represent/navbar-represent.component';



interface LigneCommande {
  id?: number;
  user_id: number;
  date: string;
  statut: string;
  quantite_totale: number;
  prix_totale: number;
}

@Component({
  selector: 'app-lignecommandeafficherr-rep',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarRepresentComponent],
  templateUrl: './lignecommandeafficherr-rep.component.html',
  styleUrls: ['./lignecommandeafficherr-rep.component.css']
})
export class LignecommandeafficherrREPComponent implements OnInit {
  lignesCommandes: LigneCommande[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;


  constructor(private ligneCommandeService: LigneCommandeService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit: Composant chargé, préparation pour charger les lignes de commande.');
    this.loadLignesCommandes();
  }

  // Charger toutes les lignes de commande
  loadLignesCommandes(): void {
    console.log('loadLignesCommandes: Chargement des lignes de commande...');
    this.ligneCommandeService.getLignesCommandes().subscribe(
      (data) => {
        console.log('Réponse de l\'API:', data);
        this.lignesCommandes = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des lignes de commande', error);
        this.errorMessage = error.message || 'Erreur lors de la récupération des lignes de commande.';
        this.successMessage = null; // Réinitialisation du message de succès

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
      this.successMessage = 'Ligne de commande supprimée avec succès.';
      this.errorMessage = null; // Réinitialisation du message d'erreur

      // Masquer le message de succès après 1 seconde
      setTimeout(() => {
        this.successMessage = null;
      }, 1000);
    },
    (error: any) => {
      console.error(`Erreur lors de la suppression de la ligne de commande avec ID: ${id}`, error);
      this.errorMessage = 'Erreur lors de la suppression de la ligne de commande.';
      this.successMessage = null; // Réinitialisation du message de succès
    }
  );
}

confirmDeleteLigneCommande(id: number): void {
  const confirmation = window.confirm("Voulez-vous vraiment supprimer cette ligne de commande ?");
  if (confirmation) {
    this.deleteLigneCommande(id);  // Si l'utilisateur confirme, on procède à la suppression
  }
}
}
  

