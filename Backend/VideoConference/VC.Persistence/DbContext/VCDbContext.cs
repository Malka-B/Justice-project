using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using VC.Domain;

namespace VC.Persistence
{
    public class VCDbContext : DbContext
    {
        public VCDbContext(DbContextOptions<VCDbContext> options) : base(options) { }

        #region DataTables
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        #endregion
    }
}
