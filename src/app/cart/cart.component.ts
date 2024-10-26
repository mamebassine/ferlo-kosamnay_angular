import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service'; 
import { AuthService } from '../services/auth.service'; 

import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { PaiementService } from '../services/paiement.service';
@Component({
  selector: 'app-cart', 
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: './cart.component.html', 
  styleUrls: ['./cart.component.css'] 
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Tableau pour contenir les articles du panier
  paymentType: string = 'wallet'; // Le type de paiement
  totalAmount: number = 0; // Le montant total à payer
  // Constructeur pour injecter CartService
  // constructor(private cartService: CartService) { }
  constructor(private cartService: CartService, private authService: AuthService, private paymentService: PaiementService) { }
  // Méthode du cycle de vie qui s'exécute après l'initialisation du composant
  ngOnInit(): void {
    // S'abonner à l'observable cartItems pour obtenir les articles du panier actuels
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items; // Mettre à jour cartItems avec les articles reçus
    });
  }

//Methode pour augmenter et diminuer
  increaseQuantity(item: any) {
    // Incrémenter la quantité de l'article
    item.quantite++;
  }
  
  decreaseQuantity(item: any) {
    // Décrémenter la quantité de l'article si elle est supérieure à 1
    if (item.quantite > 1) {
      item.quantite--;
    }
  }
  
  // Méthode pour supprimer un article du panier par son ID de produit
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId); // Appeler la méthode du service pour supprimer l'article
  }

  // Méthode pour calculer le prix total des articles dans le panier
     getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.prix * item.quantite, 0);
  }
  
  goBack() {
    window.history.back();
  }
  


  // Méthode pour formater la valeur en devise selon la locale française
  formatCurrency(value: number): string {
    return value.toLocaleString('fr-FR'); // Formater le nombre avec la locale française
  }
  
// Méthode pour vider le panier
 
clearCart(): void {
  this.cartService.clearCart(); // Appeler la méthode du service pour vider le panier
}

  
commanderr(): void {
  if (this.authService.isAuthenticated()) {
    const produits = this.cartItems.map(item => ({
      produit_boutique_id: item.productId,
      quantite_totale: item.quantite,
      prix_totale: item.prix
    }));

    // Calcul du montant total
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.prix * item.quantite, 0);

    // Envoyer la commande au backend Laravel
    this.cartService.createOrder(produits).subscribe(
      response => {

        const ligneCommandeId = response.commande.id;
        console.log('Commande enregistrée avec succès:', ligneCommandeId);

        if (ligneCommandeId) {
          const currentDate = new Date().toISOString().split('T')[0]; // Récupérer la date actuelle au format AAAA-MM-JJ

          // Effectuer le paiement pour la commande
          this.paymentService.effectuerPaiement(ligneCommandeId, this.totalAmount, currentDate, this.paymentType).subscribe(
            paiementResponse => {
              const urlDePaiement = paiementResponse?.payment_url;

              if (urlDePaiement) {
                // Rediriger l'utilisateur vers l'URL de paiement
                window.location.href = urlDePaiement;
              } else {
                console.error('Erreur: l\'URL de paiement est introuvable.');
              }
            },
            paiementError => {
              console.error('Erreur lors du paiement:', paiementError);
            }
          );
        } else {
          console.error('Erreur: l\'ID de la commande est introuvable.');
        }
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la commande:', error);
      }
    );
  } else {
    window.location.href = '/login'; // Rediriger vers la page de connexion si non authentifié
  }
}






}
