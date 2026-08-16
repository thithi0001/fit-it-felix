-- Giả định: 
-- Item ID 1-5 tương ứng với thứ tự insert trên
-- Supplier ID 1-4 tương ứng với thứ tự insert trên

INSERT INTO "inventory" ("item_id", "supplier_id", "quantity") VALUES
(1, 1, 10), -- Intel CPU từ FPT
(2, 2, 15), -- Pin Dell từ DGW
(3, 2, 30), -- RAM HP từ DGW
(4, 4, 100), -- Đầu nối RJ45 từ Syscom
(5, 3, 20); -- Mực in Canon từ LBM

-- Liên kết item_id (từ 6 đến 17 cho các items mới) với các supplier_id phù hợp
INSERT INTO "inventory" ("item_id", "supplier_id", "quantity") VALUES
-- Kho linh kiện Laptop/PC
(6, 2, 5),   -- Màn hình Dell từ Digiworld
(7, 1, 8),   -- Quạt HP từ FPT Trading
(8, 1, 15),  -- RAM 16GB từ FPT Trading
(9, 2, 12),  -- SSD 512GB từ Digiworld

-- Kho linh kiện thiết bị mạng
(10, 4, 3),  -- Nguồn Cisco từ Syscom
(11, 1, 20), -- Antenna TP-Link từ FPT Trading

-- Kho vật tư máy in văn phòng
(12, 3, 10), -- Quả đào kéo giấy Canon từ Lê Bảo Minh
(13, 5, 6),  -- Cụm trống Brother từ Tân Phát

-- Kho thiết bị an ninh
(14, 3, 25), -- Nguồn camera từ Phương Việt

-- Kho thiết bị trình chiếu
(15, 5, 4),  -- Bóng đèn máy chiếu từ Tân Phát
(16, 4, 10), -- Remote Samsung từ Nguyễn Kim (hoặc Netmax)
(17, 5, 12), -- Lọc bụi máy chiếu từ Tân Phát
-- Bổ sung thêm một số phân phối chéo từ nhà cung cấp khác để quản lý linh hoạt hơn
(6, 1, 2),   -- Màn hình Dell mua thêm từ FPT Trading
(9, 1, 5),   -- SSD 512GB mua thêm từ FPT Trading
(15, 4, 2);  -- Bóng đèn máy chiếu mua thêm từ Netmax