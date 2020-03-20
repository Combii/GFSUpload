using GFSUploadAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace GFSUploadAPI.Data
{
  public class DataContext : IdentityDbContext
  {
    public DataContext(DbContextOptions<DataContext>  options) : base (options) {}

    public DbSet<AccountBookKeeping> AccountBookKeeping { get; set; }
    public DbSet<BookKeeping> BookKeeping { get; set; }
  }
}
