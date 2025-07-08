using IMP.Repository.Base;
using IMP.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Repos
{
    public class TreatmentRepository : GenericRepository<Treatment>
    {
        private new readonly InfertilityTreatmentDBContext _context;
        public TreatmentRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }
    }
}