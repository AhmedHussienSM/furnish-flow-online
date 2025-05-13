USE FurnishFlow;
GO

-- Insert Colors
INSERT INTO Colors (Name, Value) VALUES
('Natural Oak', '#D4BF9A'),
('Walnut', '#5C4033'),
('White', '#FFFFFF'),
('Black', '#222222'),
('Navy Blue', '#1A2B50'),
('Emerald Green', '#0E4C36'),
('Charcoal Gray', '#3C3C3C'),
('Beige', '#E8DCCA'),
('Terracotta', '#CB6843');

-- Insert Sizes
INSERT INTO Sizes (Name, Dimensions) VALUES
('Small', '80 x 60 x 40 cm'),
('Medium', '120 x 80 x 45 cm'),
('Large', '180 x 100 x 50 cm'),
('XL', '200 x 120 x 60 cm'),
('Custom', 'Custom dimensions');

-- Insert Categories
INSERT INTO Categories (Name, Slug, Image, Description) VALUES
('Living Room', 'living-room', '/src/assets/category-living-room.jpg', 'Comfortable and stylish furniture for your living space.'),
('Bedroom', 'bedroom', '/src/assets/category-bedroom.jpg', 'Create your perfect sleep sanctuary with our bedroom collection.'),
('Dining Room', 'dining-room', '/src/assets/category-dining.jpg', 'Elegant tables and chairs for memorable dining experiences.'),
('Office', 'office', '/src/assets/category-office.jpg', 'Functional and ergonomic furniture for productive workspaces.'),
('Outdoor', 'outdoor', '/src/assets/category-outdoor.jpg', 'Weather-resistant furniture for your garden, patio or balcony.');

-- Insert Products
INSERT INTO Products (Name, Description, Price, SKU, Stock, CategoryId, Featured, Bestseller, Rating, ReviewCount) VALUES
('Copenhagen Sofa', 'A minimalist Scandinavian design sofa with clean lines and exceptional comfort. Perfect for modern living spaces.', 1299.99, 'SOF-CPH-001', 15, 1, 1, 1, 4.8, 124),
('Palermo Dining Table', 'An elegant dining table with a solid oak top and sculptural base. Seats up to 8 people comfortably.', 899.99, 'TBL-PLM-002', 8, 3, 1, 0, 4.6, 86),
('Vienna Armchair', 'A comfortable and stylish armchair with plush cushions and a sturdy frame. Perfect as an accent piece or for cozy reading corners.', 499.99, 'CHR-VNA-003', 22, 1, 0, 1, 4.9, 208),
('Luxor King Bed', 'A luxurious king-size bed with a tufted headboard and solid wood frame. Combines elegance with sturdy construction.', 1599.99, 'BED-LXR-004', 5, 2, 1, 1, 4.7, 63),
('Oslo Coffee Table', 'A modern coffee table with clean lines and a marble top. The perfect addition to your living room.', 349.99, 'TBL-OSL-005', 18, 1, 0, 0, 4.5, 42),
('Zurich Office Desk', 'A spacious and functional desk with built-in cable management and ample storage.', 749.99, 'DSK-ZRH-006', 10, 4, 1, 0, 4.6, 37),
('Milan Wardrobe', 'A spacious wardrobe with sliding doors and internal organization. Modern design meets practical storage.', 1199.99, 'WRB-MLN-007', 7, 2, 0, 0, 4.8, 29),
('Barcelona Bookshelf', 'A versatile bookshelf with an open design to display your books and decorative items.', 599.99, 'BSH-BCN-008', 12, 1, 0, 1, 4.7, 54);

-- Insert Product Images
INSERT INTO ProductImages (ProductId, ImageUrl, SortOrder) VALUES
(1, '/src/assets/sofa-1.jpg', 1),
(1, '/src/assets/sofa-1-alt.jpg', 2),
(1, '/src/assets/sofa-1-detail.jpg', 3),
(2, '/src/assets/table-1.jpg', 1),
(2, '/src/assets/table-1-alt.jpg', 2),
(3, '/src/assets/chair-1.jpg', 1),
(3, '/src/assets/chair-1-alt.jpg', 2),
(4, '/src/assets/bed-1.jpg', 1),
(4, '/src/assets/bed-1-alt.jpg', 2);

