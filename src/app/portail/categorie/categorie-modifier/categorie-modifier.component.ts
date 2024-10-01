// src/app/portail/categorie/categorie-modifier/categorie-modifier.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieService, Categorie } from '../../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importer FormsModule

@Component({
  selector: 'app-categorie-modifier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorie-modifier.component.html',
  styleUrls: ['./categorie-modifier.component.css']
})
export class CategorieModifierComponent implements OnInit {
  categorieId!: number; // ID de la catégorie à modifier
  categorie: Categorie = {
    image: '',
   nom_complet: '',
    description: ''
  };
  errorMessage: string = '';

  constructor(
    public router: Router, // Changer ici pour rendre le router public
    private route: ActivatedRoute,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.categorieId = Number(this.route.snapshot.paramMap.get('id')); // Récupérer l'ID de la catégorie depuis l'URL
    this.getCategorie(); // Appel de la méthode pour charger les données de la catégorie
  }

  getCategorie(): void {
    this.categorieService.getCategorie(this.categorieId).subscribe(
      (categorie: Categorie) => {
        this.categorie = categorie; // Charger les données de la catégorie
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la catégorie', error);
        this.errorMessage = 'Impossible de récupérer la catégorie.';
      }
    );
  }
  modifierCategorie(): void {
    // Validation de l'entrée
    if (this.categorie.nom_complet.trim() === '') {
      this.errorMessage = 'Le nom complet est requis.';
      return;
    }
  
    // Appel au service pour mettre à jour la catégorie
    this.categorieService.updateCategorie(this.categorieId, this.categorie).subscribe(
      () => {
        // Redirection après la modification réussie
        this.router.navigate(['/categorie']);
      },
      (error: any) => {
        console.error('Erreur lors de la modification de la catégorie', error);
        
        // Gestion des messages d'erreur basés sur le type d'erreur
        if (error.status === 404) {
          this.errorMessage = 'Catégorie non trouvée.';
        } else if (error.status === 400) {
          this.errorMessage = 'Données invalides.';
        } else {
          this.errorMessage = 'Impossible de modifier la catégorie.';
        }
      }
    );
  }
  
}
