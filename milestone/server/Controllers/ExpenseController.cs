//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using FullStackApp.Services;
//using FullStackApp.Models;
//using System.Security.Claims;
//using System.Threading.Tasks;
//using Microsoft.Extensions.Logging;

//[Route("api/expenses")]
//[ApiController]
//[Authorize]
//public class ExpensesController : ControllerBase
//{
//    private readonly ExpenseService _expenseService;
//    private readonly ILogger<ExpensesController> _logger;

//    public ExpensesController(ExpenseService expenseService, ILogger<ExpensesController> logger)
//    {
//        _expenseService = expenseService;
//        _logger = logger;
//    }

//    [HttpGet]
//    public async Task<IActionResult> GetExpenses()
//    {
//        var userId = GetUserId();
//        if (userId == null)
//            return Unauthorized("Invalid user token.");

//        var expenses = await _expenseService.GetExpenses(userId.Value);
//        return Ok(expenses);
//    }

//    [HttpPost]
//    public async Task<IActionResult> AddExpense([FromBody] Expense expense)
//    {
//        var userId = GetUserId();
//        if (userId == null)
//            return Unauthorized("Invalid user token.");

//        if (expense == null)
//            return BadRequest("Expense data is required.");

//        expense.UserId = userId.Value;
//        var addedExpense = await _expenseService.AddExpense(expense);

//        return CreatedAtAction(nameof(GetExpenses), new { id = addedExpense.Id }, addedExpense);
//    }

//    [HttpPut("{id}")]
//    public async Task<IActionResult> UpdateExpense(int id, [FromBody] Expense updatedExpense)
//    {
//        var userId = GetUserId();
//        if (userId == null)
//            return Unauthorized("Invalid user token.");

//        var result = await _expenseService.UpdateExpense(id, updatedExpense);
//        if (result == null)
//            return NotFound("Expense not found or you don't have permission to update this expense.");

//        return Ok(result);
//    }

//    [HttpDelete("{id}")]
//    public async Task<IActionResult> DeleteExpense(int id)
//    {
//        var userId = GetUserId();
//        if (userId == null)
//            return Unauthorized("Invalid user token.");

//        var isDeleted = await _expenseService.DeleteExpense(id);
//        if (!isDeleted)
//            return NotFound("Expense not found or you don't have permission to delete this expense.");

//        return NoContent();
//    }
//    private int? GetUserId()
//    {
//        var claims = User.Claims.ToList();
//        _logger.LogInformation("User Claims: {@Claims}", claims);

//        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");

//        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
//        {
//            _logger.LogWarning("User ID is missing or invalid in token.");
//            return null;
//        }

//        return userId;
//    }
//}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FullStackApp.Services;
using FullStackApp.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

[Route("api/expenses")]
[ApiController]
[Authorize]
public class ExpensesController : ControllerBase
{
    private readonly ExpenseService _expenseService;
    private readonly ILogger<ExpensesController> _logger;

    public ExpensesController(ExpenseService expenseService, ILogger<ExpensesController> logger)
    {
        _expenseService = expenseService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetExpenses()
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized("Invalid user token.");

        var expenses = await _expenseService.GetExpenses(userId.Value);
        return Ok(expenses);
    }

    [HttpPost]
    public async Task<IActionResult> AddExpense([FromBody] Expense expense)
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized("Invalid user token.");

        if (expense == null)
            return BadRequest("Expense data is required.");

        expense.UserId = userId.Value;
        var addedExpense = await _expenseService.AddExpense(expense);

        return CreatedAtAction(nameof(GetExpenses), new { id = addedExpense.Id }, addedExpense);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExpense(int id, [FromBody] Expense updatedExpense)
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized("Invalid user token.");

        var result = await _expenseService.UpdateExpense(id, updatedExpense);
        if (result == null)
            return NotFound("Expense not found or you don't have permission to update this expense.");

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExpense(int id)
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized("Invalid user token.");

        var isDeleted = await _expenseService.DeleteExpense(id);
        if (!isDeleted)
            return NotFound("Expense not found or you don't have permission to delete this expense.");

        return NoContent();
    }

    //    private int? GetUserId()
    //    {
    //        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");

    //        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
    //        {
    //            return null;
    //        }

    //        return userId;
    //    }
    //}
    private int? GetUserId()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");

        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            // Log if user ID is not found or invalid
            _logger.LogWarning("No valid user found in the token.");
            return null;
        }

        return userId;
    }
}