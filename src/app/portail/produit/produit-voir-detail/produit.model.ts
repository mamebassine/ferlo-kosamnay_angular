// src/app/models/produit.model.ts

export interface ProduitModel {
    id: number;                     // Clé primaire
    categorie_id: number;          // Clé étrangère vers la table "categories"
    image: string;                 // URL ou chemin de l'image du produit
    nom: string;                   // Nom du produit
    description: string;           // Description du produit
    prix: number;                  // Prix du produit
    quantite: number;              // Quantité disponible
    reference: string;             // Référence unique du produit
    created_at?: string;           // Date de création (optionnelle)
    updated_at?: string;           // Date de mise à jour (optionnelle)
}
