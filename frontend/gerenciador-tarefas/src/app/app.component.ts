import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div *ngIf="isAuthenticated" class="container">
      <header class="card-header">
        <h1 class="card-title">Gerenciador de Tarefas</h1>
        <div class="user-info">
          <span>Olá, {{ userLogin }}</span>
          <button class="btn btn-secondary" (click)="logout()">Sair</button>
        </div>
      </header>
      <router-outlet></router-outlet>
    </div>
    
    <div *ngIf="!isAuthenticated">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    header { text-align: center; margin-bottom: 30px; }
    .card-title { color: #007bff; font-size: 2rem; font-weight: 600; }
    .user-info { display: flex; align-items: center; gap: 15px; }
    .user-info span { color: #666; font-size: 14px; }
  `]
})
export class AppComponent implements OnInit {
  title = 'gerenciador-tarefas';
  isAuthenticated = false;
  userLogin = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      if (isAuth) {
        this.userLogin = this.authService.getUserLogin() || 'Usuário';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
