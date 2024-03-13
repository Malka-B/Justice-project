using VC.Api;
using VC.Application;

var builder = WebApplication.CreateBuilder(args);
var configurationManager = builder.Configuration;
var environment = builder.Environment;

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddVCApplication(environment, configurationManager);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigins",
        builder => builder.WithOrigins("http://localhost:4200", "https://localhost:4200", "http://localhost:8080", "https://localhost:8080")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseRouting();
app.UseCors("AllowOrigins");
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<SignalRHub>("/signalrtc");
});

app.Run();
