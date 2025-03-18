using BatchWebApi.Context;
using BatchWebApi.Models;
using BatchWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BatchWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // ✅ Corrected: Explicitly define the login route
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginViewModel user)
        {
            if (user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { message = "Invalid login request" });
            }

            var obj = _context.Users.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);
            if (obj == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var tokenString = GenerateJSONWebToken(obj);
            return Ok(new { token = tokenString });
        }

        private string GetRoleName(int roleId)
        {
            return _context.Roles
                .Where(x => x.RoleId == roleId)
                .Select(x => x.RoleName)
                .FirstOrDefault();
        }

        private string GenerateJSONWebToken(User user)
        {
            string role = GetRoleName(user.RoleId) ?? "User"; // Default role if null

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, role),
                new Claim("DateOnly", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(120),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
