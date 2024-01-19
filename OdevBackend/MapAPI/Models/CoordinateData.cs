namespace MapAPI.Models
{
    public class CoordinateData
    {
        public string? Name { get; set; }
        public int? Number { get; set; }
        public List<List<List<decimal>>>? Coordinates { get; set; }
    }
}
