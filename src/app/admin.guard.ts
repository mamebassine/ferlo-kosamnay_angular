// import { CanActivateFn } from '@angular/router';

// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };


// import { inject } from '@angular/core';
// import { CanActivateFn } from '@angular/router';
// import { Router } from '@angular/router';
// import { Role } from '../Models/roles.model';

// interface User {
//   roles: Role[];
//   // Ajoutez d'autres propriétés utilisateur si nécessaire
// }

// export const adminGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   let user: User = { roles: [] };

//   try {
//     const userString = localStorage.getItem('user');
//     // Si l'objet user existe dans localStorage, on le parse, sinon on initialise à un objet vide
//     user = userString ? JSON.parse(userString) : { roles: [] };
//   } catch (error) {
//     console.error('Erreur lors du parsing du JSON:', error);
//     user = { roles: [] }; // En cas d'erreur, on assume qu'il n'y a pas de données utilisateur valides
//   }

//   console.log('Données utilisateur:', user);
//   console.log('Rôles de l\'utilisateur:', user.roles);

//   // Vérification du rôle 'admin'
//   if (user && user.roles && user.roles.some((role: Role) => role.name === 'admin')) {
//     console.log('Utilisateur avec rôle admin autorisé.');
//     return true;
//   } else {
//     // Si pas de rôle adéquat, redirection vers la page de login
//     router.navigateByUrl('login');
//     console.log('Accès refusé. Redirection vers la page de connexion.');
//     return false;
//   }
// };





import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

// Déclarez l'interface `Role` directement ici
export interface Role {
  name: string;
}

interface User {
  roles: Role[];
}

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  let user: User = { roles: [] };

  try {
    const userString = localStorage.getItem('user');
    // Si l'utilisateur existe dans localStorage, on le parse, sinon on initialise un objet vide
    user = userString ? JSON.parse(userString) : { roles: [] };
  } catch (error) {
    console.error('Erreur lors du parsing du JSON:', error);
    user = { roles: [] }; // Si erreur, on initialise à un utilisateur vide
  }

  console.log('Données utilisateur:', user);
  console.log('Rôles de l\'utilisateur:', user.roles);

  // Vérification si l'utilisateur a le rôle 'admin'
  if (user && user.roles.some((role: Role) => role.name === 'admin')) {
    console.log('Accès accordé à un utilisateur avec rôle admin.');
    return true;
  } else {
    // Redirection vers la page de connexion si l'utilisateur n'a pas le rôle adéquat
    router.navigateByUrl('login');
    console.log('Accès refusé. Redirection vers la page de connexion.');
    return false;
  }
};
