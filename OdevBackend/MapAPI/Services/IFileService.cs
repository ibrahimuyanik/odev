using MapAPI.Models;

namespace MapAPI.Services
{
    public interface IFileService
    {
        void SaveData(string data);
        List<CoordinateData> ReadData();
        List<CoordinateData> ReadDataByNumber(int number);
        List<CoordinateData> ReadDataByName(string name);
        ResultCoordinateData PaginationCoordinateData(int page = 0, int size = 5);
    }
}
