using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VC.Domain;

namespace VC.Persistence
{
    internal class ParticipantConfiguration : IEntityTypeConfiguration<Participant>
    {
        public void Configure(EntityTypeBuilder<Participant> builder)
        {
            builder.HasKey(e => e.ParticipantId);

            builder.Property(e => e.Name).IsRequired().HasMaxLength(50);
            builder.Property(e => e.IdNumber).IsRequired().HasMaxLength(9);

            builder.HasMany(e => e.Discussions)
                .WithMany(e => e.Participants);

            builder.HasMany(e => e.Roles)
                .WithMany(e => e.Participants);
        }
    }
}
