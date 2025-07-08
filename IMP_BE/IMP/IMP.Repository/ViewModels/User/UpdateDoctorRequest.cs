using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.User
{
    public class UpdateDoctorRequest
    {
        [Required]
        public int DoctorId { get; set; } 
        [Required]
        public string FullName { get; set; }

        [Required]
        public int YearOfBirth { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Gender { get; set; }

        public string Address { get; set; }

        public string Degree { get; set; }
    }
}
