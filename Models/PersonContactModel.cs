using getthehotdish.DataAccess;
using getthehotdish.Utils.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.Models
{
    public class PersonContactModel
    {
        [Required]
        public string Name { get; set; }
        public string Company { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }

        public PersonContact ToPersonContact()
        {
            return new PersonContact
            {
                Name = Name,
                Company = Company,
                Email = Email,
                Phone = Phone.RemoveNonDigits()
            };
        }
    }

}
