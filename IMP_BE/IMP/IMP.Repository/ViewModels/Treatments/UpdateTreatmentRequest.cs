using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.Treatments
{
    public class UpdateTreatmentRequest
    {
        [Required]
        public string TreatmentName { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;

        public int? ExpertFieldId { get; set; }
    }
}
