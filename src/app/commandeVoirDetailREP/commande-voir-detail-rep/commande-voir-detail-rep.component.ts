// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-commande-voir-detail-rep',
//   standalone: true,
//   imports: [],
//   templateUrl: './commande-voir-detail-rep.component.html',
//   styleUrl: './commande-voir-detail-rep.component.css'
// })
// export class CommandeVoirDetailREPComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';  
import { Location } from '@angular/common';
interface CommandeDetail {
  id: number;
  produit_boutique_id: number;
  ligne_commande_id: number;
  quantite: number;
  montant: string;
  lignesCommandes: any[];  // Adaptez le type si nécessaire pour 'lignesCommandes'
}
@Component({
standalone: true,
selector: 'app-commande-detail',
imports: [CommonModule],

templateUrl: './commande-voir-detail-rep.component.html',
  styleUrls: ['./commande-voir-detail-rep.component.css']
})

export class CommandeVoirDetailREPComponent implements OnInit {
  lignesCommandes: any[] = []; // Déclarez cette variable pour stocker les lignes de commande
  commande: any;
  

  constructor(
    private commandeService: CommandeService,
    private route: ActivatedRoute,
    private location: Location  //retour

  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.commandeService.getCommandeDetails(id).subscribe(
      data => {
        this.commande = data;
        console.log('Détails de la commande:', this.commande);
      },
      error => {
        console.error('Erreur lors de la récupération des détails de la commande', error);
      }
    );
  }
  
// Méthode pour revenir à la page précédente
goBack(): void {
  this.location.back();

  
}






  
  

  // getNom_completuser(userId: number): string {
  //   console.log('Recherche de l\'utilisateur avec ID:', userId);
  //   console.log('Lignes de commandes disponibles:', this.lignesCommandes);
    
  //   const user = this.lignesCommandes.find(ligne => ligne.user_id === userId);
  //   console.log('Utilisateur trouvé:', user);
  
  //   return user?.nom_complet ?? 'Nom inconnu';
  // }
  
}
