using System;
using System.Collections.Generic;
using System.Net;

namespace getthehotdish.Models.Exceptions
{
    /// <summary>
    /// Throw this exception for known issues
    /// </summary>
    public class ErrorModelException : Exception
    {
        public int Status { get; set; } = (int)HttpStatusCode.InternalServerError;

        public List<ErrorModel> Errors { get; set; }

        public ErrorModelException()
        {
        }

        public ErrorModelException(List<ErrorModel> errors)
        {
            Errors = errors;
        }

        public ErrorModelException(ErrorModel error)
        {
            Errors = new List<ErrorModel> { error };
        }

        public ErrorModelException(ErrorCode errorCode)
        {
            Errors = new List<ErrorModel> { new ErrorModel(errorCode) };
        }
    }
}
