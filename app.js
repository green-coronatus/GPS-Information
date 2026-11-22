let watchId = null;

//
// GPS情報取得開始
//
function startGps() {

  if (watchId !== null) {
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    async position => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;

      await getElevation(lat, lon);
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
/*
async function getElevation(lat, lon) {

  const url =
    `https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=${lon}&lat=${lat}&outtype=JSON`;

  const response = await fetch(url);
  const data = await response.json();

  document.getElementById("elevation").textContent =
    data.elevation + " m";
}
*/
