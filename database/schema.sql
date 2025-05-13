-- Create database
CREATE DATABASE FurnishFlow;
GO

USE FurnishFlow;
GO

-- Create Colors table
CREATE TABLE Colors (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL,
    Value NVARCHAR(7) NOT NULL -- Hex color value
);

-- Create Sizes table
CREATE TABLE Sizes (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL,
    Dimensions NVARCHAR(50) NOT NULL
);

-- Create Categories table
CREATE TABLE Categories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Slug NVARCHAR(100) NOT NULL,
    Image NVARCHAR(255) NOT NULL,
    Description NVARCHAR(500),
    Count INT DEFAULT 0
);

-- Create Products table
CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(1000),
    Price DECIMAL(10,2) NOT NULL,
    SKU NVARCHAR(50) NOT NULL UNIQUE,
    Stock INT NOT NULL DEFAULT 0,
    CategoryId INT FOREIGN KEY REFERENCES Categories(Id),
    Featured BIT DEFAULT 0,
    Bestseller BIT DEFAULT 0,
    Rating DECIMAL(3,2) DEFAULT 0,
    ReviewCount INT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- Create ProductImages table
CREATE TABLE ProductImages (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT FOREIGN KEY REFERENCES Products(Id),
    ImageUrl NVARCHAR(255) NOT NULL,
    SortOrder INT DEFAULT 0
);

-- Create ProductSizes table (many-to-many relationship)
CREATE TABLE ProductSizes (
    ProductId INT FOREIGN KEY REFERENCES Products(Id),
    SizeId INT FOREIGN KEY REFERENCES Sizes(Id),
    PRIMARY KEY (ProductId, SizeId)
);

-- Create ProductColors table (many-to-many relationship)
CREATE TABLE ProductColors (
    ProductId INT FOREIGN KEY REFERENCES Products(Id),
    ColorId INT FOREIGN KEY REFERENCES Colors(Id),
    PRIMARY KEY (ProductId, ColorId)
);

-- Create Users table
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    Status NVARCHAR(20) DEFAULT 'Active',
    LastLogin DATETIME,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Create Orders table
CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CustomerName NVARCHAR(100) NOT NULL,
    CustomerEmail NVARCHAR(255) NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    Source NVARCHAR(50),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- Create OrderItems table
CREATE TABLE OrderItems (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT FOREIGN KEY REFERENCES Orders(Id),
    ProductId INT FOREIGN KEY REFERENCES Products(Id),
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL
);

-- Create Reviews table
CREATE TABLE Reviews (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT FOREIGN KEY REFERENCES Products(Id),
    CustomerName NVARCHAR(100) NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment NVARCHAR(1000),
    Status NVARCHAR(20) DEFAULT 'Pending',
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Create Testimonials table
CREATE TABLE Testimonials (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Role NVARCHAR(100),
    Comment NVARCHAR(500) NOT NULL,
    Avatar NVARCHAR(255),
    IsActive BIT DEFAULT 1
);

-- Create FeaturedCollections table
CREATE TABLE FeaturedCollections (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    Image NVARCHAR(255) NOT NULL,
    IsActive BIT DEFAULT 1
);

-- Create Roles table
CREATE TABLE Roles (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(255)
);

-- Create Permissions table
CREATE TABLE Permissions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(255)
);

-- Create RolePermissions table (many-to-many relationship)
CREATE TABLE RolePermissions (
    RoleId INT FOREIGN KEY REFERENCES Roles(Id),
    PermissionId INT FOREIGN KEY REFERENCES Permissions(Id),
    PRIMARY KEY (RoleId, PermissionId)
);

-- Add indexes for better performance
CREATE INDEX IX_Products_CategoryId ON Products(CategoryId);
CREATE INDEX IX_Products_Featured ON Products(Featured);
CREATE INDEX IX_Products_Bestseller ON Products(Bestseller);
CREATE INDEX IX_Reviews_ProductId ON Reviews(ProductId);
CREATE INDEX IX_OrderItems_OrderId ON OrderItems(OrderId);
CREATE INDEX IX_OrderItems_ProductId ON OrderItems(ProductId); 