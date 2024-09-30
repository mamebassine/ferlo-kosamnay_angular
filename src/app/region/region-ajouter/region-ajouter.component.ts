import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegionService } from '../../services/region.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

interface Region {
  id: number;
  nom: string;
}

@Component({
  selector: 'app-region-ajouter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './region-ajouter.component.html',
  styleUrls: ['./region-ajouter.component.css']
})
export class RegionAjouterComponent implements OnInit {
  region: Region = {
    id: 0,
    nom: ''
  };

  constructor(
    private router: Router,
    private regionService: RegionService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.regionService.createRegion(this.region).subscribe(
      (newRegion: Region) => {
        console.log('Nouvelle région créée:', newRegion);
        this.router.navigate(['/region']);
      },
      (error: any) => {
        console.error('Erreur lors de la création de la région:', error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/region']);
  }
}
