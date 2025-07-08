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
    public class PatientRepository : GenericRepository<Patient>
    {
        private new readonly InfertilityTreatmentDBContext _context;
        public PatientRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
