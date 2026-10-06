import { Component, OnInit } from '@angular/core';

import {
  CategorieService,
  Categorie
} from '../../../services/categorie.service';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { HeaderComponent } from '../../../header/header/header.component';

import { FooterComponent } from '../../../footer/footer/footer.component';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-categorie-afficher-supprimer',

  standalone: true,

  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FormsModule
  ],

  templateUrl: './categorie-afficher-supprimer.component.html',

  styleUrls: ['./categorie-afficher-supprimer.component.css']
})


export class CategorieAfficherSupprimerComponent implements OnInit {

  categories: Categorie[] = [];

  errorMessage: string = '';

  searchTerm: string = '';


  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.loadCategories();

  }


  loadCategories(): void {

    this.categorieService.getCategories().subscribe(

      (data: Categorie[]) => {

        console.log(
          'Catégories récupérées :',
          data
        );

        this.categories = data;

      },

      (error: any) => {

        console.error(
          'Erreur lors de la récupération des catégories',
          error
        );

        this.errorMessage =
          'Impossible de charger les catégories.';

      }

    );

  }


  /**
   * Construire l'URL de l'image Laravel.
   */
  getImageUrl(image: string): string {

    if (!image) {

      return 'assets/images/default.png';

    }


    /**
     * Si l'image est déjà une URL complète,
     * on la garde telle quelle.
     */
    if (
      image.startsWith('http://') ||
      image.startsWith('https://')
    ) {

      return image;

    }


    /**
     * Supprimer les "/" au début
     * du chemin de l'image.
     */
    const imagePath = image.replace(/^\/+/, '');


    /**
     * Construire l'URL vers Laravel Storage.
     */
    const url =
      `http://127.0.0.1:8000/storage/${imagePath}`;


    console.log(
      'URL image catégorie publique :',
      url
    );


    return url;

  }


  /**
   * Recherche.
   */
  rechercher(): void {

    console.log(
      'Recherche effectuée avec le terme:',
      this.searchTerm
    );

  }


  /**
   * Supprimer une catégorie.
   */
  deleteCategorie(id: number | undefined): void {

    if (id === undefined) {

      return;

    }


    if (
      confirm(
        'Êtes-vous sûr de vouloir supprimer cette catégorie ?'
      )
    ) {

      this.categorieService
        .deleteCategorie(id)
        .subscribe(

          () => {

            this.categories =
              this.categories.filter(
                cat => cat.id !== id
              );

          },

          (error: any) => {

            console.error(
              'Erreur lors de la suppression de la catégorie',
              error
            );

            this.errorMessage =
              'Impossible de supprimer la catégorie.';

          }

        );

    }

  }


  /**
   * Aller vers la création.
   */
  navigateToCreate(): void {

    this.router.navigate([
      '/categories/create'
    ]);

  }


  /**
   * Aller vers la modification.
   */
  navigateToEdit(
    id: number | undefined
  ): void {

    if (id === undefined) {

      return;

    }

    this.router.navigate([
      'categories/edit',
      id
    ]);

  }


  /**
   * Filtrer les catégories.
   */
  get categoriesFiltres(): Categorie[] {

    if (!this.searchTerm) {

      return this.categories;

    }


    return this.categories.filter(
      categorie =>
        categorie.nom_complet
          .toLowerCase()
          .includes(
            this.searchTerm.toLowerCase()
          )
    );

  }

}
