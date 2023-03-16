// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { xml2json } from "xml-js";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const findAll = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getAllProduct/>
   </soapenv:Body>
</soapenv:Envelope>`;

    const paymentResponse = await axios.post(
      "http://localhost:5000/productService",
      findAll,
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

  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const body = req.body;
  // res.status(200).json({ name: "John Doe" });
  // post method
  const checkProduct = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:checkProduct>
         <name>${body.name}</name>
         <quantity>${body.quantity}</quantity>
      </ser:checkProduct>
   </soapenv:Body>
</soapenv:Envelope>`;

  const paymentResponse = await axios.post(
    "http://localhost:5000/productService",
    checkProduct,
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
