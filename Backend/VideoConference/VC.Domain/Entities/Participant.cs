namespace VC.Domain
{
    public class Participant
    {
        public int ParticipantId { get; set; }
        public string Name { get; set; }
        public string IdNumber { get; set; }

        public List<Discussion> Discussions { get; }
        public List<Role> Roles { get; }

    }
}
