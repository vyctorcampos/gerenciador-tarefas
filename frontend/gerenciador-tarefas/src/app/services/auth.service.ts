import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  private tokenKey = 'auth_token';
  private userLoginKey = 'auth_login';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register`, request, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      tap(response => this.handleRegisterResponse(response)),
      catchError(error => {
        console.error('Erro no registro:', error);
        return throwError(() => new Error('Erro ao registrar usuário'));
      })
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, request, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      tap(response => this.handleLoginResponse(response)),
      catchError(error => {
        console.error('Erro no login:', error);
        return throwError(() => new Error('Erro ao fazer login'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userLoginKey);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserLogin(): string | null {
    return localStorage.getItem(this.userLoginKey);
  }

  private handleLoginResponse(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userLoginKey, response.name);
    this.isAuthenticatedSubject.next(true);
  }

  private handleRegisterResponse(response: RegisterResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userLoginKey, response.login);
    this.isAuthenticatedSubject.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
