import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa, FiltroTarefa, Situacao, Prioridade } from '../../models/tarefa.model';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="filter-section">
      <h3>Filtros de Busca</h3>
      <form [formGroup]="filtroForm" (ngSubmit)="buscarTarefas()">
        <div class="filter-row">
          <div class="filter-item">
            <label for="tituloDescricao">Título/Descrição:</label>
            <input type="text" id="tituloDescricao" formControlName="tituloDescricao" class="form-control" placeholder="Buscar por título ou descrição">
          </div>
          
          <div class="filter-item">
            <label for="responsavel">Responsável:</label>
            <input type="text" id="responsavel" formControlName="responsavel" class="form-control" placeholder="Buscar por responsável">
          </div>
          
          <div class="filter-item">
            <label for="situacao">Situação:</label>
            <select id="situacao" formControlName="situacao" class="form-control">
              <option value="">Todas</option>
              <option [value]="Situacao.EM_ANDAMENTO">Em andamento</option>
              <option [value]="Situacao.CONCLUIDA">Concluída</option>
            </select>
          </div>
          
          <div class="filter-item">
            <button type="submit" class="btn btn-primary">Buscar Tarefas</button>
            <button type="button" class="btn btn-secondary" (click)="limparFiltros()">Limpar Filtros</button>
          </div>
        </div>
      </form>
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Listagem de Tarefas</h3>
        <button class="btn btn-primary" (click)="novaTarefa()">Nova Tarefa</button>
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Responsável</th>
            <th>Prioridade</th>
            <th>Deadline</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let tarefa of tarefasFiltradas">
            <td>{{ tarefa.titulo }}</td>
            <td>{{ tarefa.responsavel }}</td>
            <td>
              <span class="priority-badge priority-{{ tarefa.prioridade.toLowerCase() }}">
                {{ tarefa.prioridade }}
              </span>
            </td>
            <td>{{ tarefa.deadline | date:'dd/MM/yyyy' }}</td>
            <td>
              <span class="status-badge status-{{ tarefa.situacao === Situacao.EM_ANDAMENTO ? 'em-andamento' : 'concluida' }}">
                {{ tarefa.situacao }}
              </span>
            </td>
            <td class="actions">
              <a (click)="editarTarefa(tarefa.id!)" style="cursor: pointer;">Editar</a>
              <span class="separator">|</span>
              <a (click)="excluirTarefa(tarefa.id!)" style="cursor: pointer; color: #dc3545;">Excluir</a>
              <span class="separator">|</span>
              <a *ngIf="tarefa.situacao === Situacao.EM_ANDAMENTO" 
                 (click)="concluirTarefa(tarefa.id!)" 
                 style="cursor: pointer; color: #28a745;">Concluir</a>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div *ngIf="tarefasFiltradas.length === 0" style="text-align: center; padding: 20px; color: #6c757d;">
        Nenhuma tarefa encontrada.
      </div>
    </div>
  `,
  styles: [`
    .card-header { display: flex; justify-content: space-between; align-items: center; }
    .filter-section h3 { margin-bottom: 15px; color: #333; }
    .filter-item { margin-right: 15px; }
    .btn-secondary { margin-left: 10px; }
  `]
})
export class ListaTarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  tarefasFiltradas: Tarefa[] = [];
  filtroForm: FormGroup;
  Situacao = Situacao;
  Prioridade = Prioridade;

  constructor(
    private tarefaService: TarefaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.filtroForm = this.formBuilder.group({
      tituloDescricao: [''],
      responsavel: [''],
      situacao: ['']
    });
  }

  ngOnInit(): void { 
    this.carregarTarefas(); 
  }

  carregarTarefas(): void {
    this.tarefaService.getTarefas().subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
        this.tarefasFiltradas = tarefas;
      },
      error: (error) => console.error('Erro ao carregar tarefas:', error)
    });
  }

  buscarTarefas(): void {
    const filtros = this.filtroForm.value as FiltroTarefa;
    
    // Remove campos vazios para não enviar filtros desnecessários
    if (!filtros.tituloDescricao) delete filtros.tituloDescricao;
    if (!filtros.responsavel) delete filtros.responsavel;
    if (!filtros.situacao) delete filtros.situacao;

    // Se não há filtros, carrega todas as tarefas
    if (Object.keys(filtros).length === 0) {
      this.carregarTarefas();
      return;
    }

    this.tarefaService.buscarTarefasComFiltros(filtros).subscribe({
      next: (tarefas) => {
        this.tarefasFiltradas = tarefas;
      },
      error: (error) => {
        console.error('Erro ao buscar tarefas com filtros:', error);
        // Em caso de erro, volta para a lista completa
        this.tarefasFiltradas = this.tarefas;
      }
    });
  }

  limparFiltros(): void {
    this.filtroForm.reset();
    this.carregarTarefas();
  }

  novaTarefa(): void { this.router.navigate(['/tarefas/nova']); }

  editarTarefa(id: string): void { this.router.navigate(['/tarefas/editar', id]); }

  excluirTarefa(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.tarefaService.excluirTarefa(id).subscribe({
        next: () => this.carregarTarefas(),
        error: (error) => {
          console.error('Erro ao excluir tarefa:', error);
          alert('Erro ao excluir tarefa');
        }
      });
    }
  }

  concluirTarefa(id: string): void {
    this.tarefaService.concluirTarefa(id).subscribe({
      next: () => this.carregarTarefas(),
      error: (error) => {
        console.error('Erro ao concluir tarefa:', error);
        alert('Erro ao concluir tarefa');
      }
    });
  }
}
