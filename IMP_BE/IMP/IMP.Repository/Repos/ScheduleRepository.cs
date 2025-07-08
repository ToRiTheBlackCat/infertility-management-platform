using IMP.Repository.Base;
using IMP.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Repos
{
    public class ScheduleRepository : GenericRepository<DoctorSchedule>
    {
        private readonly InfertilityTreatmentDBContext _context;
        public ScheduleRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
