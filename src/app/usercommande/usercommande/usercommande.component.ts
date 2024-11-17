import { Component } from '@angular/core';


import { CommandeService } from '../../services/commande.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header/header.component";
import { FooterComponent } from "../../footer/footer/footer.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-usercommande',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './usercommande.component.html',
  styleUrls: ['./usercommande.component.css'],
})
export class UserCommandeComponent {
  commandes: any[] = []; // Tableau pour stocker les commandes de l'utilisateur

  constructor(private commandeService: CommandeService,
    private router: Router
  ) {}

ngOnInit(): void {
    this.loadMesCommandes(); // Charger les commandes de l'utilisateur
  }

  // loadMesCommandes(): void {
  //   this.commandeService.getMesCommandes().subscribe(
  //     (data) => {
  //       this.commandes = data; // Stockage des commandes de l'utilisateur
  //       console.log('Mes commandes:', this.commandes);
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des commandes de l’utilisateur', error);
  //     }
  //   );
  // }

  

    // Charger les commandes

  loadMesCommandes(): void {
    this.commandeService.getMesCommandes().subscribe(
      (data) => {
        this.commandes = data; 
        console.log('Mes commandes:', this.commandes); // Vérifiez les données reçues
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes de l’utilisateur', error);
      }
    );
  }
  onCardClick(commande: any): void {
    console.log(`Carte cliquée pour la commande ID: ${commande.id}`);
  }
  voirDetail(commande: any): void {
    console.log('Commande ID:', commande.id); // Vérifiez si vous obtenez bien l'ID ici
    this.router.navigate(['/uservoirdetailcommande', commande.id]);
  }
  
  

  supprimerCommande(commandeId: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
      this.commandeService.supprimerCommande(commandeId).subscribe(
        () => {
          console.log(`Commande ID ${commandeId} supprimée avec succès.`);
          this.commandes = this.commandes.filter(c => c.id !== commandeId); // Retirer la commande supprimée du tableau
        },
        (error) => {
          console.error(`Erreur lors de la suppression de la commande ID ${commandeId}`, error);
        }
      );
    }
  }
  
  }
   




