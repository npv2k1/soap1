// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { xml2json } from "xml-js";
type Data = {
  name: string;
};

var data =
  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ser:processPayment>\n         <paymentInfo>\n            <cardHolderName>Nguyen</cardHolderName>\n         </paymentInfo>\n      </ser:processPayment>\n   </soapenv:Body>\n</soapenv:Envelope>';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const body = req.body;
  // res.status(200).json({ name: "John Doe" });
  // post method
  const paymentInfo = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:processPayment>
         <cardHolderName>${body.cardHolderName}</cardHolderName>
         <cardType>${body.cardType}</cardType>
         <cardNumber>${body.cardNumber}</cardNumber>
         <cvv>${body.cvv}</cvv>
         <expirationDate>${body.expirationDate}</expirationDate>
         <amount>${body.amount}</amount>
         <txId>${body.txId}</txId>
      </ser:processPayment>
   </soapenv:Body>
</soapenv:Envelope>`;

  const paymentResponse = await axios.post(
    "http://localhost:5000/mywebservice",
    paymentInfo,
    {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
    }
  );
  console.log(paymentResponse.data);
  res.status(200).json(
    JSON.parse(
      xml2json(paymentResponse.data, {
        compact: true,
        spaces: 4,
      })
    )
  );
}
