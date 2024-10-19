// import { HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// // Interface représentant un article dans le panier
// export interface CartItem {
//   productId: number; 
//   nom: string;      
//   prix: number;    
//   quantite: number;  
// }

// @Injectable({
//   providedIn: 'root'  // Fournisseur de service disponible au niveau racine de l'application
// })
// export class CartService {
//   private apiUrl = 'http://localhost:8000/api/lignes_commandes';  // L'URL de votre API Laravel

//   constructor(private http: HttpClient) {}
//   // BehaviorSubject pour stocker les articles du panier avec un état initial vide
//   private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  
//   // Observable permettant aux composants de s'abonner aux mises à jour du panier
//   cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

//   constructor() {
//     // Vérifie s'il y a un panier enregistré dans le localStorage lors de l'initialisation
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       // Si un panier existe, il est chargé et mis à jour dans le BehaviorSubject
//       this.cartItemsSubject.next(JSON.parse(storedCart));
//     }
//   }

//   // Récupère les articles actuels du panier sous forme de tableau
//   getCartItems(): CartItem[] {
//     return this.cartItemsSubject.getValue();
//   }

//   // Ajoute un article au panier
//   addToCart(item: CartItem): void {
//     // Récupère les articles actuels du panier
//     const items = this.getCartItems();
    
//     // Vérifie si l'article existe déjà dans le panier
//     const existingItem = items.find(i => i.productId === item.productId);

//     if (existingItem) {
//       // Si l'article existe déjà, la quantité est mise à jour
//       existingItem.quantite += item.quantite;
//     } else {
//       // Si l'article n'existe pas, il est ajouté au panier
//       items.push(item);
//     }

//     // Met à jour le BehaviorSubject avec les nouveaux articles du panier
//     this.cartItemsSubject.next(items);
//     // Sauvegarde le panier dans le localStorage
//     this.saveCart();
//   }

//   // Supprime un article du panier en fonction de son identifiant de produit
//   removeFromCart(productId: number): void {
//     let items = this.getCartItems();
//     // Filtre les articles pour exclure celui à supprimer
//     items = items.filter(item => item.productId !== productId);
//     // Met à jour le BehaviorSubject avec les articles restants
//     this.cartItemsSubject.next(items);
//     // Sauvegarde les modifications dans le localStorage
//     this.saveCart();
//   }

//     // Vide complètement le panier
//     clearCart(): void {
//       // Réinitialise le BehaviorSubject avec un tableau vide
//       this.cartItemsSubject.next([]); 
//       // Sauvegarde l'état vide dans le localStorage
//       this.saveCart();
//     }
  

  

//   // Méthode privée pour sauvegarder le panier dans le localStorage
//   private saveCart(): void {
//     // Convertit les articles du panier en chaîne JSON et les stocke dans le localStorage
//     localStorage.setItem('cart', JSON.stringify(this.getCartItems()));
//   }



//   createOrder(produits: any[]): Observable<any> {
//     const token = localStorage.getItem('token');  // Récupérer le token JWT

//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });

//     const body = { produits };  // Construire le corps de la requête avec les produits

//     return this.http.post(this.apiUrl, body, { headers });
//   }
// }



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interface représentant un article dans le panier
export interface CartItem {
  productId: number; 
  nom: string;      
  prix: number;    
  quantite: number;  
}

@Injectable({
  providedIn: 'root'  // Fournisseur de service disponible au niveau racine de l'application
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/lignes_commandes';  // L'URL de votre API Laravel
  
  // BehaviorSubject pour stocker les articles du panier avec un état initial vide
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  
  // Observable permettant aux composants de s'abonner aux mises à jour du panier
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    // Vérifie s'il y a un panier enregistré dans le localStorage lors de l'initialisation
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      // Si un panier existe, il est chargé et mis à jour dans le BehaviorSubject
      this.cartItemsSubject.next(JSON.parse(storedCart));
    }
  }

  // Récupère les articles actuels du panier sous forme de tableau
  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  // Ajoute un article au panier
  addToCart(item: CartItem): void {
    // Récupère les articles actuels du panier
    const items = this.getCartItems();
    
    // Vérifie si l'article existe déjà dans le panier
    const existingItem = items.find(i => i.productId === item.productId);

    if (existingItem) {
      // Si l'article existe déjà, la quantité est mise à jour
      existingItem.quantite += item.quantite;
    } else {
      // Si l'article n'existe pas, il est ajouté au panier
      items.push(item);
    }

    // Met à jour le BehaviorSubject avec les nouveaux articles du panier
    this.cartItemsSubject.next(items);
    // Sauvegarde le panier dans le localStorage
    this.saveCart();
  }

  // Supprime un article du panier en fonction de son identifiant de produit
  removeFromCart(productId: number): void {
    let items = this.getCartItems();
    // Filtre les articles pour exclure celui à supprimer
    items = items.filter(item => item.productId !== productId);
    // Met à jour le BehaviorSubject avec les articles restants
    this.cartItemsSubject.next(items);
    // Sauvegarde les modifications dans le localStorage
    this.saveCart();
  }

  // Vide complètement le panier
  clearCart(): void {
    // Réinitialise le BehaviorSubject avec un tableau vide
    this.cartItemsSubject.next([]); 
    // Sauvegarde l'état vide dans le localStorage
    this.saveCart();
  }

  // Méthode privée pour sauvegarder le panier dans le localStorage
  private saveCart(): void {
    // Convertit les articles du panier en chaîne JSON et les stocke dans le localStorage
    localStorage.setItem('cart', JSON.stringify(this.getCartItems()));
  }

  // Crée une commande en envoyant les produits au backend
  createOrder(produits: any[]): Observable<any> {
    const token = localStorage.getItem('token');  // Récupérer le token JWT

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { produits };  // Construire le corps de la requête avec les produits

    return this.http.post(this.apiUrl, body, { headers });
  }
}
