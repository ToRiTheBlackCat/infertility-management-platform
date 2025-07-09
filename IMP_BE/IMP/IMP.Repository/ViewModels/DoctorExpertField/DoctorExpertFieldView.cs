using IMP.Repository.Models;
using IMP.Repository.ViewModels.ExpertField;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.DoctorExpertField
{
    public class DoctorExpertFieldView
    {
        public int DoctorExpertFieldId { get; set; }
        public string ExpertFieldName { get; set; }
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
    }
}
