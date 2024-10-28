import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { regionService } from '../../services/region.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  
  errorMessage: string = '';

  constructor(
    private router: Router,
    private regionService: regionService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (!this.region.nom || !/^[A-Za-z]+$/.test(this.region.nom)) {
      // const nomCompletPattern = /^[a-zA-Z\s]*$/; // Autorise les lettres et les espaces

      this.errorMessage = 'Le nom de la région est obligatoire et doit contenir uniquement des lettres et voyelles.';
      return;
    }
    
    this.errorMessage = ''; // Clear any previous error messages
    
    this.regionService.createregion(this.region).subscribe(
      (newregion: region) => {
        console.log('Nouvelle région créée:', newregion);
        this.router.navigate(['/region']);
      },
      (error: any) => {
        console.error('Erreur lors de la création de la région:', error);
        this.errorMessage = 'Une erreur s\'est produite lors de la création de la région.';
      }
    );
  }

  cancel() {
    this.router.navigate(['/region']);
  }
}
