using Microsoft.EntityFrameworkCore;
using VC.Domain;

namespace VC.Persistence
{
    internal class ParticipantRepo : IParticipantRepo
    {
        private readonly IDbContextFactory<VCDbContext> _dbContextFactory;

        public ParticipantRepo(IDbContextFactory<VCDbContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

       
        public Task<Participant> GetParticipantById(string participandIdNumber)
        {
            //שליפת האוביקט ושאר השדות הרלוונטים מהטבלאות המקושרות
            throw new NotImplementedException();
        }
    }
}
