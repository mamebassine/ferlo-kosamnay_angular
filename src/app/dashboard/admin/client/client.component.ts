// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common'; 

// @Component({
//   selector: 'app-client',
//   standalone: true,
//   imports: [CommonModule], 
//   templateUrl: './client.component.html',
//   styleUrls: ['./client.component.css'] 
// })
// export class ClientComponent {

// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService, Client } from '../../../services/client.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
    });
  }
  
}
