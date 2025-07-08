using IMP.Repository.Models;
using IMP.Repository.Repos;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Repository.Base
{
    public class UnitOfWork
    {
        private readonly InfertilityTreatmentDBContext _context;
        private IDbContextTransaction? _transaction;

        #region Repos here
        public UserRepository UserRepo { get; }
        public PatientRepository PatientRepo { get; }
        public DoctorRepository DoctorRepo { get; }
        public BlogRepository BlogRepo { get; }
        public ScheduleRepository ScheduleRepo { get; }
        public TreatmentRepository TreatmentRepo { get; }
        public TreatmentStepRepository TreatmentStepRepo { get; }
        public FeedbackRepository FeedbackRepo { get; }
        public TreatmentBookingRepository TreatmentBookingRepo { get; }
        public BookingRepository BookingRepo { get; }
        public AppointmentRepository AppointmentRepo { get; }
        public StepDetailRepository StepDetailRepo { get; }
        public TreatmentRecordRepository TreatmentRecordRepo { get; }
        public ExpertFieldRepository ExpertFieldRepo { get; }
        public DoctorExpertFieldRepository DoctorExpertFieldRepo { get; }
        public TreatmentBookingRepository TreatmentBookingRepo { get; }

        #endregion

        public UnitOfWork(InfertilityTreatmentDBContext context)
        {
            _context = context;

            #region DI repo here
            TreatmentBookingRepo = new(_context);
            DoctorExpertFieldRepo = new(_context);
            ExpertFieldRepo = new(_context);
            UserRepo = new(_context);
            PatientRepo = new (_context);
            DoctorRepo = new(_context);
            BlogRepo = new(_context);
            ScheduleRepo = new(_context);
            TreatmentRepo = new (_context);
            TreatmentStepRepo = new (_context);
            FeedbackRepo = new(_context);
            TreatmentBookingRepo = new (_context);
            BookingRepo = new (_context);
            AppointmentRepo = new (_context);
            StepDetailRepo = new (_context);
            TreatmentRecordRepo = new (_context);
            #endregion
        }
        public async Task BeginTransactionAsync()
        {
            if (_transaction == null)
            {
                _transaction = await _context.Database.BeginTransactionAsync();
            }
        }

        public async Task CommitTransactionAsync()
        {
            if (_transaction != null)
            {
                await _context.SaveChangesAsync();
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task RollbackTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}