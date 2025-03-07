var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// Middleware 1: Terminate chain when URL contains '/end'
app.Use(async (context, next) =>
{
    if (context.Request.Path.ToString().Contains("/end"))
    {
        await context.Response.WriteAsync("Terminating chain because URL contains '/end'.");
        return; // Stop the middleware chain here
    }
    await next(); // Continue to the next middleware if the path doesn't contain '/end'
});

// Middleware 2: Display hello1 if URL contains '/hello1'
app.Use(async (context, next) =>
{
    if (context.Request.Path.ToString().Contains("/hello1"))
    {
        await context.Response.WriteAsync("Hello1 ");
        return; // Stop further middleware execution
    }
    await next(); // Continue to next middleware if the path doesn't contain '/hello1'
});

// Middleware 3: Display hello2 if URL contains '/hello2'
app.Use(async (context, next) =>
{
    if (context.Request.Path.ToString().Contains("/hello2"))
    {
        await context.Response.WriteAsync("Hello2 ");
    }
    await next(); // Continue to next middleware
});

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=First}/{action=Index1}/{id?}");

app.Run();
