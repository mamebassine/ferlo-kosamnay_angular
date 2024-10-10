import { Component, OnInit } from '@angular/core';
import { ProduitService, Produit } from '../../../services/produit.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategorieService, Categorie } from '../../../services/categorie.service';
import { HeaderComponent } from "../../../header/header/header.component";
import { FooterComponent } from "../../../footer/footer/footer.component";
import { PanierService } from '../../../services/panier.service';


@Component({
  selector: 'app-produit-afficher-supprimer',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
   providers: [ProduitService],
  templateUrl: './produit-afficher-supprimer.component.html',
  styleUrls: ['./produit-afficher-supprimer.component.css']
})
export class ProduitAfficherSupprimerComponent implements OnInit {

  produits: Produit[] = [];
  categories: Categorie[] = [];

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private router: Router,
    private panierService: PanierService
  ) {}
  
  ngOnInit(): void {
    this.chargerProduits();
    this.chargerCategories();
  }

ajouterAuPanier(produit: Produit): void {
  console.log('Ajout du produit:', produit); 
  this.panierService.ajouterProduit(produit);
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
}