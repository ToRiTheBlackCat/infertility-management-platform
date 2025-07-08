using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.DoctorExpertField;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Repos
{
    public class DoctorExpertFieldRepository : GenericRepository<DoctorExpertField>
    {
        private readonly InfertilityTreatmentDBContext _context;

        public DoctorExpertFieldRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<DoctorExpertField> GetAsync(int doctorId, int expertFieldId)
        {
            return await _context.DoctorExpertFields
                .Where(x => x.DoctorId == doctorId && x.ExpertFieldId == expertFieldId)
                .Include(x => x.Doctor)
                .Include(x => x.ExpertField)
                .FirstOrDefaultAsync();
        }
    }
}
