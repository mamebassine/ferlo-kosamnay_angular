import { Component } from '@angular/core';


import { CommandeService } from '../../services/commande.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header/header.component";
import { FooterComponent } from "../../footer/footer/footer.component";
@Component({
  selector: 'app-usercommande',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './usercommande.component.html',
  styleUrls: ['./usercommande.component.css'],
})
export class UserCommandeComponent {
  commandes: any[] = []; // Tableau pour stocker les commandes de l'utilisateur

  constructor(private commandeService: CommandeService) {}

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
  // Define the onCardClick method
  onCardClick(commande: any): void {
    console.log(`Carte cliquée pour la commande ID: ${commande.id}`);
  }
}


