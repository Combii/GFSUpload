using GFSUploadAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;

namespace GFSUploadAPI.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext>  options) : base (options) {}

    public DbSet<AccountBookKeeping> AccountBookKeeping { get; set; }
  }
}
