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
    public class TreatmentBookingRepository : GenericRepository<TreatmentBooking>
    {
        private readonly InfertilityTreatmentDBContext _context;

        public TreatmentBookingRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<int> Count()
        {
            return await _context.TreatmentBookings
                .Select(tb => (int?)tb.BookingId)  // cast to nullable int
                .MaxAsync() ?? 0;                  // fallback to 0 if empty;
        }

        public async Task<List<TreatmentBooking>> GetAllWithPaging(int pageNum, int pageSize)
        {
            var result = await _context.TreatmentBookings
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return result;
        }

        public async Task<List<TreatmentBooking>> GetDetailsByDoctor(int doctorId)
        {
            var result = await _context.TreatmentBookings
                .Where(x => x.DoctorId == doctorId)
                .ToListAsync();
            return result;
        }

        public async Task<List<TreatmentBooking>> GetDetailsByPatient(int patientId)
        {
            var result = await _context.TreatmentBookings
                .Where(x => x.PatientId == patientId)
                .ToListAsync();
            return result;
        }
    }
}
