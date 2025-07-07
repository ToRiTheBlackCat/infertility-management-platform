using IMP.Repository.Base;
using IMP.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Repos
{
    public class BlogRepository : GenericRepository<BlogPost>
    {
        private readonly InfertilityTreatmentDBContext _context;
        public BlogRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }
        // Additional methods specific to BlogRepository can be added here
    }
}
