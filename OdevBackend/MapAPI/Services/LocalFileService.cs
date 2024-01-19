using MapAPI.Models;
using Newtonsoft.Json;

namespace MapAPI.Services
{
    public class LocalFileService: IFileService
    {
        private readonly IWebHostEnvironment _env;

        public LocalFileService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public void SaveData(string data)
        {
            string path = Path.Combine(_env.WebRootPath, "coordinate-data");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string filePath = Path.Combine(_env.WebRootPath, "coordinate-data", "data.txt");

            using (FileStream a = new FileStream(filePath, FileMode.Append, FileAccess.Write, FileShare.None))
            {
                using (StreamWriter streamWriter = new StreamWriter(a))
                {
                    streamWriter.Write($"{Environment.NewLine}{data}");
                }
            }
        }


        public List<CoordinateData> ReadData()
        {
            string path = Path.Combine(_env.WebRootPath, "coordinate-data", "data.txt");
            List<CoordinateData> dataList = new List<CoordinateData>();

            if (File.Exists(path))
            {
                using (StreamReader reader = new StreamReader(path))
                {
                    while (!reader.EndOfStream)
                    {
                        // Her satırdaki JSON verisini model nesnesine çevir
                        string line = reader.ReadLine();
                        if (!string.IsNullOrWhiteSpace(line))
                        {
                            CoordinateData data = JsonConvert.DeserializeObject<CoordinateData>(line);
                            dataList.Add(data);
                        }
                    }
                }
            }

            return dataList;
        }


        public List<CoordinateData> ReadDataByName(string name)
        {
            List<CoordinateData> dataList = ReadData();
            List<CoordinateData> filteredList = dataList.Where(data => data.Name == name).ToList();
            return filteredList;
        }

        public List<CoordinateData> ReadDataByNumber(int number)
        {
            List<CoordinateData> dataList = ReadData();
            List<CoordinateData> filteredList = dataList.Where(data => data.Number == number).ToList();
            return filteredList;
        }
    }
}
