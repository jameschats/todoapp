// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-todo',
//   templateUrl: './todo.component.html',
//   styleUrls: ['./todo.component.css']
// })
// export class TodoComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { TodoItem, TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    standalone: true, // Mark as standalone
    imports: [CommonModule, FormsModule], // Import FormsModule here
})
export class TodoComponent implements OnInit {
    todos: TodoItem[] = [];
    newTodoTitle = ''; 

    constructor(private todoService: TodoService) {}

    ngOnInit(): void {
        this.loadTodos();
    }

    loadTodos(): void {
        this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
    }

    addTodo(): void {
        if (this.newTodoTitle.trim()) {
            const newTodo: TodoItem = {
                title: this.newTodoTitle.trim(),
                isCompleted: false,
            };
            this.todoService.addTodo(newTodo).subscribe(() => {
                this.newTodoTitle = '';
                this.loadTodos();
            });
        }
    }

    toggleComplete(todo: TodoItem): void {
        todo.isCompleted = !todo.isCompleted;
        this.todoService.updateTodo(todo).subscribe();
    }

    deleteTodo(id: number): void {
        this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
    }
}
