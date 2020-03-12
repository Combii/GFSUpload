using GFSUploadAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;

namespace GFSUploadAPI.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext>  options) : base (options) {}

    public DbSet<AccountBookKeeping> accountBookKeeping { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
      => options.UseSqlite("Data Source=GfsUpload.db");
  }
}
