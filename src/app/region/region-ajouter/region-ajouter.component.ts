import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { regionService } from '../../services/region.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarAdminComponent } from "../../navbar-admin/navbar-admin.component";

interface region {
  id: number;
  nom: string;
}

@Component({
  selector: 'app-region-ajouter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarAdminComponent
],
  templateUrl: './region-ajouter.component.html',
  styleUrls: ['./region-ajouter.component.css']
})
export class regionAjouterComponent implements OnInit {
  region: region = {
    id: 0,
    nom: ''
  };

  constructor(
    private router: Router,
    private regionService: regionService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.regionService.createregion(this.region).subscribe(
      (newregion: region) => {
        console.log('Nouvelle région créée:', newregion);
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
