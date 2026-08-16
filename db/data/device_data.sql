INSERT INTO "devices" 
(
    "category_id", "device_code", "device_name", "serial_number", 
    "model", "manufacturer_name", "supplier_name", "manufacture_date", 
    "purchase_date", "purchase_price", "original_cost", 
    "warranty_start_date", "warranty_end_date", "specifications", 
    "depreciation_method", "depreciation_start_date", "depreciation_period_months", 
    "accumulated_depreciation", "book_value"
) 
VALUES
-- =====================================================
-- Danh mục 1: Máy tính & Laptop (category_id = 1)
-- =====================================================
(
    1, 'LT-001', 'Dell Latitude 5420', 'SN-LT001', 
    '5420', 'Dell', 'FPT Trading', '2024-11-10', 
    '2025-01-01', 20000000, 20000000, 
    '2025-01-01', '2028-01-01', 'Processor,Intel Core i5-1145G7;RAM,16GB;Storage,512GB NVMe SSD;Screen,14 inch FHD', 
    'straight_line', '2025-01-01', 36, 
    0, 20000000
),
(
    1, 'LT-002', 'Dell Latitude 5420', 'SN-LT002', 
    '5420', 'Dell', 'FPT Trading', '2024-11-10', 
    '2025-01-01', 20000000, 20000000, 
    '2025-01-01', '2028-01-01', 'Processor,Intel Core i5-1145G7;RAM,16GB;Storage,512GB NVMe SSD;Screen,14 inch FHD', 
    'straight_line', '2025-01-01', 36, 
    0, 20000000
),
(
    1, 'PC-001', 'HP ProDesk 400', 'SN-PC001', 
    'G6', 'HP', 'Digiworld', '2024-12-01', 
    '2025-02-15', 15000000, 15000000, 
    '2025-02-15', '2027-02-15', 'Processor,Intel Core i5-10500;RAM,8GB;Storage,256GB SSD', 
    'straight_line', '2025-02-15', 24, 
    0, 15000000
),
(
    1, 'PC-002', 'HP ProDesk 400', 'SN-PC002', 
    'G6', 'HP', 'Digiworld', '2024-12-01', 
    '2025-02-15', 15000000, 15000000, 
    '2025-02-15', '2027-02-15', 'Processor,Intel Core i5-10500;RAM,8GB;Storage,256GB SSD', 
    'straight_line', '2025-02-15', 24, 
    0, 15000000
),
(
    1, 'LT-003', 'MacBook Air M2', 'SN-MAC01', 
    'M2', 'Apple', 'CellularS', '2025-01-15', 
    '2025-03-10', 28000000, 28000000, 
    '2025-03-10', '2026-03-10', 'Processor,Apple M2;RAM,8GB;Storage,256GB SSD;Screen,13.6 inch Liquid Retina', 
    'straight_line', '2025-03-10', 36, 
    0, 28000000
),

-- =====================================================
-- Danh mục 2: Thiết bị mạng (category_id = 2)
-- =====================================================
(
    2, 'NET-R01', 'Cisco Router', 'SN-NET01', 
    'ISR4331', 'Cisco', 'Syscom', '2024-10-01', 
    '2024-11-20', 40000000, 40000000, 
    '2024-11-20', '2027-11-20', 'Ports,3 GE ports;Throughput,100 Mbps to 300 Mbps;DRAM,4GB', 
    'straight_line', '2024-11-20', 60, 
    0, 40000000
),
(
    2, 'NET-S01', 'TP-Link Switch', 'SN-NET02', 
    'TL-SG1024', 'TP-Link', 'An Phát', '2024-10-15', 
    '2024-12-01', 5000000, 5000000, 
    '2024-12-01', '2026-12-01', 'Ports,24-Port Gigabit;Capacity,48Gbps;Form Factor,Rackmountable', 
    'straight_line', '2024-12-01', 36, 
    0, 5000000
),
(
    2, 'NET-AP01', 'Aruba AP', 'SN-NET03', 
    'IAP-305', 'Aruba', 'Netmax', '2024-11-01', 
    '2025-01-10', 8000000, 8000000, 
    '2025-01-10', '2027-01-10', 'Standard,802.11ac;Speed,Up to 1.3 Gbps;Ports,1x 10/100/1000 Ethernet', 
    'straight_line', '2025-01-10', 36, 
    0, 8000000
),
(
    2, 'NET-AP02', 'Aruba AP', 'SN-NET04', 
    'IAP-305', 'Aruba', 'Netmax', '2024-11-01', 
    '2025-01-10', 8000000, 8000000, 
    '2025-01-10', '2027-01-10', 'Standard,802.11ac;Speed,Up to 1.3 Gbps;Ports,1x 10/100/1000 Ethernet', 
    'straight_line', '2025-01-10', 36, 
    0, 8000000
),
(
    2, 'NET-S02', 'TP-Link Switch', 'SN-NET05', 
    'TL-SG1024', 'TP-Link', 'An Phát', '2024-10-15', 
    '2024-12-01', 5000000, 5000000, 
    '2024-12-01', '2026-12-01', 'Ports,24-Port Gigabit;Capacity,48Gbps;Form Factor,Rackmountable', 
    'straight_line', '2024-12-01', 36, 
    0, 5000000
),

