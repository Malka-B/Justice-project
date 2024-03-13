using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VC.Persistence;

namespace VC.Application
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddVCApplication(
           this IServiceCollection services,
           IHostEnvironment hostEnvironment,
           IConfiguration conf)
        {
            services.AddVCPersistence(conf);

            services.AddScoped<ILoginBL, LoginBL>();
            services.AddScoped<IParticipantBL, ParticipantBL>();

            var mappingConfig = new MapperConfiguration(mc => 
                { mc.AddProfile(new VCApplicationProfile()); });
            IMapper mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);

            return services;
        }
    }
}
