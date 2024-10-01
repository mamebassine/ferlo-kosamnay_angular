import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header/header.component";
import { FooterComponent } from "../../footer/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']  
})
export class DashboardComponent {
}










