using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Models
{
    public class Role
    {
        public int RoleId { get; set; }

        [Required]
        public string RoleName { get; set; } = string.Empty;
    }
}
