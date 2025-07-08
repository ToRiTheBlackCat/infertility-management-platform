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

        public string PostTitle { get; set; }

        public string PostContent { get; set; }
    }
}
