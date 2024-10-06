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
import { LigneCommandeService } from '../../../services/ligne-commande.service';
import { AuthService, User } from '../../../services/auth.service';
import { ProduitBoutiqueService } from '../../../services/produit-boutique.service';

// import { LigneCommandeService } from 'chemin/vers/LigneCommandeService'; // Assure-toi d'importer le service
 // Définition de l'interface LigneCommande ici
 interface LigneCommande {
  produit_boutique_id: number;  // ID du produit boutique (obligatoire)
  quantite_totale: number;       // Quantité totale (obligatoire)
  prix_totale: number;           // Prix total (obligatoire)
  user_id: number;              // ID de l'utilisateur (facultatif, géré par le backend)
  date: string;                 // Date (facultatif, géré par le backend, en format ISO)
  statut: string;                // Statut (facultatif, géré par le backend)
}

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
  produitBoutique: any[] = []; // Initialisation ici

  
  constructor(
    private authService: AuthService,
    private ligneCommandeService: LigneCommandeService,
    private route: ActivatedRoute, // Service pour obtenir des informations sur la route active
    private produitService: ProduitService, // Service pour gérer les produits
    private panierService: PanierService, // Service pour gérer le panier
    private router: Router // Service pour la navigation entre les routes
  ) {}

     // Déclaration de authService

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
        this.produitBoutique = data.produit_boutique; // Stocke la boutique du produit
        
        // Si vous souhaitez afficher les boutiques, par exemple la première boutique
        if (this.produitBoutique && this.produitBoutique.length > 0) {
          console.log('Première boutique:', this.produitBoutique[0]); // Affiche la première boutique
        }
  
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
  

    // Méthode pour passer la commande
  // commanderr(produit: Produit): void {
  //   // this.panierService.ajouterProduitAuPanier(produit);
    
  //   console.log('Commande passée pour le produit:', produit);
  //   this.router.navigate(['/panier']); // Redirection vers la page du panier après commande
  // }

  commanderr(produit: Produit): void {
    // Vérifie que produit.id est bien défini
    if (produit.id !== undefined && produit.id) {
        const produit_boutique_id = produit.id;

        const currentUser = this.authService.getCurrentUser(); // Récupération de l'utilisateur actuel
        const userId = currentUser?.id; // Récupérer l'ID de l'utilisateur

        if (userId === undefined) {
            console.error('Utilisateur non connecté, commande non créée.');
            alert('Utilisateur non connecté, commande non créée.');
            return; // Sortir de la fonction si l'utilisateur n'est pas connecté
        }

        const ligneCommande: LigneCommande = {
            produit_boutique_id: produit_boutique_id,
            quantite_totale: 1,
            prix_totale: produit.prix,
            user_id: userId, // userId est garanti d'être défini ici
            date: new Date().toISOString().split('T')[0],
            statut: 'en attente'
        };

        console.log('produit_boutique_id:', produit_boutique_id),

        this.ligneCommandeService.createLigneCommande(ligneCommande).subscribe({
            next: (response: any) => {
                console.log('Commande créée avec succès:', response);
                this.router.navigate(['/confirmation']);
            },
            error: (error: any) => {
                console.error('Erreur lors de la création de la commande:', error);
                if (error.error && error.error.errors) {
                    alert('Erreur de validation: ' + JSON.stringify(error.error.errors));
                } else {
                    alert('Erreur inconnue lors de la création de la commande: ' + error.message);
                }
            }
        });
    } else {
        console.error('produit.id ou produit.boutique.id est undefined, commande non créée.');
        alert('Produit ou boutique invalide, commande non créée.');
    }
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





  
//   // Méthode pour ajouter le produit au panier
// addToCart(produit: Produit): void {
//   this.panierService.addProduit(produit); // Ajoute le produit au panier
//   localStorage.setItem('panier', JSON.stringify(this.produit));
//   console.log('Produit ajouté au panier:', produit); // Affiche le produit ajouté au panier

// }

// // Méthode pour revenir à la page produit
//   goBack(): void {
//     this.router.navigate(['/panier']); // Navigation vers la page des produits
//   }
}