-- =====================================================
-- Danh mục 3: Thiết bị văn phòng (category_id = 3)
-- =====================================================
(
    3, 'OFF-PRN01', 'Canon LBP226dw', 'SN-OFF01', 
    'LBP226', 'Canon', 'Lê Bảo Minh', '2024-12-10', 
    '2025-02-01', 7000000, 7000000, 
    '2025-02-01', '2027-02-01', 'Function,Print only;Speed,Up to 38 ppm;Duplex,Automatic;Connectivity,USB, Network, Wi-Fi', 
    'straight_line', '2025-02-01', 36, 
    0, 7000000
),
(
    3, 'OFF-PRN02', 'Canon LBP226dw', 'SN-OFF02', 
    'LBP226', 'Canon', 'Lê Bảo Minh', '2024-12-10', 
    '2025-02-01', 7000000, 7000000, 
    '2025-02-01', '2027-02-01', 'Function,Print only;Speed,Up to 38 ppm;Duplex,Automatic;Connectivity,USB, Network, Wi-Fi', 
    'straight_line', '2025-02-01', 36, 
    0, 7000000
),
(
    3, 'OFF-SCAN01', 'HP ScanJet', 'SN-OFF03', 
    'Pro 3000', 'HP', 'Digiworld', '2025-01-05', 
    '2025-03-01', 9000000, 9000000, 
    '2025-03-01', '2027-03-01', 'Scan Type,ADF and Flatbed;Speed,Up to 30 ppm;Daily Duty Cycle,3500 pages', 
    'straight_line', '2025-03-01', 36, 
    0, 9000000
),
(
    3, 'OFF-SHD01', 'Máy hủy tài liệu', 'SN-OFF04', 
    'HS-100', 'Nissei', 'Văn Phòng Phấn', '2025-01-10', 
    '2025-03-05', 3000000, 3000000, 
    '2025-03-05', '2026-03-05', 'Cut Type,Cross Cut;Bin Capacity,20L;Capacity,10 sheets', 
    'straight_line', '2025-03-05', 24, 
    0, 3000000
),
(
    3, 'OFF-PRN03', 'Brother MFC-L2701', 'SN-OFF05', 
    'L2701', 'Brother', 'Hoàng Hà', '2025-02-01', 
    '2025-04-01', 6000000, 6000000, 
    '2025-04-01', '2027-04-01', 'Function,Print, Copy, Scan, Fax;Speed,30 ppm;Connectivity,USB', 
    'straight_line', '2025-04-01', 36, 
    0, 6000000
),

