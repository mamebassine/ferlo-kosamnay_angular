import { Routes } from '@angular/router';

import { AccueilComponent } from './portail/accueil/accueil.component'; //MOI Mise à jour du chemin
import { ProduitComponent } from './portail/produit/produit.component'; //MOI Mise à jour du chemin



export const routes: Routes = [
    
    { path: '', component: AccueilComponent }, // MOI Route pour l'accueil
    { path: 'produit', component: ProduitComponent }, // MOI Route pour l'accueil


];








