using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.ViewModel.Appointment
{
    public class DoneAppointmentModel
    {
        public int? AppointmentId = null;

        public int DoctorId { get; set; } = -1;

        public const string Status = "Đã hoàn thành";
    }
}
