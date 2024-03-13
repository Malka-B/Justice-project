using AutoMapper;
using VC.Domain;

namespace VC.Application
{
    public class VCApplicationProfile : Profile
    {
        public VCApplicationProfile()
        {
            CreateMap<Discussion, DiscussionModel>();
               //להוסיף מיפויים נוספים בין אוביקט הENTITY- DB 
               //למודלים בשכבת האפליקציה                
        }
    }
}
