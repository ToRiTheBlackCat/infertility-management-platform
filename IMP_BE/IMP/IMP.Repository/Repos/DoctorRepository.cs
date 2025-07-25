﻿using IMP.Repository.Base;
using IMP.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Repos
{
    public class DoctorRepository : GenericRepository<Doctor>
    {
        private new readonly InfertilityTreatmentDBContext _context;
        public DoctorRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<Doctor?> GetDoctorByUserId(int userId)
        {
            return await _context.Doctors
                .FirstOrDefaultAsync(x => x.DoctorNavigation.UserId == userId);
        }
    }
}
