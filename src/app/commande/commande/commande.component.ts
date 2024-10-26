// src/app/commande/commande.component.ts
import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  standalone: true, 
  imports: [CommonModule], 
})
export class CommandeComponent implements OnInit {
  commandes: any[] = []; // Déclaration d'un tableau pour stocker les commandes

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadCommandes(); // Appel de la méthode pour charger les commandes
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
