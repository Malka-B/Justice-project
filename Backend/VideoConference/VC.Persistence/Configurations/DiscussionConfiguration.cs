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
    internal class DiscussionConfiguration : IEntityTypeConfiguration<Discussion>
    {
        public void Configure(EntityTypeBuilder<Discussion> builder)
        {
            builder.HasKey(e => e.DiscussionId);

            builder.Property(e => e.Subject).IsRequired().HasMaxLength(255);
            builder.Property(e => e.DateTime).IsRequired();

            builder.HasMany(e => e.Participants)
                .WithMany(e => e.Discussions);
        }
    }
}
