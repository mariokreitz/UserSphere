import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`, {
      withCredentials: true,
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/users/delete`, {
      body: { userId },
      withCredentials: true,
    });
  }

  createUser(
    username: string,
    email: string,
    password: string,
    role: string
  ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/users/create`, {
      body: { username, email, password, role },
      withCredentials: true,
    });
  }

  getAuditLogs(
    page: number,
    limit: number,
    filters: {
      user?: string;
      action?: string;
      startDate?: string;
      endDate?: string;
    } = {}
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters.user) params = params.set('user', filters.user);
    if (filters.action) params = params.set('action', filters.action);
    if (filters.startDate) params = params.set('startDate', filters.startDate);
    if (filters.endDate) params = params.set('endDate', filters.endDate);

    return this.http.get(`${this.apiUrl}/admin/audit`, {
      params,
      withCredentials: true,
    });
  }
}
