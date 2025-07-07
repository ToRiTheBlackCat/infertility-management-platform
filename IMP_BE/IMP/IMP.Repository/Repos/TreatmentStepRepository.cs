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
    public class TreatmentStepRepository : GenericRepository<TreatmentStep>
    {
        private new readonly InfertilityTreatmentDBContext _context;
        public TreatmentStepRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<TreatmentStep>> GetStepsListWithTreatmentId(int treatmentId)
        {
            var stepList = await _context.TreatmentSteps
                .Where(x => x.TreatmentId == treatmentId)
                .AsNoTracking()
                .ToListAsync();

            return stepList;
        }
    }
}
