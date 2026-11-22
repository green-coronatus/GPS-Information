let watchId = null;

function startGps() {

  if (watchId !== null) {
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    position => {

      document.getElementById("latitude").textContent =
        position.coords.latitude;

      document.getElementById("longitude").textContent =
        position.coords.longitude;
    }
  );
}

function stopGps() {

  if (watchId !== null) {

    navigator.geolocation.clearWatch(watchId);

    watchId = null;
  }
}
