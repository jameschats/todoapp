using Microsoft.EntityFrameworkCore;
using todo.backend.Entities;
using todo.backend.Data;

namespace todo.backend.Data;

public class TodoContext : DbContext
{
    public DbSet<TodoItem> TodoItems { get; set; }

    public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }
}
