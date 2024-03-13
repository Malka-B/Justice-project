using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VC.Application;

namespace VC.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscussionController : ControllerBase
    {
        private readonly IDiscussionBL _discussionBL;
        private readonly ILogger<DiscussionController> _logger;

        public DiscussionController(IDiscussionBL discussionBL, ILogger<DiscussionController> logger)
        {
            _discussionBL = discussionBL;
            _logger = logger;
        }

        [HttpGet("Details")]
        public async Task<ActionResult<DiscussionModel>> GetDiscussionById(int discussionId)
        {
            var discussion = await _discussionBL.GetDicussionById(discussionId);

            return Ok(discussion);
        }
    }
}
