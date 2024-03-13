using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace VC.Persistence
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddVCPersistence(this IServiceCollection services, IConfiguration conf)
        {
            var sqlConnectionString = BuildSqlConnectionString(conf); 

            services.AddPooledDbContextFactory<VCDbContext>(options =>
                options.UseSqlServer(
                    sqlConnectionString,
                    providerOptions =>
                    {
                        providerOptions.EnableRetryOnFailure();
                        providerOptions.MigrationsAssembly(typeof(VCDbContext).Assembly.FullName);
                    }));

            services.AddDbContext<VCDbContext>(options =>
                options.UseSqlServer(sqlConnectionString));

            services.AddScoped<IDiscussionRepo, DiscussionRepo>();
            services.AddScoped<IParticipantRepo, ParticipantRepo>();

            return services;
        }
        public static string BuildSqlConnectionString(IConfiguration conf)
        {
            var sqlServerSettings = conf.GetSection(nameof(SqlServerSettings)).Get<SqlServerSettings>();
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder(sqlServerSettings.ConnectionString);
            builder.Password = sqlServerSettings.Password;
            return builder.ConnectionString;
        }
    }
}
