using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.ViewModel.StepDetail
{
    public class StepDetailDeleteModel
    {
        [Required]
        public int StepId { get; set; }

        public int AppointmentId = -1;

        public int DoctorId { get; set; } = -1;
    }
}
