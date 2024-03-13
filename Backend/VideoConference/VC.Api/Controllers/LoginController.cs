using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VC.Application;

namespace VC.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly ILoginBL _loginBL;
        private readonly IParticipantBL _participantBL;

        public LoginController(ILogger<LoginController> logger, ILoginBL loginBL, IParticipantBL participantBL)
        {
            _logger = logger;
            _loginBL = loginBL;
            _participantBL = participantBL;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserInfo>> Post([FromBody] LoginModel login)
        {
            _logger.LogInformation($"User id {login.UserId} trying to connect to meeting id {login.MeetingId}");

            var isUserExist = await _loginBL.VerifyUser(login.UserId, login.MeetingId);

            if (isUserExist == false)
            {
                return Ok("Error, try another userId or meetingId");
            }

            var user = await _participantBL.GetUserInfo(login.UserId);

            return Ok(user);
        }
    }
}
