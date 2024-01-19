using MapAPI.Models;
using MapAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoordinatesController : ControllerBase
    {
        private readonly IFileService _fileService;

        public CoordinatesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CoordinateData data)
        {

            var _data = JsonConvert.SerializeObject(data);

            _fileService.SaveData(_data);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Read()
        {
            var data = _fileService.ReadData();
            return Ok(data);
        }

        [HttpGet("byName/{name}")]
        public async Task<IActionResult> ReadByName(string name)
        {
            var data = _fileService.ReadDataByName(name);
            return Ok(data);
        }

        [HttpGet("byNumber/{number}")]
        public async Task<IActionResult> ReadByNumber(int number)
        {
            var data = _fileService.ReadDataByNumber(number);
            return Ok(data);
        }

    }
}




/*
 
 
 [
    [
            [-4041692.704008283,6242077.882637067],
            [1129277.1909050718,-101379.37216942944],
            [588129.1786466949,7174055.014859822],
            [-4041692.704008283,6242077.882637067]
    ]
 ]
 
 
 
 */