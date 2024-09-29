import { Routes } from '@angular/router';

// Import des composants login
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Import des composants accueil et contact
import { AccueilComponent } from './portail/accueil/accueil.component'; //MOI Mise à jour du chemin
import { ContactComponent } from './portail/contact/contact.component'; //MOI Mise à jour du chemin

// Import des composants categories
import { CategorieAfficherSupprimerComponent } from './portail/categorie/categorie-afficher-supprimer/categorie-afficher-supprimer.component';
import { CategorieAjouterComponent } from './portail/categorie/categorie-ajouter/categorie-ajouter.component';
import { CategorieModifierComponent } from './portail/categorie/categorie-modifier/categorie-modifier.component';

// Import des composants produits
import { ProduitAfficherSupprimerComponent } from './portail/produit/produit-afficher-supprimer/produit-afficher-supprimer.component';
import { ProduitAjouterComponent } from './portail/produit/produit-ajouter/produit-ajouter.component';
import { ProduitModifierComponent } from './portail/produit/produit-modifier/produit-modifier.component';
import { ProduitVoirDetailComponent } from './portail/produit/produit-voir-detail/produit-voir-detail.component';




                  export const routes: Routes = [

     // Routes pour l'authentification
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent},
 
    // Routes pour l'accueil et contact 
{ path: '', component: AccueilComponent }, // MOI Route pour l'accueil
{ path: 'contact', component: ContactComponent }, // MOI Route pour l'accueil

 // Routes pour les catégories
 { path: 'categorie', component: CategorieAfficherSupprimerComponent }, // Afficher ou supprimer une catégorie
 { path: 'categories/create', component: CategorieAjouterComponent }, // Ajouter une nouvelle catégorie
 { path: 'categories/edit/:id', component: CategorieModifierComponent }, // Modifier une catégorie avec ID

 // Routes pour les produits
 { path: 'produit', component: ProduitAfficherSupprimerComponent },
{ path: 'produit/ajouter', component: ProduitAjouterComponent },
{ path: 'produit/modifier/:id', component: ProduitModifierComponent },
{ path: 'produit/detail/:id', component: ProduitVoirDetailComponent },








   

];








