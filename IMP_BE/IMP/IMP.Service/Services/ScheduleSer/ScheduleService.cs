﻿using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.Repos;
using IMP.Repository.ViewModels.Schedule;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.ScheduleSer
{
    public interface IScheduleService
    {
        // Define methods for the ScheduleService interface
        Task<DoctorSchedule?> GetScheduleByDoctorIdAsync(int id);
        Task<DoctorSchedule?> CreateScheduleAsync(int doctorId, ScheduleDTO schedule);
        Task<DoctorSchedule?> UpdateScheduleAsync(int doctorId, ScheduleDTO schedule);
        Task<bool> DeleteScheduleAsync(int id);
    }

    public class ScheduleService : IScheduleService
    {
        private readonly UnitOfWork _unitOfWork;
        public ScheduleService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<DoctorSchedule?> GetScheduleByDoctorIdAsync(int id)
        {
            var schedule = new DoctorSchedule();
            schedule = await _unitOfWork.ScheduleRepo.GetByIdAsync(id);

            return schedule;
        }

        public async Task<DoctorSchedule?> CreateScheduleAsync(int doctorId, ScheduleDTO schedule)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var doctor = await _unitOfWork.DoctorRepo.GetByIdAsync(doctorId);
                if (doctor == null)
                {
                    return new DoctorSchedule();
                }

                DoctorSchedule newSchedule = new DoctorSchedule
                {
                    DoctorId = doctorId,
                    Monday = schedule.Monday,
                    Tuesday = schedule.Tuesday,
                    Wednesday = schedule.Wednesday,
                    Thursday = schedule.Thursday,
                    Friday = schedule.Friday,
                    Saturday = schedule.Saturday,
                    Sunday = schedule.Sunday,
                };
                await _unitOfWork.ScheduleRepo.CreateAsync(newSchedule);
                await _unitOfWork.CommitTransactionAsync();

                var createSchedule = await _unitOfWork.ScheduleRepo.GetByIdAsync(doctorId);

                return createSchedule;
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                Log.Error(ex, "An unexpected error occurred while creating the schedule");
                return new DoctorSchedule();
            }
        }

        public async Task<DoctorSchedule?> UpdateScheduleAsync(int doctorId, ScheduleDTO schedule)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var doctor = await _unitOfWork.DoctorRepo.GetByIdAsync(doctorId);
                if (doctor == null)
                {
                    Log.Error("Doctor with ID {DoctorId} not found", doctorId);
                    return new DoctorSchedule();
                }

                var existingSchedule = await _unitOfWork.ScheduleRepo.GetByIdAsync(doctorId);
                if (existingSchedule == null)
                {
                    Log.Error("Schedule with ID {ScheduleId} not found", doctorId);
                    return new DoctorSchedule();
                }

                existingSchedule.Monday = schedule.Monday;
                existingSchedule.Tuesday = schedule.Tuesday;
                existingSchedule.Wednesday = schedule.Wednesday;
                existingSchedule.Thursday = schedule.Thursday;
                existingSchedule.Friday = schedule.Friday;
                existingSchedule.Saturday = schedule.Saturday;
                existingSchedule.Sunday = schedule.Sunday;

                await _unitOfWork.ScheduleRepo.UpdateAsync(existingSchedule);
                await _unitOfWork.CommitTransactionAsync();

                var updatedSchedule = await _unitOfWork.ScheduleRepo.GetByIdAsync(doctorId);

                return updatedSchedule;
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                Log.Error(ex, "An unexpected error occurred while updating the schedule");
                return new DoctorSchedule();
            }
        }

        public async Task<bool> DeleteScheduleAsync(int id)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var schedule = await _unitOfWork.ScheduleRepo.GetByIdAsync(id);
                if (schedule == null)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    Log.Error("Schedule with DoctorID {ScheduleId} not found", id);
                    return false;
                }

                var result = await _unitOfWork.ScheduleRepo.RemoveAsync(schedule);
                await _unitOfWork.CommitTransactionAsync();

                return result;
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                Log.Error(ex, "An unexpected error occurred while deleting the schedule");
                return false;
            }
        }
    }
}
