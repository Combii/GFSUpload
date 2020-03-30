using AutoMapper;
using Microsoft.AspNetCore.Identity;
using GFSUploadAPI.Dtos;

namespace GFSUploadAPI
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<IdentityUser,UserForLoggedInDto>();
        }
    }
}