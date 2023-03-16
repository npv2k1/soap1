package services;
import dao.PaymentDAO;

import dao.ProductDAO;
import models.Payment;
import models.Product;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;
import java.util.ArrayList;

@WebService
@SOAPBinding(style = Style.RPC)
public class ProductService {

    private static final ProductDAO productDAO = new ProductDAO();

    @WebMethod
    public String checkProduct(@WebParam(name = "name") String name,
                                 @WebParam(name = "quantity") Integer quantity

    ) {
        Boolean productStatus = productDAO.checkProduct(name,quantity);
//        System.out.println("Product name: " + name + " quantity: " + quantity);
//        System.out.println("Product status: " + productStatus);
        if(!productStatus){
            return "Out of stock";
        }
        return "Available";
    }


    @WebMethod
    public  Product[] getAllProduct() {
        ArrayList<Product> products  = productDAO.findAll();
        // log
        products.forEach(product -> {
            System.out.println(product);
        });
        // payments to arrays
        Product[] productArray = new Product[products.size()];
        productArray = products.toArray(productArray);
        return productArray;
    }


}
