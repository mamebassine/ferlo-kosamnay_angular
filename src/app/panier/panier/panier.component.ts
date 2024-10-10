import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../services/panier.service';
import { Produit } from '../../services/produit.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../header/header/header.component';
import { FooterComponent } from '../../footer/footer/footer.component';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { RouterLink } from '@angular/router';
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
  selector: 'app-panier',
  standalone: true,
  imports: [ CommonModule, HeaderComponent, FooterComponent, RouterLink],
  
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {


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
      (data) => {
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

  // produits$: Observable<Produit[]>;
  // prix_totale: number = 0;
  



  // ngOnInit(): void {

  //   // this.produits$.subscribe(produits => {
  //   //   this.prix_totale = this.panierService.getTotal();
  //   // });
  // }

 
  // ajouterAuPanier(produit: Produit): void {
  //   console.log('Ajout du produit:', produit); 
  //   this.panierService.ajouterProduit(produit);
  //   this.prix_totale = this.panierService.getTotal(); // Met à jour le total après l'ajout
  // }

  // viderPanier(): void {
  //   this.panierService.clearPanier();
  //   this.prix_totale = 0; // Réinitialise le total après vidage
  // }
  
}