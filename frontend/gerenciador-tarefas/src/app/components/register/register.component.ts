import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Registro</h2>
          <p>Crie sua conta para acessar o sistema</p>
        </div>
        
        <form [formGroup]="registerForm" (ngSubmit)="onRegister()">
          <div class="form-group">
            <label for="login">Login:</label>
            <input type="text" id="login" formControlName="login" class="form-control" placeholder="Digite seu login">
            <div *ngIf="registerForm.get('login')?.invalid && registerForm.get('login')?.touched" class="text-danger">
              <small *ngIf="registerForm.get('login')?.errors?.['required']">Login é obrigatório</small>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" formControlName="password" class="form-control" placeholder="Digite sua senha">
            <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="text-danger">
              <small *ngIf="registerForm.get('password')?.errors?.['required']">Senha é obrigatória</small>
              <small *ngIf="registerForm.get('password')?.errors?.['minlength']">Senha deve ter pelo menos 2 caracteres</small>
            </div>
          </div>

          <div class="form-group">
            <label for="role">Perfil:</label>
            <select id="role" formControlName="role" class="form-control">
              <option [ngValue]="'READ'">READ</option>
              <option [ngValue]="'WRITE'">WRITE</option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid || loading">
              {{ loading ? 'Registrando...' : 'Registrar' }}
            </button>
          </div>
          
          <div class="auth-footer">
            <p>Já tem uma conta? <a (click)="goToLogin()" style="cursor: pointer; color: #007bff;">Faça login</a></p>
          </div>
        </form>
        
        <div *ngIf="error" class="alert alert-danger">
          {{ error }}
        </div>
        
        <div *ngIf="success" class="alert alert-success">
          {{ success }}
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
    .alert-success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(2)]],
      role: ['WRITE' as UserRole, Validators.required]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';
      
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.success = 'Conta criada com sucesso! Redirecionando...';
          setTimeout(() => {
            this.router.navigate(['/tarefas']);
          }, 1200);
        },
        error: () => {
          this.error = 'Erro ao criar conta. Tente novamente.';
          this.loading = false;
        }
      });
    }
  }

  goToLogin(): void { this.router.navigate(['/login']); }
}
