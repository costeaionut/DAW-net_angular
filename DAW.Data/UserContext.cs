using DAW.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions options)
        : base(options)
        {
        }

        DbSet<User> Users { get; set; }
        DbSet<Painting> Paintings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Painting>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(p => p.PainterId);

        }
    }
}
