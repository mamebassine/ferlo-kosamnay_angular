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
  styleUrls: ['./categorie-ajouter.component.css']
})
export class CategorieAjouterComponent {
  nouvelleCategorie: Categorie = {
    nom_complet: '',
    description: ''
  };
  errorMessage: string = '';

  constructor(public router: Router, private categorieService: CategorieService) { } // Assure-toi que le service est injecté

  ajouterCategorie(): void {
    if (this.nouvelleCategorie.nom_complet.trim() === '') {
      this.errorMessage = 'Le nom complet est requis.';
      return;
    }

    this.categorieService. createCategorie(this.nouvelleCategorie).subscribe(
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
}
