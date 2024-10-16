import { Component, OnInit } from '@angular/core';
import { ProduitService, Produit } from '../../../services/produit.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategorieService, Categorie } from '../../../services/categorie.service';
import { HeaderComponent } from "../../../header/header/header.component";
import { FooterComponent } from "../../../footer/footer/footer.component";
import { FormsModule } from '@angular/forms'; 
import { CartService, CartItem } from '../../../services/cart.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-produit-afficher-supprimer',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
   providers: [ProduitService],
  templateUrl: './produit-afficher-supprimer.component.html',
  styleUrls: ['./produit-afficher-supprimer.component.css']
})
export class ProduitAfficherSupprimerComponent implements OnInit {

  produits: Produit[] = [];
  categories: Categorie[] = [];
  searchTerm: string = ''; 
 
  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private router: Router,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.chargerProduits();
    this.chargerCategories();
  }
// recherche() conçue pour exécuter une action
  rechercher(): void { //Nom de la methodes void ne renvoi rien
    console.log('Recherche effectuée avec le terme:', this.searchTerm);
  }
  

  ajouterAuPanier(produit: Produit): void {
    // Créer un objet CartItem à partir du Produit
    const cartItem: CartItem = {
      productId: produit.id!, // Assurez-vous que 'id' est défini
      nom: produit.nom,
      prix: produit.prix,
      quantite: 1, // Vous pouvez modifier cela pour permettre à l'utilisateur de choisir la quantité
      // Ajoutez d'autres propriétés si nécessaire
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


  chargerProduits(): void {
    this.produitService.getProduits().subscribe(
      (data) => {
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
      }
    );
  }

  chargerCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    );
  }

  getNomCategorie(categorieId: number): string {
    const categorie = this.categories.find(cat => cat.id === categorieId);
    return categorie ? categorie.nom_complet : 'bassine';
  }

  supprimer(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.produitService.deleteProduit(id).subscribe(
        () => {
          alert('Produit supprimé avec succès');
          this.chargerProduits();
        },
        (error) => {
          console.error('Erreur lors de la suppression du produit', error);
        }
      );
    }
  }

  modifier(id: number): void {
    this.router.navigate(['/produit/modifier', id]);
  }

 
  voirDetail(id: number): void {
    // Naviguer vers la page de détail du produit en utilisant le Router
    this.router.navigate(['produit/detail', id]);
  }


  ajouterProduit(): void {
    this.router.navigate(['/produit/ajouter']);
  }


   // Filtre les produits en fonction du terme de recherche
   get produitsFiltres(): Produit[] {
    if (!this.searchTerm) {
      return this.produits; // Retourne tous les produits si aucun terme de recherche n'est saisi
    }
    return this.produits.filter(produit =>
      produit.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filtre les produits
    );
  }
  
}