using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Student>>> GetStudents()
        {
            try
            {
                var students = await _studentService.GetStudents();
                return Ok(students);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving student list.");
            }
        }

        [HttpGet("ByName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Student>>> GetStudentsByName([FromQuery] string name)
        {
            try
            {
                var students = await _studentService.GetStudentsByName(name);
                if (students.Count() == 0)
                    return NotFound($"There are no students who meet the {name} criteria.");

                return Ok(students);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving student list by name.");
            }
        }

        [HttpGet("{id:int}", Name = "GetStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            try
            {
                var student = await _studentService.GetStudent(id);
                if (student == null)
                    return NotFound($"There is no student with ID {id}.");

                return Ok(student);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving student by ID.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Student student)
        {
            try
            {
                await _studentService.CreateStudent(student);
                return CreatedAtRoute(nameof(GetStudent), new { id = student.Id }, student);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while trying to create a student.");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, [FromBody] Student student)
        {
            try
            {
                if (student.Id == id)
                {
                    await _studentService.UpdateStudent(student);
                    //return NoContent();
                    return Ok($"Student with ID {id} was successfully updated.");
                }
                else
                {
                    return BadRequest("Inconsistent data.");
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while trying to update the student.");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                Student student = await _studentService.GetStudent(id);
                if (student != null)
                {
                    await _studentService.DeleteStudent(student);
                    return Ok($"Student with ID {id} was successfully deleted.");
                }
                else
                {
                    return NotFound($"Student with ID {id} was not found.");
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while trying to delete the student.");
            }
        }
    }
}
