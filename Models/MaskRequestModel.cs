using getthehotdish.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace getthehotdish.Models
{
    public class MaskRequestModel
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("partitionKey")]
        public string PartitionKey { get; set; }

        [JsonPropertyName("createdOn")]
        public DateTime CreatedOn { get; set; }

        public MaskRequest ConvertToDBO()
        {
            return new MaskRequest()
            {
                PartitionKey = this.PartitionKey,
                CreatedOn = this.CreatedOn
            };
        }

        public static MaskRequestModel ConvertToDTO(MaskRequest mr)
        {
            return new MaskRequestModel
            {
                Id = mr.Id,
                PartitionKey = mr.PartitionKey,
                CreatedOn = mr.CreatedOn
            };
        }
    }
}
