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

        public void SaveData(CoordinateData data)
        {
            data.Id = Guid.NewGuid().ToString();
            var _data = JsonConvert.SerializeObject(data);
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
                    streamWriter.Write($"{Environment.NewLine}{_data}");
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

        public void UpdateData(CoordinateData coordinateData)
        {
            if (coordinateData != null)
            {
                var updatedData = new CoordinateData();

                var dataList = ReadData();

                dataList.RemoveAll(x => x.Id == coordinateData.Id);

                updatedData.Id = coordinateData.Id;
                updatedData.Number = coordinateData.Number;
                updatedData.Name = coordinateData.Name;
                updatedData.Coordinates = coordinateData.Coordinates;

                dataList.Add(updatedData);

                SaveDataList(dataList);

            }
        }

        public void DeleteData(string id)
        {
            List<CoordinateData> dataList = ReadData();
            dataList.RemoveAll(data => data.Id == id);
            SaveDataList(dataList);
        }

        public CoordinateData GetDataById(string id)
        {
            var dataList = ReadData();
            return dataList.FirstOrDefault(x => x.Id == id);
        }



        private void SaveDataList(List<CoordinateData> dataList)
        {
            string path = Path.Combine(_env.WebRootPath, "coordinate-data", "data.txt");

            
            using (FileStream a = new FileStream(path, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                using (StreamWriter streamWriter = new StreamWriter(a))
                {
                    foreach (var data in dataList)
                    {
                        string jsonData = JsonConvert.SerializeObject(data);
                        streamWriter.Write($"{Environment.NewLine}{jsonData}");
                    }
                }
            }
        }



   
    }
}
