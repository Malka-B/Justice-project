using VC.Domain;

namespace VC.Persistence
{
    public interface IDiscussionRepo
    {
        Task<Discussion> GetDiscussionById(int id);
    }
}
