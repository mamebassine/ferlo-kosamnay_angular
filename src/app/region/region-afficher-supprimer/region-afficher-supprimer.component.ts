import { Component, OnInit } from '@angular/core';
import { regionService } from '../../services/region.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component";


@Component({
  selector: 'app-region-afficherSupprimer',
  standalone: true,
  imports: [CommonModule, NavbarAdminComponent],
templateUrl: './region-afficher-supprimer.component.html',
  styleUrls: ['./region-afficher-supprimer.component.css']
})
export class regionAfficherSupprimerComponent implements OnInit {
  regions: any[] = [];

  constructor(
    private regionService: regionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllregions();
  }

  getAllregions() {
    this.regionService.getAllregions().subscribe(
      (data: any[]) => {
        this.regions = data;
        console.log('Régions récupérées:', data);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des régions:', error);
      }
    );
  }

  createNewregion() {
    this.router.navigate(['/region/ajouter']);
  }

  editregion(id: number) {
    this.router.navigate(['/region/modifier/', id]);
  }

  deleteregion(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette région ?')) {
      this.regionService.deleteregion(id).subscribe(
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
