using AutoMapper;
using DAW.Core.BusinessObject;
using DAW.Dto.Auth;
using DAW.Dto.Orders;
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

            CreateMap<Order, NewOrderDto>()
                .ForMember(no => no.OrderedPaintings, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(o => o.Id, opt => opt.Ignore());

            CreateMap<Order, DetailedOrderDto>()
                .ForMember(or => or.BuyerId, opt => opt.MapFrom(o => o.UserId))
                .ForMember(or => or.OrderId, opt => opt.MapFrom(o => o.Id))
                .ForMember(or => or.PaintingsList, opt => opt.Ignore())
                .ForMember(or => or.BuyerName, opt => opt.Ignore());

        }
    }
}
