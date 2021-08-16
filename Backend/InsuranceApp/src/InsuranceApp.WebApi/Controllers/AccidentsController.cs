using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.WebApi.Helpers;
using InsuranceApp.WebApi.Filters;

namespace InsuranceApp.WebApi.Controllers
{   
    [ApiController]
    [Route("api/[controller]")]
    [GlobalExceptionFilter]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccidentsController : ControllerBase
    {
        private readonly IAccidentsService _accidentsService;

        public AccidentsController(IAccidentsService accidentsService)
        {
            _accidentsService = accidentsService;
        }

        [HttpGet("{policyId}")]
        public async Task<IActionResult> GetAccidents(int policyId)
        {
            var accidents = await _accidentsService.GetAccidents(policyId, User.GetId());

            return Ok(accidents);
        }

        public class CarPhoto
        {
            public IFormFile photoFile { get; set; }
        }

        [HttpPost]
        public IActionResult CarPhotoUpload([FromForm] CarPhoto carPhoto)
        {
            if (carPhoto.photoFile.ContentType.ToLower() != "image/jpeg" &&
                carPhoto.photoFile.ContentType.ToLower() != "image/jpg" &&
                carPhoto.photoFile.ContentType.ToLower() != "image/png")
            {
                return BadRequest("You dont upload photo");
            }
            else
            {
                long photoLength = carPhoto.photoFile.Length;
                return Ok(photoLength);
            }
        }
    }
}