-- =====================================================
-- Danh mục 4: Hệ thống an ninh (category_id = 4)
-- =====================================================
(
    4, 'SEC-CAM01', 'Hikvision Camera', 'SN-SEC01', 
    'DS-2CD', 'Hikvision', 'Phương Việt', '2024-12-15', 
    '2025-01-15', 2000000, 2000000, 
    '2025-01-15', '2027-01-15', 'Resolution,2 MP;Lens,2.8mm;IR Distance,Up to 30m;Protection,IP67', 
    'straight_line', '2025-01-15', 36, 
    0, 2000000
),
(
    4, 'SEC-CAM02', 'Hikvision Camera', 'SN-SEC02', 
    'DS-2CD', 'Hikvision', 'Phương Việt', '2024-12-15', 
    '2025-01-15', 2000000, 2000000, 
    '2025-01-15', '2027-01-15', 'Resolution,2 MP;Lens,2.8mm;IR Distance,Up to 30m;Protection,IP67', 
    'straight_line', '2025-01-15', 36, 
    0, 2000000
),
(
    4, 'SEC-NVR01', 'Hikvision NVR', 'SN-SEC03', 
    'DS-7608', 'Hikvision', 'Phương Việt', '2024-12-15', 
    '2025-01-15', 5000000, 5000000, 
    '2025-01-15', '2027-01-15', 'Channels,8-ch;Decoding,Up to 8-ch @ 1080p;Interface,1 HDMI, 1 VGA', 
    'straight_line', '2025-01-15', 36, 
    0, 5000000
),
(
    4, 'SEC-DOOR01', 'Khóa vân tay', 'SN-SEC04', 
    'F18', 'ZKTeco', 'An Ninh Toàn Cầu', '2025-01-05', 
    '2025-02-10', 4000000, 4000000, 
    '2025-02-10', '2027-02-10', 'Capacity,Fingerprint 1,500;Card 5,000;Communication,TCP/IP, RS485, USB-host', 
    'straight_line', '2025-02-10', 36, 
    0, 4000000
),
(
    4, 'SEC-CAM03', 'Hikvision Camera', 'SN-SEC05', 
    'DS-2CD', 'Hikvision', 'Phương Việt', '2025-02-10', 
    '2025-03-20', 2000000, 2000000, 
    '2025-03-20', '2027-03-20', 'Resolution,2 MP;Lens,2.8mm;IR Distance,Up to 30m;Protection,IP67', 
    'straight_line', '2025-03-20', 36, 
    0, 2000000
),

-- =====================================================
-- Danh mục 5: Thiết bị trình chiếu (category_id = 5)
-- =====================================================
(
    5, 'AV-PJ01', 'Máy chiếu Epson', 'SN-AV01', 
    'EB-E01', 'Epson', 'Tân Phát', '2025-01-10', 
    '2025-02-20', 12000000, 12000000, 
    '2025-02-20', '2027-02-20', 'Brightness,3300 lumens;Resolution,XGA (1024 x 768);Contrast Ratio,15000:1', 
    'straight_line', '2025-02-20', 48, 
    0, 12000000
),
(
    5, 'AV-PJ02', 'Máy chiếu Epson', 'SN-AV02', 
    'EB-E01', 'Epson', 'Tân Phát', '2025-01-10', 
    '2025-02-20', 12000000, 12000000, 
    '2025-02-20', '2027-02-20', 'Brightness,3300 lumens;Resolution,XGA (1024 x 768);Contrast Ratio,15000:1', 
    'straight_line', '2025-02-20', 48, 
    0, 12000000
),
(
    5, 'AV-TV01', 'Màn hình Samsung', 'SN-AV03', 
    'QA55', 'Samsung', 'Nguyễn Kim', '2025-02-01', 
    '2025-03-01', 15000000, 15000000, 
    '2025-03-01', '2027-03-01', 'Size,55 inch;Resolution,4K UHD;Smart TV,Tizen OS', 
    'straight_line', '2025-03-01', 36, 
    0, 15000000
),
(
    5, 'AV-SPK01', 'Loa Jabra', 'SN-AV04', 
    'Speak 510', 'Jabra', 'Nam Á', '2025-02-15', 
    '2025-03-10', 3000000, 3000000, 
    '2025-03-10', '2026-03-10', 'Connectivity,USB and Bluetooth;Battery Life,Up to 15 hours;Microphone,Omni-directional', 
    'straight_line', '2025-03-10', 24, 
    0, 3000000
),
(
    5, 'AV-TV02', 'Màn hình Samsung', 'SN-AV05', 
    'QA55', 'Samsung', 'Nguyễn Kim', '2025-02-01', 
    '2025-03-01', 15000000, 15000000, 
    '2025-03-01', '2027-03-01', 'Size,55 inch;Resolution,4K UHD;Smart TV,Tizen OS', 
    'straight_line', '2025-03-01', 36, 
    0, 15000000
);