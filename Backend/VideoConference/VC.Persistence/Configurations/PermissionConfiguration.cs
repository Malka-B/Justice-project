using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VC.Domain;

namespace VC.Persistence
{
    internal class PermissionConfiguration : IEntityTypeConfiguration<Permission>
    {
        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            builder.HasKey(e => e.PermissionId);

            builder.Property(e => e.Type).IsRequired().HasConversion<int>();
            builder.Property(e => e.Description).HasMaxLength(255);           
        }
    }
}
