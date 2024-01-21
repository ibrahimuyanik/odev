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
            _fileService.SaveData(data);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Read()
        {
            var data = _fileService.ReadData();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ReadById(string id)
        {
            var data = _fileService.GetDataById(id);
            return Ok(data);
        }

        [HttpPut]
        public async Task<IActionResult> Update(CoordinateData coordinateData)
        {
            _fileService.UpdateData(coordinateData);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            _fileService.DeleteData(id);
            return Ok();
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