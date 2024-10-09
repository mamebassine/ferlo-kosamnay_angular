// src/app/services/panier.service.ts
import { Injectable } from '@angular/core';
import { Produit } from './produit.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private produits: Produit[] = [];
  quantiteSouhaitee!: number;

  constructor() {
    this.loadPanier(); // Charger les produits du Local Storage lors de l'initialisation
  }

  private loadPanier(): void {
    const produitsStockes = localStorage.getItem('panier');
    if (produitsStockes) {
      const produitsParsed = JSON.parse(produitsStockes);
      // Vérifiez que ce qui est chargé est un tableau
      this.produits = Array.isArray(produitsParsed) ? produitsParsed : [];
    }
  }

  getProduits(): Observable<Produit[]> {
    return of(this.produits); // Utilisation de 'of' pour retourner un Observable
  }

  ajouterProduit(produit: Produit): void {
    this.produits.push(produit);
    this.savePanier(); // Sauvegarder les produits dans le Local Storage
  }

  getTotal(): number {
    return this.produits.reduce((acc, produit) => acc + produit.prix * this.quantiteSouhaitee, 0);
  }

  clearPanier(): void {
    this.produits = [];
    this.savePanier(); // Vider le Local Storage
  }

  private savePanier(): void {
    localStorage.setItem('panier', JSON.stringify(this.produits));
  }
}


