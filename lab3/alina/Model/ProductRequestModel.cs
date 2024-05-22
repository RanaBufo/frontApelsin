﻿using alina.DataBase;
using System.ComponentModel.DataAnnotations;

namespace alina.Model
{
    public class ProductRequestModel
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double? Price { get; set; }
        public double? Discount { get; set; }
        public int? Quantity { get; set; }
        public List<GetIdModel>? ProductComposition { get; set; } = new List<GetIdModel>();
        public List<GetIdModel>? ProductColor { get; set; } = new List<GetIdModel>();
        public List<GetIdModel>? ProductCategory { get; set; } = new List<GetIdModel>();
    }
}
