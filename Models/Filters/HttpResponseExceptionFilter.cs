using getthehotdish.Models.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace getthehotdish.Models.Filters
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
                    StatusCode = (int)HttpStatusCode.BadRequest
                };
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
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
                        StatusCode = (int)HttpStatusCode.InternalServerError,
                    };
                    context.ExceptionHandled = true;
                    break;

            }
        }
    }
}
