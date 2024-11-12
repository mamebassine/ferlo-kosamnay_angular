// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-lignecommandemodifier-rep',
//   standalone: true,
//   imports: [],
//   templateUrl: './lignecommandemodifier-rep.component.html',
//   styleUrl: './lignecommandemodifier-rep.component.css'
// })
// export class LignecommandemodifierREPComponent {

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { LigneCommande } from '../../services/ligne-commande.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarRepresentComponent } from '../../navbar-represent/navbar-represent/navbar-represent.component';

@Component({
  imports: [FormsModule, CommonModule, NavbarRepresentComponent],
  standalone: true, 

  selector: 'app-lignecommandemodifier-rep',
  templateUrl: './lignecommandemodifier-rep.component.html',
  styleUrls: ['./lignecommandemodifier-rep.component.css']
})
export class LignecommandemodifierREPComponent {

  ligneCommande: LigneCommande = {
    user_id: 0,
    date: '',
    statut: '',
    quantite_totale: 0,
    prix_totale: 0
  };
  successMessage: string = '';
errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ligneCommandeService: LigneCommandeService
  ) {}
  onSubmit(): void {
    this.updateLigneCommande();
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLigneCommandeForEdit(id);
  }

  // Charger la ligne de commande pour la modifier
  loadLigneCommandeForEdit(id: number): void {
    this.ligneCommandeService.getLigneCommandeById(id).subscribe(
      (data) => {
        this.ligneCommande = data;
      },
      (error: any) => {
        this.errorMessage = 'Erreur lors de la récupération de la ligne de commande.';
      }
    );
  }

  
// Mettre à jour la ligne de commande
updateLigneCommande(): void {
  const id = Number(this.route.snapshot.paramMap.get('id')); // Récupère l'ID de l'URL
  if (!id) {
    this.errorMessage = 'L\'ID de la ligne de commande est invalide.';
    return;
  }
  
  this.ligneCommandeService.update(id, this.ligneCommande).subscribe(
    (response) => {
      this.successMessage = 'La ligne de commande a été mise à jour avec succès.';
      this.router.navigate(['/lignecommande/afficherREP']); 
    },
    (error) => {
      this.errorMessage = 'Erreur lors de la mise à jour de la ligne de commande.';
    }
  );
}
}



