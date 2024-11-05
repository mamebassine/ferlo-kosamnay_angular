import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component";


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  standalone: true, 
  imports: [CommonModule, NavbarAdminComponent], 
})
export class CommandeComponent implements OnInit {
  commandes: any[] = []; // Déclaration d'un tableau pour stocker les commandes

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadCommandes(); // Appel de la méthode pour charger les commandes
  }

  onCardClick(commande: any): void {
    console.log(`Carte cliquée pour la commande ID: ${commande.id}`);
  }


  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      // Ajoutez votre logique de suppression ici
      this.commandes = this.commandes.filter(commande => commande.id !== id);
      console.log('Commande supprimée:', id);
    }
  }
  
  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe(
      (data) => {
        this.commandes = data; // Stockage des données récupérées
        console.log(this.commandes);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes', error); // Gestion des erreurs
      }
    );
  }
}
