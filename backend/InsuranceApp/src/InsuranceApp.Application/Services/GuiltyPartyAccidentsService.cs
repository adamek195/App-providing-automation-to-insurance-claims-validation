using AutoMapper;
using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Services
{
    public class GuiltyPartyAccidentsService: IGuiltyPartyAccidentsService
    {
        private readonly IGuiltyPartyAccidentsRepository _guiltyPartyAccidentsRepository;
        private readonly IMapper _mapper;

        public GuiltyPartyAccidentsService(IGuiltyPartyAccidentsRepository guiltyPartyAccidentsRepository, IMapper mapper)
        {
            _guiltyPartyAccidentsRepository = guiltyPartyAccidentsRepository;
            _mapper = mapper;
        }

        public async Task<List<GuiltyPartyAccidentDto>> GetGuiltyPartyAccidents(string userId)
        {
            var accidents = await _guiltyPartyAccidentsRepository.GetGuiltyPartyAccidents(Guid.Parse(userId));

            return _mapper.Map<List<GuiltyPartyAccidentDto>>(accidents);
        }
    }
}
