import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AccueilComponent } from './portail/accueil/accueil.component'; //MOI Mise à jour du chemin
import { ProduitComponent } from './portail/produit/produit.component'; //MOI Mise à jour du chemin
import { ContactComponent } from './portail/contact/contact.component'; //MOI Mise à jour du chemin

import { CategorieAfficherSupprimerComponent } from './portail/categorie/categorie-afficher-supprimer/categorie-afficher-supprimer.component';
import { CategorieAjouterComponent } from './portail/categorie/categorie-ajouter/categorie-ajouter.component';
import { CategorieModifierComponent } from './portail/categorie/categorie-modifier/categorie-modifier.component';

         export const routes: Routes = [
    
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent},
 
    
{ path: '', component: AccueilComponent }, // MOI Route pour l'accueil
{ path: 'produit', component: ProduitComponent }, // MOI Route pour l'accueil
{ path: 'contact', component: ContactComponent }, // MOI Route pour l'accueil


 // Routes pour les catégories
 { path: 'categorie', component: CategorieAfficherSupprimerComponent }, // Afficher ou supprimer une catégorie
 { path: 'categories/create', component: CategorieAjouterComponent }, // Ajouter une nouvelle catégorie
 { path: 'categories/edit/:id', component: CategorieModifierComponent }, // Modifier une catégorie avec ID

 
    








   

];








