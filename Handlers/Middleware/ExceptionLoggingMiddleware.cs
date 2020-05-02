using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.Handlers.Middleware
{
    /// <summary>
    /// Middleware logging unhandled exceptions.
    /// </summary>
    /// <remarks>
    /// This logging middleware just logs the exceptions but does not do anything else.
    /// 
    /// Gives us only the information that an exception occured and the exception with it's stack trace.
    /// 
    /// </remarks>
    public class ExceptionLoggingMiddleware
    {

        /// <summary>
        /// The next middleware in the pipeline.
        /// </summary>
        private readonly RequestDelegate _next;

        /// <summary>
        /// The logger to be used.
        /// </summary>
        private readonly ILogger<ExceptionLoggingMiddleware> _logger;

        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        /// <param name="next">The next middleware in the pipeline.</param>
        /// <param name="logger">The logger to be used.</param>
        public ExceptionLoggingMiddleware(RequestDelegate next, ILogger<ExceptionLoggingMiddleware> logger)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// It's pipeline activity.
        /// </summary>
        /// <param name="httpContext">The HTTP context to be used.</param>
        /// <returns>Returns a task.</returns>
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "an exception occured");
                throw;
            }
        }

    }
}
