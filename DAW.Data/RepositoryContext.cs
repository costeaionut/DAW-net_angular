using DAW.Core.BusinessObject;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Data
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options)
        : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Painting> Paintings { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Order_Painting> OrderPaintings{ get; set; }
        public DbSet<Address> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Painting>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(p => p.PainterId);

            modelBuilder.Entity<Address>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(a => a.UserId);

            modelBuilder.Entity<Order>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<Order_Painting>()
                .HasKey(op => new { op.OrderId, op.PaintingId });

            modelBuilder.Entity<Order_Painting>()
                .HasOne<Order>()
                .WithMany()
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<Order_Painting>()
                .HasOne<Painting>()
                .WithMany()
                .HasForeignKey(op => op.PaintingId)
                .OnDelete(DeleteBehavior.NoAction);
            

        }
    }
}
