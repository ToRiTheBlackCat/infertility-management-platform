using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.BlogPost
{
    public class UpdateBlogRequest
    {
        public string Image { get; set; }

        [Required]
        public int DoctorId { get; set; }

        public string PostTitle { get; set; }

        public string PostContent { get; set; }

        public int? Viewers { get; set; }

        public string Status { get; set; }
    }
}
