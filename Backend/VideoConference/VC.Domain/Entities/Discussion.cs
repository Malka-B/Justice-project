using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VC.Domain
{
    public class Discussion
    {
        public int DiscussionId { get; set; }
        public string Subject { get; set; }
        public DateTime DateTime { get; set; }

        public List<Participant> Participants { get; }
    }
}
