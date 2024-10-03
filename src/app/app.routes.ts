import { Routes } from '@angular/router';

// Import des composants login, register, dashoad
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './dashboard/admin/admin.component'; // Assurez-vous que le chemin est correct

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

// Import des composants régions
import { regionAfficherSupprimerComponent } from './region/region-afficher-supprimer/region-afficher-supprimer.component';
import { regionAjouterComponent } from './region/region-ajouter/region-ajouter.component';
import { regionModifierComponent } from './region/region-modifier/region-modifier.component';



import { BoutiqueAfficherSupprimerComponent } from './boutique/boutique-afficher-supprimer/boutique-afficher-supprimer.component';
import { BoutiqueAjouterComponent } from './boutique/boutique-ajouter/boutique-ajouter.component';
import { BoutiqueModifierComponent } from './boutique/boutique-modifier/boutique-modifier.component';
import { BoutiqueVoirDetailComponent } from './boutique/boutique-voir-detail/boutique-voir-detail.component';

import { ProduitBoutiqueAfficherSupprimerComponent } from './produitBoutique/produit-boutique-afficher-supprimer/produit-boutique-afficher-supprimer.component';
// import { ProduitBoutiqueVoirDetailComponent } from './produitBoutique/produit-boutique-voir-detail/produit-boutique-voir-detail.component';
import { ProduitBoutiqueModifierComponent } from './produitBoutique/produit-boutique-modifier/produit-boutique-modifier.component';
import { ProduitBoutiqueAjouterComponent } from './produitBoutique/produit-boutique-ajouter/produit-boutique-ajouter.component';

// Import des composants lignecommande
// import { LignecommandeAfficherSupprimerComponent } from './lignecommande/lignecommande-afficher-supprimer/lignecommande-afficher-supprimer.component';
// import { LignecommandeAjouterComponent } from './lignecommande/lignecommande-ajouter/lignecommande-ajouter.component';
// import { LignecommandeModifierComponent } from './lignecommande/lignecommande-modifier/lignecommande-modifier.component';
// import { LignecommandeVoirDetailComponent } from './lignecommande/lignecommande-voir-detail/lignecommande-voir-detail.component';

// import { PanierComponent } from './panier/panier.component';
             

           export const routes: Routes = [

     // Routes pour l'authentification et dashoard
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent},
{ path: 'dashboard', component: AdminComponent }, // Utilisez DashboardComponent

 
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

// Routes pour les régions
{ path: 'region', component: regionAfficherSupprimerComponent },
{ path: 'region/ajouter', component: regionAjouterComponent },
{ path: 'region/modifier/:id', component: regionModifierComponent },

// Routes pour les BOUTIQUES
  { path: 'boutique', component: BoutiqueAfficherSupprimerComponent },
  { path: 'boutique/ajouter', component: BoutiqueAjouterComponent },
  { path: 'boutique/modifier/:id', component: BoutiqueModifierComponent },
  { path: 'boutique/detail/:id', component: BoutiqueVoirDetailComponent },



  //  // Routes pour les ProduitBOUTIQUES

  
{path: 'produitboutique', component: ProduitBoutiqueAfficherSupprimerComponent},
// {path: 'produitboutique/detail/:id', component: ProduitBoutiqueDetailComponent},
{path: 'produitboutique/modifier/:id',component: ProduitBoutiqueModifierComponent},
{ path: 'produitboutique/ajouter',component: ProduitBoutiqueAjouterComponent},

   // // Routes pour les LIGNECOMMANDES
// { path: 'lignecommande', component: LignecommandeAfficherSupprimerComponent },
// { path: 'lignecommande/ajouter', component: LignecommandeAjouterComponent },
// { path: 'lignecommande/modifier/:id', component: LignecommandeModifierComponent },
// { path: 'lignecommande/detail/:id', component: LignecommandeVoirDetailComponent },

    // { path: 'panier', component: PanierComponent },



];








