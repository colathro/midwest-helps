using System;
using getthehotdish.DataAccess;

namespace getthehotdish.Models
{
    public class UserModel
    {
        public UserModel(User dbo)
        {
            this.Id = dbo.Id;
            this.FirstName = dbo.FirstName;
            this.LastName = dbo.LastName;
            this.Username = dbo.Username;
        }

        public UserModel()
        {

        }

        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
