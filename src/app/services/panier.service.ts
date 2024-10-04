// src/app/services/panier.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produit } from './produit.service'; // Assurez-vous que le chemin est correct
// import { apiUrl } from './apiUrl';


@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private produits: Produit[] = [];
  private produitsSubject: BehaviorSubject<Produit[]> = new BehaviorSubject<Produit[]>([]);

  constructor() {
    // Charger le panier depuis le localStorage si disponible
    const savedPanier = localStorage.getItem('panier');
    if (savedPanier) {
      this.produits = JSON.parse(savedPanier);
      this.produitsSubject.next(this.produits);
    }
  }

  // Méthode pour ajouter un produit au panier
  addProduit(produit: Produit): void {
    const index = this.produits.findIndex(p => p.id === produit.id);
    if (index > -1) {
      // Augmenter la quantité en s'assurant qu'elle est définie
      this.produits[index].quantite = (this.produits[index].quantite || 0) + (produit.quantite || 1);
    } else {
      // Ajouter une copie du produit avec une quantité par défaut
      this.produits.push({ ...produit, quantite: produit.quantite || 1 });
    }
    this.updatePanier();
  }

  // Méthode pour récupérer les produits du panier sous forme d'observable
  getProduits(): Observable<Produit[]> {
    return this.produitsSubject.asObservable();
  }

  // Méthode pour calculer le total
  getTotal(): number {
    return this.produits.reduce((total, produit) => 
      total + (produit.prix * (produit.quantite || 0)), 
      0
    );
  }

  // Méthode pour vider le panier
  clearPanier(): void {
    this.produits = [];
    this.updatePanier();
  }

  // Méthode privée pour mettre à jour le panier et le sauvegarder
  private updatePanier(): void {
    this.produitsSubject.next([...this.produits]); // Émettre une copie du tableau
    localStorage.setItem('panier', JSON.stringify(this.produits)); // Sauvegarder dans le localStorage
  }
}
