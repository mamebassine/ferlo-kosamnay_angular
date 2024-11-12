import { Component, OnInit } from '@angular/core';
import { LigneCommande, LigneCommandeService } from '../../services/ligne-commande.service';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-ligne-commande-ajouter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ligne-commande-ajouter.component.html',
  styleUrls: ['./ligne-commande-ajouter.component.css']
})
export class LigneCommandeAjouterComponent implements OnInit {
  loading: boolean = false; // Initialisez 'loading' ici


  // Propriété indiquant si le formulaire a été soumis
  submitted = false;
messageSucces: string = ''; // Ajoutez cette ligne pour éviter l'erreur
// Propriétés pour stocker les données
  ligne_commandes: LigneCommande[] = []; 
  users: any[] = []; 

  // Propriété pour stocker les informations de la nouvelle ligne de commande
  nouvelleLigneCommande: LigneCommande = {
    user_id: 0,
    date: '',
    statut: 'en attente',
    quantite_totale: 0,
    prix_totale: 0
    // client: '' // Initialisation avec une chaîne vide
  };// Message d'erreur en cas de problème
  messageErreur: string | null = null;

  constructor(private ligneCommandeService: LigneCommandeService, private router: Router) {}

  // Méthode exécutée lors de l'initialisation du composant
  ngOnInit(): void {

    // Récupérer la liste des lignes de commande via le service
    this.ligneCommandeService.getLignesCommandes().subscribe(
      (data: LigneCommande[]) => { // Déclaration du type
        this.ligne_commandes = data;
        console.log('Ligne commandes:', this.ligne_commandes);
      },
      (error: any) => { // Déclaration du type
        console.error('Erreur lors du chargement des commandes:', error);
      }
    );


  }
  // Méthode pour ajouter une nouvelle ligne de commande
  ajouterLigneCommande(): void {
    this.submitted = true;
    this.loading = true; // Afficher le loader
    // console.log('Loader affiché:', this.loading); // Ajoutez ceci


  
  console.log('Données de la nouvelle ligne de commande:', this.nouvelleLigneCommande);
  
    this.ligneCommandeService.createLigneCommande(this.nouvelleLigneCommande).subscribe(
      () => {
        console.log('Ligne de commande ajoutée avec succès !');
        this.router.navigate(['lignecommande']);
      },
      (error: any) => {
        console.error('Erreur lors de la création de la ligne de commande:', error);
        if (error.status === 422) {
          this.messageErreur = 'Erreur de validation: ' + JSON.stringify(error.error.errors);
        } else {
          this.messageErreur = 'Une erreur est survenue lors de l\'ajout de la ligne de commande.';
        }
      },
      () => {
        this.loading = false; // Cacher le loader à la fin
        console.log('Loader caché:', this.loading); // Ajoutez ceci

      }
    );
  }
  


  
  
}
