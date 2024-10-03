// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-ligne-commande-afficher-supprimer',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './ligne-commande-afficher-supprimer.component.html',
// //   styleUrl: './ligne-commande-afficher-supprimer.component.css'
// // })
// // export class LigneCommandeAfficherSupprimerComponent {

// // }


// import { Component, OnInit } from '@angular/core';
// import { LigneCommandeService } from '../../ligne-commande.service';

// @Component({
//   selector: 'app-ligne-commande',
//   templateUrl: './ligne-commande.component.html',
//   styleUrls: ['./ligne-commande.component.css']
// })
// export class LigneCommandeComponent implements OnInit {
//   lignesCommandes: any[] = [];

//   constructor(private ligneCommandeService: LigneCommandeService) {}

//   ngOnInit(): void {
//     this.getLignesCommandes();
//   }

//   // Récupérer toutes les lignes de commande
//   getLignesCommandes(): void {
//     this.ligneCommandeService.getLignesCommandes().subscribe(
//       (data) => {
//         this.lignesCommandes = data;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des lignes de commande:', error);
//       }
//     );
//   }

//   // Supprimer une ligne de commande
//   supprimerLigneCommande(id: number): void {
//     this.ligneCommandeService.deleteLigneCommande(id).subscribe(() => {
//       this.lignesCommandes = this.lignesCommandes.filter(ligne => ligne.id !== id);
//     });
//   }
// }
