// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-produit-boutique-voir-detail',
//   standalone: true,
//   imports: [],
//   templateUrl: './produit-boutique-voir-detail.component.html',
//   styleUrl: './produit-boutique-voir-detail.component.css'
// })
// export class ProduitBoutiqueVoirDetailComponent {

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitBoutiqueService } from '../../services/produit-boutique.service';

export interface ProduitBoutique {
  id: number;
  produit_id: number;
  boutique_id: number;
  quantite: number;
  produit?: { id: number; nom: string };
  boutique?: { id: number; nom: string };
}
@Component({
  // imports: [ReactiveFormsModule,],

  selector: 'app-produit-boutique-voir-detail',
  templateUrl: './produit-boutique-voir-detail.component.html',
  styleUrls: ['./produit-boutique-voir-detail.component.css']
})
export class ProduitBoutiqueVoirDetailComponent implements OnInit {
  produitBoutique?: ProduitBoutique;

  constructor(
    private route: ActivatedRoute,
    private produitBoutiqueService: ProduitBoutiqueService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produitBoutiqueService.getById(id).subscribe(
      (data: ProduitBoutique) => {
        this.produitBoutique = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des détails', error);
      }
    );
  }
}
