using IMP.Repository.Base;
using IMP.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Repos
{
    public class AppointmentRepository : GenericRepository<Appointment>
    {
        public AppointmentRepository(InfertilityTreatmentDBContext context) : base(context)
        {
        }

        public List<Appointment> GetAppointmentsByBookingId(int bookingId)
        {
            var booking = _context.TreatmentBookings
                .AsNoTracking()
                .Where(x => x.BookingId == bookingId)
                .Include(x => x.Appointments).ThenInclude(x => x.StepDetails).FirstOrDefault();

            if (booking == null)
            {
                return new List<Appointment>();
            }

            return booking.Appointments.ToList();
        }

        public Appointment? GetAppointmentById(int appointmentId)
        {
            var appointment = _context.Appointments
                .AsNoTracking()
                .Include(x => x.Booking)
                .Include(x => x.StepDetails)
                .FirstOrDefault(x => x.AppointmentId == appointmentId);

            return appointment;
        }

        //public void CreateAppointment(Appointment appointment)
        //{
        //    _context.Appointments.Add(appointment);
        //}

        public int GetNewId()
        {
            var newId = _context.Appointments
                .AsNoTracking()
                .ToList()
                .MaxBy(x => x.AppointmentId);

            if (newId == null)
            {
                return 0;
            }

            return newId.AppointmentId + 1;
        }
    }
}
