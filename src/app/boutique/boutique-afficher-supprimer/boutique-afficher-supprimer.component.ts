import { Component, OnInit } from '@angular/core';
import { BoutiqueService, Boutique } from '../../services/boutique.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
 selector: 'app-boutique-afficher-supprimer',
  imports: [CommonModule],
 standalone: true,
 templateUrl: './boutique-afficher-supprimer.component.html',
  styleUrls: ['./boutique-afficher-supprimer.component.css']
})
export class BoutiqueAfficherSupprimerComponent implements OnInit {
  boutiques: Boutique[] = [];
  errorMessage: string = '';

  constructor(private boutiqueService: BoutiqueService) { }

  ngOnInit(): void {
    this.getBoutiques();
  }

  // Récupère toutes les boutiques
  getBoutiques(): void {
    this.boutiqueService.getBoutiques().subscribe(
      response => {
        this.boutiques = response.boutiques;
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
}
