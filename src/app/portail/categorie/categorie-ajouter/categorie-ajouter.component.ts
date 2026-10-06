import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CategorieService,
  Categorie
} from '../../../services/categorie.service';
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

  // Vrai fichier sélectionné depuis l'ordinateur
  selectedImage: File | null = null;

  errorMessage: string = '';


  constructor(
    public router: Router,
    private categorieService: CategorieService
  ) {}


  // =====================================================
  // SÉLECTION DE L'IMAGE
  // =====================================================

  onFileSelected(event: Event): void {

    console.log('=================================');
    console.log('ÉVÉNEMENT IMAGE DÉCLENCHÉ');
    console.log('=================================');

    const input = event.target as HTMLInputElement;

    console.log('Input :', input);
    console.log('Fichiers :', input.files);


    if (input.files && input.files.length > 0) {

      this.selectedImage = input.files[0];

      console.log(
        'Image sélectionnée :',
        this.selectedImage
      );

      console.log(
        'Nom du fichier :',
        this.selectedImage.name
      );

      console.log(
        'Type du fichier :',
        this.selectedImage.type
      );

      console.log(
        'Taille du fichier :',
        this.selectedImage.size
      );

    } else {

      this.selectedImage = null;

      console.log(
        'Aucun fichier sélectionné.'
      );
    }
  }


  // =====================================================
  // AJOUTER UNE CATÉGORIE
  // =====================================================

  ajouterCategorie(form: any): void {

    this.errorMessage = '';


    console.log('=================================');
    console.log('ENVOI DU FORMULAIRE');
    console.log('=================================');

    console.log(
      'Données soumises :',
      this.nouvelleCategorie
    );

    console.log(
      'Fichier image :',
      this.selectedImage
    );


    // =====================================================
    // NOM
    // =====================================================

    if (
      !this.nouvelleCategorie.nom_complet ||
      this.nouvelleCategorie.nom_complet.trim() === ''
    ) {

      this.errorMessage =
        'Le nom complet est requis.';

      console.log(
        'Erreur :',
        this.errorMessage
      );

      return;
    }


    // =====================================================
    // IMAGE
    // =====================================================

    if (!this.selectedImage) {

      this.errorMessage =
        'Veuillez sélectionner une image.';

      console.log(
        'Erreur :',
        this.errorMessage
      );

      return;
    }


    // =====================================================
    // DESCRIPTION
    // =====================================================

    if (
      !this.nouvelleCategorie.description ||
      this.nouvelleCategorie.description.trim() === ''
    ) {

      this.errorMessage =
        'La description est requise.';

      console.log(
        'Erreur :',
        this.errorMessage
      );

      return;
    }


    // =====================================================
    // ENVOI AU SERVICE
    // =====================================================

    console.log(
      'Envoi du vrai fichier au backend :',
      this.selectedImage
    );


    this.categorieService.createCategorie(
      this.nouvelleCategorie.nom_complet,
      this.nouvelleCategorie.description,
      this.selectedImage
    ).subscribe(

      (categorie: Categorie) => {

        console.log(
          'Catégorie ajoutée avec succès :',
          categorie
        );

        this.router.navigate([
          '/categorie'
        ]);
      },

      (error: any) => {

        console.error(
          'Erreur lors de l\'ajout de la catégorie :',
          error
        );


        // =================================================
        // ERREURS DE VALIDATION LARAVEL
        // =================================================

        if (error.error?.errors) {

          const erreurs =
            error.error.errors;


          if (erreurs.image) {

            this.errorMessage =
              erreurs.image[0];

          }
          else if (erreurs.nom_complet) {

            this.errorMessage =
              erreurs.nom_complet[0];

          }
          else if (erreurs.description) {

            this.errorMessage =
              erreurs.description[0];

          }
          else {

            this.errorMessage =
              'Les données envoyées sont invalides.';
          }

        }

        else if (error.error?.message) {

          this.errorMessage =
            error.error.message;

        }

        else {

          this.errorMessage =
            'Impossible d\'ajouter la catégorie.';
        }


        console.log(
          'Message affiché :',
          this.errorMessage
        );
      }
    );
  }


  // =====================================================
  // ANNULER
  // =====================================================

  annuler(): void {

    console.log(
      'Annulation de l\'ajout'
    );

    this.router.navigate([
      '/categorie'
    ]);
  }
}
