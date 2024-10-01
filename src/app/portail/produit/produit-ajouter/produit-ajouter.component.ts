import { NgModule } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProduitService, Produit } from '../../../services/produit.service';
import { CategorieService, Categorie } from '../../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produit-ajouter',
  standalone: true,
  templateUrl: './produit-ajouter.component.html',
  styleUrls: ['./produit-ajouter.component.css'],
  imports: [
    CommonModule,
    FormsModule // Utilisé pour ngModel
  ]
})
export class ProduitAjouterComponent implements OnInit {
  produit: Produit = {
    categorie_id: 0,
    image: '',
    description: '',
    prix: 0,
    quantite: 0,
    reference: '',
    nom: '',
    // nom_complet:'',
  };

  categories: Categorie[] = [];
  errorMessages: string[] = [];
  successMessage: string = '';

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

    this.produitService.createProduit(this.produit).subscribe(
      (data: Produit) => {
        this.successMessage = 'Produit ajouté avec succès !';
        this.router.navigate(['/produit']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit', error);
        if (error.error && error.error.errors) {
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              this.errorMessages.push(error.error.errors[key]);
            }
          }
        } else {
          this.errorMessages.push('Une erreur est survenue lors de l\'ajout du produit.');
          console.log(this.errorMessages.push('Une erreur est survenue lors de l\'ajout du produit.'));
          
        }
      }
    );
  }

  // Méthode pour réinitialiser le formulaire
  resetForm(): void {
    this.produit = {
      categorie_id: 0,
      image: '',
      description: '',
      prix: 0,
      quantite: 0,
      reference: '',
      nom: '',
      // nom_complet: '',
    };
  }
}
