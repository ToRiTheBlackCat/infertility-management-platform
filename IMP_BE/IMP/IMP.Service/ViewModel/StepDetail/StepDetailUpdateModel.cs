using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.ViewModel.StepDetail
{
    public class StepDetailUpdateModel
    {
        [Required]
        public int StepId { get; set; }

        public int AppointmentId = -1;

        [Required]
        public string Description { get; set; }

        public int DoctorId { get; set; } = -1;
    }
}
