require('dotenv').config();
const axios = require('axios');

async function getBusArrival() {
  const url = 'https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList';

  try {
    const response = await axios.get(url, {
      params: {
        serviceKey: process.env.TAGO_SERVICE_KEY.trim(),
        pageNo: 1,
        numOfRows: 10,
        _type: 'json',
        cityCode: 25,
        nodeId: 'DJB8001793',
      },
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    return {
      success: true,
      data: response.data.response.body.items.item,
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

module.exports = getBusArrival;