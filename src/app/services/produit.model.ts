import { Categorie } from "./categorie.service";
import { ProduitBoutique } from "./produit-boutique.service";

export interface Produit {
    id?: number;
    categorie_id: number;
    image: string;
    description: string;
    prix: number;
    quantite: number;
    reference: string;
    nom: string;
    categorie?: Categorie;
    produit_boutique: ProduitBoutique[]; 
  }
  