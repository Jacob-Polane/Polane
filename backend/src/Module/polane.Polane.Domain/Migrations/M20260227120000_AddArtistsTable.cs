using FluentMigrator;
using Shesha.FluentMigrator;

namespace polane.Polane.Domain.Migrations
{
    [Migration(20260227120000), MsSqlOnly]
    public class M20260227120000_AddArtistsTable : Migration
    {
        public override void Up()
        {
            Create.Table("Polane_Artists")
                .WithIdAsGuid()
                .WithFullAuditColumns()
                .WithColumn("Name").AsString(255).Nullable()
                .WithColumn("Genre").AsInt64().Nullable();
        }

        public override void Down()
        {
            Delete.Table("Polane_Artists");
        }
    }
}
