using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.TreatmentBooking
{
    public class CreateTreatmentBooking
    {

        public int PatientId { get; set; }

        public int DoctorId { get; set; }

        public int TreatmentId { get; set; }

        public DateOnly? CreatedDate { get; set; }
    }
}
