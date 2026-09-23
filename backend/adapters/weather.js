require('dotenv').config();
const axios = require('axios');

// Finds the most recent valid time slot for this weather API
// (it only publishes data at fixed hours: 02, 05, 08, 11, 14, 17, 20, 23)
function getBaseDateTime() {
  const validHours = [23, 20, 17, 14, 11, 8, 5, 2];
  const now = new Date();
  now.setMinutes(now.getMinutes() - 15); // give the API time to publish

  let hour = validHours.find((h) => h <= now.getHours());
  let date = new Date(now);

  if (!hour) {
    hour = 23;
    date.setDate(date.getDate() - 1);
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return {
    base_date: `${yyyy}${mm}${dd}`,
    base_time: `${String(hour).padStart(2, '0')}00`,
  };
}

async function getWeather() {
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
  const { base_date, base_time } = getBaseDateTime();

  try {
    const response = await axios.get(url, {
      params: {
        ServiceKey: process.env.KMA_SERVICE_KEY,
        pageNo: 1,
        numOfRows: 10,
        dataType: 'JSON',
        base_date,
        base_time,
        nx: 55,
        ny: 127,
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

module.exports = getWeather;