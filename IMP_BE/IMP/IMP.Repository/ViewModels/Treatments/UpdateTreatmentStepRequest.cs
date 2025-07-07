using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.Treatments
{
    public class UpdateTreatmentStepRequest
    {
        [Required]
        public int StepId { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
