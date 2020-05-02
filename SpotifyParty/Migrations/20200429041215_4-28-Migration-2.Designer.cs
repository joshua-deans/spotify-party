﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SpotifyParty;

namespace SpotifyParty.Migrations
{
    [DbContext(typeof(SpotifyPartyDBContext))]
    [Migration("20200429041215_4-28-Migration-2")]
    partial class _428Migration2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SpotifyParty.Party", b =>
                {
                    b.Property<int>("PartyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<int>("PartyLeaderUserId")
                        .HasColumnType("int");

                    b.Property<string>("Summary")
                        .HasColumnType("varchar(150)")
                        .HasMaxLength(150)
                        .IsUnicode(false);

                    b.HasKey("PartyId");

                    b.HasIndex("PartyLeaderUserId")
                        .IsUnique();

                    b.ToTable("Party");
                });

            modelBuilder.Entity("SpotifyParty.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CurrentPartyId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.HasKey("UserId");

                    b.HasAlternateKey("Email");

                    b.HasIndex("CurrentPartyId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("SpotifyParty.Party", b =>
                {
                    b.HasOne("SpotifyParty.User", "PartyLeader")
                        .WithOne()
                        .HasForeignKey("SpotifyParty.Party", "PartyLeaderUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("SpotifyParty.User", b =>
                {
                    b.HasOne("SpotifyParty.Party", "CurrentParty")
                        .WithMany("Users")
                        .HasForeignKey("CurrentPartyId")
                        .OnDelete(DeleteBehavior.SetNull);
                });
#pragma warning restore 612, 618
        }
    }
}