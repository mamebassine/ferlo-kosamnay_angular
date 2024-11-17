import { Component } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Ajoutez cet import
import { Location } from '@angular/common';
import { HeaderComponent } from "../header/header/header.component"; // Assurez-vous que l'import est bien là
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { FooterComponent } from '../footer/footer/footer.component';

@Component({
  selector: 'app-uservoirdetailcommande',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, HeaderComponent],
  templateUrl: './uservoirdetailcommande.component.html',
  styleUrls: ['./uservoirdetailcommande.component.css'] // Corrigé ici
})

export class UservoirdetailcommandeComponent {

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
      (data: any) => {  // Spécification du type de 'data'
        this.commande = data;
        console.log('Détails de la commande:', this.commande);
      },
      (error: any) => {  // Spécification du type d' 'error'
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
