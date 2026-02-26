using Abp.Domain.Entities.Auditing;

namespace polane.Polane.Domain.Domain
{
    public class Events : FullAuditedEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
