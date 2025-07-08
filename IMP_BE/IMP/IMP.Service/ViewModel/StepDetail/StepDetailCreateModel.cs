using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.ViewModel.StepDetail
{
    public class StepDetailCreateModel
    {
        [Required]
        public int StepId { get; set; }

        public int AppointmentId = -1;

        [Required]
        public string Description { get; set; }

        public const string Status = "Đang chờ";

        public int DoctorId { get; set; } = -1;
    }
}
