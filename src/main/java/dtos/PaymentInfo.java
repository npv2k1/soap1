package dtos;
import java.io.Serializable;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "paymentInfo")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class PaymentInfo implements Serializable {

    private String cardHolderName;
    private String cardType;
    private String cardNumber;
    private String cvcCode;
    private String expirationDate;

    // constructor, getters, setters


    public PaymentInfo() {
    }

    public PaymentInfo(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    @Override
    public String toString() {
        return "PaymentInfo{" +
                "cardHolderName='" + cardHolderName + '\'' +
                ", cardType='" + cardType + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                ", cvcCode='" + cvcCode + '\'' +
                ", expirationDate='" + expirationDate + '\'' +
                '}';
    }
}
