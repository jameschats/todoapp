using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo.backend.Data;
using todo.backend.Entities;

namespace todo.backend.Controllers{

[Route("api/[controller]")]
[ApiController]
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;

    public TodoController(TodoContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
    {
        return await _context.TodoItems.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> AddTodoItem(TodoItem item)
    {
        _context.TodoItems.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTodos), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodoItem(int id, TodoItem item)
    {
        if (id != item.Id)
            return BadRequest();

        var todo = await _context.TodoItems.FindAsync(id);
        if (todo == null)
            return NotFound();

        todo.Title = item.Title;
        todo.IsCompleted = item.IsCompleted;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(int id)
    {
        var todo = await _context.TodoItems.FindAsync(id);
        if (todo == null)
            return NotFound();

        _context.TodoItems.Remove(todo);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
}