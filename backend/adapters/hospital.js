require('dotenv').config();
const axios = require('axios');
const xml2js = require('xml2js');

async function getHospitalInfo() {
  const url = 'https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList';

  try {
    const response = await axios.get(url, {
      params: {
        ServiceKey: process.env.HOSP_SERVICE_KEY.trim(),
        pageNo: 1,
        numOfRows: 10,
        sidoCd: 110000,
      },
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    // This API only returns XML, so we convert it to a JS object first
    const parsed = await xml2js.parseStringPromise(response.data, { explicitArray: false });
    const items = parsed.response.body.items.item;

    return {
      success: true,
      data: items,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.message,
    };
  }
}

module.exports = getHospitalInfo;