// src/app/components/regions/regions.component.ts
import { Component, OnInit } from '@angular/core';
import { RegionService, Region } from '../../services/region.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [],
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionsComponent implements OnInit {
  regions: Region[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  regionForm: FormGroup;
  isEditMode: boolean = false;
  currentRegionId: number | null = null;

  constructor(
    private regionService: RegionService,
    private fb: FormBuilder
  ) {
    this.regionForm = this.fb.group({
      nom: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(): void {
    this.regionService.getRegions()
      .subscribe({
        next: (data) => this.regions = data,
        error: (err) => this.errorMessage = err
      });
  }

  onSubmit(): void {
    if (this.regionForm.invalid) {
      return;
    }

    const regionData: Region = this.regionForm.value;

    if (this.isEditMode && this.currentRegionId !== null) {
      this.regionService.updateRegion(this.currentRegionId, regionData)
        .subscribe({
          next: (updatedRegion) => {
            this.successMessage = 'Région mise à jour avec succès.';
            this.resetForm();
            this.getRegions();
          },
          error: (err) => this.errorMessage = err
        });
    } else {
      this.regionService.addRegion(regionData)
        .subscribe({
          next: (newRegion) => {
            this.successMessage = 'Région ajoutée avec succès.';
            this.resetForm();
            this.getRegions();
          },
          error: (err) => this.errorMessage = err
        });
    }
  }

  editRegion(region: Region): void {
    this.isEditMode = true;
    this.currentRegionId = region.id;
    this.regionForm.patchValue({
      nom: region.nom
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteRegion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette région ?')) {
      this.regionService.deleteRegion(id)
        .subscribe({
          next: () => {
            this.successMessage = 'Région supprimée avec succès.';
            this.getRegions();
          },
          error: (err) => this.errorMessage = err
        });
    }
  }

  resetForm(): void {
    this.regionForm.reset();
    this.isEditMode = false;
    this.currentRegionId = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}

