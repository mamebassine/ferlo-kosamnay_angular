import { Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';

// Import des composants login, register, dashoady
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './dashboard/admin/admin.component'; 
import { ClientComponent } from './dashboard/admin/client/client.component'; 




import {   CategorieAdminComponent } from './dashboard/categorie-admin/categorie-admin.component'; 

import { ProduitsAdminComponent } from './dashboard/produits-admin/produits-admin.component';



// Import des composants accueil et contact
import { AccueilComponent } from './portail/accueil/accueil.component'; 
import { ContactComponent } from './portail/contact/contact.component'; 

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
import { PanierComponent } from './panier/panier/panier.component';

// Import des composants lignecommande

import { LigneCommandeAfficherSupprimerComponent } from './ligneCommande/ligne-commande-afficher-supprimer/ligne-commande-afficher-supprimer.component';

import { LigneCommandeAjouterComponent } from './ligneCommande/ligne-commande-ajouter/ligne-commande-ajouter.component';
import { LigneCommandeModifierComponent } from './ligneCommande/ligne-commande-modifier/ligne-commande-modifier.component';
import { LigneCommandeVoirDetailComponent } from './ligneCommande/ligne-commande-voir-detail/ligne-commande-voir-detail.component';


import { CategorieFromageComponent } from './portail/categorie/categorie-fromage/categorie-fromage.component';
import { CategorieLaitComponent } from './portail/categorie/categorie-lait/categorie-lait.component';
// import { CategorieHuileVacheComponent } from './portail/categorie/categorie-huileVache/categorie-huileVache.component';
// import { CategorieLaitCailleComponent } from './portail/categorie/categorie-Categorie-LaitCaille/categorie-CategorieLaitCailleComponent';
import { CategorieHuileVacheComponent } from './portail/categorie/categorie-huile-vache/categorie-huile-vache.component';
import { CategorieLaitCailleComponent } from './portail/categorie/categorie-lait-caille/categorie-lait-caille.component';


//pour representant

import { AjoutRepresentantComponent } from './dashboard/admin/ajout-representant/ajout-representant.component'; // Import du composant



                                export const routes: Routes = [

     // Routes pour l'authentification et dashoard
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent},

// Routes pour l'accueil et contact 
{ path: '', component: AccueilComponent }, // MOI Route pour l'accueil
{ path: 'contact', component: ContactComponent }, // MOI Route pour l'accueil
{ path: 'produit', component: ProduitAfficherSupprimerComponent },
{ path: 'categorie', component: CategorieAfficherSupprimerComponent, }, // Afficher ou supprimer une catégorie
 // les # catégories
 { path: 'fromage', component: CategorieFromageComponent },
 { path: 'lait', component: CategorieLaitComponent },
 { path: 'lait-caille', component: CategorieLaitCailleComponent },
 { path: 'huile-vache', component: CategorieHuileVacheComponent },



//route admins

{ path: 'dashboard', component: AdminComponent, canActivate: [AdminGuard] },  
{ path: 'produitsadmin', component: ProduitsAdminComponent, canActivate: [AdminGuard] },
{ path: 'CategorieAdmin', component: CategorieAdminComponent, canActivate: [AdminGuard]},

// Routes pour les catégories
 { path: 'categories/create', component: CategorieAjouterComponent, canActivate: [AdminGuard] }, 
 { path: 'categories/edit/:id', component: CategorieModifierComponent, canActivate: [AdminGuard] }, 
// Routes pour les produits
{ path: 'produit/ajouter', component: ProduitAjouterComponent, canActivate: [AdminGuard] },
{ path: 'produit/modifier/:id', component: ProduitModifierComponent, canActivate: [AdminGuard] },

{ path: 'produit/detail/:id', component: ProduitVoirDetailComponent, },

// Routes pour les régions
{ path: 'region', component: regionAfficherSupprimerComponent, canActivate: [AdminGuard] },
{ path: 'region/ajouter', component: regionAjouterComponent, canActivate: [AdminGuard] },
{ path: 'region/modifier/:id', component: regionModifierComponent, canActivate: [AdminGuard] },

// Routes pour les BOUTIQUES
  { path: 'boutique', component: BoutiqueAfficherSupprimerComponent, canActivate: [AdminGuard] },
  { path: 'boutique/ajouter', component: BoutiqueAjouterComponent, canActivate: [AdminGuard] },
  { path: 'boutique/modifier/:id', component: BoutiqueModifierComponent, canActivate: [AdminGuard] },
  { path: 'boutique/detail/:id', component: BoutiqueVoirDetailComponent, canActivate: [AdminGuard] },

  // Routes pour les ProduitBOUTIQUES
{path: 'produitboutique', component: ProduitBoutiqueAfficherSupprimerComponent, canActivate: [AdminGuard]},
// {path: 'produitboutique/detail/:id', component: ProduitBoutiqueDetailComponent},
{path: 'produitboutique/modifier/:id',component: ProduitBoutiqueModifierComponent, canActivate: [AdminGuard]},
 { path: 'produitboutique/ajouter',component: ProduitBoutiqueAjouterComponent, canActivate: [AdminGuard] },

 { path: 'representants', component: AjoutRepresentantComponent, canActivate: [AdminGuard] },

{ path: 'clients', component: ClientComponent },
 

   //routes admins

//pour les representants
// { path: 'representant', component: representantComponent },  




// Routes pour les LIGNECOMMANDES
{ path: 'lignecommande', component: LigneCommandeAfficherSupprimerComponent },
{ path: 'lignecommande/ajouter', component: LigneCommandeAjouterComponent },
{ path: 'lignecommande/modifier/:id', component: LigneCommandeModifierComponent },
{ path: 'lignecommande/detail/:id', component: LigneCommandeVoirDetailComponent },

{ path: 'panier', component: PanierComponent },

// const routes: Routes = [
//   { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
//   // Ajoutez d'autres routes ici
// ];



// { path: 'admindec', component:AdmindeclarationComponent, canActivate: [AuthGuard]},




];








