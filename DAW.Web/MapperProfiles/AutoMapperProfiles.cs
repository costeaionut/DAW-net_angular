using AutoMapper;
using DAW.Core.BusinessObject;
using DAW.Dto.Auth;
using DAW.Dto.Paintings;
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

            CreateMap<NewPaintingDto, Painting>()
                .ReverseMap();

            CreateMap<Painting, PaintingDto>()
                .ReverseMap();

        }
    }
}
