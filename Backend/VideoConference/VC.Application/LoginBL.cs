namespace VC.Application
{
    internal class LoginBL : ILoginBL
    {

        public Task<bool> VerifyUser(string userId, string discussionId)
        {
            //פניה לריפו לקבל את האוביקט מהDB
            //במידה ואכן קיים כזה בטבלת הDiscussionParticipant
            //מחזיר TRUE
            //אחרת FALSE
            throw new NotImplementedException();
        }
    }
}
