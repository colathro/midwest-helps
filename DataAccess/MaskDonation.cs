using getthehotdish.Handlers.Exceptions;
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
    public class MaskDonation : IValidatableObject
    {
        private static readonly string partitionKey = "MD";

        [Key]
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid EditKey { get; set; }
        public Guid OriginalId { get; set; }
        public bool Approved { get; set; }
        public DonationStatus Status { get; set; }
        [Required]
        public Guid RequestId { get; set; }
        [Required]
        public MaskRequest Request { get; set; }
        [Required]
        public Donor Donor { get; set; }
        [Required]
        public List<MaskInfo> Donation { get; set; }

        public MaskDonation()
        {
        }

        public MaskDonation(MaskDonationModel mr)
        {
            mr.ToMaskDonation();
        }

        public MaskDonationModel ToMaskDonationModel()
        {
            return new MaskDonationModel
            {
                Id = Id,
                PartitionKey = PartitionKey,
                CreatedOn = CreatedOn,
                Status = EnumUtils.GetName(Status),
                Donor = Donor.ToDonorModel(),
                Donation = Donation.Select(d => d.ToMaskInfoModel()).ToList(),
                Request = Request?.ToMaskRequestModel()
            };
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            return new List<ValidationResult>();
        }

        public async static Task<MaskDonationModel> Create(DataContext dataContext, MaskDonationModel maskDonationModel)
        {
            maskDonationModel.PartitionKey = partitionKey;
            maskDonationModel.CreatedOn = DateTime.UtcNow;

            var maskDonation = maskDonationModel.ToMaskDonation();
            maskDonation.Request = await MaskRequest.Get(dataContext, maskDonation.RequestId);
            maskDonation.EditKey = Guid.NewGuid();

            dataContext.MaskDonations.Add(maskDonation);
            await dataContext.SaveChangesAsync();

            return maskDonation.ToMaskDonationModel();
        }

        public async static Task<MaskDonationModel> Update(DataContext dataContext, Guid id, MaskDonationModel maskDonationModel)
        {
            var maskDonation = maskDonationModel.ToMaskDonation();
            maskDonation.PartitionKey = partitionKey;
            maskDonation.Approved = false;
            maskDonation.OriginalId = id;
            maskDonation.Id = Guid.NewGuid();
            maskDonation.CreatedOn = DateTime.UtcNow;
            maskDonation.Request = await MaskRequest.Get(dataContext, Guid.Parse(maskDonationModel.RequestId));

            await dataContext.SaveChangesAsync();

            return maskDonation.ToMaskDonationModel();
        }

        public async static Task<MaskDonationModel> UpdateStatus(DataContext dataContext, Guid id, DonationStatus donationStatus)
        {
            var maskDonation = await Get(dataContext, id);
            if (maskDonation == null)
            {
                throw new ErrorModelException(ErrorCode.NotFound, "Donation");
            }
            maskDonation.Status = donationStatus;
            await dataContext.SaveChangesAsync();

            return maskDonation.ToMaskDonationModel();
        }
        public async static Task<MaskDonation> Get(DataContext dataContext, Guid id)
        {
            return await dataContext.MaskDonations.FindAsync(id);
        }

        public async static Task<MaskDonationModel> GetModel(DataContext dataContext, Guid id)
        {
            var maskDonation = await Get(dataContext, id);
            if (maskDonation == null)
            {
                throw new ErrorModelException(ErrorCode.NotFound, "Donation");
            }

            if (maskDonation.Request == null)
            {
                maskDonation.Request = await MaskRequest.Get(dataContext, maskDonation.RequestId);
            }

            return maskDonation.ToMaskDonationModel();
        }
        public async static Task<List<MaskDonationModel>> GetAllModel(DataContext dataContext)
        {
            return await dataContext.MaskDonations.Where(m => m.Approved == false).Select(m => m.ToMaskDonationModel()).ToListAsync();
        }
    }

    [Owned]
    public class Donor : PersonContact
    {
        [Required]
        public ContactType BestContactType { get; set; }
        public DonorModel ToDonorModel()
        {
            return new DonorModel
            {
                BestContactType = EnumUtils.GetName(BestContactType),
                Name = Name,
                Company = Company,
                Email = Email,
                Phone = Phone.ToPhoneFormat(),
            };
        }
    }
}
