namespace handson.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfJoining { get; set; }
        public decimal? Salary { get; set; }
        public string Dept { get; set; } = string.Empty; // Correct property name
        public string Password { get; set; } = string.Empty;
    }
}
