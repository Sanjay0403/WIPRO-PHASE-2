namespace WebApplication2.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Phoneno { get; set; }

        // Add DateCreated field to store the creation date
        public DateTime DateCreated { get; set; }
    }
}
