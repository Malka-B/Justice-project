namespace VC.Application
{
    public interface IParticipantBL
    {
        Task<UserInfo> GetUserInfo(string userId);
    }
}
