using Microsoft.EntityFrameworkCore;
using VC.Domain;

namespace VC.Persistence
{
    internal class DiscussionRepo : IDiscussionRepo
    {
        private readonly IDbContextFactory<VCDbContext> _dbContextFactory;

        public DiscussionRepo(IDbContextFactory<VCDbContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public async Task<Discussion> GetDiscussionById(int id)
        {
            using (var dbContext = await _dbContextFactory.CreateDbContextAsync())
            {
                var discussion = await dbContext.Discussions.SingleOrDefaultAsync(x => x.DiscussionId == id);

                if (discussion != null)
                {
                    return discussion;
                }
                return null;
            }
        }
    }
}
