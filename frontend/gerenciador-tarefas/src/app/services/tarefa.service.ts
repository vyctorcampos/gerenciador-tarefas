import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tarefa, FiltroTarefa } from '../models/tarefa.model';
import { AuthService } from './auth.service';
import { Situacao } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private baseUrl = 'http://localhost:8080/api/tarefas';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.baseUrl, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Erro ao buscar tarefas:', error);
        return throwError(() => new Error('Erro ao buscar tarefas'));
      })
    );
  }

  buscarTarefasComFiltros(filtros: FiltroTarefa): Observable<Tarefa[]> {
    return this.http.post<Tarefa[]>(`${this.baseUrl}/buscar`, filtros, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Erro ao buscar tarefas com filtros:', error);
        return throwError(() => new Error('Erro ao buscar tarefas com filtros'));
      })
    );
  }

  getTarefa(id: string): Observable<Tarefa> {
    return this.getTarefas().pipe(
      map(tarefas => {
        const tarefa = tarefas.find(t => t.id === id);
        if (!tarefa) throw new Error('Tarefa não encontrada');
        return tarefa;
      }),
      catchError(error => {
        console.error('Erro ao buscar tarefa:', error);
        return throwError(() => new Error('Erro ao buscar tarefa'));
      })
    );
  }

  criarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const payload = { ...tarefa } as any;
    delete payload.id;
    return this.http.post<Tarefa>(this.baseUrl, payload, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Erro ao criar tarefa:', error);
        return throwError(() => new Error('Erro ao criar tarefa'));
      })
    );
  }

  atualizarTarefa(id: string, tarefa: Tarefa): Observable<Tarefa> {
    const payload = { ...tarefa };
    return this.http.put<Tarefa>(`${this.baseUrl}/${id}`, payload, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Erro ao atualizar tarefa:', error);
        return throwError(() => new Error('Erro ao atualizar tarefa'));
      })
    );
  }

  excluirTarefa(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Erro ao excluir tarefa:', error);
        return throwError(() => new Error('Erro ao excluir tarefa'));
      })
    );
  }

  concluirTarefa(id: string): Observable<Tarefa> {
    return this.getTarefa(id).pipe(
      switchMap(tarefa => {
        const payload: Tarefa = { ...tarefa, situacao: Situacao.CONCLUIDA };
        return this.atualizarTarefa(id, payload);
      }),
      catchError(error => {
        console.error('Erro ao concluir tarefa:', error);
        return throwError(() => new Error('Erro ao concluir tarefa'));
      })
    );
  }
}
