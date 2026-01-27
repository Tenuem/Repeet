using Microsoft.EntityFrameworkCore;
using Repeet.Data;
using Repeet.Interfaces;
using Repeet.Repositories;
using Repeet.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultDbConnection"));
});

builder.Services.AddScoped<ISetRepository, SetRepository>();
builder.Services.AddScoped<IFlashcardRepository, FlashcardRepository>();

builder.Services.AddScoped<IFlashcardService, FlashcardService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
