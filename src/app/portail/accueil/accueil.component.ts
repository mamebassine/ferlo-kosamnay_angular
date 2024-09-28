import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header/header.component";
import { FooterComponent } from "../../footer/footer/footer.component";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

}



