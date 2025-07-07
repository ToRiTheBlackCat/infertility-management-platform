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
    public class UserRepository : GenericRepository<User>
    {
        private new readonly InfertilityTreatmentDBContext _context;
        public UserRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User?> GetAccountAsync(string email, string password)
        {
            return await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == email
                                       && x.Password == password
                                       && x.IsActive);
        }
    }
}
