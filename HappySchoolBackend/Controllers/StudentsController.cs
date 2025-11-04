using HappySchoolBackend.Dtos;
using HappySchoolBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

[Route("api/[controller]")]
[ApiController]
public class StudentController : ControllerBase
{
    private readonly SchoolContext _context;

    public StudentController(SchoolContext context)
    {
        _context = context;
    }

    // GET: api/Student
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudents()
    {
        var students = await _context.Students
            .Include(s => s.Class) // Needed for ClassName
            .ToListAsync();

        var dtos = students.Select(StudentDto.FromEntity).ToList();
        return Ok(dtos);
    }

    // GET: api/Student/5
    [HttpGet("{id}")]
    public async Task<ActionResult<StudentDto>> GetStudent(long id)
    {
        var student = await _context.Students
            .Include(s => s.Class)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (student == null)
            return NotFound();

        return Ok(StudentDto.FromEntity(student));
    }

    // POST: api/Student
    [HttpPost]
    public async Task<ActionResult<StudentDto>> CreateStudent(StudentDto dto)
    {
        var student = new Student
        {
            FirstName = dto.FirstName,
            OtherNames = dto.OtherNames,
            BirthDate = dto.BirthDate,
            Photo = dto.Photo,
            ClassId = dto.ClassId
        };

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        // Return the new DTO
        return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, StudentDto.FromEntity(student));
    }

    // PUT: api/Student/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(long id, StudentDto dto)
    {
        if (id != dto.Id)
            return BadRequest();

        var student = await _context.Students.FindAsync(id);
        if (student == null)
            return NotFound();

        // Update entity properties
        student.FirstName = dto.FirstName;
        student.OtherNames = dto.OtherNames;
        student.BirthDate = dto.BirthDate;
        student.Photo = dto.Photo;
        student.ClassId = dto.ClassId;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!StudentExists(id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    // DELETE: api/Student/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(long id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null)
            return NotFound();

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool StudentExists(long id)
    {
        return _context.Students.Any(e => e.Id == id);
    }
}
