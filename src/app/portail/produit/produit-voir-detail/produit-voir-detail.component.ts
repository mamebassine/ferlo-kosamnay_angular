// src/app/components/produit-voir-detail/produit-voir-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService, Produit } from '../../../services/produit.service';
import { PanierService } from '../../../services/panier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../header/header/header.component';
import { FooterComponent } from '../../../footer/footer/footer.component';
import { LigneCommandeAjouterComponent } from '../../../ligneCommande/ligne-commande-ajouter/ligne-commande-ajouter.component';


@Component({
  standalone: true,
  selector: 'app-produit-voir-detail',
  templateUrl: './produit-voir-detail.component.html',
  styleUrls: ['./produit-voir-detail.component.css'],
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, LigneCommandeAjouterComponent]
})
export class ProduitVoirDetailComponent implements OnInit {
  produitId!: number; // ID du produit
  produit!: Produit; // Détails du produit récupérés
  errorMessage: string = ''; // Message d'erreur à afficher

  constructor(
    private route: ActivatedRoute, // Service pour obtenir des informations sur la route active
    private produitService: ProduitService, // Service pour gérer les produits
    private panierService: PanierService, // Service pour gérer le panier
    private router: Router // Service pour la navigation entre les routes
  ) {}

  ngOnInit(): void {
    // Récupère l'ID du produit à partir de l'URL
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduit(); // Appel de la méthode pour récupérer les détails du produit
  }

  // Méthode pour récupérer les détails du produit
  getProduit(): void {
    this.produitService.getProduit(this.produitId).subscribe(
      (data: Produit) => {
        this.produit = data; // Stocke les détails du produit dans la variable
        // Vérifie si la quantité est indéfinie ou inférieure à 1
        if (!this.produit.quantite || this.produit.quantite < 1) {
          this.produit.quantite = 1; // Initialiser la quantité à 1
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du produit', error); // Affiche l'erreur dans la console
        this.errorMessage = 'Produit non trouvé ou une erreur est survenue.'; // Message d'erreur
      }
    );
  }

  // Méthodes pour gérer la quantité
  incrementQuantity(): void {
    if (this.produit) {
      this.produit.quantite! += 1; // Incrémente la quantité
    }
  }

  decrementQuantity(): void {
    if (this.produit && this.produit.quantite! > 1) {
      this.produit.quantite! -= 1; // Décrémente la quantité, ne permettant pas d'aller en-dessous de 1
    }
  }

  
  // Méthode pour ajouter le produit au panier
addToCart(produit: Produit): void {
  this.panierService.addProduit(produit); // Ajoute le produit au panier
  localStorage.setItem('panier', JSON.stringify(this.produit));
  console.log('Produit ajouté au panier:', produit); // Affiche le produit ajouté au panier

}

// // Méthode pour revenir à la page produit
//   goBack(): void {
//     this.router.navigate(['/panier']); // Navigation vers la page des produits
//   }
}
