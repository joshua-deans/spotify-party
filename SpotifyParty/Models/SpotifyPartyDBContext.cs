using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SpotifyParty.Models;

namespace SpotifyParty
{
    public partial class SpotifyPartyDBContext : DbContext
    {
        public SpotifyPartyDBContext()
        {}

        public SpotifyPartyDBContext(DbContextOptions<SpotifyPartyDBContext> options)
            : base(options)
        {}

        public virtual DbSet<Party> Party { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Message> Message { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(SQLConnectionInfo.getConnectionString());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Party>(entity =>
            {
                entity.HasMany(p => p.Users)
                    .WithOne()
                    .HasForeignKey(e => e.CurrentPartyId);


                entity.HasOne(e => e.PartyLeader)
                    .WithOne()
                    .HasForeignKey<Party>(e => e.PartyLeaderUserId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Summary)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity => {

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasAlternateKey(e => e.Email);
            });

            modelBuilder.Entity<Message>(entity => {

                entity.HasOne(p => p.Sender)
                    .WithMany()
                    .HasForeignKey(e => e.SenderId)
                    .IsRequired();

                entity.Property(e => e.Content)
                    .IsRequired()
                    .IsUnicode(true);

                entity.HasOne(p => p.Party)
                    .WithMany()
                    .HasForeignKey(e => e.PartyId)
                    .IsRequired();
            });
        }

    }
}
