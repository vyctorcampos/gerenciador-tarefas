import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa, Prioridade, Situacao } from '../../models/tarefa.model';

@Component({
  selector: 'app-editar-tarefa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Editar Tarefa</h3>
      </div>
      
      <div *ngIf="loading" class="loading">
        Carregando tarefa...
      </div>
      
      <form *ngIf="!loading" [formGroup]="tarefaForm" (ngSubmit)="atualizarTarefa()">
        <div class="form-group">
          <label for="titulo">Título:</label>
          <input type="text" id="titulo" formControlName="titulo" class="form-control" placeholder="Digite o título da tarefa">
          <div *ngIf="tarefaForm.get('titulo')?.invalid && tarefaForm.get('titulo')?.touched" class="text-danger">
            <small *ngIf="tarefaForm.get('titulo')?.errors?.['required']">Título é obrigatório</small>
          </div>
        </div>
        
        <div class="form-group">
          <label for="descricao">Descrição:</label>
          <textarea id="descricao" formControlName="descricao" class="form-control" rows="4" placeholder="Digite a descrição da tarefa"></textarea>
          <div *ngIf="tarefaForm.get('descricao')?.invalid && tarefaForm.get('descricao')?.touched" class="text-danger">
            <small *ngIf="tarefaForm.get('descricao')?.errors?.['required']">Descrição é obrigatória</small>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="responsavel">Responsável:</label>
            <input type="text" id="responsavel" formControlName="responsavel" class="form-control" placeholder="Digite o responsável">
            <div *ngIf="tarefaForm.get('responsavel')?.invalid && tarefaForm.get('responsavel')?.touched" class="text-danger">
              <small *ngIf="tarefaForm.get('responsavel')?.errors?.['required']">Responsável é obrigatório</small>
            </div>
          </div>
          
          <div class="form-group">
            <label for="prioridade">Prioridade:</label>
            <select id="prioridade" formControlName="prioridade" class="form-control">
              <option value="">Select</option>
              <option [value]="Prioridade.ALTA">Alta</option>
              <option [value]="Prioridade.MEDIA">Média</option>
              <option [value]="Prioridade.BAIXA">Baixa</option>
            </select>
            <div *ngIf="tarefaForm.get('prioridade')?.invalid && tarefaForm.get('prioridade')?.touched" class="text-danger">
              <small *ngIf="tarefaForm.get('prioridade')?.errors?.['required']">Prioridade é obrigatória</small>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="deadline">Deadline:</label>
            <input type="date" id="deadline" formControlName="deadline" class="form-control">
            <div *ngIf="tarefaForm.get('deadline')?.invalid && tarefaForm.get('deadline')?.touched" class="text-danger">
              <small *ngIf="tarefaForm.get('deadline')?.errors?.['required']">Deadline é obrigatório</small>
            </div>
          </div>
          
          <div class="form-group">
            <label for="situacao">Situação:</label>
            <select id="situacao" formControlName="situacao" class="form-control">
              <option value="">Select</option>
              <option [value]="Situacao.EM_ANDAMENTO">Em andamento</option>
              <option [value]="Situacao.CONCLUIDA">Concluída</option>
            </select>
            <div *ngIf="tarefaForm.get('situacao')?.invalid && tarefaForm.get('situacao')?.touched" class="text-danger">
              <small *ngIf="tarefaForm.get('situacao')?.errors?.['required']">Situação é obrigatória</small>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" (click)="cancelar()">Cancelar</button>
          <button type="submit" class="btn btn-primary" [disabled]="tarefaForm.invalid">Atualizar</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    
    .form-row {
      display: flex;
      gap: 15px;
    }
    
    .form-row .form-group {
      flex: 1;
    }
    
    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 20px;
    }
    
    .text-danger {
      color: #dc3545;
      font-size: 12px;
      margin-top: 5px;
    }
    
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .btn-secondary:hover {
      background-color: #5a6268;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class EditarTarefaComponent implements OnInit {
  tarefaForm: FormGroup;
  tarefaId: string = '';
  loading = true;
  Prioridade = Prioridade;
  Situacao = Situacao;

  constructor(
    private formBuilder: FormBuilder,
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tarefaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      responsavel: ['', Validators.required],
      prioridade: ['', Validators.required],
      deadline: ['', Validators.required],
      situacao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.tarefaId = this.route.snapshot.params['id'];
    this.carregarTarefa();
  }

  carregarTarefa(): void {
    this.tarefaService.getTarefa(this.tarefaId).subscribe({
      next: (tarefa) => {
        this.tarefaForm.patchValue({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          responsavel: tarefa.responsavel,
          prioridade: tarefa.prioridade,
          deadline: tarefa.deadline,
          situacao: tarefa.situacao
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar tarefa:', error);
        alert('Erro ao carregar tarefa');
        this.router.navigate(['/tarefas']);
      }
    });
  }

  atualizarTarefa(): void {
    if (this.tarefaForm.valid) {
      const tarefaAtualizada: Tarefa = {
        ...this.tarefaForm.value,
        id: this.tarefaId
      };
      
      this.tarefaService.atualizarTarefa(this.tarefaId, tarefaAtualizada).subscribe({
        next: () => {
          alert('Tarefa atualizada com sucesso!');
          this.router.navigate(['/tarefas']);
        },
        error: (error) => {
          console.error('Erro ao atualizar tarefa:', error);
          alert('Erro ao atualizar tarefa');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/tarefas']);
  }
}
