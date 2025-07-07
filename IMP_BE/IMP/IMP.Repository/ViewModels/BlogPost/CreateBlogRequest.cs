using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.BlogPost
{
    public class CreateBlogRequest
    {

        public string Image { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        public string PostTitle { get; set; }

        [Required]
        public string PostContent { get; set; }

        public string Status { get; set; }
    }
}
