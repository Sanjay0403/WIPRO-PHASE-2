using System.ComponentModel.DataAnnotations;
using System;

namespace FullStackApp.Models
{

    public class Expense
    {
        public int Id { get; set; }
        public string Category { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }  
        public int UserId { get; set; }
        public string Type { get; set; } // "Income" or "Expense"

        //public string Type { get; set; } = "Expense";
    }
}
