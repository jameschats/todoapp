import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TodoItem {
    id?: number;
    title: string;
    isCompleted: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    private apiUrl = 'https://localhost:5143/api/todo'; // Replace with your backend URL

    constructor(private http: HttpClient) {}

    getTodos(): Observable<TodoItem[]> {
        return this.http.get<TodoItem[]>(this.apiUrl);
    }

    addTodo(item: TodoItem): Observable<TodoItem> {
        return this.http.post<TodoItem>(this.apiUrl, item);
    }

    updateTodo(item: TodoItem): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${item.id}`, item);
    }

    deleteTodo(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
