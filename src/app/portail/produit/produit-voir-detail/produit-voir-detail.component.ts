import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService, Produit } from '../../../services/produit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../header/header/header.component';
import { FooterComponent } from '../../../footer/footer/footer.component';
import { LigneCommandeAjouterComponent } from '../../../ligneCommande/ligne-commande-ajouter/ligne-commande-ajouter.component';
import { LigneCommandeService } from '../../../services/ligne-commande.service';
import { AuthService, User } from '../../../services/auth.service';
import { ProduitBoutiqueService } from '../../../services/produit-boutique.service';
import Swal from 'sweetalert2';
import { CartService, CartItem } from '../../../services/cart.service';



// import { LigneCommandeService } from 'chemin/vers/LigneCommandeService'; // Assure-toi d'importer le service
 // Définition de l'interface LigneCommande ici
 //l'interface
 interface LigneCommande {
  produit_boutique_id: number;
  quantite_totale: number;       
  prix_totale: number;           
  user_id: number;             
  date: string;                 
  statut: string;                
}

@Component({
  standalone: true,
  selector: 'app-produit-voir-detail',
  templateUrl: './produit-voir-detail.component.html',
  styleUrls: ['./produit-voir-detail.component.css'],
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, LigneCommandeAjouterComponent]
})

export class ProduitVoirDetailComponent implements OnInit {
  produitId!: number; 
  produit!: Produit; 
  errorMessage: string = ''; 
  produitBoutique: any[] = []; // Initialisation ici
  quantiteSouhaitee: number = 1;
  
  constructor(
    private authService: AuthService,
    private ligneCommandeService: LigneCommandeService,
    private route: ActivatedRoute, 
    private produitService: ProduitService,
    private router: Router, 
    private cartService: CartService // Inject CartService here

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
        console.log(this.produitBoutique);
        
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




//ici

  ajouterAuPanier(produit: Produit): void {
    // Créer un objet CartItem à partir du Produit
    const cartItem: CartItem = {
      productId: produit.id!, // Assurez-vous que 'id' est défini
      nom: produit.nom,
      prix: produit.prix,
      quantite: 1, // Vous pouvez modifier cela pour permettre à l'utilisateur de choisir la quantité
    };

    // Utiliser le CartService pour ajouter l'article au panier
    this.cartService.addToCart(cartItem);

    // Afficher une notification avec SweetAlert2
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${produit.nom} a été ajouté au panier.`,
      showConfirmButton: false,
      timer: 1000, // Durée en millisecondes (2 secondes)
      toast: true, // Affiche comme un toast
      iconColor: '#ffffff',
      background: '#28a745',
      color: '#fff',
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }

}


