export interface ProduitBoutique {
    id: number;
    produit_id: number;
    boutique_id: number;
    quantite: number;
    produit?: { id: number; name: string };
    boutique?: { id: number; name: string };
  }
  