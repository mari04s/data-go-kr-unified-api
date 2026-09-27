require('dotenv').config();
const axios = require('axios');

async function getTourismInfo() {
  const url = 'https://apis.data.go.kr/B551011/WellnessTursmService/areaBasedList';

  try {
    const response = await axios.get(url, {
      params: {
        serviceKey: process.env.TOUR_SERVICE_KEY.trim(),
        MobileOS: 'ETC',
        MobileApp: 'TCCProjeto',
        _type: 'json',
        numOfRows: 10,
        pageNo: 1,
        arrange: 'A',
        langDivCd: 1,
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

module.exports = getTourismInfo;