using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.ExpertField;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.ExpertFieldSer
{
    public interface IExpertFieldService
    {
        Task<List<ExpertField>> GetAll();
        Task<ExpertField> GetDetails(int id);
        Task<(string status, ExpertField view)> Create(string expertFieldName);
        Task<(string status, ExpertField view)> Update(int id, string name);
        Task<string> Delete(int id);
    }
    public class ExpertFieldService : IExpertFieldService
    {
        private readonly UnitOfWork _uOW;

        public ExpertFieldService(UnitOfWork uOW)
        {
            _uOW = uOW;
        }

        public async Task<(string status, ExpertField view)> Create(string expertFieldName)
        {
            try
            {
                var count = await _uOW.ExpertFieldRepo.Count();
                await _uOW.BeginTransactionAsync();

                ExpertField mapped = new ExpertField();
                mapped.ExpertFieldId = count + 1;
                mapped.ExpertFieldName = expertFieldName;

                var result = await _uOW.ExpertFieldRepo.CreateAsync(mapped);

                await _uOW.CommitTransactionAsync();

                if (result > 0)
                    return ("Success: Create successfully", mapped);
                return ("Failure: Creation unsuccessful", mapped);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _uOW.RollbackTransactionAsync();
                return ("Failure: Error when creating new field.", null);
            }
        }

        public async Task<string> Delete(int id)
        {
            try
            {
                var existing = await _uOW.ExpertFieldRepo.GetByIdAsync(id);
                if (existing == null)
                    return "Failure: This object Id doesn't exist in the database";
                if (existing.DoctorExpertFields.Count > 0)
                    return "Failure: Can't delete field with doctor belonging to it";

                await _uOW.BeginTransactionAsync();

                var result = await _uOW.ExpertFieldRepo.RemoveAsync(existing);

                await _uOW.CommitTransactionAsync();

                if (result)
                    return "Success: Remove successfully";
                return "Failure: Removal unsuccessful";
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _uOW.RollbackTransactionAsync();
                return "Failure: Error when deleting field.";
            }
        }

        public async Task<List<ExpertField>> GetAll()
        {
            //Include this and map it to a dto
            var result = await _uOW.ExpertFieldRepo.GetAllAsync();
            return result.ToList();
        }

        public async Task<ExpertField> GetDetails(int id)
        {
            var result = await _uOW.ExpertFieldRepo.GetByIdAsync(id);
            return result;
        }

        public async Task<(string status, ExpertField view)> Update(int id, string name)
        {
            try
            {
                var existing = await _uOW.ExpertFieldRepo.GetByIdWithIncludeAsync(id, "ExpertFieldId", 
                                                                                x => x.DoctorExpertFields);

                if (existing == null)
                    return ("Failure: This object Id doesn't exist in the database", null);
                if (existing.DoctorExpertFields.Count > 0)
                    return ("Failure: Can't delete field with doctor belonging to it", existing);

                await _uOW.BeginTransactionAsync();

                ExpertField mapped = new ExpertField();
                mapped.ExpertFieldId = id;
                mapped.ExpertFieldName = name;

                var result = await _uOW.ExpertFieldRepo.UpdateAsync(mapped);

                await _uOW.CommitTransactionAsync();

                if (result > 0)
                    return ("Successful!", mapped);
                return ("Failure: Update unsuccessfull", mapped);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _uOW.RollbackTransactionAsync();
                return ("Failure: Error when updating new field.", null);
            }
        }
    }
}
