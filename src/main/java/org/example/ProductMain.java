package org.example;

import dao.ProductDAO;
import models.Product;
import services.ProductService;

import javax.xml.ws.Endpoint;

public class ProductMain {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        Endpoint.publish("http://localhost:5000/productService", new ProductService());

        // Fake product data

//         Product product1 = new Product("Laptop", 10);
//         Product product2 = new Product("Mobile", 20);
//         Product product3 = new Product("Tablet", 30);
//         Product product4 = new Product("TV", 40);
//         Product product5 = new Product("Watch", 50);
//         Product product6 = new Product("Camera", 60);
//         Product product7 = new Product("Headphone", 70);
//            Product product8 = new Product("Speaker", 80);
//            Product product9 = new Product("Keyboard", 90);
//            Product product10 = new Product("Mouse", 100);
//            // create product db
//        ProductDAO productDAO = new ProductDAO();
//        productDAO.createProduct(product1);
//        productDAO.createProduct(product2);
//        productDAO.createProduct(product3);
//        productDAO.createProduct(product4);
//        productDAO.createProduct(product5);
//        productDAO.createProduct(product6);
//        productDAO.createProduct(product7);
//        productDAO.createProduct(product8);
//        productDAO.createProduct(product9);
//        productDAO.createProduct(product10);

    }
}
