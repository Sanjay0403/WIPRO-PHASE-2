//using FullStackApp.Data;
//using FullStackApp.Models;
//using Microsoft.EntityFrameworkCore;

//namespace FullStackApp.Services
//{
//    public class ExpenseService
//    {
//        private readonly AppDbContext _context;

//        public ExpenseService(AppDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<List<Expense>> GetExpenses(int userId) =>
//            await _context.Expenses.Where(e => e.UserId == userId).ToListAsync();

//        public async Task<Expense> AddExpense(Expense expense)
//        {
//            _context.Expenses.Add(expense);
//            await _context.SaveChangesAsync();
//            return expense;
//        }

//        public async Task<bool> DeleteExpense(int id)
//        {
//            var expense = await _context.Expenses.FindAsync(id);
//            if (expense == null) return false;

//            _context.Expenses.Remove(expense);
//            await _context.SaveChangesAsync();
//            return true;
//        }
//    }
//}
using FullStackApp.Data;
using FullStackApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FullStackApp.Services
{
    public class ExpenseService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ExpenseService> _logger;

        public ExpenseService(AppDbContext context, ILogger<ExpenseService> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Get expenses for a specific user
        public async Task<List<Expense>> GetExpenses(int userId)
        {
            try
            {
                return await _context.Expenses.Where(e => e.UserId == userId).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching expenses for user {userId}: {ex.Message}");
                throw; // Rethrow exception to be handled by the caller
            }
        }

        // Add a new expense
        public async Task<Expense> AddExpense(Expense expense)
        {
            try
            {
                // Basic validation
                if (string.IsNullOrEmpty(expense.Category) || expense.Amount <= 0)
                {
                    throw new ArgumentException("Invalid expense data.");
                }

                _context.Expenses.Add(expense);
                await _context.SaveChangesAsync();
                return expense;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error adding expense: {ex.Message}");
                throw; // Rethrow exception to be handled by the caller
            }
        }

        // Delete an expense
        public async Task<bool> DeleteExpense(int id)
        {
            try
            {
                var expense = await _context.Expenses.FindAsync(id);
                if (expense == null) return false;

                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting expense with id {id}: {ex.Message}");
                throw; // Rethrow exception to be handled by the caller
            }
        }

        // Update an existing expense
        public async Task<Expense?> UpdateExpense(int id, Expense updatedExpense)
        {
            try
            {
                var existingExpense = await _context.Expenses.FindAsync(id);
                if (existingExpense == null) return null;

                // Basic validation
                if (string.IsNullOrEmpty(updatedExpense.Category) || updatedExpense.Amount <= 0)
                {
                    throw new ArgumentException("Invalid expense data.");
                }

                existingExpense.Amount = updatedExpense.Amount;
                existingExpense.Category = updatedExpense.Category;
                existingExpense.Date = updatedExpense.Date;
                existingExpense.Description = updatedExpense.Description;

                await _context.SaveChangesAsync();
                return existingExpense;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating expense with id {id}: {ex.Message}");
                throw; // Rethrow exception to be handled by the caller
            }
        }
    }
}


