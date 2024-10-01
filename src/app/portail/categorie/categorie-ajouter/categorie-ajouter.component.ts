// src/app/portail/categorie/categorie-ajouter/categorie-ajouter.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService, Categorie } from '../../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importer FormsModule

@Component({
  selector: 'app-categorie-ajouter',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajoute FormsModule ici
  templateUrl: './categorie-ajouter.component.html',
  styleUrls: ['./categorie-ajouter.component.css'] // Assurez-vous que ce fichier existe ou commentez cette ligne si non utilisé
})
export class CategorieAjouterComponent {
  nouvelleCategorie: Categorie = {
    image: '',
    nom_complet: '',
    description: ''
  };
  errorMessage: string = '';

  constructor(public router: Router, private categorieService: CategorieService) { } // Assure-toi que le service est injecté

  ajouterCategorie(form: any): void { // Accepte le formulaire en paramètre
    // Vérification des champs requis
    if (this.nouvelleCategorie.nom_complet.trim() === '') {
      this.errorMessage = 'Le nom complet est requis.';
      return;
    }

    if (this.nouvelleCategorie.image.trim() === '') {
      this.errorMessage = 'L\'URL de l\'image est requise.';
      return;
    }

    // Appel au service pour créer la catégorie
    this.categorieService.createCategorie(this.nouvelleCategorie).subscribe(
      (categorie: Categorie) => {
        // Redirection après l'ajout réussi
        this.router.navigate(['/categorie']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de la catégorie', error);
        this.errorMessage = 'Impossible d\'ajouter la catégorie.';
      }
    );
  }

  annuler(): void {
    // Navigation vers la liste des catégories sans enregistrer
    this.router.navigate(['/categorie']);
  }
}
