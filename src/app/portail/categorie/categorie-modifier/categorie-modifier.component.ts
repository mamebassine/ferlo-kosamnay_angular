import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieService, Categorie } from '../../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorie-modifier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorie-modifier.component.html',
  styleUrls: ['./categorie-modifier.component.css']
})
export class CategorieModifierComponent implements OnInit {

  categorieId!: number;

  categorie: Categorie = {
    image: '',
    nom_complet: '',
    description: ''
  };

  // Nouvelle image sélectionnée
  selectedImage: File | null = null;

  errorMessage: string = '';


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private categorieService: CategorieService
  ) {}


  // =====================================================
  // INITIALISATION
  // =====================================================

  ngOnInit(): void {

    this.categorieId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log(
      'ID de la catégorie récupéré :',
      this.categorieId
    );

    this.getCategorie();
  }


  // =====================================================
  // RÉCUPÉRER LA CATÉGORIE
  // =====================================================

  getCategorie(): void {

    this.categorieService
      .getCategorie(this.categorieId)
      .subscribe(

        (categorie: Categorie) => {

          this.categorie = categorie;

          console.log(
            'Catégorie récupérée :',
            this.categorie
          );
        },

        (error: any) => {

          console.error(
            'Erreur lors de la récupération de la catégorie:',
            error
          );

          this.errorMessage =
            `Impossible de récupérer la catégorie : ${error.message}`;
        }
      );
  }


  // =====================================================
  // SÉLECTION D'UNE NOUVELLE IMAGE
  // =====================================================

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedImage = input.files[0];

      console.log(
        'Nouvelle image sélectionnée :',
        this.selectedImage
      );
    }
  }


  // =====================================================
  // MODIFIER LA CATÉGORIE
  // =====================================================

  modifierCategorie(): void {

    // Réinitialiser l'erreur
    this.errorMessage = '';


    // =====================================================
    // VALIDATION DU NOM
    // =====================================================

    if (this.categorie.nom_complet.trim() === '') {

      this.errorMessage =
        'Le nom complet est requis.';

      return;
    }


    // =====================================================
    // VALIDATION DE LA DESCRIPTION
    // =====================================================

    if (
      this.categorie.description &&
      this.categorie.description.trim() === ''
    ) {

      this.errorMessage =
        'La description est requise.';

      return;
    }


    // =====================================================
    // AFFICHAGE DES DONNÉES
    // =====================================================

    console.log(
      'Données de la catégorie à modifier :',
      this.categorie
    );

    console.log(
      'Nouvelle image :',
      this.selectedImage
    );


    // =====================================================
    // APPEL DU SERVICE
    // =====================================================

    this.categorieService
      .updateCategorie(
        this.categorieId,
        this.categorie.nom_complet,
        this.categorie.description || '',
        this.selectedImage || undefined
      )
      .subscribe(

        () => {

          console.log(
            'Catégorie modifiée avec succès :',
            this.categorie
          );

          this.router.navigate(['/categorie']);
        },

        (error: any) => {

          console.error(
            'Erreur lors de la modification de la catégorie',
            error
          );


          // =================================================
          // ERREURS LARAVEL
          // =================================================

          if (error.error?.errors) {

            const erreurs = error.error.errors;

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

          else if (error.status === 404) {

            this.errorMessage =
              'Catégorie non trouvée.';
          }

          else if (error.error?.message) {

            this.errorMessage =
              error.error.message;
          }

          else {

            this.errorMessage =
              'Impossible de modifier la catégorie.';
          }
        }
      );
  }
}
