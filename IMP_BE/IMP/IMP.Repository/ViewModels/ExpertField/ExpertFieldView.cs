using IMP.Repository.Models;
using IMP.Repository.ViewModels.DoctorExpertField;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.ViewModels.ExpertField
{
    public class ExpertFieldView
    {
        public int ExpertFieldId { get; set; }

        public virtual ICollection<DoctorExpertFieldView> DoctorExpertFields { get; set; } = new List<DoctorExpertFieldView>();
    }
}
