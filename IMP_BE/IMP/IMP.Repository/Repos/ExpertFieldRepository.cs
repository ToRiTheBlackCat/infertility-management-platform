using IMP.Repository.Base;
using IMP.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Repos
{
    public class ExpertFieldRepository : GenericRepository<ExpertField>
    {
        private readonly InfertilityTreatmentDBContext _context;

        public ExpertFieldRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<int> Count()
        {
            return await _context.ExpertFields
                .Select(tb => (int?)tb.ExpertFieldId)  // cast to nullable int
                .MaxAsync() ?? 0;                      // fallback to 0 if empty;
        }
    }
}
