-- Giả định: 
-- Item ID 1-5 tương ứng với thứ tự insert trên
-- Supplier ID 1-4 tương ứng với thứ tự insert trên

INSERT INTO "inventory" ("item_id", "supplier_id", "quantity") VALUES
(1, 1, 10), -- Intel CPU từ FPT
(2, 2, 15), -- Pin Dell từ DGW
(3, 2, 30), -- RAM HP từ DGW
(4, 4, 100), -- Đầu nối RJ45 từ Syscom
(5, 3, 20); -- Mực in Canon từ LBM