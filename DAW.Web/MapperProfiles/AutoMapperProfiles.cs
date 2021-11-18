using AutoMapper;
using DAW.Data.Models;
using DAW.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAW.Web.MapperProfiles
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterFormDto, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(f => f.LastName + f.FirstName))
                .ReverseMap();
        }
    }
}
