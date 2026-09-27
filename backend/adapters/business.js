require('dotenv').config();
const axios = require('axios');

async function checkBusiness(businessNumber) {
  const url = 'https://api.odcloud.kr/api/nts-businessman/v1/status';

  try {
    const response = await axios.post(
      url,
      { b_no: [businessNumber] }, // body of the request
      {
        params: {
          serviceKey: process.env.NTS_SERVICE_KEY.trim(),
        },
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );

    return {
      success: true,
      data: response.data.data,
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

module.exports = checkBusiness;