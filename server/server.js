import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Wrap the entire server startup in a try-catch
async function startServer() {
    try {
        // Database configuration
        const config = {
            user: process.env.DB_USER || 'sa',
            password: process.env.DB_PASSWORD || '123@123qw',
            server: process.env.DB_SERVER || 'localhost',
            database: process.env.DB_NAME || 'FurnishFlow',
            options: {
                encrypt: true,
                trustServerCertificate: true,
            }
        };

        console.log('Attempting to connect to database...');
        console.log('Database config:', { 
            user: config.user, 
            server: config.server, 
            database: config.database 
        });

        // Create a pool that we can use to make database connections
        const pool = new sql.ConnectionPool(config);

        // Connect to database
        await pool.connect();
        console.log('Successfully connected to database');

        // Debug: Check Products table
        const debugResult = await pool.request().query('SELECT COUNT(*) as count FROM Products');
        console.log('Number of products in database:', debugResult.recordset[0].count);
        
        if (debugResult.recordset[0].count === 0) {
            console.log('No products found in database. Adding sample data...');
            // Insert sample data
            await pool.request().query(`
                INSERT INTO Products (Name, SKU, Price, Stock, Description, CategoryId, Featured, Bestseller, Rating, ReviewCount)
                VALUES 
                ('Modern Sofa', 'SOF-001', 999.99, 10, 'Comfortable modern sofa', 1, 1, 1, 4.5, 12),
                ('Dining Table', 'TBL-001', 599.99, 5, 'Elegant dining table', 3, 1, 0, 4.0, 8);
            `);
            console.log('Sample products added.');
        }

        const app = express();
        app.use(cors());
        app.use(express.json());

        // API Routes
        app.get('/api/products', async (req, res) => {
            try {
                console.log('GET /api/products - Fetching products...');
                
                // Debug: Check Products table again
                const countResult = await pool.request().query('SELECT COUNT(*) as count FROM Products');
                console.log('Current number of products:', countResult.recordset[0].count);
                
                // First get the products
                const result = await pool.request().query(`
                    SELECT 
                        p.Id,
                        p.Name,
                        p.SKU,
                        CAST(p.Price as float) as Price,
                        CAST(p.Stock as int) as Stock,
                        p.Description,
                        p.CategoryId,
                        p.Featured,
                        p.Bestseller,
                        p.Rating,
                        p.ReviewCount,
                        p.CreatedAt,
                        p.UpdatedAt
                    FROM Products p
                    ORDER BY p.CreatedAt DESC
                `);

                console.log('Query executed successfully');
                console.log('Raw query result:', JSON.stringify(result.recordset, null, 2));
                console.log('Number of records:', result.recordset ? result.recordset.length : 0);

                if (!result.recordset || result.recordset.length === 0) {
                    console.log('No products found in database');
                    return res.json([]);
                }

                // Transform the results to include images array and ensure proper types
                const products = result.recordset.map(product => ({
                    id: product.Id,
                    name: product.Name,
                    sku: product.SKU,
                    price: typeof product.Price === 'number' ? product.Price : 0,
                    stock: typeof product.Stock === 'number' ? product.Stock : 0,
                    description: product.Description,
                    categoryId: product.CategoryId,
                    featured: Boolean(product.Featured),
                    bestseller: Boolean(product.Bestseller),
                    rating: product.Rating || 0,
                    reviewCount: product.ReviewCount || 0,
                    images: []
                }));

                console.log('Transformed products:', products);
                res.json(products);
            } catch (err) {
                console.error('Error in /api/products:', err);
                res.status(500).json({ error: 'Failed to fetch products', details: err.message });
            }
        });

        app.get('/api/products/:id', async (req, res) => {
            try {
                console.log('GET /api/products/:id - Fetching product:', req.params.id);
                
                const result = await pool.request()
                    .input('id', sql.Int, req.params.id)
                    .query(`
                        SELECT 
                            p.*,
                            c.Name as CategoryName,
                            c.Slug as CategorySlug,
                            (
                                SELECT STRING_AGG(ImageUrl, ',') 
                                FROM ProductImages 
                                WHERE ProductId = p.Id
                            ) as ImageUrls,
                            (
                                SELECT STRING_AGG(CONCAT(col.Id, ':', col.Name, ':', col.Value), ',')
                                FROM ProductColors pc
                                JOIN Colors col ON pc.ColorId = col.Id
                                WHERE pc.ProductId = p.Id
                            ) as ColorData,
                            (
                                SELECT STRING_AGG(CONCAT(s.Id, ':', s.Name, ':', s.Dimensions), ',')
                                FROM ProductSizes ps
                                JOIN Sizes s ON ps.SizeId = s.Id
                                WHERE ps.ProductId = p.Id
                            ) as SizeData
                        FROM Products p
                        LEFT JOIN Categories c ON p.CategoryId = c.Id
                        WHERE p.Id = @id
                    `);

                console.log('Query result:', result);

                if (result.recordset.length === 0) {
                    console.log('Product not found');
                    res.status(404).json({ error: 'Product not found' });
                } else {
                    // Transform the result to include arrays
                    const product = result.recordset[0];
                    console.log('Raw product data:', product);
                    
                    const transformedProduct = {
                        id: product.Id,
                        name: product.Name,
                        sku: product.SKU,
                        price: parseFloat(product.Price),
                        stock: parseInt(product.Stock),
                        description: product.Description,
                        categoryId: product.CategoryId,
                        featured: Boolean(product.Featured),
                        bestseller: Boolean(product.Bestseller),
                        rating: parseFloat(product.Rating) || 0,
                        reviewCount: parseInt(product.ReviewCount) || 0,
                        images: product.ImageUrls ? product.ImageUrls.split(',') : [],
                        availableColors: product.ColorData ? 
                            product.ColorData.split(',').map(color => {
                                const [id, name, value] = color.split(':');
                                return { id: parseInt(id), name, value };
                            }) : [],
                        availableSizes: product.SizeData ?
                            product.SizeData.split(',').map(size => {
                                const [id, name, dimensions] = size.split(':');
                                return { id: parseInt(id), name, dimensions };
                            }) : []
                    };

                    console.log('Transformed product:', transformedProduct);
                    res.json(transformedProduct);
                }
            } catch (err) {
                console.error('Error in GET /api/products/:id:', err);
                res.status(500).json({ error: 'Failed to fetch product', details: err.message });
            }
        });

        app.post('/api/products', async (req, res) => {
            try {
                const { name, sku, price, stock, description, categoryId, featured, bestseller, images, availableColors, availableSizes } = req.body;
                
                // Start a transaction
                const transaction = new sql.Transaction(pool);
                await transaction.begin();
                
                try {
                    // Insert the main product
                    const result = await transaction.request()
                        .input('name', sql.NVarChar, name)
                        .input('sku', sql.NVarChar, sku)
                        .input('price', sql.Decimal(10, 2), price)
                        .input('stock', sql.Int, stock)
                        .input('description', sql.NVarChar, description)
                        .input('categoryId', sql.Int, categoryId)
                        .input('featured', sql.Bit, featured)
                        .input('bestseller', sql.Bit, bestseller)
                        .query(`
                            INSERT INTO Products (Name, SKU, Price, Stock, Description, CategoryId, Featured, Bestseller)
                            OUTPUT INSERTED.Id
                            VALUES (@name, @sku, @price, @stock, @description, @categoryId, @featured, @bestseller)
                        `);
                    
                    const productId = result.recordset[0].Id;
                    
                    // Insert images
                    if (images && images.length > 0) {
                        for (const imageUrl of images) {
                            await transaction.request()
                                .input('productId', sql.Int, productId)
                                .input('imageUrl', sql.NVarChar, imageUrl)
                                .query('INSERT INTO ProductImages (ProductId, ImageUrl) VALUES (@productId, @imageUrl)');
                        }
                    }
                    
                    // Insert colors - First ensure colors exist in Colors table
                    if (availableColors && availableColors.length > 0) {
                        for (const color of availableColors) {
                            // First, insert or get the color
                            const colorResult = await transaction.request()
                                .input('name', sql.NVarChar, color.name)
                                .input('value', sql.NVarChar, color.value)
                                .query(`
                                    -- First try to find existing color
                                    DECLARE @ColorId INT;
                                    
                                    SELECT @ColorId = Id 
                                    FROM Colors 
                                    WHERE Name = @name AND Value = @value;
                                    
                                    -- If not found, insert new color
                                    IF @ColorId IS NULL
                                    BEGIN
                                        INSERT INTO Colors (Name, Value)
                                        VALUES (@name, @value);
                                        
                                        SET @ColorId = SCOPE_IDENTITY();
                                    END
                                    
                                    -- Return the color Id
                                    SELECT @ColorId as Id;
                                `);
                            
                            const colorId = colorResult.recordset[0].Id;
                            
                            // Then create the product-color relationship
                            await transaction.request()
                                .input('productId', sql.Int, productId)
                                .input('colorId', sql.Int, colorId)
                                .query('INSERT INTO ProductColors (ProductId, ColorId) VALUES (@productId, @colorId)');
                        }
                    }
                    
                    // Insert sizes - First ensure sizes exist in Sizes table
                    if (availableSizes && availableSizes.length > 0) {
                        for (const size of availableSizes) {
                            // First, insert or get the size
                            const sizeResult = await transaction.request()
                                .input('name', sql.NVarChar, size.name)
                                .input('dimensions', sql.NVarChar, size.dimensions)
                                .query(`
                                    -- First try to find existing size
                                    DECLARE @SizeId INT;
                                    
                                    SELECT @SizeId = Id 
                                    FROM Sizes 
                                    WHERE Name = @name AND Dimensions = @dimensions;
                                    
                                    -- If not found, insert new size
                                    IF @SizeId IS NULL
                                    BEGIN
                                        INSERT INTO Sizes (Name, Dimensions)
                                        VALUES (@name, @dimensions);
                                        
                                        SET @SizeId = SCOPE_IDENTITY();
                                    END
                                    
                                    -- Return the size Id
                                    SELECT @SizeId as Id;
                                `);
                            
                            const sizeId = sizeResult.recordset[0].Id;
                            
                            // Then create the product-size relationship
                            await transaction.request()
                                .input('productId', sql.Int, productId)
                                .input('sizeId', sql.Int, sizeId)
                                .query('INSERT INTO ProductSizes (ProductId, SizeId) VALUES (@productId, @sizeId)');
                        }
                    }
                    
                    // Commit the transaction
                    await transaction.commit();
                    res.status(201).json({ id: productId, message: 'Product created successfully' });
                } catch (err) {
                    // If there's an error, roll back the transaction
                    await transaction.rollback();
                    throw err;
                }
            } catch (err) {
                console.error('Error creating product:', err);
                res.status(500).json({ error: 'Failed to create product' });
            }
        });

        app.put('/api/products/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { name, sku, price, stock, description, categoryId, featured, bestseller, images, availableColors, availableSizes } = req.body;
                
                // Start a transaction
                const transaction = new sql.Transaction(pool);
                await transaction.begin();
                
                try {
                    // Update the main product
                    await transaction.request()
                        .input('id', sql.Int, id)
                        .input('name', sql.NVarChar, name)
                        .input('sku', sql.NVarChar, sku)
                        .input('price', sql.Decimal(10, 2), price)
                        .input('stock', sql.Int, stock)
                        .input('description', sql.NVarChar, description)
                        .input('categoryId', sql.Int, categoryId)
                        .input('featured', sql.Bit, featured)
                        .input('bestseller', sql.Bit, bestseller)
                        .query(`
                            UPDATE Products 
                            SET Name = @name, 
                                SKU = @sku, 
                                Price = @price, 
                                Stock = @stock, 
                                Description = @description, 
                                CategoryId = @categoryId, 
                                Featured = @featured, 
                                Bestseller = @bestseller,
                                UpdatedAt = GETDATE()
                            WHERE Id = @id
                        `);
                    
                    // Update images
                    await transaction.request()
                        .input('productId', sql.Int, id)
                        .query('DELETE FROM ProductImages WHERE ProductId = @productId');
                        
                    if (images && images.length > 0) {
                        for (const imageUrl of images) {
                            await transaction.request()
                                .input('productId', sql.Int, id)
                                .input('imageUrl', sql.NVarChar, imageUrl)
                                .query('INSERT INTO ProductImages (ProductId, ImageUrl) VALUES (@productId, @imageUrl)');
                        }
                    }
                    
                    // Update colors
                    await transaction.request()
                        .input('productId', sql.Int, id)
                        .query('DELETE FROM ProductColors WHERE ProductId = @productId');
                        
                    if (availableColors && availableColors.length > 0) {
                        for (const color of availableColors) {
                            // First, insert or get the color
                            const colorResult = await transaction.request()
                                .input('name', sql.NVarChar, color.name)
                                .input('value', sql.NVarChar, color.value)
                                .query(`
                                    -- First try to find existing color
                                    DECLARE @ColorId INT;
                                    
                                    SELECT @ColorId = Id 
                                    FROM Colors 
                                    WHERE Name = @name AND Value = @value;
                                    
                                    -- If not found, insert new color
                                    IF @ColorId IS NULL
                                    BEGIN
                                        INSERT INTO Colors (Name, Value)
                                        VALUES (@name, @value);
                                        
                                        SET @ColorId = SCOPE_IDENTITY();
                                    END
                                    
                                    -- Return the color Id
                                    SELECT @ColorId as Id;
                                `);
                            
                            const colorId = colorResult.recordset[0].Id;
                            
                            // Then create the product-color relationship
                            await transaction.request()
                                .input('productId', sql.Int, id)
                                .input('colorId', sql.Int, colorId)
                                .query('INSERT INTO ProductColors (ProductId, ColorId) VALUES (@productId, @colorId)');
                        }
                    }
                    
                    // Update sizes
                    await transaction.request()
                        .input('productId', sql.Int, id)
                        .query(`
                            -- First, delete sizes that are no longer selected
                            DELETE FROM ProductSizes 
                            WHERE ProductId = @productId 
                            AND SizeId NOT IN (
                                SELECT s.Id 
                                FROM Sizes s 
                                WHERE s.Name IN (${availableSizes.map(s => `'${s.name}'`).join(',')})
                            );

                            -- Then, for each new size, only insert if it doesn't exist
                        `);
                        
                    if (availableSizes && availableSizes.length > 0) {
                        for (const size of availableSizes) {
                            // First, insert or get the size
                            const sizeResult = await transaction.request()
                                .input('name', sql.NVarChar, size.name)
                                .input('dimensions', sql.NVarChar, size.dimensions)
                                .query(`
                                    -- First try to find existing size
                                    DECLARE @SizeId INT;
                                    
                                    SELECT @SizeId = Id 
                                    FROM Sizes 
                                    WHERE Name = @name AND Dimensions = @dimensions;
                                    
                                    -- If not found, insert new size
                                    IF @SizeId IS NULL
                                    BEGIN
                                        INSERT INTO Sizes (Name, Dimensions)
                                        VALUES (@name, @dimensions);
                                        
                                        SET @SizeId = SCOPE_IDENTITY();
                                    END
                                    
                                    -- Return the size Id
                                    SELECT @SizeId as Id;
                                `);
                            
                            const sizeId = sizeResult.recordset[0].Id;
                            
                            // Then create the product-size relationship only if it doesn't exist
                            await transaction.request()
                                .input('productId', sql.Int, id)
                                .input('sizeId', sql.Int, sizeId)
                                .query(`
                                    IF NOT EXISTS (
                                        SELECT 1 
                                        FROM ProductSizes 
                                        WHERE ProductId = @productId AND SizeId = @sizeId
                                    )
                                    BEGIN
                                        INSERT INTO ProductSizes (ProductId, SizeId) 
                                        VALUES (@productId, @sizeId)
                                    END
                                `);
                        }
                    }
                    
                    // Commit the transaction
                    await transaction.commit();
                    res.json({ message: 'Product updated successfully' });
                } catch (err) {
                    // If there's an error, roll back the transaction
                    await transaction.rollback();
                    throw err;
                }
            } catch (err) {
                console.error('Error updating product:', err);
                res.status(500).json({ error: 'Failed to update product' });
            }
        });

        app.delete('/api/products/:id', async (req, res) => {
            try {
                const { id } = req.params;
                
                // Start a transaction
                const transaction = new sql.Transaction(pool);
                await transaction.begin();
                
                try {
                    // Delete related records first
                    await transaction.request()
                        .input('productId', sql.Int, id)
                        .query(`
                            -- Delete product relationships
                            DELETE FROM ProductColors WHERE ProductId = @productId;
                            DELETE FROM ProductSizes WHERE ProductId = @productId;
                            DELETE FROM ProductImages WHERE ProductId = @productId;
                            
                            -- Delete the product
                            DELETE FROM Products WHERE Id = @productId;
                        `);
                    
                    // Commit the transaction
                    await transaction.commit();
                    res.json({ message: 'Product deleted successfully' });
                } catch (err) {
                    // If there's an error, roll back the transaction
                    await transaction.rollback();
                    throw err;
                }
            } catch (err) {
                console.error('Error deleting product:', err);
                res.status(500).json({ error: 'Failed to delete product' });
            }
        });

        app.get('/api/categories', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Categories');
                res.json(result.recordset);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to fetch categories' });
            }
        });

        app.get('/api/products/category/:categoryId', async (req, res) => {
            try {
                const result = await pool.request()
                    .input('categoryId', sql.Int, req.params.categoryId)
                    .query(`
                        SELECT p.*, c.Name as CategoryName, c.Slug as CategorySlug
                        FROM Products p
                        LEFT JOIN Categories c ON p.CategoryId = c.Id
                        WHERE p.CategoryId = @categoryId
                    `);
                res.json(result.recordset);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to fetch products by category' });
            }
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Test the API at: http://localhost:${PORT}/api/products`);
        });

    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer(); 