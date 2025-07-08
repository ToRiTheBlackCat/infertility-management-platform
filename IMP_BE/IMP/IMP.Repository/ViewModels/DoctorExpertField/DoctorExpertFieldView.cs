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
        public string ExpertFieldName { get; set; }

        public string AvatarImage { get; set; }

        public string FullName { get; set; }

        public int YearOfBirth { get; set; }

        public string PhoneNumber { get; set; }

        public string Gender { get; set; }

        public string Address { get; set; }

        public string Degree { get; set; }

        public double? AverageScore { get; set; }

        public string Status { get; set; }
    }
}
