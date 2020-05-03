using getthehotdish.Handlers.Exceptions;
using getthehotdish.Models;
using getthehotdish.Utils;
using getthehotdish.Utils.Extensions;
using Microsoft.Azure.Cosmos;
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
            maskRequestModel.CreatedOn = DateTime.UtcNow;

            var maskRequest = maskRequestModel.ToMaskRequest();
            maskRequest.EditKey = Guid.NewGuid();

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
            var maskRequest = await dataContext.MaskRequests.FindAsync(id);
            if (maskRequest == null)
            {
                throw new ErrorModelException(ErrorCode.NotFound, "Request");
            }
            return maskRequest.ToMaskRequestModel();
        }

        public async static Task<MaskRequestModel> Approve(DataContext dataContext, Guid id)
        {
            var newMaskRequest = await GetApproved(dataContext, id, false);
            if (newMaskRequest == null)
            {
                throw new ErrorModelException(ErrorCode.NotFound, "Request");
            }

            var oldMaskRequest = await GetApproved(dataContext, newMaskRequest.OriginalId, true);
            if (oldMaskRequest != null)
            {
                var oldRefMaskRequests = dataContext.MaskRequests.Where(l => l.PartitionKey == partitionKey
                    && l.OriginalId == oldMaskRequest.Id && l.Id != newMaskRequest.Id);

                await oldRefMaskRequests.ForEachAsync((maskRequest) =>
                {
                    maskRequest.OriginalId = newMaskRequest.Id;
                });

                dataContext.Remove(oldMaskRequest);
            }

            newMaskRequest.Approved = true;

            await dataContext.SaveChangesAsync();

            return newMaskRequest.ToMaskRequestModel();
        }

        public async static Task<bool> Deny(DataContext dataContext, Guid id)
        {
            var maskRequest = await GetApproved(dataContext, id, false);

            if (maskRequest != null)
            {
                dataContext.Remove(maskRequest);
                await dataContext.SaveChangesAsync();
            }

            return true;
        }
    }

    [Owned]
    public class Recipient
    {
        [Required]
        public MaskForType MaskFor { get; set; }
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
