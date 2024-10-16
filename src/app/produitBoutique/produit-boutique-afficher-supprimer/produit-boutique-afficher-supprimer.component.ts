import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProduitBoutiqueService } from '../../services/produit-boutique.service';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component";

// Définition de l'interface directement dans le composant
export interface ProduitBoutique {
  id: number;
  produit_id: number;
  boutique_id: number;
  quantite: number;
  produit?: { id: number; nom: string };
  boutique?: { id: number; nom: string };
}

@Component({
  selector: 'app-produit-boutique-afficher-supprimer',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarAdminComponent],
  templateUrl: './produit-boutique-afficher-supprimer.component.html',
  styleUrls: ['./produit-boutique-afficher-supprimer.component.css']
})
export class ProduitBoutiqueAfficherSupprimerComponent implements OnInit {
  produitBoutiques: ProduitBoutique[] = [];

  constructor(private produitBoutiqueService: ProduitBoutiqueService) {} // Injection correcte

  ngOnInit(): void {
    this.loadProduitBoutiques();
    console.log(this.produitBoutiques);

  }

  loadProduitBoutiques(): void {
    this.produitBoutiqueService.getAll().subscribe(
      (data: ProduitBoutique[]) => {
        this.produitBoutiques = data;
      },
      (error: any) => { // Typage explicite
        console.error('Erreur lors du chargement des associations produit-boutique', error);
        console.log();
        console.log(this.produitBoutiques);
        
      }
    );
  }

  delete(id: number): void {
    this.produitBoutiqueService.delete(id).subscribe(
      () => {
        this.produitBoutiques = this.produitBoutiques.filter(pb => pb.id !== id);
      },
      (error: any) => { // Typage explicite
        console.error('Erreur lors de la suppression', error);
        console.log(this.produitBoutiques);

      }
    );
  }
}
