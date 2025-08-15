import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Login</h2>
          <p>Faça login para acessar o sistema</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="login">Login:</label>
            <input type="text" id="login" formControlName="login" class="form-control" placeholder="Digite seu login">
            <div *ngIf="loginForm.get('login')?.invalid && loginForm.get('login')?.touched" class="text-danger">
              <small *ngIf="loginForm.get('login')?.errors?.['required']">Login é obrigatório</small>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" formControlName="password" class="form-control" placeholder="Digite sua senha">
            <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="text-danger">
              <small *ngIf="loginForm.get('password')?.errors?.['required']">Senha é obrigatória</small>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid || loading">
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
          </div>
          
          <div class="auth-footer">
            <p>Não tem uma conta? <a (click)="goToRegister()" style="cursor: pointer; color: #007bff;">Registre-se</a></p>
          </div>
        </form>
        
        <div *ngIf="error" class="alert alert-danger">
          {{ error }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f5f5f5; }
    .auth-card { background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 40px; width: 100%; max-width: 400px; }
    .auth-header { text-align: center; margin-bottom: 30px; }
    .auth-header h2 { color: #333; margin-bottom: 10px; }
    .auth-header p { color: #666; margin: 0; }
    .form-actions { margin-top: 20px; }
    .auth-footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
    .alert { padding: 12px; border-radius: 4px; margin-top: 20px; }
    .alert-danger { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/tarefas']);
        },
        error: (err) => {
          this.error = 'Login ou senha inválidos';
          this.loading = false;
        }
      });
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
