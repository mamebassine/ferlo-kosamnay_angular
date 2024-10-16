import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitBoutiqueService } from '../../services/produit-boutique.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component"; // Importer ReactiveFormsModule

export interface ProduitBoutique {
  id: number;
  produit_id: number;
  boutique_id: number;
  quantite: number;
  produit?: { id: number; nom: string };
  boutique?: { id: number; nom: string };
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NavbarAdminComponent],
  selector: 'app-produit-boutique-ajouter',
  templateUrl: './produit-boutique-ajouter.component.html',
  styleUrls: ['./produit-boutique-ajouter.component.css']
})
export class ProduitBoutiqueAjouterComponent implements OnInit {
  produitBoutiqueForm!: FormGroup;

  constructor(
    private router: Router,
    private produitBoutiqueService: ProduitBoutiqueService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.produitBoutiqueForm = this.fb.group({
      produit_id: ['', Validators.required],
      boutique_id: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.produitBoutiqueForm.valid) {
      const newProduitBoutique: ProduitBoutique = {
        id: 0, // Supposé généré par le backend
        ...this.produitBoutiqueForm.value,
      };
      this.produitBoutiqueService.create(newProduitBoutique).subscribe(
        () => {
          console.log('Association ajoutée avec succès');
          this.router.navigate(['/produitboutique']);
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'association', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/produitboutique']); // Changez ceci pour la route souhaitée
  }
}
