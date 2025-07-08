using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.User
{
    public class UserProfileRequest
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public bool isDoctor { get; set; }
    }
}
