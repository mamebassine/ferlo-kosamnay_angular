import { Component, OnInit } from '@angular/core';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ligne-commande-modifier',
  templateUrl: './ligne-commande-modifier.component.html',
  styleUrls: ['./ligne-commande-modifier.component.css']
})
export class LigneCommandeModifierComponent implements OnInit {
  ligneCommande: any = {
    id: null,
    user_id: 0,
    date: '',
    statut: '',
    quantite_totale: 0,
    prix_totale: 0
  };
  messageErreur: string | null = null;

  constructor(
    private ligneCommandeService: LigneCommandeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ligneCommandeService.getLigneCommandeById(id).subscribe(
      (data) => {
        this.ligneCommande = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de la ligne de commande', error);
        this.messageErreur = 'Erreur lors du chargement de la ligne de commande.';
      }
    );
  }

  modifierLigneCommande(): void {
    if (this.ligneCommande.id) {
      this.ligneCommandeService.updateLigneCommande(this.ligneCommande.id, this.ligneCommande).subscribe(
        () => {
          this.router.navigate(['/lignecommande']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la ligne de commande', error);
          this.messageErreur = 'Erreur lors de la mise à jour de la ligne de commande.';
        }
      );
    } else {
      this.messageErreur = 'ID de la ligne de commande non valide.';
    }
  }
}
