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
    public class FeedbackRepository : GenericRepository<Feedback>
    {
        private new readonly InfertilityTreatmentDBContext _context;

        public FeedbackRepository(InfertilityTreatmentDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List<Feedback>> GetListFeedbackByTreatmentId(int treatmentId)
        {
            var feedbackList = await _context.Feedbacks
                .Where(x => x.TreatmentId == treatmentId)
                .AsNoTracking()
                .ToListAsync();

            return feedbackList;
        }
    }
}
