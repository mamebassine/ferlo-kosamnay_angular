import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepresentantService } from '../../../services/representant.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NavbarAdminComponent } from "../../../navbar-admin/navbar-admin.component";


@Component({
  selector: 'app-ajout-representant',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarAdminComponent],
  templateUrl: './ajout-representant.component.html',
  styleUrls: ['./ajout-representant.component.css']
})
export class AjoutRepresentantComponent {
  representantForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private representantService: RepresentantService) {
    this.representantForm = this.formBuilder.group({
      nom_complet: ['', Validators.required],
      telephone: ['', [Validators.pattern('^[0-9]*$')]], 
      adresse: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['representant'] 
    });
  }

  onSubmit() {
    this.submitted = true;

        // Vérifie si le formulaire est invalide
        if (this.representantForm.invalid) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Formulaire invalide. Veuillez vérifier vos informations.'
          });
          return;



// if (this.representantForm.invalid) {
//       window.alert('Formulaire invalide. Veuillez vérifier vos informations.');
//       return;
    }

 // Appel au service pour ajouter le représentant
 this.representantService.ajouterRepresentant(this.representantForm.value).subscribe(
  (response) => {
    // Affiche une alerte de succès
    Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: 'Représentant ajouté avec succès !'
    });
    console.log('Représentant ajouté avec succès', response);
  },
  (error) => {
    // Affiche une alerte d'erreur
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Erreur lors de l\'ajout du représentant. Veuillez réessayer.'
    });
    console.error('Erreur lors de l\'ajout du représentant', error);
  }
);
}

get f() { return this.representantForm.controls; }
}











//     this.representantService.ajouterRepresentant(this.representantForm.value).subscribe(
//       (response) => {
//         window.alert('Représentant ajouté avec succès !');
//         console.log('Représentant ajouté avec succès', response);
//       },
//       (error) => {
//         window.alert('Erreur lors de l\'ajout du représentant. Veuillez réessayer.');
//         console.error('Erreur lors de l\'ajout du représentant', error);
//       }
//     );
//   }

//   get f() { return this.representantForm.controls; }
// }
