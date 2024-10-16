// Importations nécessaires
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import de HttpClientModule
import { Router } from '@angular/router';
import { BoutiqueService, Boutique } from '../../services/boutique.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { regionService, region } from '../../services/region.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component"; // Import pour typer les erreurs

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavbarAdminComponent],
  selector: 'app-boutique-ajouter',
  templateUrl: './boutique-ajouter.component.html',
  styleUrls: ['./boutique-ajouter.component.css']
})
export class BoutiqueAjouterComponent implements OnInit {
  // Modèle pour la nouvelle boutique
  nouvelleBoutique: Boutique = {
    nom: '',
    adresse: '',
    telephone: '',
    region_id: '',
    user_id: '',
    representant: '', // Initialisation avec une chaîne vide
  };

  // Listes pour les dropdowns
  users: User[] = []; // Tableau pour stocker les utilisateurs
  region: region[] = []; // Tableau pour stocker les régions

  // Messages d'erreur
  errorMessage: string = '';
  successMessage: string = '';

  // Injecter les services nécessaires via le constructeur
  constructor(
    private boutiqueService: BoutiqueService,
    private authService: AuthService, // Injection du UserService
    private regionService: regionService, // Injection du adresseService
    private router: Router
  ) { }

  // Implémentation de l'interface OnInit
  ngOnInit(): void {
    this.fetchUsers(); // Récupérer les utilisateurs au démarrage
    this.fetchregions(); // Récupérer les régions au démarrage
  }

  // Méthode pour récupérer les utilisateurs
  fetchUsers(): void {
    this.authService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data; // Assignation des données reçues au tableau users
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des utilisateurs fiii.'; // Message d'erreur en cas de problème
        console.error(error); // Afficher l'erreur dans la console
        console.log('Détails de la nouvelle utilisateur:', this.nouvelleBoutique);

      }
    );
  }

  fetchregions(): void {
    this.regionService.getAllregions().subscribe(
      (data: region[]) => {
        this.region = data; // Assignation des données reçues au tableau adresses
      },
      (error: HttpErrorResponse) => { // Typage explicite de 'error'
        this.errorMessage = 'Erreur lors de la récupération des régions.'; // Message d'erreur en cas de problème
        console.error(error); // Afficher l'erreur dans la console
        console.log('Détails de la nouvelle boutique:', this.nouvelleBoutique);

      }
    );
  }


  // Soumission du formulaire
  onSubmit(): void {
    // Vérifier que tous les champs requis sont remplis
    if (
      this.nouvelleBoutique.nom &&
      this.nouvelleBoutique.adresse &&
      this.nouvelleBoutique.telephone &&
      this.nouvelleBoutique.region_id !== '' &&
      this.nouvelleBoutique.user_id
    ) {
      // Appeler le service pour ajouter la boutique
      this.boutiqueService.addBoutique(this.nouvelleBoutique).subscribe(
        response => {
          this.successMessage = response.message; // Message de succès
          // Redirection après ajout avec un délai de 2 secondes
          setTimeout(() => {
            this.router.navigate(['/boutique']); // Naviguer vers la liste des boutiques
          }, 2000);
        },
        error => {
          this.errorMessage = error; // Message d'erreur en cas de problème lors de l'ajout
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.'; // Message d'erreur si des champs sont manquants
      // Ajout d'un log pour débogage
      console.log('Détails de la nouvelle boutique:', this.nouvelleBoutique);
    }
  }
}
