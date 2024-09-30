
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService, Region } from '../../services/region.service';


@Component({
  selector: 'app-region-modifier',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './region-modifier.component.html',
  styleUrls: ['./region-modifier.component.css']
})
export class RegionModifierComponent implements OnInit {
  region: Region = {
    id: 0,
    nom: ''
  };


  errorMessages: string[] = [];
  successMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private regionService: RegionService
  ) {}

  
  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null) {
      this.regionService.getRegion(id).subscribe(
        (data: Region) => {
          this.region = data;
          this.isLoading = false;
        },
        (error: any) => {
          this.errorMessages.push('Impossible de récupérer la région.');
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessages.push('ID de région invalide.');
      this.isLoading = false;
    }
  }

  onSubmit() {
    this.errorMessages = [];
    this.successMessage = '';

    this.regionService.updateRegion(this.region.id, this.region).subscribe(
      (updatedRegion: Region) => {
        this.successMessage = 'Région mise à jour avec succès !';
        setTimeout(() => {
          this.router.navigate(['/region']);
        }, 2000);
      },
      (error: any) => {
        if (error.error && error.error.errors) {
          for (const key in error.error.errors) {
            this.errorMessages.push(error.error.errors[key]);
          }
        } else {
          this.errorMessages.push('Une erreur est survenue.');
        }
      }
    );
  }

  cancel() {
    this.router.navigate(['/region']);
  }
}
