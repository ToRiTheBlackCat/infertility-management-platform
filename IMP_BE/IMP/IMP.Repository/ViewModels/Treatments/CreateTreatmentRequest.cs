using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.Treatments
{
    public class CreateTreatmentRequest
    {
        [Required]
        public string TreatmentName { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty ;
        [Required]
        public required IFormFile TreatmentImage { get; set; }
        public int? ExpertFieldId { get; set; }
    }
}
