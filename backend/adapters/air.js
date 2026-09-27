require('dotenv').config();
const axios = require('axios');

console.log('CHAVE:', process.env.AIR_SERVICE_KEY);

async function getAirQuality() {
  const url = 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty';

  try {
    const response = await axios.get(url, {
      params: {
        serviceKey: process.env.AIR_SERVICE_KEY.trim(),
        returnType: 'json',
        numOfRows: 10,
        pageNo: 1,
        stationName: '강남구',
        dataTerm: 'DAILY',
        ver: '1.3',
      },
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    return {
      success: true,
      data: response.data.response.body.items,
      error: null,
    };
  } catch (err) {
    console.log('STATUS:', err.response ? err.response.status : 'sem status');
    console.log('CORPO DO ERRO:', err.response ? JSON.stringify(err.response.data) : 'sem corpo');
    return {
      success: false,
      data: null,
      error: err.message,
    };
  }
}

module.exports = getAirQuality;
