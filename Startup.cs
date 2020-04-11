using getthehotdish.DataAccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.ApplicationInsights;
using getthehotdish.Controllers;
using getthehotdish.Models;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace getthehotdish
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationInsightsTelemetry("b45419c6-148a-4520-afe7-7f180cfe5ee9");

            services.AddCors();

            services.AddControllersWithViews();

            services.AddDbContext<DataContext>(options => 
                options.UseCosmos("https://getthehotdish.documents.azure.com:443/",
                Configuration["COSMOS_API_KEY"],
                databaseName: "getthehotdish" + (Environment.IsDevelopment() ? "DEV" : ""))
            );

            services.AddLogging(builder =>
            {
                builder.AddApplicationInsights("b45419c6-148a-4520-afe7-7f180cfe5ee9");
                builder.AddFilter<ApplicationInsightsLoggerProvider>("", LogLevel.Information);
                builder.AddFilter<ApplicationInsightsLoggerProvider>("Microsoft", LogLevel.Error);
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSingleton<NotificationController>();

            // Notification Settings.
            var notificationSettingsSection =
                Configuration.GetSection("NotificationSettings");

            var notificationSettings = new NotificationSettings();
            Configuration.Bind("NotificationSettings", notificationSettings);
            notificationSettings.EmailNotificationSettings.EmailPassword = Configuration["NOTIFICATION_EMAIL_PASSWORD"];

            services.Configure<NotificationSettings>(settings => {
                settings.EmailNotificationSettings = new EmailNotificationSettings(
                    notificationSettings.EmailNotificationSettings.SmtpClient,
                    notificationSettings.EmailNotificationSettings.Port,
                    notificationSettings.EmailNotificationSettings.Name,
                    notificationSettings.EmailNotificationSettings.EmailSender,
                    Configuration["NOTIFICATION_EMAIL_PASSWORD"]);
            });

            services.AddSingleton<AdminSettings>(new AdminSettings
            {
                Key = Configuration["ADMIN_KEY"]
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(builder =>
                    builder.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowCredentials());
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}
