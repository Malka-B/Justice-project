using AutoMapper;
using Microsoft.Extensions.Logging;
using VC.Persistence;

namespace VC.Application
{
    internal class ParticipantBL : IParticipantBL
    {
        private readonly IParticipantRepo _participantRepo;
        private readonly Logger<ParticipantBL> _logger;
        private readonly IMapper _mapper;

        public ParticipantBL(IParticipantRepo participantRepo, Logger<ParticipantBL> logger, IMapper mapper)
        {
            _participantRepo = participantRepo;
            _logger = logger;
            _mapper = mapper;
        }

        public Task<UserInfo> GetUserInfo(string userId)
        {
            //פניה לריפו לקבל את האוביקט מהDB
            //מיפוי אוביקט הDB 
            //למודל השכבה
            throw new NotImplementedException();
        }
    }
}
