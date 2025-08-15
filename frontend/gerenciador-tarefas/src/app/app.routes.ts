import { Routes } from '@angular/router';
import { ListaTarefasComponent } from './components/lista-tarefas/lista-tarefas.component';
import { CadastroTarefaComponent } from './components/cadastro-tarefa/cadastro-tarefa.component';
import { EditarTarefaComponent } from './components/editar-tarefa/editar-tarefa.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'tarefas', 
    component: ListaTarefasComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'tarefas/nova', 
    component: CadastroTarefaComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'tarefas/editar/:id', 
    component: EditarTarefaComponent,
    canActivate: [authGuard]
  }
];
