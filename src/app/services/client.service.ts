// import { Injectable } from '@angular/core';
// import { apiUrl } from './apiUrl';


// @Injectable({
//   providedIn: 'root'
// })
// export class ClientService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Client {
  id: number;
  nom: string;
  email: string;
  dateInscription: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor() {}

  // Simuler une récupération de données depuis une API
  getClients(): Observable<Client[]> {
    const clients: Client[] = [
     
      

      
    ];
    return of(clients); // Retourne un Observable
  }
}
