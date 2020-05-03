using getthehotdish.Models;
using getthehotdish.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.DataAccess
{
    [Owned]
    public class MaskInfo
    {
        [Required]
        public MaskType Type { get; set; }
        [Required]
        public int Quantity { get; set; }

        public MaskInfoModel ToMaskInfoModel()
        {
            return new MaskInfoModel
            {
                Type = EnumUtils.GetName(Type),
                Quantity = Quantity
            };
        }
    }
}
