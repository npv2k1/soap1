package services;
import dtos.PaymentInfo;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

@WebService
@SOAPBinding(style = Style.RPC)
public class PaymentService {

    @WebMethod
    public String payment(@WebParam(name = "paymentInfo") PaymentInfo paymentInfo) {
        System.out.println(paymentInfo);
        return "ok";
    }

    @WebMethod
    public String processPayment(@WebParam(name = "cardHolderName") String cardHolderName,
                                 @WebParam(name = "cardType") String cardType,
                                 @WebParam(name = "cardNumber") String cardNumber,
                                 @WebParam(name = "cvv") String cvv,
                                 @WebParam(name = "expirationDate") String expirationDate,
                                 @WebParam(name = "amount") Integer amount,
                                 @WebParam(name = "txId") String txId
                                 ) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:sqlite:payments.db");
            String sql = "INSERT INTO transactions (tx_id, card_type, card_number, amount, timestamp) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, txId);
            pstmt.setString(2, cardType);
            pstmt.setString(3, cardNumber);
            pstmt.setDouble(4, amount.doubleValue());
            pstmt.setLong(5, new Date().getTime());
            pstmt.executeUpdate();
            conn.close();
            return "Successful";
        } catch (SQLException e) {
            e.printStackTrace();
            String s = "Failed";
            return s;
        }


    }
}
