import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProduitBoutiqueService } from '../../services/produit-boutique.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component";

// Interface pour définir la structure d'un produit-boutique
export interface ProduitBoutique {
  id: number;
  produit_id: number;
  boutique_id: number;
  quantite: number;
  produit?: { id: number; nom: string };
  boutique?: { id: number; nom: string };
}
//imports: [CommonModule, RouterModule, NavbarAdminComponent],
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, NavbarAdminComponent],
  selector: 'app-produit-boutique-modifier',
  templateUrl: './produit-boutique-modifier.component.html',
  styleUrls: ['./produit-boutique-modifier.component.css']
})
export class ProduitBoutiqueModifierComponent implements OnInit {
  produitBoutiqueForm!: FormGroup; // Formulaire réactif pour l'édition
  produitBoutiqueId!: number; // ID du produit-boutique à modifier

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitBoutiqueService: ProduitBoutiqueService,
    private fb: FormBuilder // FormBuilder pour créer le formulaire
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID du produit-boutique depuis l'URL
    this.produitBoutiqueId = Number(this.route.snapshot.paramMap.get('id'));

    // Récupérer les données du produit-boutique à modifier
    this.produitBoutiqueService.getById(this.produitBoutiqueId).subscribe(
      (data: ProduitBoutique) => {
        // Initialiser le formulaire avec les données récupérées
        this.produitBoutiqueForm = this.fb.group({
          produit_id: [data.produit_id, Validators.required],
          boutique_id: [data.boutique_id, Validators.required],
          quantite: [data.quantite, [Validators.required, Validators.min(1)]]
        });
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des détails pour la modification', error);
      }
    );
  }

  // Méthode pour gérer la soumission du formulaire
  onSubmit(): void {
    if (this.produitBoutiqueForm.valid) {
      const updatedData: ProduitBoutique = {
        id: this.produitBoutiqueId,
        ...this.produitBoutiqueForm.value // Récupérer les valeurs du formulaire
      };
      
      // Appel au service pour mettre à jour le produit-boutique
      this.produitBoutiqueService.update(this.produitBoutiqueId, updatedData).subscribe(
        () => {
          console.log('Modification réussie');
          this.router.navigate(['/produitboutique']); // Rediriger après la modification
        },
        (error: any) => {
          console.error('Erreur lors de la modification', error);
        }
      );
    }
  }
}
