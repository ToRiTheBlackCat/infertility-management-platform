using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.Treatments
{
    public class CreateTreatmentStepRequest
    {
        [Required]
        public int TreatmentId { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
