using IMP.Repository.Base;
using IMP.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Repos
{
    public class TreatmentRecordRepository : GenericRepository<TreatmentRecord>
    {
        public TreatmentRecordRepository(InfertilityTreatmentDBContext context) : base(context)
        {

        }
    }
}
