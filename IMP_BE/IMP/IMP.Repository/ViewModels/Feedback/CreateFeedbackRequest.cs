using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.Feedback
{
    public class CreateFeedbackRequest
    {
        [Required]
        public int PatientId { get; set; }
        [Required]
        public int BookingId { get; set; }
        [Required]
        public int TreatmentId { get; set; }
        [Required]
        [Range(1, 10)]
        public double TreatmentScore { get; set; }
        [Required]
        [Range(1, 10)]
        public double DoctorScore { get; set; }
        public string? TreatmentComment { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
