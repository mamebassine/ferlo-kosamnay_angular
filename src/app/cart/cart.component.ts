import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-cart', 
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: './cart.component.html', 
  styleUrls: ['./cart.component.css'] 
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Tableau pour contenir les articles du panier

  // Constructeur pour injecter CartService
  constructor(private cartService: CartService) { }

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

  // Méthode pour gérer le processus de passage à la caisse
  commanderr(): void {
    // Rediriger vers la page de paiement
    window.location.href = 'https://checkout.naboopay.com/checkout/bf9fa099'; 
  }
}
