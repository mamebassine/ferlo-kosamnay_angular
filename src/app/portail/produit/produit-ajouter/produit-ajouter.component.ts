import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule
  ]
})
export class ProduitAjouterComponent implements OnInit {
  produit: Produit = {
    id: 0,
    nom: '',
    reference: '',
    quantite: 0,
    prix: 0,
    description: '',
    image: '', // Vous pouvez garder ceci comme string, mais il faut gérer le type File séparément
    categorie_id: 0,
    produit_boutique: []
  };

  categories: Categorie[] = [];
  errorMessages: string[] = [];
  successMessage: string = '';
  imageFile: File | null = null; // Declare imageFile

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Initialisation du composant ProduitAjouter');
    this.categorieService.getCategories().subscribe(
      (data: Categorie[]) => {
        this.categories = data;
        console.log('Catégories récupérées:', this.categories);
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.imageFile = file; // Stockez le fichier dans imageFile
      this.produit.image = file.name; // Gardez juste le nom du fichier si nécessaire
      console.log('Fichier sélectionné:', this.imageFile);
    } else {
      console.log('Aucun fichier sélectionné');
    }
  }

  onSubmit(): void {
    console.log('Soumission du formulaire');
    this.errorMessages = [];
    this.successMessage = '';

    // Validation simple avant l'envoi
    if (!this.produit.nom || this.produit.prix <= 0 || !this.produit.categorie_id) {
      console.error('Validation échouée : Nom, prix ou catégorie manquant');
      this.errorMessages.push('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.produit.nom);
    formData.append('reference', this.produit.reference);
    formData.append('description', this.produit.description);
    formData.append('prix', this.produit.prix.toString());
    formData.append('quantite', this.produit.quantite.toString());
    formData.append('categorie_id', this.produit.categorie_id.toString());

    if (this.imageFile) {
      formData.append('image', this.imageFile); // Assurez-vous que c'est bien un File
    } else {
      console.warn('Aucun fichier image sélectionné');
    }

    console.log('FormData avant envoi:');
    formData.forEach((value, key) => {
      console.log(`  ${key}:`, value);
    });

    this.produitService.createProduit(formData).subscribe(
      (data: Produit) => {
        this.successMessage = 'Produit ajouté avec succès !';
        console.log('Produit ajouté avec succès:', data);
        this.router.navigate(['/produit']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit', error);
        if (error.error && error.error.errors) {
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              const messages = error.error.errors[key];
              this.errorMessages.push(...messages);
              console.log(`Erreur de validation pour ${key}:`, messages);
            }
          }
        } else {
          this.errorMessages.push('Une erreur est survenue lors de l\'ajout du produit.');
        }
      }
    );
  }

  resetForm(): void {
    console.log('Réinitialisation du formulaire');
    this.produit = {
      id: 0,
      nom: '',
      reference: '',
      quantite: 0,
      prix: 0,
      description: '',
      image: '',
      categorie_id: 0,
      produit_boutique: []
    };
    this.imageFile = null; // Réinitialisez le fichier image également
  }
}
