using getthehotdish.Handlers.Exceptions;
using getthehotdish.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace getthehotdish.Handlers.Filters
{
    public class HttpResponseExceptionFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var modelState = context.ModelState;
            if (!modelState.IsValid)
            {
                var errors = modelState.Values.SelectMany(v => v.Errors.Select(b => b.ErrorMessage)).Select(m => new ErrorModel(ErrorCode.InvalidField, m));
                context.Result = new JsonResult(errors)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception == null)
            {
                return;
            }
            switch (context.Exception)
            {
                case ErrorModelException ex:
                    context.Result = new JsonResult(ex.Errors)
                    {
                        StatusCode = ex.Status
                    };
                    context.ExceptionHandled = true;
                    break;
                default:
                    context.Result = new JsonResult(new List<ErrorModel>() { new ErrorModel("Internal error") })
                    {
                        StatusCode = StatusCodes.Status500InternalServerError,
                    };
                    context.ExceptionHandled = true;
                    break;

            }
        }
    }
}
