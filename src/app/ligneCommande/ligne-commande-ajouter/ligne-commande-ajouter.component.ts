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
  // Propriété indiquant si le formulaire a été soumis
  submitted = false;
  
  // Propriétés pour stocker les données
  ligne_commandes: LigneCommande[] = []; 
  users: any[] = []; 

  // Propriété pour stocker les informations de la nouvelle ligne de commande
  nouvelleLigneCommande: LigneCommande = {
    produit_boutique_id: 0,
    user_id: '',
    date: '',
    statut: 'en attente',
    quantite_totale: 0,
    prix_totale: 0
    // client: '' // Initialisation avec une chaîne vide
  };

  // Message d'erreur en cas de problème
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

    // Charger les utilisateurs
    this.ligneCommandeService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data; // Assignez les utilisateurs à la propriété
        console.log(this.users);
        
      },
      (error: any) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    );

  }
  

  // Méthode pour ajouter une nouvelle ligne de commande
  ajouterLigneCommande(): void {
    this.submitted = true;

    // Validation pour s'assurer que certains champs obligatoires sont remplis
    if (!this.nouvelleLigneCommande.produit_boutique_id || !this.nouvelleLigneCommande.user_id) {
      return; // Ne pas soumettre si des champs sont manquants
    }

    // Affichage des données avant l'appel API pour débogage
    console.log('Données de la nouvelle ligne de commande:', this.nouvelleLigneCommande);

    // Appel du service pour créer une nouvelle ligne de commande
    this.ligneCommandeService.createLigneCommande(this.nouvelleLigneCommande).subscribe(
      () => {
        console.log('Ligne de commande ajoutée avec succès !');
        this.router.navigate(['lignecommande']); // Rediriger vers la liste des commandes après succès
      },
      (error: any) => { // Déclaration du type
        console.error('Erreur lors de la création de la ligne de commande:', error);
        this.messageErreur = 'Une erreur est survenue lors de l\'ajout de la ligne de commande.';
      }
    );
  }
}
