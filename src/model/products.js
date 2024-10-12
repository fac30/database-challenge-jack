const db = require("../database/db.js");

const select_products = db.prepare(
  /*sql */
  `SELECT *, 
  printf('£%.2f', unit_price * units_in_stock) AS stock_value    FROM PRODUCTS`
);

const listProducts = () => {
  return select_products.all();
};

const search_products = db.prepare(
  `SELECT id, name FROM PRODUCTS WHERE name LIKE ?`
);

const searchProducts = (nameChoice) => {
  return search_products.all(nameChoice);
};

const id_products = db.prepare(
  /*sql*/
  `SELECT 
  PRODUCTS.name AS product_name,          
  PRODUCTS.id AS product_id,              
  CATEGORIES.name AS category_name,        
  CATEGORIES.description AS category_description  
  FROM 
  PRODUCTS 
  JOIN 
  CATEGORIES ON PRODUCTS.category_id = CATEGORIES.id 
  WHERE 
  PRODUCTS.id = ?`
);

const getProduct = (idChoice) => {
  const product = id_products.get(idChoice);
  // console.log(product);
  return {
    name: product.product_name,
    id: product.product_id,
    category_name: product.category_name,
    category_description: product.category_description,
  };
};

console.log(listProducts());

module.exports = {
  listProducts,
  searchProducts,
  getProduct,
};