-- Insert Product Sizes
INSERT INTO ProductSizes (ProductId, SizeId) VALUES
(1, 2), (1, 3), (1, 4), -- Copenhagen Sofa sizes
(2, 2), (2, 3), -- Palermo Dining Table sizes
(3, 1), -- Vienna Armchair sizes
(4, 3), (4, 4), (4, 5); -- Luxor King Bed sizes

-- Insert Product Colors
INSERT INTO ProductColors (ProductId, ColorId) VALUES
(1, 1), (1, 2), (1, 3), (1, 5), -- Copenhagen Sofa colors
(2, 1), (2, 2), -- Palermo Dining Table colors
(3, 5), (3, 6), (3, 8), (3, 9), -- Vienna Armchair colors
(4, 1), (4, 2), (4, 3), (4, 4), (4, 8); -- Luxor King Bed colors

-- Insert Featured Collections
INSERT INTO FeaturedCollections (Name, Description, Image, IsActive) VALUES
('Summer Collection', 'Bright and airy pieces perfect for the warm season', '/src/assets/summer-collection.jpg', 1),
('Scandinavian Design', 'Minimalist furniture with clean lines and functionality', '/src/assets/scandinavian-collection.jpg', 1),
('Home Office Essentials', 'Create a productive and comfortable workspace at home', '/src/assets/office-collection.jpg', 1);

-- Insert Testimonials
INSERT INTO Testimonials (Name, Role, Comment, Avatar, IsActive) VALUES
('Sophia Martinez', 'Interior Designer', 'The quality of furniture from Elegance Home is exceptional. My clients are always impressed with their pieces.', '/src/assets/testimonial-1.jpg', 1),
('Michael Chen', 'Homeowner', 'I furnished my entire living room with pieces from Elegance Home. The customer service and delivery were excellent.', '/src/assets/testimonial-2.jpg', 1),
('Emma Wilson', 'Architect', 'The attention to detail and craftsmanship in their furniture is unmatched. I highly recommend their custom pieces.', '/src/assets/testimonial-3.jpg', 1);

-- Insert Roles
INSERT INTO Roles (Name, Description) VALUES
('Admin', 'Full access to all features'),
('Manager', 'Access to most features except system settings'),
('Editor', 'Can edit products and content'),
('Customer Support', 'Access to orders and customer data'),
('Marketing', 'Access to promotions and analytics');

-- Insert Permissions
INSERT INTO Permissions (Name, Description) VALUES
('dashboard_view', 'View dashboard'),
('products_manage', 'Manage products'),
('categories_manage', 'Manage categories'),
('orders_manage', 'Manage orders'),
('users_manage', 'Manage users'),
('reviews_manage', 'Manage reviews'),
('settings_manage', 'Manage settings'),
('analytics_view', 'View analytics'),
('revenue_view', 'View revenue data'),
('permissions_manage', 'Manage permissions');

-- Insert Role Permissions
INSERT INTO RolePermissions (RoleId, PermissionId)
SELECT r.Id, p.Id
FROM Roles r
CROSS JOIN Permissions p
WHERE r.Name = 'Admin'; -- Admin gets all permissions

INSERT INTO RolePermissions (RoleId, PermissionId)
SELECT r.Id, p.Id
FROM Roles r
CROSS JOIN Permissions p
WHERE r.Name = 'Manager'
AND p.Name NOT IN ('settings_manage', 'permissions_manage');

INSERT INTO RolePermissions (RoleId, PermissionId)
SELECT r.Id, p.Id
FROM Roles r
CROSS JOIN Permissions p
WHERE r.Name = 'Editor'
AND p.Name IN ('dashboard_view', 'products_manage', 'categories_manage', 'reviews_manage');

-- Insert default admin user (password: admin123)
INSERT INTO Users (Name, Email, PasswordHash, Role, Status) VALUES
('Admin User', 'admin@example.com', '$2b$10$YourHashedPasswordHere', 'Admin', 'Active'); 