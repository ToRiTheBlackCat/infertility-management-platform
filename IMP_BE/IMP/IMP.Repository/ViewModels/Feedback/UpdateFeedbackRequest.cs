using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.Feedback
{
    public class UpdateFeedbackRequest
    {
        [Required]
        public int BookingId { get; set; }

        public string? TreatmentComment { get; set; }

        public DateTime UpdateDate { get; set; }
    }
}
