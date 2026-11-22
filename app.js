//
// グローバル変数
//
let watchId = null;
let currentLat = null;
let currentLon = null;


//
// GPS情報取得開始
//
function startGps() {

  if (watchId !== null) {
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    position => {

      currentLat = position.coords.latitude;
      currentLon = position.coords.longitude;

      document.getElementById("latitude").textContent =
        currentLat;

      document.getElementById("longitude").textContent =
        currentLon;

      const altitude = position.coords.altitude;

      document.getElementById("gpsAltitude").textContent =
        altitude === null
          ? "取得不可"
          : altitude.toFixed(1) + " m";
    },
    error => {
      console.error(error);
    },
    {
      enableHighAccuracy: true
    }
  );
}


//
// GPS情報取得停止
//
function stopGps() {

  if (watchId !== null) {

    navigator.geolocation.clearWatch(watchId);

    watchId = null;
  }
}


//
// 標高取得ボタン
//
async function showElevation() {

  if (currentLat === null ||
      currentLon === null) {

    alert("GPSが取得されていません");

    return;
  }

  await getElevation(
    currentLat,
    currentLon
  );
}


//
// 標高データ取得
// 国土地理院のAPIを使用
//
async function getElevation(lat, lon) {

  try {

    const url =
      `https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=${lon}&lat=${lat}&outtype=JSON`;

    const response = await fetch(url);

    const data = await response.json();

    document.getElementById("elevation").textContent =
      data.elevation + " m";

  } catch (error) {

    console.error(error);

    document.getElementById("elevation").textContent =
      "取得失敗";
  }
}


//
// 地質情報取得
// 産業技術総合研究所（AIST）の「20万分の1日本シームレス地質図 Web API」を使用
//
async function getGeology(lat, lon) {

  const url =
    `https://gbank.gsj.jp/seamless/v2/api/1.3.1/legend.json?point=${lat},${lon}`;

  const response = await fetch(url);

  const data = await response.json();

  console.log(data);
}
