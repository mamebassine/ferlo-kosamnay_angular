// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-ligne-commande-voir-detail',
//   standalone: true,
//   imports: [],
//   templateUrl: './ligne-commande-voir-detail.component.html',
//   styleUrl: './ligne-commande-voir-detail.component.css'
// })
// export class LigneCommandeVoirDetailComponent {

// }



import { Component, OnInit } from '@angular/core';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component"; 

import { Location } from '@angular/common'; //Retour



@Component({
  //imports: [FormsModule, CommonModule, NavbarAdminComponent, AdminComponent],
  imports: [CommonModule, NavbarAdminComponent],

  standalone: true, 
  selector: 'app-ligne-commande-voir-detail',
  templateUrl: './ligne-commande-voir-detail.component.html',
  styleUrls: ['./ligne-commande-voir-detail.component.css']
})
export class LigneCommandeVoirDetailComponent implements OnInit {
  ligneCommande: any;
  messageErreur: string | null = null;
  nom_complet: string | null = null; 

  constructor(
    private ligneCommandeService: LigneCommandeService,
    private route: ActivatedRoute,

    private location: Location  //retour
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ligneCommandeService.getLigneCommandeById(id).subscribe(
      (data) => {
        this.ligneCommande = data;
        if (data && data.user_id) {
          this.fetchUserFullName(data.user_id); 
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement de la ligne de commande', error);
        this.messageErreur = 'Erreur lors du chargement de la ligne de commande.';
      }
    );
  }

  fetchUserFullName(userId: number): void {
    this.ligneCommandeService.getUserById(userId).subscribe(
      (user: any) => {
        this.nom_complet = user.nom_complet || 'Nom inconnu';
      },
      (error: any) => {
        console.error('Erreur lors du chargement du nom complet de l\'utilisateur', error);
        this.nom_complet = 'Nom inconnu';
      }
    );
  }

  
// Méthode pour revenir à la page précédente
goBack(): void {
  this.location.back();

  
}
}
