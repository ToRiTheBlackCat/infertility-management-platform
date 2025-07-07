using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.ViewModel.Appointment
{
    public class CreateAppointmentModel
    {
        [Required]
        public int? BookingId { get; set; }

        [Required]
        public DateTime? Date { get; set; }

        [Required]
        public int? PatientId { get; set; }

        public int DoctorId { get; set; } = -1;

        public const string Status = "Đang chờ";

        [Required]
        public string Note { get; set; }
    }
}
