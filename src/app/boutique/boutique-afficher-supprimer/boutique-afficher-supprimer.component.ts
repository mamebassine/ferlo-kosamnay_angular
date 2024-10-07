// src/app/boutique/boutique-afficher-supprimer/boutique-afficher-supprimer.component.ts

import { Component, OnInit } from '@angular/core';
import { BoutiqueService, Boutique } from '../../services/boutique.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importer Router
import { RouterModule } from '@angular/router'; // Importez RouterModule

@Component({
  selector: 'app-boutique-afficher-supprimer',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './boutique-afficher-supprimer.component.html',
  styleUrls: ['./boutique-afficher-supprimer.component.css']
})
export class BoutiqueAfficherSupprimerComponent implements OnInit {
  boutiques: Boutique[] = [];
  errorMessage: string = '';

  constructor(private boutiqueService: BoutiqueService, private router: Router) { }

  ngOnInit(): void {
    this.getBoutiques();
  }

  // Récupère toutes les boutiques
  getBoutiques(): void {
    this.boutiqueService.getBoutiques().subscribe(
      response => {
        this.boutiques = response.boutiques;
        console.log(this.boutiques);
        
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  // Supprime une boutique
  deleteBoutique(id: number | undefined): void {
    if (id !== undefined && confirm('Êtes-vous sûr de vouloir supprimer cette boutique?')) {
      this.boutiqueService.deleteBoutique(id).subscribe(
        response => {
          alert(response.message);
          this.getBoutiques(); // Rafraîchit la liste après suppression
        },
        error => {
          this.errorMessage = error;
        }
      );
    }
  }

  // Méthodes de navigation
  goToDetail(id: number): void {
    this.router.navigate(['/boutique/detail', id]);
  }

  goToModifier(id: number): void {
    this.router.navigate(['/boutique/modifier', id]);
  }

  goToAjouter(): void {
    this.router.navigate(['/boutique/ajouter']);
  }
}