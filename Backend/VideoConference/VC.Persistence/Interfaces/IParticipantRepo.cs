using VC.Domain;

namespace VC.Persistence
{
    public interface IParticipantRepo
    {
        Task<Participant> GetParticipantById(string participandIdNumber);
    }
}
