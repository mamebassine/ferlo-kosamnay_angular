// src/app/panier/panier/panier.component.ts
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../services/panier.service';
import { Produit } from '../../services/produit.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  produits$: Observable<Produit[]>;
  total: number = 0;

  constructor(public panierService: PanierService) { 
    this.produits$ = this.panierService.getProduits();
  }

  ngOnInit(): void {
    this.produits$.subscribe(produits => {
      this.total = this.panierService.getTotal();
    });
  }

  viderPanier(): void {
    this.panierService.clearPanier();
  }
}
