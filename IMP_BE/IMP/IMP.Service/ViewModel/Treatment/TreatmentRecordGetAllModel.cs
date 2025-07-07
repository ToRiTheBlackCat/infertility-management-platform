using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.ViewModel.Treatment
{
    public class TreatmentRecordGetAllModel
    {
        public DateOnly? StartDate { get; set; } = null;
        public DateOnly? EndDate { get; set; } = null;
        public int PageSize { get; set; } = 3;
        public int PageNumber { get; set; } = 1;
    }
}
