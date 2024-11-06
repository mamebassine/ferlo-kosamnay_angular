import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component";
import { CommandeService } from '../../services/commande.service';
import { HttpClientModule } from '@angular/common/http';
interface Card {
  title: string;
  value: string | number;
  color: string;
  position: string;
  iconClass?: string; // Add iconClass property

}
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HttpClientModule,
    CommonModule, RouterModule, NavbarAdminComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cards: Card[] = [];
  commandes: any[] = [];

  nombreProduits: number = 0; // Pour stocker le nombre de produits
  produitPlusCommande: string = ''; // Pour stocker le nom du produit le plus commandé
  nombreBoutiques: number = 0; // Propriété pour stocker le nombre de boutiques
  nombreRepresentants: number = 0; // Propriété pour stocker le nombre de représentants


constructor(private commandeService: CommandeService) {}
  
  ngOnInit(): void {
    this.loadCommandes(); // Charge les commandes ici pour les afficher sur le dashboard
    this.loadNombreProduits(); // Charge le nombre de produits et charge les cartes après
    this.loadProduitPlusCommande(); // Charge le produit le plus commandé
    this.loadNombreBoutiques(); // Charge le nombre de boutiques au démarrage
    this.loadNombreRepresentants(); // Charge le nombre de représentants au démarrage

  }

// Nombre Produits
  loadNombreProduits(): void {
    this.commandeService.getNombreProduits().subscribe(
      (data) => {
        this.nombreProduits = data.nombre_produits; // Extraire la valeur de "nombre_produits"
        console.log('nombre', this.nombreProduits); // Assurez-vous qu'il affiche 13
        this.loadCards(); // Charger les cartes après avoir obtenu le nombre de produits
      },
      (error) => {
        console.log('Erreur lors de la récupération du nombre de produits', error);
      }
    );
  }
  // Produit Plus Commande
loadProduitPlusCommande(): void {
    this.commandeService.getproduitPlusCommande().subscribe(
      (data) => {
        this.produitPlusCommande = data.produit.nom; // Récupère le nom du produit
        this.loadCards(); // Charger les cartes après avoir obtenu le produit le plus commandé
      },
      (error) => {
        
        console.log('Erreur lors de la récupération du produit le plus commandé', error);
      }
    );
  }
  
// Nombre Boutiques
  loadNombreBoutiques(): void {
    this.commandeService.getnombreBoutiquesActuelles().subscribe(
      (data) => {
        this.nombreBoutiques = data.nombre_boutiques; // Récupère la valeur de 'nombre_boutiques'
        this.loadCards(); // Met à jour les cartes après avoir reçu le nombre de boutiques
      },
      (error) => {
        console.log('Erreur lors de la récupération du nombre de boutiques', error);
      }
    );
  }

// Nombre Representants
  loadNombreRepresentants(): void {
    this.commandeService.getNombreTotalRepresentants().subscribe(
      (data) => {
        this.nombreRepresentants = data.total_representants; // Récupère la valeur de 'total_representants'
        this.loadCards(); // Met à jour les cartes après avoir reçu le nombre de représentants
      },
      (error) => {
        console.log('Erreur lors de la récupération du nombre de représentants', error);
      }
    );
  }


  loadCards(): void {
    this.cards = [
      {
        title: 'Nombre de produits dans le site',
        value: this.nombreProduits,
        color: '#B7D7B3',
        position: 'position-class',
        iconClass: 'fas fa-box' 
      },
      {
        title: 'Produit avec le plus de commandes',
        value: this.produitPlusCommande || 'Non disponible',
        color: '#FF5733',
        position: 'position-class',
        iconClass: 'fas fa-chart-line'
      },
      {
        title: 'Le nombre de boutiques actuellement',
        value: this.nombreBoutiques,
        color: '#C70039',
        position: 'position-class',
        iconClass: 'fas fa-store'
      },
      {
        title: 'Le nombre de représentants dans les régions',
        value: this.nombreRepresentants,
        color: '#FFC300',
        position: 'position-class',
        iconClass: 'fas fa-user-tie'
      }
    ];
    
  }
  

  getProduitPlusCommandes(): number {
    // Ajoutez la logique pour récupérer le produit avec le plus de commandes
    // Exemple statique pour le moment
    return 0; 
  }

  getProduitsActuels(): number {
    // Ajoutez la logique pour récupérer le nombre de produits actuellement disponibles
    return this.commandes.length; // Exemple: renvoie le nombre de commandes
  }

  getProduitsRestants(): number {
    // Ajoutez la logique pour récupérer le nombre de produits restants
    return 0; // Valeur d'exemple
  }

onCardClick(commande: any): void {
    console.log(`Carte cliquée pour la commande ID: ${commande.id}`);
  }
onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.commandes = this.commandes.filter(commande => commande.id !== id);
      console.log('Commande supprimée:', id);
    }
  }
  
  
  
  
  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe(
      (data) => {
        this.commandes = data;
        console.log('Commandes reçues:', this.commandes); // Vérifiez ici les données reçues
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes', error);
      }
    );
  }


  
}
