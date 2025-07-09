using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.User
{
    public class RegisterDoctorRequest
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string ConfirmPassword { get; set; } = string.Empty;
        [Required]
        public string FullName { get; set; } = string.Empty;
        [Required]
        public required IFormFile DoctorImage { get; set; }
        [Required]
        public int YearOfBirth { get; set; }
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;
        [Required]
        public string Gender { get; set; } = string.Empty;
        [Required]
        public string Address { get; set; } = string.Empty;

        public string? Degree { get; set; }
    }
}
