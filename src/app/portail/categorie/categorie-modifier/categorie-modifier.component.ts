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
  errorMessage: string = '';

  constructor(
    public router: Router, 
    private route: ActivatedRoute,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.categorieId = Number(this.route.snapshot.paramMap.get('id')); // Récupérer l'ID de la catégorie depuis l'URL
    console.log('ID de la catégorie récupéré :', this.categorieId);
    this.getCategorie(); // Appel de la méthode pour charger les données de la catégorie
  }

  getCategorie(): void {
    this.categorieService.getCategorie(this.categorieId).subscribe(
      (categorie: Categorie) => {
        this.categorie = categorie; // Charger les données de la catégorie
        console.log('Catégorie récupérée :', this.categorie);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la catégorie:', error);
        this.errorMessage = `Impossible de récupérer la catégorie : ${error.message}`;

        
      }
    );
  }

  modifierCategorie(): void {
    // Réinitialiser le message d'erreur
    this.errorMessage = '';
  
    // Définir les motifs de validation pour les champs
    const nomCompletPattern = /^[a-zA-Z\s]*$/; // Autorise les lettres et les espaces
    const descriptionPattern = /^[a-zA-Z\s]*$/; // Autorise les lettres et les espaces
    
    
    // Validation de l'entrée
    if (this.categorie.nom_complet.trim() === '') {
      this.errorMessage = 'Le nom complet est requis.';
      console.log('Erreur : Le nom complet est requis.');
      return;
    } else if (!nomCompletPattern.test(this.categorie.nom_complet)) {
      this.errorMessage = 'Le nom complet doit contenir uniquement des lettres et des espaces.';
      console.log('Erreur :', this.errorMessage);
      return;
    }
  
    if (this.categorie.image.trim() === '') {
      this.errorMessage = 'L\'URL de l\'image est requise.';
      console.log('Erreur : L\'URL de l\'image est requise.');
      return;
    }
  
    if (this.categorie.description && !descriptionPattern.test(this.categorie.description)) {
      this.errorMessage = 'La description doit contenir uniquement des lettres, des espaces, et des caractères accentués.';
      console.log('Erreur : La description contient des caractères invalides.');
      return;
    }
  
    console.log('Données de la catégorie à modifier :', this.categorie);
  
    // Appel au service pour mettre à jour la catégorie
    this.categorieService.updateCategorie(this.categorieId, this.categorie).subscribe(
      () => {
        console.log('Catégorie modifiée avec succès :', this.categorie);
        // Redirection après la modification réussie
        this.router.navigate(['/categorie']);
      },
      (error: any) => {
        console.log('Catégorie modifiée avec succès :', this.categorie);
        this.router.navigate(['/categorie']);



        console.error('Erreur lors de la modification de la catégorie', error);
        
        // Gestion des messages d'erreur basés sur le type d'erreur
        if (error.status === 404) {
          this.errorMessage = 'Catégorie non trouvée.';

          
          console.log('Erreur 404 : Catégorie non trouvée.');
        } else if (error.status === 400) {
          this.errorMessage = 'Données invalides.';
          console.log('Erreur 400 : Données invalides.');
          if (error.error && error.error.message) {

        } else {
          this.errorMessage = error.error.message; // Affiche le message d'erreur renvoyé par le backend
          console.log('Erreur : Impossible de modifier la catégorie.');
        }
      }
      }
    );
  }
  
}
