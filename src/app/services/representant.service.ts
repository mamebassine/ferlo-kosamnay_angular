

  import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';  

@Injectable({
  providedIn: 'root'
})
export class RepresentantService {

  constructor(private http: HttpClient) {}

  ajouterRepresentant(data: any): Observable<any> {

    //private apiUrl = 'http://localhost:8000/api/representants';

    //private apiUrl = "https://ferlo-kosamnay.mamebassine06.simplonfabriques.com/api/representants";
       

    // Utilisation de l'URL importée
    return this.http.post<any>(`${apiUrl}/representants`, data);
  }
}

























// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RepresentantService } from '../../services/representant.service';
//import { apiUrl } from './apiUrl';


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
