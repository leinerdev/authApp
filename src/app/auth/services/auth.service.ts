import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user }
  }

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password }
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(response => {
        if (response.ok) {
          localStorage.setItem('token', response.token!);
          this._user = {
            name: response.name!,
            uid: response.uid!,
          }
        }
      }),
      map(response => response.ok),
      catchError(err => of(err.error.msg))
    )
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password }
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(response => {
        if (response.ok) {
          localStorage.setItem('token', response.token!);
          this._user = {
            name: response.name!,
            uid: response.uid!,
          }
        }
      }),
      map(response => response.ok),
      catchError(err => of(err.error.msg))
    )
  }

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map(response => {
        localStorage.setItem('token', response.token!);
        this._user = {
          name: response.name!,
          uid: response.uid!,
        }
        return response.ok
      }),
      catchError(err => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
