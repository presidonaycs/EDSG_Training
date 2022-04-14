// import axios from "axios";
import $ from "jquery";
import Cookies from "js-cookie";

export const location = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        console.log(pos);
        const res = await getLocation(pos);
        console.log(res);

        if (res.status === "OK") {
          if (res.results[0]) {
            const { results } = res;
            const neighborhood = results.filter((item) =>
              item.types.includes("administrative_area_level_2")
            );
            //   setGeoLocate(neighborhood[0].formatted_address);
            Cookies.set("location", neighborhood[0].formatted_address, {
              expires: 0.0416665,
            });
            console.log("Current Location", neighborhood[0].formatted_address);
            return neighborhood[0].formatted_address;
          }
        } else {
          console.log(res.error_message);
          Cookies.set("location", null, {
            expires: 0.0416665,
          });
          return null;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
};

function GetLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // AppendLocation(position.coords, loginDate);

        getLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function (failure) {
        $.getJSON("https://ipinfo.io/geo", function (response) {
          var loc = response.loc.split(",");
          var coords = {
            lattitude: loc[0],
            longitude: loc[1],
          };
          console.log("coordinate", coords);
          //   AppendLocation(coords, loginDate);
        });
      }
    );
  }
}
// Try HTML5 geolocation.
// function GetLocation2() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const pos = {
//                     lattitude: ""+position.coords.latitude+"",
//                     longitude: ""+position.coords.longitude+"",
//                 };
//                 console.log(pos);

//                 AppendLocation(pos);
//             },
//             () => {
//                 handleLocationError(true, infoWindow, map.getCenter());
//             });
//         }
// }

// function AppendLocation(_input_data, loginDate) {
//   console.log(_input_data);
//   const { latitude, longitude } = _input_data;
//   console.log("latitude and longitude", latitude, longitude);
//   //   const response = axios.post(URL + "/services/api/userlocations", _input_data);
//   const response = axios.post(
//     "http://18.225.15.178/services/api/userlocations",
//     {
//       latitude,
//       longitude,
//     }
//   );
//   console.log("logging location response", response);
//   response
//     .then((response) => {
//       let result = response.data;
//       console.log("result", result);
//       $("#locationid").html(result.location);
//       // $("#logintimeid").html("Time of login: " + LoginCurrentDate());
//       $("#logintimeid").html("Time of login: " + loginDate);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

export default GetLocation;

export const getLocation = async (pos = {}) =>
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyCx5dr3B_oMsG1c7VOOzRRqKJ-u3O9oKYE`
  )
    .then((response) => response.json())
    .then((data) => data);
