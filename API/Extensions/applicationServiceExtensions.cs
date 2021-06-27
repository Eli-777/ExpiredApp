using API.Modal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class applicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices (this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(options => 
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}