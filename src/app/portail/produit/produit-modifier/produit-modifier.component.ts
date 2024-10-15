import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService, Produit } from '../../../services/produit.service';
import { CategorieService, Categorie } from '../../../services/categorie.service'; 
import { FormsModule } from '@angular/forms';
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
    produit_boutique: []
  };

  categories: Categorie[] = [];
  errorMessages: string[] = [];
  successMessage: string = '';
  produitId!: number;
  selectedImage: File | null = null;

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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.produit.image = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.selectedImage = file;
    } else {
      this.errorMessages.push('Veuillez sélectionner un fichier image valide.');
    }
  }

  validateForm(): boolean {
    this.errorMessages = [];

    if (!this.produit.nom) {
      this.errorMessages.push('Le nom du produit est requis.');
    }
    if (!this.produit.reference) {
      this.errorMessages.push('La référence du produit est requise.');
    }
    if (this.produit.prix <= 0) {
      this.errorMessages.push('Le prix doit être supérieur à zéro.');
    }
    if (this.produit.quantite < 0) {
      this.errorMessages.push('La quantité ne peut pas être négative.');
    }
    if (this.produit.categorie_id <= 0) {
      this.errorMessages.push('Veuillez sélectionner une catégorie valide.');
    }

    return this.errorMessages.length === 0;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.produit.nom);
    formData.append('reference', this.produit.reference);
    formData.append('description', this.produit.description);
    formData.append('prix', this.produit.prix.toString());
    formData.append('quantite', this.produit.quantite.toString());
    formData.append('categorie_id', this.produit.categorie_id.toString());

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.produitService.updateProduit(this.produitId, formData).subscribe(
      (data: Produit) => {
        this.successMessage = 'Produit mis à jour avec succès !';
        this.router.navigate(['/produit']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
        if (error.error && error.error.errors) {
          this.errorMessages = Object.values(error.error.errors).flat() as string[];
        } else {
          this.errorMessages.push('Une erreur est survenue lors de la mise à jour du produit.');
        }
      }
    );
  }
}
