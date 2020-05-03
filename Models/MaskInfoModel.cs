using getthehotdish.DataAccess;
using getthehotdish.Utils;
using System.ComponentModel.DataAnnotations;

namespace getthehotdish.Models
{
    public class MaskInfoModel
    {
        [Required]
        public string Type { get; set; }
        public int Quantity { get; set; }

        public MaskInfo ToMaskInfo()
        {
            return new MaskInfo
            {
                Type = EnumUtils.GetValue<MaskType>(Type),
                Quantity = Quantity
            };
        }
    }
}
