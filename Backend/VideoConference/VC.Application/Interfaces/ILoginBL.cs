namespace VC.Application
{
    public interface ILoginBL
    {
        Task<bool> VerifyUser(string userId, string discussionId);
    }
}
