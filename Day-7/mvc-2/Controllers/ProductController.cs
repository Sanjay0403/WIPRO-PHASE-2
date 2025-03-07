using Microsoft.AspNetCore.Mvc;
using MVCAssign.Models;
using System.Collections.Generic;

namespace MVCAssign.Controllers
{
    public class ProductController : Controller
    {
        // 1️⃣ Pass a single product using ViewBag
        public IActionResult PassSingleProductUsingViewBag()
        {
            Product product = new Product
            {
                PCode = 101,
                Name = "Laptop",
                QtyInStock = 5,
                Details = "Gaming Laptop with high performance",
                Price = 1200.99m
            };

            ViewBag.Product = product;
            return View();
        }

        // 2️⃣ Pass a list of 5 products using ViewBag
        public IActionResult PassMultipleProductsUsingViewBag()
        {
            List<Product> products = new List<Product>
            {
                new Product { PCode = 101, Name = "Laptop", QtyInStock = 5, Details = "Gaming Laptop", Price = 1200.99m },
                new Product { PCode = 102, Name = "Mouse", QtyInStock = 20, Details = "Wireless Mouse", Price = 25.50m },
                new Product { PCode = 103, Name = "Keyboard", QtyInStock = 15, Details = "Mechanical Keyboard", Price = 75.00m },
                new Product { PCode = 104, Name = "Monitor", QtyInStock = 10, Details = "4K UHD Monitor", Price = 300.99m },
                new Product { PCode = 105, Name = "Headphones", QtyInStock = 12, Details = "Noise Cancelling Headphones", Price = 150.75m }
            };

            ViewBag.Products = products;
            return View();
        }

        // 3️⃣ Pass a single product directly to the view
        public IActionResult PassSingleProductDirectly()
        {
            Product product = new Product
            {
                PCode = 106,
                Name = "Smartphone",
                QtyInStock = 8,
                Details = "Latest Android Smartphone",
                Price = 899.99m
            };

            return View(product);
        }

        // 4️⃣ Pass a list of 5 products directly to the view
        public IActionResult PassMultipleProductsDirectly()
        {
            List<Product> products = new List<Product>
            {
                new Product { PCode = 107, Name = "Tablet", QtyInStock = 10, Details = "10-inch Display Tablet", Price = 499.99m },
                new Product { PCode = 108, Name = "Smartwatch", QtyInStock = 15, Details = "Fitness Smartwatch", Price = 199.99m },
                new Product { PCode = 109, Name = "Printer", QtyInStock = 5, Details = "Wireless Inkjet Printer", Price = 149.99m },
                new Product { PCode = 110, Name = "Router", QtyInStock = 7, Details = "High-Speed Wi-Fi Router", Price = 89.99m },
                new Product { PCode = 111, Name = "External Hard Drive", QtyInStock = 12, Details = "1TB USB 3.0 Hard Drive", Price = 79.99m }
            };

            return View(products);
        }
    }
}
