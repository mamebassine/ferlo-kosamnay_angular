// src/app/portail/produit/produit-voir-detail/produit-voir-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService, Produit } from '../../../services/produit.service';

import { CategorieService, Categorie } from '../../../services/categorie.service'; // Assurez-vous d'avoir ce service
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-produit-voir-detail',
  templateUrl: './produit-voir-detail.component.html',
  styleUrls: ['./produit-voir-detail.component.css'],
  
  imports: [
    CommonModule,
    FormsModule
  ]

})

export class ProduitVoirDetailComponent implements OnInit {
  produitId!: number;
  produit!: Produit;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduit();
  }

  getProduit(): void {
    this.produitService.getProduit(this.produitId).subscribe(
      (data: Produit) => {
        this.produit = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du produit', error);
        this.errorMessage = 'Produit non trouvé ou une erreur est survenue.';
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/produit']);
  }
}
