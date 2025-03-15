using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using FullStackApp.Data;
using FullStackApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FullStackApp.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        /// ✅ **Authenticate User**
        public async Task<User?> Authenticate(string email, string password)
        {
            Console.WriteLine($"[DEBUG] Login attempt for: {email}");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                Console.WriteLine("[DEBUG] ❌ User not found.");
                return null;
            }

            Console.WriteLine($"[DEBUG] ✅ User found: {user.Email}");
            Console.WriteLine($"[DEBUG] Stored Hash: {user.PasswordHash}");
            Console.WriteLine($"[DEBUG] Computed Hash: {HashPassword(password)}");

            if (!VerifyPassword(password, user.PasswordHash))
            {
                Console.WriteLine("[DEBUG] ❌ Passwords do not match.");
                return null;
            }

            Console.WriteLine("[DEBUG] ✅ Password matched. User authenticated.");
            return user;
        }


        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            string? jwtKey = _config["Jwt:Key"];

            if (string.IsNullOrWhiteSpace(jwtKey))
            {
                throw new Exception("❌ JWT Key is missing in appsettings.json!");
            }

            var key = Encoding.UTF8.GetBytes(jwtKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.RoleId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7), 
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string jwtToken = tokenHandler.WriteToken(token);

            Console.WriteLine($"[DEBUG] ✅ Generated Token: {jwtToken}");

            return jwtToken;
        }


        public static string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }


        public static bool VerifyPassword(string password, string hashedPassword)
        {
            return HashPassword(password) == hashedPassword;
        }
    }
}
