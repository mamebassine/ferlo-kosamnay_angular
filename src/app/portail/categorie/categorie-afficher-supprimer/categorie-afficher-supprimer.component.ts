import { Component, OnInit } from '@angular/core';
import { CategorieService, Categorie } from '../../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from "../../../header/header/header.component";
import { FooterComponent } from "../../../footer/footer/footer.component";
import { FormsModule } from '@angular/forms';  



@Component({
  selector: 'app-categorie-afficher-supprimer',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './categorie-afficher-supprimer.component.html',
  styleUrls: ['./categorie-afficher-supprimer.component.css']
})
export class CategorieAfficherSupprimerComponent implements OnInit {

  categories: Categorie[] = [];
  errorMessage: string = '';
  searchTerm: string = ''; 


  constructor(private categorieService: CategorieService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data: Categorie[]) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des catégories', error);
        this.errorMessage = 'Impossible de charger les catégories.';
      }
    );
  }

// recherche() conçue pour exécuter une action
rechercher(): void { //Nom de la methodes void ne renvoi rien
  console.log('Recherche effectuée avec le terme:', this.searchTerm);
}

  deleteCategorie(id: number | undefined): void {
    if (id === undefined) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categorieService.deleteCategorie(id).subscribe(
        () => {
          this.categories = this.categories.filter(cat => cat.id !== id);
        },
        (error: any) => {
          console.error('Erreur lors de la suppression de la catégorie', error);
          this.errorMessage = 'Impossible de supprimer la catégorie.';
        }
      );
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/categories/create']);
  }

  navigateToEdit(id: number | undefined): void {
    if (id === undefined) return; // Vérifie si l'ID est défini
    this.router.navigate(['categories/edit', id]); // Redirige vers la page d'édition de la catégorie
  }
  



  // Filtre les produits en fonction du terme de recherche
  get categoriesFiltres(): Categorie[] {
    if (!this.searchTerm) {
      return this.categories; // Retourne tous les produits si aucun terme de recherche n'est saisi
    }
    return this.categories.filter(produit =>
      produit.nom_complet.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filtre les produits
    );
  }
}
