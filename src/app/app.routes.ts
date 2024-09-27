import { Routes } from '@angular/router';

import { AccueilComponent } from './portail/accueil/accueil.component'; //MOI Mise à jour du chemin
import { ProduitComponent } from './portail/produit/produit.component'; //MOI Mise à jour du chemin
import { CategorieComponent } from './portail/categorie/categorie.component'; //MOI Mise à jour du chemin
import { ContactComponent } from './portail/contact/contact.component'; //MOI Mise à jour du chemin

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';




export const routes: Routes = [
    
    { path: '', component: AccueilComponent }, // MOI Route pour l'accueil
    { path: 'produit', component: ProduitComponent }, // MOI Route pour l'accueil
    { path: 'categorie', component: CategorieComponent }, // MOI Route pour l'accueil
    { path: 'contact', component: ContactComponent }, // MOI Route pour l'accueil

    { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent}




];








