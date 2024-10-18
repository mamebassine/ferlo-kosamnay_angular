import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header/header.component";
import { FooterComponent } from "../../footer/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

  export class AccueilComponent {
    temoignages = [
      {
        content: 'J’ai découvert leur site aujourd’hui. J’ai commandé et été livrée très rapidement. Le service est impeccable.',
        author: 'Rasha • Cliente',
      },
      {
        content: "J'adore ce service qui m'a toujours dépannée pour des cadeaux à la diaspora. Tout est bien emballé et le service client est prompt.",
        author: 'Aminata Sarr • Cliente',
      },
      {
        content: 'J’aime votre service parce que consommer localement c’est contribuer au développement du pays.',
        author: 'Assane Kane • Client',
      }
    ];
  
    activeTemoignageIndex = 0;
    intervalId: any;
  
    ngOnInit() {
      this.startAutoChange();
    }
  
    changeTestimonial(index: number) {
      this.activeTemoignageIndex = index;
      this.restartAutoChange();
    }
  
    startAutoChange() {
      this.intervalId = setInterval(() => {
        this.activeTemoignageIndex = 
          (this.activeTemoignageIndex + 1) % this.temoignages.length;
      }, 4000); // Changement toutes les 5 secondes
    }
  
    restartAutoChange() {
      clearInterval(this.intervalId);
      this.startAutoChange();
    }
  
    ngOnDestroy() {
      clearInterval(this.intervalId);
    }
  }
  