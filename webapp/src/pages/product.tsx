import { useCallback, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { processPayment } from "../services/payment";
import axios from "axios";
import { toast } from "react-toastify";

const products = [
  {
    id: 1,
    title: "Tour Tokyo",
    href: "#",
    price: "$1000",
    color: "",
    size: "",
    imageSrc: "/tokio.jfif",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];

const paymentMethods = [{ id: "credit-card", title: "Credit card" }];

function randomTxIdString() {
  return Math.random().toString(36).substr(2, 9);
}

const ProductCard = ({ product }: any) => {
  const [productCount, setProductCount] = useState(1);
  const [status, setStatus] = useState("");

  const handleCheckProduct = useCallback(
    async (name) => {
      const res = await axios.post("/api/product", {
        name,
        quantity: productCount,
      });
      if (res.data) {
        setStatus(
          res.data["S:Envelope"]["S:Body"]["ns2:checkProductResponse"][
            "return"
          ]["_text"]
        );
      }
    },
    [productCount]
  );

  return (
    <li className="flex py-6 px-4 sm:px-6">
      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-700 hover:text-gray-800">
            {product["name"]["_text"]}
          </p>
          <input
            type="number"
            value={productCount}
            onChange={(e) => setProductCount(parseInt(e.target.value))}
            placeholder="quantity"
            className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm p-2"
          ></input>
          <button
            type="button"
            onClick={() => handleCheckProduct(product["name"]["_text"], 1)}
            className="bg-blue-500 text-white rounded-xl p-2"
          >
            Check
          </button>
        </div>
        <div>{status}</div>
      </div>
    </li>
  );
};

export default function Example() {
  const [listProduct, setListProduct] = useState([]);
  console.log(
    "🚀 ~ file: product.tsx:31 ~ Example ~ listProduct:",
    listProduct
  );
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/product");
      setListProduct(
        res.data["S:Envelope"]["S:Body"]["ns2:getAllProductResponse"]["return"][
          "item"
        ]
      );
    };
    getData();
  }, []);

  const [txID, setTxID] = useState(randomTxIdString());
  const [paymentInfo, setPaymentInfo] = useState({
    amount: 1000,
    cardHolderName: "Nguyen",
    cardNumber: "4242424242424242",
    expirationDate: "12/29",
    cvc: "123",
    txId: txID,
    cardType: "visa",
  });

  const handleChange = (key, value) => {
    setPaymentInfo({
      ...paymentInfo,
      [key]: value,
    });
  };

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Products</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <ul role="list" className="divide-y divide-gray-200">
                {listProduct &&
                  listProduct.map((product, idx) => {
                    return <ProductCard product={product} key={idx} />;
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
