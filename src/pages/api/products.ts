import { getPricesByEmail } from "helpers/get-prices";
import { getProducts } from "helpers/get-products";
import mergeProductsPrice from "helpers/merge-products-prices";

// import { sendMail } from 'helpers/nodemailer';
async function createOrder(data) {
  if (
    !(
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_SPREADSHEET_ID_ORDER
    )
  ) {
    throw new Error(
      'GOOGLE credentials must be set as env vars `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `GOOGLE_SPREADSHEET_ID_ORDER`.'
    );
  }

  const { GoogleSpreadsheet } = require('google-spreadsheet');
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_ORDER);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

  // append rows
  await sheet.addRow(data);
}
export default async (req, res) => {
  const { method } = req;
  if (method === 'GET') {
    const email = req.query.email;

    let [products, prices] = await Promise.all([
      getProducts(), getPricesByEmail(email)
    ])

    products = mergeProductsPrice(products, prices, email)

    return res.status(200).json({ data: products});
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};
