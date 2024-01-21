using MapAPI.Models;

namespace MapAPI.Services
{
    public interface IFileService
    {
        void SaveData(CoordinateData data);
        List<CoordinateData> ReadData();
        void UpdateData(CoordinateData coordinateData);
        void DeleteData(string id);
        CoordinateData GetDataById(string id);
    }
}
