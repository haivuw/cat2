export async function getPricesByEmail(email: string) {
  if (!email) return;
  if (
    !(
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_SPREADSHEET_ID_CUSTOMER_PRODUCT
    )
  ) {
    throw new Error(
      "GOOGLE credentials must be set as env vars `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `GOOGLE_SPREADSHEET_ID_CUSTOMER_PRODUCT`."
    );
  }
  const { GoogleSpreadsheet } = require("google-spreadsheet");
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_CUSTOMER_PRODUCT);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(
      /\\n/gm,
      "\n"
    ),
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  const prices = rows?.map(({ _sheet, _rowNumber, _rawData, ...fields }) => ({
    ...fields,
  })).filter(row => row.email === email);
  return prices;
}
