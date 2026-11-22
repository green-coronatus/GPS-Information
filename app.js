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
// 国土地理院のサーバーから標高データを取得
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
