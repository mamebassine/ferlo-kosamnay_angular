import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService, Categorie } from '../../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorie-ajouter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorie-ajouter.component.html',
  styleUrls: ['./categorie-ajouter.component.css']
})
export class CategorieAjouterComponent {
  nouvelleCategorie: Categorie = {
    image: '',
    nom_complet: '',
    description: ''
  };
  errorMessage: string = '';

  constructor(public router: Router, private categorieService: CategorieService) { }

  ajouterCategorie(form: any): void {
    // Réinitialiser le message d'erreur
    this.errorMessage = '';
    console.log('Données soumises :', this.nouvelleCategorie);

    // Définir les motifs de validation pour les champs
    // const nomCompletPattern = /^[a-zA-Z\s]*$/; 
    // const descriptionPattern = /^[a-zA-Z\s]*$/; 

    const nomCompletPattern = /^[a-zA-Z\s]*$/;
    const descriptionPattern = /^[a-zA-Z\s]*$/;



    // Vérifier les champs requis et appliquer les validations
    if (this.nouvelleCategorie.nom_complet.trim() === '') {
      this.errorMessage = 'Le nom complet est requis.';
      console.log('Erreur :', this.errorMessage);
      return;
    } else if (!nomCompletPattern.test(this.nouvelleCategorie.nom_complet)) {
      this.errorMessage = 'Le nom complet doit contenir uniquement des lettres, des voyelles et des espaces.';
      console.log('Erreur :', this.errorMessage);
      return;
    }

    if (this.nouvelleCategorie.image.trim() === '') {
      this.errorMessage = 'L\'URL de l\'image est requise.';
      console.log('Erreur :', this.errorMessage);
      return;
    }

    if (this.nouvelleCategorie.description && !descriptionPattern.test(this.nouvelleCategorie.description)) {
      this.errorMessage = 'La description doit contenir uniquement des lettres et des espaces.';
      console.log('Erreur :', this.errorMessage);
      return;
    }

    // Appel au service pour créer la catégorie
    console.log('Appel au service pour créer la catégorie');
    this.categorieService.createCategorie(this.nouvelleCategorie).subscribe(
      (categorie: Categorie) => {
        console.log('Catégorie ajoutée avec succès :', categorie);
        // Redirection après l'ajout réussi
        this.router.navigate(['/categorie']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de la catégorie', error);
        this.errorMessage = 'Impossible d\'ajouter la catégorie.';
        console.log('Erreur :', this.errorMessage);
      }
    );
  }

  annuler(): void {
    // Navigation vers la liste des catégories sans enregistrer
    console.log('Annulation de l\'ajout, retour à la liste des catégories');
    this.router.navigate(['/categorie']);
  }
}
