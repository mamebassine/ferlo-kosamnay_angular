import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../services/region.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-region-afficherSupprimer',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './region-afficher-supprimer.component.html',
  styleUrls: ['./region-afficher-supprimer.component.css']
})
export class RegionAfficherSupprimerComponent implements OnInit {
  regions: any[] = [];

  constructor(
    private regionService: RegionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllRegions();
  }

  getAllRegions() {
    this.regionService.getAllRegions().subscribe(
      (data: any[]) => {
        this.regions = data;
        console.log('Régions récupérées:', data);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des régions:', error);
      }
    );
  }

  createNewRegion() {
    this.router.navigate(['/region/ajouter']);
  }

  editRegion(id: number) {
    this.router.navigate(['/region/modifier/', id]);
  }

  deleteRegion(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette région ?')) {
      this.regionService.deleteRegion(id).subscribe(
        () => {
          this.regions = this.regions.filter(r => r.id !== id);
          console.log(`Région avec ID ${id} supprimée.`);
        },
        (error: any) => {
          console.error('Erreur lors de la suppression de la région:', error);
        }
      );
    }
  }
}
