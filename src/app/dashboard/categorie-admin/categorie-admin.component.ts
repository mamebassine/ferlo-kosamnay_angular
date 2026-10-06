import { Component } from '@angular/core';

import {
  CategorieService,
  Categorie
} from '../../services/categorie.service';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { NavbarAdminComponent } from '../../navbar-admin/navbar-admin.component';

@Component({
  selector: 'app-categorie-admin',

  standalone: true,

  imports: [
    CommonModule,
    NavbarAdminComponent
  ],

  templateUrl: './categorie-admin.component.html',

  styleUrl: './categorie-admin.component.css'
})

export class CategorieAdminComponent {

  categories: Categorie[] = [];

  errorMessage: string = '';

  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  /**
   * Charger toutes les catégories.
   */
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
     * Si Laravel renvoie déjà une URL complète,
     * on la garde telle quelle.
     */
    if (
      image.startsWith('http://') ||
      image.startsWith('https://')
    ) {

      return image;

    }

    /**
     * Supprimer les "/" au début du chemin.
     */
    const imagePath = image.replace(/^\/+/, '');

    /**
     * URL Laravel pour les images stockées
     * dans storage/app/public.
     */
    const url =
      `http://127.0.0.1:8000/storage/${imagePath}`;

    console.log(
      'URL image générée :',
      url
    );

    return url;
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

}
