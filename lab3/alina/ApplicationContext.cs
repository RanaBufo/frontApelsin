using alina.BD;
using alina.DataBase;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;

namespace alina
{
    public class ApplicationContext : DbContext
    {
        public DbSet<RoleDB> Roles { get; set; }
        public DbSet<UserDB> Users { get; set; }
        public DbSet<ContactDB> Contacts { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            modelBuilder.Entity<RoleDB>()
                .HasMany(e => e.Contact)
                .WithOne(e => e.Role)
                .HasForeignKey(e => e.IdRole)
                .IsRequired();


            //Связь между юзером и контактами, 1 к 1
            modelBuilder.Entity<UserDB>()
                .HasOne(e => e.Contact)
                .WithOne(e => e.User)
                .HasForeignKey<ContactDB>(contact => contact.IdUser)
                .IsRequired();
        }
    }
}
