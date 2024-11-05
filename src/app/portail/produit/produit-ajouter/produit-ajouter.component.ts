import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProduitService, Produit } from '../../../services/produit.service';
import { CategorieService, Categorie } from '../../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarAdminComponent } from "../../../navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-produit-ajouter',
  standalone: true,
  templateUrl: './produit-ajouter.component.html',
  styleUrls: ['./produit-ajouter.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NavbarAdminComponent
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
    image: '',
    categorie_id: 0,
    produit_boutique: []
  };

  categories: Categorie[] = [];
  errorMessages: string[] = [];
  successMessage: string = '';
  imageFile: File | null = null;

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
      this.imageFile = file; 
      this.produit.image = file.name; // Gardez juste le nom du fichier
      console.log('Fichier sélectionné:', this.imageFile);
    } else {
      console.log('Aucun fichier sélectionné');
    }
  }

  onSubmit(): void {
    console.log('Soumission du formulaire');
    this.errorMessages = [];
    this.successMessage = '';

    // Vérification si tous les champs obligatoires sont remplis
    if (!this.produit.nom || !this.produit.reference || !this.produit.description || this.produit.prix <= 0 || this.produit.quantite <= 0 || !this.produit.categorie_id || !this.imageFile) {
      this.errorMessages.push('Veuillez remplir tous les champs obligatoires.');
    } else {
      // Validation du champ nom : lettres et espaces uniquement
      const lettresEtEspacesRegex = /^[a-zA-Z\s]*$/;
      if (!lettresEtEspacesRegex.test(this.produit.nom)) {
        this.errorMessages.push('Le nom ne doit contenir que des lettres et des espaces.');
      }

      // Validation du champ description : lettres, espaces et caractères accentués
      // const descriptionRegex = /^[a-zA-Zàâäéèêëîïôûù\s]*$/;
      // if (!descriptionRegex.test(this.produit.description)) {
      //   this.errorMessages.push('La description ne doit contenir que des lettres et des espaces.');
      // }
      const descriptionRegex = /^[a-zA-ZÀ-ÿ\s]*$/;
      if (!descriptionRegex.test(this.produit.description)) {
          this.errorMessages.push('La description ne doit contenir que des lettres (y compris des voyelles accentuées) et des espaces.');
      }
      
      // Validation du champ référence : 3 chiffres et 3 lettres
      const referenceRegex = /^[0-9]{3}[A-Za-z]{3}$/;
      if (!referenceRegex.test(this.produit.reference)) {
        this.errorMessages.push('La référence doit contenir exactement 3 chiffres suivis de 3 lettres.');
      }
    }

    // Si des erreurs sont présentes, arrêter l'envoi
    if (this.errorMessages.length > 0) {
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
      formData.append('image', this.imageFile);
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

        setTimeout(() => {
          this.router.navigate(['/produit']);
        }, 2000);
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
    this.imageFile = null;
  }
}
