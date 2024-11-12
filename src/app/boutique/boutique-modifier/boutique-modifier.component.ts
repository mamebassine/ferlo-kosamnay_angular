import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';  // Notez que Validators n'est plus importé
import { BoutiqueService } from '../../services/boutique.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component";

import Swal from 'sweetalert2';


@Component({
  standalone: true,
  selector: 'app-boutique-modifier',
  templateUrl: './boutique-modifier.component.html',
  styleUrls: ['./boutique-modifier.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NavbarAdminComponent]
})
export class BoutiqueModifierComponent implements OnInit {
  boutique: any = {}; // Déclaration de l'objet boutique
  form!: FormGroup; // Déclaration du formulaire
  regions: any[] = []; // Liste des régions
  users: any[] = []; // Liste des utilisateurs

  constructor(
    private route: ActivatedRoute, // Pour accéder aux paramètres de l'URL
    private router: Router, // Pour naviguer entre les pages
    private fb: FormBuilder, // Pour créer et manipuler le formulaire réactif
    private boutiqueService: BoutiqueService // Service pour interagir avec l'API de la boutique
  ) {}

  // Méthode pour annuler l'action et revenir à la liste des boutiques
  cancel(): void {
    Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous allez annuler les modifications!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, annuler!',
        cancelButtonText: 'Non, revenir'
    }).then((result) => {
        if (result.isConfirmed) {
            this.router.navigate(['/boutiques']);
        }
    });
}


  // Méthode exécutée au moment de l'initialisation du composant
  ngOnInit(): void {
    // Création du formulaire sans validations
    this.form = this.fb.group({
      nom: [''], // Champ sans validation
      adresse: [''], // Champ sans validation
      telephone: [''], // Champ sans validation
      region_id: [''], // Champ sans validation
      user_id: [''], // Champ sans validation
      representant: [''] // Champ sans validation
    });

    // Récupération de l'ID de la boutique depuis l'URL
    this.route.params.subscribe(params => {
      const id = +params['id']; // Conversion en nombre
      if (id) {
        this.loadBoutique(id); // Si un ID est fourni, charger la boutique
      }
    });

    this.loadRegions();  // Chargement des régions
    this.loadUsers();    // Chargement des utilisateurs
  }

  // Méthode pour charger une boutique spécifique à partir de l'ID
  loadBoutique(id: number): void {
    this.boutiqueService.getBoutique(id).subscribe(
      response => {
        this.boutique = response.boutique || response; // Récupération des données de la boutique
        console.log('Données de la boutique récupérées:', this.boutique);

        // Remplissage du formulaire avec les données de la boutique
        this.form.patchValue({
          nom: this.boutique.nom,
          adresse: this.boutique.adresse,
          telephone: this.boutique.telephone,
          region_id: this.boutique.region_id,
          user_id: this.boutique.user_id,
          representant: this.boutique.representant 
        });
      },
      error => {
        console.error('Erreur lors du chargement de la boutique:', error);
      }
    );
  }

  // Méthode pour charger la liste des régions
  loadRegions(): void {
    this.boutiqueService.getRegions().subscribe(
      (regions) => {
        this.regions = regions; // Stocke les régions dans la variable regions
      },
      (error) => {
        console.error('Erreur lors du chargement des régions:', error);
      }
    );
  }

  // Méthode pour charger la liste des utilisateurs
  loadUsers(): void {
    this.boutiqueService.getRepresentants().subscribe(
        (users) => {
            this.users = users; // Stocke les utilisateurs dans la variable users
            console.log('Représentants chargés:', this.users);
        },
        (error) => {
            console.error('Erreur lors du chargement des représentants:', error);
        }
    );
  }

  submitForm(): void {
    // Fusion des données de la boutique et du formulaire
    const updatedBoutique = { ...this.boutique, ...this.form.value };
    console.log('Données envoyées à l\'API:', updatedBoutique);

    // Appel à l'API pour mettre à jour la boutique
    this.boutiqueService.updateBoutique(this.boutique.id, updatedBoutique).subscribe(
      response => {
        console.log('Réponse de l\'API:', response);

        // Afficher SweetAlert2 en cas de succès
        Swal.fire({
          icon: 'success',
          title: 'Boutique mise à jour avec succès',
          showConfirmButton: false,
          timer: 1500
        });

        // Redirection vers la liste des boutiques après le succès
        this.router.navigate(['/boutique']);
      },
      error => {
        console.error('Erreur de mise à jour:', error);

        // Afficher SweetAlert2 en cas d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la mise à jour de la boutique',
          text: 'Veuillez vérifier les informations et réessayer.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

}
