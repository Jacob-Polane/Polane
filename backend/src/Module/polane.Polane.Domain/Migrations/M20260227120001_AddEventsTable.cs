using FluentMigrator;
using Shesha.FluentMigrator;

namespace polane.Polane.Domain.Migrations
{
    [Migration(20260227120001), MsSqlOnly]
    public class M20260227120001_AddEventsTable : Migration
    {
        public override void Up()
        {
            Create.Table("Polane_Events")
                .WithIdAsGuid()
                .WithFullAuditColumns()
                .WithColumn("Name").AsString(255).Nullable()
                .WithColumn("Description").AsString().Nullable();
        }

        public override void Down()
        {
            Delete.Table("Polane_Events");
        }
    }
}
