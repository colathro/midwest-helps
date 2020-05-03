using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.DataAccess
{
    public class PersonContact
    {
        [Required]
        [StringLength(50, ErrorMessage = "Name length can't be more than 50 characters.")]
        public string Name { get; set; }
        [StringLength(50, ErrorMessage = "Name length can't be more than 50 characters.")]
        public string Company { get; set; }
        [Required]
        [EmailAddress]
        [StringLength(50, ErrorMessage = "Email length can't be more than 50 characters.")]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^\d{10}$",
         ErrorMessage = "Phone not valid.")]
        [StringLength(20, ErrorMessage = "Phone length can't be more than 50 characters.")]
        public string Phone { get; set; }
    }
}
