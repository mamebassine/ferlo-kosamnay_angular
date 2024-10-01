import { Component } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BoutiqueService, Boutique } from '../../services/boutique.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,],
  selector: 'app-boutique-ajouter',
  templateUrl: './boutique-ajouter.component.html',
  styleUrls: ['./boutique-ajouter.component.css']
})
export class BoutiqueAjouterComponent {
  // Modèle pour la nouvelle boutique
  nouvelleBoutique: Boutique = {
    nom: '',
    adresse: '',
    telephone: '',
    region_id: 0
  };

  // Messages d'erreur
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private boutiqueService: BoutiqueService, private router: Router) { }

  // Soumission du formulaire
  onSubmit(): void {
    // Validation basique
    if (this.nouvelleBoutique.nom && this.nouvelleBoutique.adresse && this.nouvelleBoutique.telephone && this.nouvelleBoutique.region_id) {
      this.boutiqueService.addBoutique(this.nouvelleBoutique).subscribe(
        response => {
          this.successMessage = response.message;
          // Redirection après ajout
          setTimeout(() => {
            this.router.navigate(['/boutique']);
          }, 2000);
        },
        error => {
          this.errorMessage = error;
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
    }
  }
}
