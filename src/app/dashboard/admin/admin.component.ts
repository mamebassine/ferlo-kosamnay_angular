import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import AdminService when you're ready to use it
// import { AdminService } from '../../services/admin.service';

// Interface for Card structure
interface Card {
  title: string;
  value: string | number;
  color: string;
  position: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cards: Card[] = [];

  ngOnInit(): void {
    // Initialize sample card data
    this.cards = [
      { title: 'Total Users', value: 1000, color: '#007bff', position: 'top-left' },
      { title: 'Active Orders', value: 500, color: '#dc3545', position: 'top-right' },
      { title: 'Revenue', value: '$10,000', color: '#28a745', position: 'bottom-left' },
      { title: 'New Products', value: 50, color: '#ffc107', position: 'bottom-right' }
    ];
  }
}
