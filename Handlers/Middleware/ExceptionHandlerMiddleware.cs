using getthehotdish.Handlers.Exceptions;
using getthehotdish.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace getthehotdish.Handlers.Middleware
{
    /// <summary>
    /// Middleware converting uncaught exceptions in responses with status code 500.
    /// </summary>
    /// <remarks>
    /// As I try to follow the seperation of concerns this handler middleware just produces the responses but does not do logging.
    /// </remarks>
    public class ExceptionHandlerMiddleware
    {

        /// <summary>
        /// The next middleware in the pipeline.
        /// </summary>
        private readonly RequestDelegate _next;

        /// <summary>
        /// Indicates that the error response should be empty (e.g. for production).
        /// </summary>
        private readonly bool _emptyResponse;

        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        /// <param name="next">The next middleware in the pipeline.</param>
        /// <param name="emptyResponse">Indicates that the error reponse should be empty.</param>
        public ExceptionHandlerMiddleware(RequestDelegate next, bool emptyResponse)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _emptyResponse = emptyResponse;
        }

        /// <summary>
        /// It's pipeline activity.
        /// </summary>
        /// <param name="httpContext">The HTTP context to be used.</param>
        /// <returns>Returns a task.</returns>
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                if (_emptyResponse)
                {
                    context.Response.ContentType = null;
                    await context.Response.WriteAsync(string.Empty);
                }
                else
                {
                    context.Response.ContentType = "application/json";
                    var result = string.Empty;
                    switch (exception)
                    {
                        case ErrorModelException ex:
                            result = JsonConvert.SerializeObject(ex.Errors);
                            context.Response.StatusCode = StatusCodes.Status422UnprocessableEntity;
                            break;
                        default:
                            result = JsonConvert.SerializeObject(new List<ErrorModel>() { new ErrorModel("Internal error") });
                            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                            break;
                    }
                    await context.Response.WriteAsync(result);
                }
            }
        }
    }

}
