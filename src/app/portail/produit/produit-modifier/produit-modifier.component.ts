import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService, Produit } from '../../../services/produit.service';
import { CategorieService, Categorie } from '../../../services/categorie.service'; 
import { NgModule } from '@angular/core';
import { FormsModule,} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
selector: 'app-produit-modifier',
  templateUrl: './produit-modifier.component.html',
  styleUrls: ['./produit-modifier.component.css'],
  imports: [
    CommonModule,
    FormsModule 
  ]

})
export class ProduitModifierComponent implements OnInit {
  produit: Produit = {
    categorie_id: 0,
    id: 0,
    image: '',
    description: '',
    prix: 0,
    quantite: 0,
    reference: '',
    nom: '',

    produit_boutique: [] // Propriété ajoutée

  };

  categories: Categorie[] = [];
  errorMessages: string[] = [];
  successMessage: string = '';
  produitId!: number;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduit();
    this.getCategories();
  }

  getProduit(): void {
    this.produitService.getProduit(this.produitId).subscribe(
      (data: Produit) => {
        this.produit = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du produit', error);
      }
    );
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data: Categorie[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  onSubmit(): void {
    this.errorMessages = [];
    this.successMessage = '';

    this.produitService.updateProduit(this.produitId, this.produit).subscribe(
      (data: Produit) => {
        this.successMessage = 'Produit mis à jour avec succès !';
        // Rediriger vers la liste des produits ou autre action
        this.router.navigate(['/produit']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
        if (error.error && error.error.errors) {
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              this.errorMessages.push(error.error.errors[key]);
            }
          }
        } else {
          this.errorMessages.push('Une erreur est survenue lors de la mise à jour du produit.');
        }
      }
    );
  }
}

