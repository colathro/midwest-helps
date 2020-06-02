using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.DataAccess;

namespace getthehotdish.Models
{
    public class AggregateTotalModel
    {
        public int Requested { get; set; }
        public int Donated { get; set; }
    }
}
