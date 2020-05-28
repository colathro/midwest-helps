using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Linq;

namespace getthehotdish.Handlers.Filters
{
    public class LogFilter : IActionFilter, IResultFilter, IExceptionFilter
    {

        /// <summary>
        /// The logger factory used to create the loggers.
        /// </summary>
        private readonly ILoggerFactory _loggerFactory;

        // evil work around (caching the may large action arguments)
        private object _actionArguments = null;

        /// <summary>
        /// Constructs an new instance.
        /// </summary>
        /// <param name="loggerFactory"></param>
        public LogFilter(ILoggerFactory loggerFactory)
        {
            _loggerFactory = loggerFactory ?? throw new ArgumentNullException(nameof(loggerFactory));
        }

        /// <summary>
        /// Gets the name of the called action (Namespace(s).ControllerName.ActionName)
        /// </summary>
        /// <param name="actionDescriptor">The action descriptor holding the data.</param>
        /// <returns>Returns the log source matching the currently called action.</returns>
        private string LogSource(ActionDescriptor actionDescriptor)
        {
            return actionDescriptor.DisplayName.Split(" ")[0];
        }

        /// <summary>
        /// Creates a logger for the currently called action.
        /// </summary>
        /// <param name="actionDescriptor">The action descriptor holding the data.</param>
        /// <returns>Returns a logger for the currently called action.</returns>
        private ILogger CreateDataLogger(ActionDescriptor actionDescriptor)
        {
            return _loggerFactory.CreateLogger(LogSource(actionDescriptor));
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {

            _loggerFactory.CreateLogger<LogFilter>().LogDebug(nameof(OnActionExecuting));
            CreateDataLogger(context.ActionDescriptor).LogDebug(nameof(OnActionExecuting));

            // here is the only place where is access to the action arguments
            // but we do not know if we need them later so let's cache them (yep: evil if large)
            _actionArguments = (context.ActionArguments.Count > 0) ? context.ActionArguments : null;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            _loggerFactory.CreateLogger<LogFilter>().LogDebug(nameof(OnActionExecuted));
            CreateDataLogger(context.ActionDescriptor).LogDebug(nameof(OnActionExecuted));
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {
            int statusCode = context.HttpContext.Response.StatusCode;

            LogLevel logLevel = LogLevel.None;
            string statusMessage = "";

            if (statusCode >= 200 && statusCode <= 299)
            {
                statusMessage = "success";
                logLevel = LogLevel.Information;
            }
            else if (statusCode >= 400 && statusCode <= 499)
            {
                statusMessage = "client error";
                logLevel = LogLevel.Warning;
            }
            else if (statusCode >= 500 && statusCode <= 599)
            {
                statusMessage = "server error";
                logLevel = LogLevel.Error;
            }
            else
            {
                return;
            }


            if (_actionArguments != null)
            {
                statusMessage = statusMessage + Environment.NewLine;
                statusMessage = statusMessage + JsonConvert.SerializeObject(_actionArguments, Formatting.Indented);
            }

            if (context.Exception != null)
            {
                statusMessage = statusMessage + Environment.NewLine;
                statusMessage = statusMessage + context.Exception.ToString();
            }

            if (!context.ModelState.IsValid)
            {
                statusMessage = statusMessage + Environment.NewLine;
                statusMessage = statusMessage + JsonConvert.SerializeObject
                (
                    new
                    {
                        ModelStateErrors = context.ModelState
                            .Where(kvp => kvp.Value.Errors.Count > 0)
                            .ToDictionary
                            (
                                kvp => kvp.Key,
                                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                            )
                    },
                    Formatting.Indented
                );
            }

            CreateDataLogger(context.ActionDescriptor)
                .Log(logLevel, statusCode, statusMessage);

        }
        public void OnException(ExceptionContext context)
        {
            // if we have no data to log do not log anything
            if (_actionArguments != null)
            {
                CreateDataLogger(context.ActionDescriptor)
                .LogError
                (
                    //context.Exception, // there is the ExceptionLoggingMiddleware producing the stack trace logs
                    StatusCodes.Status500InternalServerError, // used for the event id
                    "An error occured with the data:"
                    + Environment.NewLine
                    + JsonConvert.SerializeObject(_actionArguments, Formatting.Indented)
                );

            }

        }
    }
}
