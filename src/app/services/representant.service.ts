// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RepresentantService } from '../../services/representant.service';
import { apiUrl } from './apiUrl';


// @Component({
//   selector: 'app-representant',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './representant.component.html',
//   styleUrls: ['./representant.component.css']
// })
// export class RepresentantComponent implements OnInit {
//   // Exemple de cartes avec du contenu dynamique (vous pouvez les remplacer par de vraies données)
//   cards = [
//     { title: 'Ventes Totales', value: 150, icon: 'shopping_cart' },
//     { title: 'Clients Actifs', value: 75, icon: 'people' },
//     { title: 'Commandes En Cours', value: 23, icon: 'pending' }
//   ];

//   // Liste des emails reçus pour les commandes
//   receivedEmails: string[] = [];

//   constructor(private representantService: RepresentantService) {}

//   ngOnInit(): void {
//     // Appel du service pour obtenir la liste des emails (simulation)
//     this.representantService.getReceivedEmails().subscribe(emails => {
//       this.receivedEmails = emails;
//     });
//   }
// }
