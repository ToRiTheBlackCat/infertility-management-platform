using IMP.Repository.Base;
using IMP.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Repos
{
    public class StepDetailRepository : GenericRepository<StepDetail>
    {
        public StepDetailRepository(InfertilityTreatmentDBContext context) : base(context)
        {

        }

    }
}
