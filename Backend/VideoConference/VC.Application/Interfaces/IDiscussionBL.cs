namespace VC.Application
{
    public interface IDiscussionBL
    {
        Task<DiscussionModel> GetDicussionById(int id);
    }
}
