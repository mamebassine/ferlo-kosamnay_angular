// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-ligne-commande-voir-detail',
//   standalone: true,
//   imports: [],
//   templateUrl: './ligne-commande-voir-detail.component.html',
//   styleUrl: './ligne-commande-voir-detail.component.css'
// })
// export class LigneCommandeVoirDetailComponent {

// }



import { Component, OnInit } from '@angular/core';
import { LigneCommandeService } from '../../services/ligne-commande.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ligne-commande-voir-detail',
  templateUrl: './ligne-commande-voir-detail.component.html',
  styleUrls: ['./ligne-commande-voir-detail.component.css']
})
export class LigneCommandeVoirDetailComponent implements OnInit {
  ligneCommande: any;
  messageErreur: string | null = null;

  constructor(
    private ligneCommandeService: LigneCommandeService,
    private route: ActivatedRoute
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
}
