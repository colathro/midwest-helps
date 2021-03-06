﻿using getthehotdish.Handlers.Exceptions;
using getthehotdish.Models;
using getthehotdish.Utils;
using getthehotdish.Utils.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.DataAccess
{
    public class MaskRequest : IValidatableObject
    {
        private static readonly string partitionKey = "MR";

        [Key]
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid EditKey { get; set; }
        public Guid OriginalId { get; set; }
        public bool Approved { get; set; }
        public List<MaskDonation> Donations { get; set; }
        [Required]
        public Recipient Recipient { get; set; }
        [Required]
        public MaskDetails MaskDetails { get; set; }
        [Required]
        public Delivery Delivery { get; set; }

        public MaskRequest()
        {
        }

        public MaskRequest(MaskRequestModel mr)
        {
            mr.ToMaskRequest();
        }

        public MaskRequestModel ToMaskRequestModel()
        {
            return new MaskRequestModel
            {
                Id = Id,
                PartitionKey = PartitionKey,
                CreatedOn = CreatedOn,
                Recipient = Recipient.ToRecipientDetailsModel(),
                MaskDetails = MaskDetails.ToMaskDetailsModel(),
                Delivery = Delivery.ToDeliveryModel()
            };
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Delivery.Addresses.Count == 0)
            {
                yield return new ValidationResult("A delivery address must be provided.");
            }

            if (Delivery.Addresses.GroupBy(info => info.Type)
                .Select(group => new
                {
                    Type = group.Key,
                    Count = group.Count()
                })
                .Any(g => g.Count > 1))
            {
                yield return new ValidationResult("Only one address of each type should be provided.");
            }
        }

        public async static Task<MaskRequestModel> Create(DataContext dataContext, MaskRequestModel maskRequestModel)
        {
            maskRequestModel.PartitionKey = partitionKey;

            var maskRequest = maskRequestModel.ToMaskRequest();
            maskRequest.EditKey = Guid.NewGuid();
            maskRequest.CreatedOn = DateTime.UtcNow;

            dataContext.MaskRequests.Add(maskRequest);
            await dataContext.SaveChangesAsync();

            return maskRequest.ToMaskRequestModel();
        }

        public async static Task<MaskRequestModel> Update(DataContext dataContext, Guid id, MaskRequestModel maskRequestModel)
        {
            var maskRequest = maskRequestModel.ToMaskRequest();
            maskRequest.PartitionKey = partitionKey;
            maskRequest.Approved = false;
            maskRequest.OriginalId = id;
            maskRequest.Id = Guid.NewGuid();
            maskRequest.CreatedOn = DateTime.UtcNow;

            dataContext.MaskRequests.Add(maskRequest);
            await dataContext.SaveChangesAsync();

            return maskRequest.ToMaskRequestModel();
        }

        public async static Task<List<MaskRequestModel>> GetAllApprovedModel(DataContext dataContext, bool approved = false)
        {
            return await dataContext.MaskRequests.Where(m => m.Approved == approved).Select(m => m.ToMaskRequestModel()).ToListAsync();
        }

        public async static Task<List<MaskRequest>> GetAllApproved(DataContext dataContext, bool approved = false)
        {
            return await dataContext.MaskRequests.Where(m => m.Approved == approved).ToListAsync();
        }

        public async static Task<MaskRequest> GetApproved(DataContext dataContext, Guid id, bool approved = false)
        {
            return await dataContext.MaskRequests.Where(l => l.Id == id
                    && l.PartitionKey == partitionKey
                    && l.Approved == approved).FirstOrDefaultAsync();
        }

        public async static Task<MaskRequestModel> GetModel(DataContext dataContext, Guid id)
        {
            return (await Get(dataContext, id)).ToMaskRequestModel();
        }

        public async static Task<MaskRequest> Get(DataContext dataContext, Guid id)
        {
            var maskRequest = await dataContext.MaskRequests.FindAsync(id);
            if (maskRequest == null)
            {
                throw new ErrorModelException(ErrorCode.NotFound, "Request");
            }
            return maskRequest;
        }

        public async static Task Delete(DataContext dataContext, Guid id)
        {
            var maskRequest = await dataContext.MaskRequests.FindAsync(id);
            dataContext.MaskRequests.Remove(maskRequest);
            await dataContext.SaveChangesAsync();
        }

        public async static Task<IEnumerable<MaskRequestModel>> GetAll(DataContext dataContext)
        {
            var records = dataContext.MaskRequests.Where(m => m.Approved == true).ToList();

            return records.Select(m => new MaskRequestModel(m));
        }

        public async static Task<ICollection<MaskRequestModel>> GetPagedMaskType(DataContext dataContext, int maskType, int page)
        {
            var maskRequests = await GetAll(dataContext);

            MaskType type = (MaskType)maskType;

            if (maskType == -1)
            {
                return await PaginatedList<MaskRequestModel>.CreateAsync(maskRequests, page, 10);
            }

            var filterMaskRequests = maskRequests.Where(m => m.MaskDetails.Masks.Where(mi => mi.Type == Enum.GetName(typeof(MaskType), type)).Any());

            return await PaginatedList<MaskRequestModel>.CreateAsync(filterMaskRequests, page, 10);
        }

        public async static Task<int> PendingApprovalCount(DataContext dataContext)
        {
            var all = await GetAllApproved(dataContext);
            return all.Count;
        }

        public async static Task<int> GetRequestAggregateCount(DataContext dataContext)
        {
            var maskTypes = Enum.GetValues(typeof(MaskType)).Cast<MaskType>().Select(m => "Requested " + m.ToString());

            var aggs = await dataContext.Aggregates.Where(a => maskTypes.Contains(a.Name)).ToListAsync();
            int total = 0;

            foreach (var agg in aggs)
            {
                total += agg.Value;
            }

            return total;
        }

        public async static Task<int> GetDonatedAggregateCount(DataContext dataContext)
        {
            var maskTypes = Enum.GetValues(typeof(MaskType)).Cast<MaskType>().Select(m => "Donated " + m.ToString());

            var aggs = await dataContext.Aggregates.Where(a => maskTypes.Contains(a.Name)).ToListAsync();
            int total = 0;

            foreach (var agg in aggs)
            {
                total += agg.Value;
            }

            return total;
        }

        public async static Task UpdateOriginalId(DataContext dataContext, Guid originalId, Guid newId)
        {
            var oldMaskRequest = await MaskRequest.GetApproved(dataContext, originalId, true);
            if (oldMaskRequest != null)
            {
                var oldRefMaskRequests = dataContext.MaskRequests.Where(l => l.PartitionKey == partitionKey
                    && l.OriginalId == oldMaskRequest.Id && l.Id != newId);

                await oldRefMaskRequests.ForEachAsync((maskRequest) =>
                {
                    maskRequest.OriginalId = newId;
                });

                dataContext.Remove(oldMaskRequest);
            }
        }
    }

    [Owned]
    public class Recipient : PersonContact
    {
        [Required]
        public MaskForType MaskFor { get; set; }

        public RecipientModel ToRecipientDetailsModel()
        {
            return new RecipientModel
            {
                MaskFor = EnumUtils.GetName(MaskFor),
                Name = Name,
                Company = Company,
                Email = Email,
                Phone = Phone.ToPhoneFormat(),
            };
        }
    }

    [Owned]
    public class MaskDetails
    {
        [Required]
        public List<MaskInfo> Masks { get; set; }

        [StringLength(500, ErrorMessage = "Requirements length can't be more than 500 characters.")]
        public string Requirements { get; set; }

        public MaskDetailsModel ToMaskDetailsModel()
        {
            return new MaskDetailsModel
            {
                Masks = Masks.Select(m => m.ToMaskInfoModel()).ToList(),
                Requirements = Requirements
            };
        }
    }

    [Owned]
    public class Delivery
    {
        [Required]
        public List<Address> Addresses { get; set; }

        [StringLength(500, ErrorMessage = "Notes length can't be more than 500 characters.")]
        public string Notes { get; set; }

        public DeliveryModel ToDeliveryModel()
        {
            return new DeliveryModel
            {
                Notes = Notes,
                Addresses = Addresses.Select(a => a.ToAddressModel()).ToList()
            };
        }
    }

    [Owned]
    public class Address
    {
        [Required]
        public AddressType Type { get; set; }
        [Required]
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        [RegularExpression(@"(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)",
         ErrorMessage = "Zip code not valid.")]
        public string ZipCode { get; set; }

        public AddressModel ToAddressModel()
        {
            return new AddressModel
            {
                Type = EnumUtils.GetName(Type),
                Address1 = Address1,
                Address2 = Address2,
                City = City,
                State = State,
                ZipCode = ZipCode
            };
        }
    }
}
