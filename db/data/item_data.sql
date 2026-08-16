-- Giả định ID của các nhà sản xuất từ 1 đến 5 tương ứng với thứ tự insert trên
INSERT INTO "items" ("manufacturer_id", "code", "name", "unit", "minimum_stock") VALUES
(1, 'ITM-CPU-01', 'Intel Core i5-1145G7 CPU', 'Cái', 5),
(2, 'ITM-BAT-01', 'Dell Latitude 5420 Battery', 'Cục', 10),
(3, 'ITM-RAM-08', 'HP 8GB DDR4 RAM', 'Thanh', 20),
(4, 'ITM-RJ45-01', 'Cisco RJ45 Connector', 'Túi', 50),
(5, 'ITM-TONR-01', 'Canon LBP226dw Toner Cartridge', 'Hộp', 15);

-- Dựa vào ID nhà sản xuất đã có và mới bổ sung:
-- 6: Epson, 7: Hikvision, 8: Samsung, 9: TP-Link, 10: Brother
INSERT INTO "items" ("manufacturer_id", "code", "name", "unit", "minimum_stock") VALUES
-- Linh kiện cho Máy tính / Laptop / PC (Dell, HP)
(2, 'ITM-DELL-LCD', 'Màn hình thay thế Dell Latitude 5420', 'Cái', 3),
(3, 'ITM-HP-FAN', 'Quạt tản nhiệt CPU HP ProDesk G6', 'Cái', 5),
(1, 'ITM-RAM-16', 'Thanh RAM 16GB DDR4 Laptop/PC', 'Thanh', 10),
(1, 'ITM-SSD-512', 'Ổ cứng SSD NVMe 512GB', 'Cái', 8),

-- Linh kiện cho Thiết bị mạng (Cisco, TP-Link)
(4, 'ITM-CISCO-PSU', 'Nguồn dự phòng Cisco Switch/Router', 'Cái', 2),
(9, 'ITM-TPLINK-ANT', 'Antenna thay thế TP-Link Access Point', 'Cái', 10),

-- Linh kiện / Vật tư cho Thiết bị văn phòng (Canon, Brother)
(5, 'ITM-CANON-ROL', 'Bộ quả đào kéo giấy Canon LBP226dw', 'Bộ', 6),
(10, 'ITM-BRO-DRM', 'Cụm trống (Drum unit) Brother MFC-L2701', 'Cái', 4),

-- Linh kiện cho Hệ thống an ninh (Hikvision)
(7, 'ITM-HIK-ADAPT', 'Bộ nguồn Adapter camera 12V-2A', 'Cái', 15),

-- Linh kiện cho Thiết bị trình chiếu (Epson, Samsung)
(6, 'ITM-EPSON-LMP', 'Bóng đèn máy chiếu Epson EB-E01', 'Cái', 3),
(8, 'ITM-SAM-REMOTE', 'Điều khiển từ xa màn hình Samsung Smart TV', 'Cái', 5),
(6, 'ITM-EPSON-FLT', 'Tấm lọc bụi máy chiếu Epson', 'Cái', 10);