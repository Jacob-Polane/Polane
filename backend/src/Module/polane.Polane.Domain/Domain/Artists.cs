using Abp.Domain.Entities.Auditing;

namespace polane.Polane.Domain.Domain
{
    public class Artists : FullAuditedEntity
    {
        public string Name { get; set; }
        public long Genre { get;set; }
    }
}
