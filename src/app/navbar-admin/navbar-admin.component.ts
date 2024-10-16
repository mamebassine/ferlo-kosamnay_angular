// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar-admin',
//   standalone: true,
//   imports: [],
//   templateUrl: './navbar-admin.component.html',
//   styleUrl: './navbar-admin.component.css'
// })
// export class NavbarAdminComponent {

// }


// src/app/dashboard/admin/navbar-admin/navbar-admin.component.ts
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  logout(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Aucun token trouvé, impossible de déconnecter.');
      return;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }
}
