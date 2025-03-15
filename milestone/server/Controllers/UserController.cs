using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FullStackApp.Data;
using FullStackApp.Models;
using System.Linq;

namespace FullStackApp.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize] // Requires JWT authentication for all endpoints
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // 🔹 Get Current Authenticated User
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var userEmail = User.Identity?.Name; // Retrieves email from JWT token
            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized(new { message = "Invalid token" });

            var user = _context.Users.FirstOrDefault(u => u.Email == userEmail);
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(new
            {
                id = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email
            });
        }


        [HttpGet]
        [Authorize(Roles = "1")] 
        public IActionResult GetAllUsers()
        {
            var users = _context.Users.Select(u => new
            {
                id = u.Id,
                firstName = u.FirstName,
                lastName = u.LastName,
                email = u.Email,
                roleId = u.RoleId
            }).ToList();

            return Ok(users);
        }
    }
}
