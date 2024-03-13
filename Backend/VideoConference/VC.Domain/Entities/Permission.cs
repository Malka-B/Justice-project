namespace VC.Domain
{
    public class Permission
    {
        public int PermissionId { get; set; }
        public PermissionType Type { get; set; }
        public string? Description { get; set; }

        public List<Role> Roles { get; set; }
    }
}
