// src/app/panier/panier/panier.component.ts
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../services/panier.service';
import { Produit } from '../../services/produit.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  produits$: Observable<Produit[]>;
  prix_totale: number = 0;
  

  constructor(public panierService: PanierService) { 
    this.produits$ = this.panierService.getProduits();
  }

  ngOnInit(): void {
    this.produits$.subscribe(produits => {
      this.prix_totale = this.panierService.getTotal();
    });
  }

  ajouterAuPanier(produit: Produit): void {
    console.log('Ajout du produit:', produit); // Log pour voir le produit
    this.panierService.ajouterProduit(produit);
    this.prix_totale = this.panierService.getTotal(); // Met à jour le total après l'ajout
  }

  viderPanier(): void {
    this.panierService.clearPanier();
    this.prix_totale = 0; // Réinitialise le total après vidage
  }
}
