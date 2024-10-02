import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoutiqueService } from '../../services/boutique.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-boutique-modifier',
  templateUrl: './boutique-modifier.component.html',
  styleUrls: ['./boutique-modifier.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class BoutiqueModifierComponent implements OnInit {
  boutique: any = {};
  form!: FormGroup; // onéclarer le FormGroup 


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private boutiqueService: BoutiqueService
  ) {}

  //definir la methode cancel
  cancel(): void {
    // Naviguer vers la page de liste des boutiques
    this.router.navigate(['/boutiques']);
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      region_id: ['', Validators.required],
      user_id: ['', Validators.required],
      representant: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadBoutique(id);
      }
    });
  }

  loadBoutique(id: number): void {
    this.boutiqueService.getBoutique(id).subscribe(
      response => {
        this.boutique = response;
        this.form.patchValue({
          nom: this.boutique.nom,
          adresse: this.boutique.adresse,
          telephone: this.boutique.telephone,
          region_id: this.boutique.region_id,
          user_id: this.boutique.user_id,
          representant: this.boutique.representant
        });
      },
      error => {
        console.error(error);
      }
    );
  }
  

  submitForm(): void {
    if (this.form.valid) {
      const updatedBoutique = { ...this.boutique, ...this.form.value };
      this.boutiqueService.updateBoutique(this.boutique.id, updatedBoutique).subscribe(
        response => {
          alert('Boutique mise à jour avec succès');
          this.router.navigate(['/boutique/liste']);
        },
        error => {
          console.error(error);
          alert('Erreur lors de la mise à jour de la boutique');
        }
      );
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire');
    }
  }

}