namespace VC.Domain
{
    public class Role
    {
        public int RoleId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int PermissionId { get; set; }
        public Permission Permission { get; set; }

        public List<Participant> Participants { get; }
    }
}
