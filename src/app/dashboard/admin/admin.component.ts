import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component";
import { CommandeService } from '../../services/commande.service';
import { HttpClientModule } from '@angular/common/http';

import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

interface Card {
  title: string;
  value: string | number;
  color: string;
  position: string;
  iconClass?: string; 
}
Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, NavbarAdminComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  cards: Card[] = [];
  commandes: any[] = [];

  nombreProduits: number = 0; // Déclaration correcte avec un point-virgule

  //nombreProduits: number = 0; // Pour stocker le nombre de produits
  produitPlusCommande: string = ''; // Pour stocker le nom du produit le plus commandé
  nombreBoutiques: number = 0; // Propriété pour stocker le nombre de boutiques
  nombreRepresentants: number = 0; // Propriété pour stocker le nombre de représentants
  
  chart: Chart | null = null;

  constructor(private commandeService: CommandeService) {}
  
  ngOnInit(): void {
    this.loadCommandes(); // Charge les commandes ici pour les afficher sur le dashboard
    this.loadNombreProduits(); // Charge le nombre de produits et charge les cartes après
    this.loadProduitPlusCommande(); // Charge le produit le plus commandé
    this.loadNombreBoutiques(); // Charge le nombre de boutiques au démarrage
    this.loadNombreRepresentants(); // Charge le nombre de représentants au démarrage
    
    
    this.loadChartData();

  }

// Nombre Produits
loadNombreProduits(): void {
  this.commandeService.getNombreProduits().subscribe(
    (data) => {
      this.nombreProduits = data.nombre_produits;
      console.log('nombre', this.nombreProduits);
      this.loadCards();
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
        color: '#fff',
        position: 'position-class',
        iconClass: 'fas fa-box' 
      },
      {
        title: 'Produit avec le plus de commandes',
        value: this.produitPlusCommande || 'Non disponible',
        color: '#fff',
        position: 'position-class',
        iconClass: 'fas fa-chart-line'
      },
      {
        title: 'Le nombre de boutiques actuellement',
        value: this.nombreBoutiques,
        color: '#fff',
        position: 'position-class',
        iconClass: 'fas fa-store'
      },
      {
        title: 'Le nombre de représentants dans les régions',
        value: this.nombreRepresentants,
        color: '#fff',
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




//Courbe biiii

loadChartData(): void {
  this.commandeService.getNombreProduitsTemps().subscribe(
    (response) => {
      // Supposons que chaque `item` contient `semaine`, `mois`, `annee` et `produits`
      const labels = response.nombre_produits.map((item: any) => `Semaine ${item.semaine}, ${item.mois} ${item.annee}`);
      const data = response.nombre_produits.map((item: any) => item.produits);

      // Appel de renderChart avec les labels et data pour une vue par semaine
      this.renderChart(labels, data);
    },
    (error) => {
      console.error('Erreur lors de la récupération des données de produits :', error);
    }
  );
}




// loadChartData(): void {
//   this.commandeService.getNombreProduitsTemps().subscribe(
//     (response) => {
//       const labels = response.nombre_produits.map((item: any) => `${item.mois} ${item.annee}`);
//       const data = response.nombre_produits.map((item: any) => item.produits);

//       // Appel de renderChart avec les arguments labels et data
//       this.renderChart(labels, data);
//     },
//     (error) => {
//       console.error('Erreur lors de la récupération des données de produits :', error);
//     }
//   );
// }


renderChart(labels: string[], data: number[]): void {
  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Nombre de Produits',
      data: data,
      fill: false,
      borderColor: '#99B951',
      tension: 0.1
    }]
  };

  const config: ChartConfiguration = {
    type: 'line',
    data: chartData,
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 25
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: 20
            }
          }
        }
      }
    }
  };

  const chartItem: ChartItem = document.getElementById('myChart') as ChartItem;
  this.chart = new Chart(chartItem, config);
}



 
  
//Courbe biiii


// renderChart(): void {
//   const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'];
//   const data = [65, 59, 80, 81, 26, 55, this.nombreProduits];

//   const chartData = {
//     labels: labels,
//     datasets: [{
//       label: 'Nombre de Produits',
//       data: data,
//       fill: false,
//       borderColor: '#99B951', // Couleur de la courbe
//       tension: 0.1
//     }]
//   };

//   const config: ChartConfiguration = {
//     type: 'line', // Graphique linéaire
//     data: chartData,
//     options: {
//       animations: {
//         tension: {
//           duration: 1000,
//           easing: 'linear',
//           from: 1,
//           to: 0,
//           loop: true // Animation en boucle pour la tension
//         }
//       },
//       scales: {
//         x: {
//           ticks: {
//             font: {
//               size: 25, // Taille de la police pour les dates
//             }
//           }
//         },
//         y: {
//           ticks: {
//             font: {
//               size: 20, // Taille de la police pour les numéros
//             },
           
//           }
//         }
//       }
//     }
//   };

//   const chartItem: ChartItem = document.getElementById('myChart') as ChartItem;
//   this.chart = new Chart(chartItem, config);
// }

}




