using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.ViewModel.Appointment
{
    public class UpdateAppointmentModel
    {
        public int? AppointmentId = null;

        [Required]
        public DateTime? Date { get; set; } = null;

        [Required]
        public string Note { get; set; }

        public int DoctorId { get; set; } = -1;

        public const int ValidUpdateDateRange = 3;
    }
}
