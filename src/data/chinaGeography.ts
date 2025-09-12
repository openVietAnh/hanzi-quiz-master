export interface GeographyLocation {
  id: number;
  name: string;
  nameEn: string;
  nameVi: string;
  type: 'province' | 'city' | 'autonomous_region' | 'municipality';
  coordinates: [number, number]; // [longitude, latitude]
  level: 'beginner' | 'intermediate' | 'advanced';
}

export const chinaLocations: GeographyLocation[] = [
  // Major Provinces (Beginner Level)
  {
    id: 1,
    name: '北京',
    nameEn: 'Beijing',
    nameVi: 'Bắc Kinh',
    type: 'municipality',
    coordinates: [116.4074, 39.9042],
    level: 'beginner'
  },
  {
    id: 2,
    name: '上海',
    nameEn: 'Shanghai',
    nameVi: 'Thượng Hải',
    type: 'municipality',
    coordinates: [121.4737, 31.2304],
    level: 'beginner'
  },
  {
    id: 3,
    name: '广东省',
    nameEn: 'Guangdong Province',
    nameVi: 'Tỉnh Quảng Đông',
    type: 'province',
    coordinates: [113.2644, 23.1291],
    level: 'beginner'
  },
  {
    id: 4,
    name: '四川省',
    nameEn: 'Sichuan Province',
    nameVi: 'Tỉnh Tứ Xuyên',
    type: 'province',
    coordinates: [104.0668, 30.5728],
    level: 'beginner'
  },
  {
    id: 5,
    name: '山东省',
    nameEn: 'Shandong Province',
    nameVi: 'Tỉnh Sơn Đông',
    type: 'province',
    coordinates: [117.0009, 36.6758],
    level: 'beginner'
  },
  {
    id: 6,
    name: '江苏省',
    nameEn: 'Jiangsu Province',
    nameVi: 'Tỉnh Giang Tô',
    type: 'province',
    coordinates: [118.7678, 32.0415],
    level: 'beginner'
  },
  {
    id: 7,
    name: '河南省',
    nameEn: 'Henan Province',
    nameVi: 'Tỉnh Hà Nam',
    type: 'province',
    coordinates: [113.6401, 34.7566],
    level: 'beginner'
  },
  {
    id: 8,
    name: '湖北省',
    nameEn: 'Hubei Province',
    nameVi: 'Tỉnh Hồ Bắc',
    type: 'province',
    coordinates: [114.2986, 30.5844],
    level: 'beginner'
  },

  // Intermediate Level Locations
  {
    id: 9,
    name: '新疆维吾尔自治区',
    nameEn: 'Xinjiang Uyghur Autonomous Region',
    nameVi: 'Tân Cương Duy Ngô Nhĩ Tự Trị Khu',
    type: 'autonomous_region',
    coordinates: [87.6177, 43.7928],
    level: 'intermediate'
  },
  {
    id: 10,
    name: '西藏自治区',
    nameEn: 'Tibet Autonomous Region',
    nameVi: 'Tây Tạng Tự Trị Khu',
    type: 'autonomous_region',
    coordinates: [91.1322, 29.6544],
    level: 'intermediate'
  },
  {
    id: 11,
    name: '内蒙古自治区',
    nameEn: 'Inner Mongolia Autonomous Region',
    nameVi: 'Nội Mông Cổ Tự Trị Khu',
    type: 'autonomous_region',
    coordinates: [111.6980, 40.8173],
    level: 'intermediate'
  },
  {
    id: 12,
    name: '黑龙江省',
    nameEn: 'Heilongjiang Province',
    nameVi: 'Tỉnh Hắc Long Giang',
    type: 'province',
    coordinates: [126.6420, 45.7563],
    level: 'intermediate'
  },
  {
    id: 13,
    name: '吉林省',
    nameEn: 'Jilin Province',
    nameVi: 'Tỉnh Cát Lâm',
    type: 'province',
    coordinates: [125.3245, 43.8868],
    level: 'intermediate'
  },
  {
    id: 14,
    name: '辽宁省',
    nameEn: 'Liaoning Province',
    nameVi: 'Tỉnh Liêu Ninh',
    type: 'province',
    coordinates: [123.4297, 41.7968],
    level: 'intermediate'
  },
  {
    id: 15,
    name: '云南省',
    nameEn: 'Yunnan Province',
    nameVi: 'Tỉnh Vân Nam',
    type: 'province',
    coordinates: [102.7103, 25.0389],
    level: 'intermediate'
  },
  {
    id: 16,
    name: '贵州省',
    nameEn: 'Guizhou Province',
    nameVi: 'Tỉnh Quý Châu',
    type: 'province',
    coordinates: [106.7135, 26.5783],
    level: 'intermediate'
  },

  // Advanced Level Locations
  {
    id: 17,
    name: '宁夏回族自治区',
    nameEn: 'Ningxia Hui Autonomous Region',
    nameVi: 'Ninh Hạ Hồi Tộc Tự Trị Khu',
    type: 'autonomous_region',
    coordinates: [106.2581, 38.4681],
    level: 'advanced'
  },
  {
    id: 18,
    name: '青海省',
    nameEn: 'Qinghai Province',
    nameVi: 'Tỉnh Thanh Hải',
    type: 'province',
    coordinates: [101.7782, 36.6171],
    level: 'advanced'
  },
  {
    id: 19,
    name: '甘肃省',
    nameEn: 'Gansu Province',
    nameVi: 'Tỉnh Cam Túc',
    type: 'province',
    coordinates: [103.8236, 36.0581],
    level: 'advanced'
  },
  {
    id: 20,
    name: '陕西省',
    nameEn: 'Shaanxi Province',
    nameVi: 'Tỉnh Thiểm Tây',
    type: 'province',
    coordinates: [108.9286, 34.2632],
    level: 'advanced'
  },
  {
    id: 21,
    name: '山西省',
    nameEn: 'Shanxi Province',
    nameVi: 'Tỉnh Sơn Tây',
    type: 'province',
    coordinates: [112.5492, 37.8570],
    level: 'advanced'
  },
  {
    id: 22,
    name: '河北省',
    nameEn: 'Hebei Province',
    nameVi: 'Tỉnh Hà Bắc',
    type: 'province',
    coordinates: [114.5149, 38.0428],
    level: 'advanced'
  },
  {
    id: 23,
    name: '天津',
    nameEn: 'Tianjin',
    nameVi: 'Thiên Tân',
    type: 'municipality',
    coordinates: [117.1901, 39.1037],
    level: 'advanced'
  },
  {
    id: 24,
    name: '重庆',
    nameEn: 'Chongqing',
    nameVi: 'Trùng Khánh',
    type: 'municipality',
    coordinates: [106.5516, 29.5630],
    level: 'advanced'
  },

  // Major Cities (Mixed Levels)
  {
    id: 25,
    name: '深圳',
    nameEn: 'Shenzhen',
    nameVi: 'Thâm Quyến',
    type: 'city',
    coordinates: [114.0579, 22.5431],
    level: 'beginner'
  },
  {
    id: 26,
    name: '广州',
    nameEn: 'Guangzhou',
    nameVi: 'Quảng Châu',
    type: 'city',
    coordinates: [113.2644, 23.1291],
    level: 'beginner'
  },
  {
    id: 27,
    name: '成都',
    nameEn: 'Chengdu',
    nameVi: 'Thành Đô',
    type: 'city',
    coordinates: [104.0668, 30.5728],
    level: 'beginner'
  },
  {
    id: 28,
    name: '西安',
    nameEn: "Xi'an",
    nameVi: 'Tây An',
    type: 'city',
    coordinates: [108.9286, 34.2632],
    level: 'intermediate'
  },
  {
    id: 29,
    name: '武汉',
    nameEn: 'Wuhan',
    nameVi: 'Vũ Hán',
    type: 'city',
    coordinates: [114.2986, 30.5844],
    level: 'intermediate'
  },
  {
    id: 30,
    name: '昆明',
    nameEn: 'Kunming',
    nameVi: 'Côn Minh',
    type: 'city',
    coordinates: [102.7103, 25.0389],
    level: 'advanced'
  }
];

export const getRandomLocation = (level?: 'beginner' | 'intermediate' | 'advanced'): GeographyLocation => {
  const filteredLocations = level 
    ? chinaLocations.filter(loc => loc.level === level)
    : chinaLocations;
    
  const randomIndex = Math.floor(Math.random() * filteredLocations.length);
  return filteredLocations[randomIndex];
};

export const getLocationsByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): GeographyLocation[] => {
  return chinaLocations.filter(loc => loc.level === level);
};