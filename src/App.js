
import { useRef, useState } from 'react';
import './App.css';
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import { render } from '@testing-library/react'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

function App() {

  const [value_1, setValue_1] = useState("");
  const [value_2, setValue_2] = useState("");
  const [lat_1, setLatitude_1] = useState("");
  const [lon_1, setLongitude_1] = useState("");
  const [lat_2, setLatitude_2] = useState("");
  const [lon_2, setLongitude_2] = useState("");
  const [city_1, setCity_1] = useState("");
  const [city_2, setCity_2] = useState("");
  const [address, setAddress] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [trafficDelay, setTrafficDellay] = useState("")
  const mapElement = useRef()
  const [map, setMap] = useState({});
  const [geoJson, setGeoJson] = useState("");
  // var ll = new tt.LngLat(lon_2, lat_2);
  var ll = new tt.LngLat(4.8, 52.3);



  function getData(e) {
    e.preventDefault();
    setValue_1("");
    setCity_1("");
    fetch(`https://api.tomtom.com/search/2/search/${city_1}.json?key=xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D&lat=37.8085&lon=-122.4239`).then((result) => {
      result.json().then((resp) => {
        // setCity_1(resp);
        console.log(resp.results[0].position);
        setLatitude_1(resp.results[0].position.lat)
        setLongitude_1(resp.results[0].position.lon)


        setValue_2("");
        setCity_2("");
        fetch(`https://api.tomtom.com/search/2/search/${city_2}.json?key=xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D&lat=37.8085&lon=-122.4239`).then((result) => {
          result.json().then((res) => {
            // setCity(resp);
            console.log(res.results[0].position);
            setLatitude_2(res.results[0].position.lat)
            setLongitude_2(res.results[0].position.lon)

            let map = tt.map({

              key: "xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D",
              container: mapElement.current,
              style: {
                map: 'basic_main',
                trafficIncidents: 'incidents_day',
              },
              zoom: 15,
              // center: [resp.results[0].position.lon, resp.results[0].position.lat],
              center: ll,
              pitch: 25,
            })
            
            map.flyTo({
              center: [resp.results[0].position.lon, resp.results[0].position.lat],
            })
            // map.addLayer({
            //   id: 'route',
            //   type: 'line',
            //   source: {
            //     type: 'geoJson',
            //     data: GeoJSON
            //   },
            //   paint: {
            //     'line-color': '#4a90e2',
            //     'line-width': 6
          
            //   }
            // })

            // const drawRoute = (GeoJSON, map) => {
            //   if (map.getLayer('route')) {
            //     map.removeLayer('route')
            //     map.removeSource('route')
            //   }
            //   map.addLayer({
            //     id: 'route',
            //     type: 'line',
            //     source: {
            //       type: 'geoJson',
            //       data: GeoJSON
            //     },
            //     paint: {
            //       'line-color': '#4a90e2',
            //       'line-width': 6
            
            //     }
            //   })
            // }



            var marker_1 = new tt.Marker()
              .setLngLat([resp.results[0].position.lon, resp.results[0].position.lat])
              .addTo(map);


            var marker_2 = new tt.Marker()
              .setLngLat([res.results[0].position.lon, res.results[0].position.lat])
              .addTo(map);
          })
        })
      })
    })
  }

  // function getMap(e) {
  //   e.preventDefault();
  //   let map = tt.map({

  //     key: "xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D",
  //     container: mapElement.current,
  //     style: {
  //       map: 'basic_main',
  //       trafficIncidents: 'incidents_day',
  //     },
  //     zoom: 13,
  //     center: ll,
  //     pitch: 25,
  //   })
  //   map.flyTo({
  //     center: [lon_1, lat_1],
  //   })
  //   map.addLayer({
  //     id: 'route',
  //     type: 'line',
  //     paint: {
  //       'line-color': '#4a90e2',
  //       'line-width': 6
  //     }
  //   })
  // }

  // var lat1 = String(lat_1)
  // var lon1 = String(lon_1)
  // var lat2 = String(lat_2)
  // var lon2 = String(lon_2)

  // ttapi.services.calculateRoute({
  //   key: "xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D",
  //   locations: `${lat1},${lon1}:${lat2},${lon2}`
  // }).then(function(routeData) {
  //     console.log(routeData.toGeoJson());
  //   });

  // var origins = [
  //   { point: {  lat_1, lon_1} }
  // ];
  // var destinations = [
  //   { point: {  lat_1, lon_1} }
  // ];
  // function callbackFn(routeGeoJson) {
  //   console.log(routeGeoJson);
  // }
  // ttapi.services.matrixRouting({
  //   key: "xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D",
  //   origins: origins,
  //   destinations: destinations,
  //   traffic: true
  // }).then(callbackFn);

  const drawRoute = (geoJson, map) => {
    if (map.getLayer('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    }
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geoJson
      },
      paint: {
        'line-color': '#4a90e2',
        'line-width': 6
  
      }
    })
  }

  function getRoute(e) {
    fetch(`https://api.tomtom.com/routing/1/calculateRoute/${lat_1},${lon_1}:${lat_2},${lon_2}/json?key=xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D`).then((result) => {
      result.json().then((resl) => {
        // setCity(resp);
        console.log(resl);
        // console.log("Total Length : " + resl.routes[0].summary.lengthInMeters/1000 + "KM");
        // console.log("Total traffic Delay : " + resl.routes[0].summary.trafficDelayInSeconds/60 + "minutes");
        // console.log("Total Time : " + resl.routes[0].summary.travelTimeInSeconds/3600 +"hour");
        console.log(resl.routes[0].legs[0].points);
        setGeoJson(resl.routes[0].legs[0].points);
        setTotalDistance(resl.routes[0].summary.lengthInMeters / 1000);
        setTotalTime(resl.routes[0].summary.travelTimeInSeconds / 3600);
        setTrafficDellay(resl.routes[0].summary.trafficDelayInSeconds / 60);
      })
    })
   
  }

  // const drawRoutes = (geoJson,map) => {
  //   if(map.getLayer('route')) {
  //     map.removeLayer('route')
  //     map.removeSource('route')
  //   }
  //   map.addLayer({
  //     id:'route',
  //     type: 'line',
  //     source: {
  //       type: 'geojson',
  //       data: geoJson
  //     },
  //     paint: {
  //       'line-color': '#4a90e2',
  //       'line-width': 6
  //     }
  //   })
  // }

  // const handelOnSubmit =()=>{
  //   if(resl){
  //     getRoute();
  //     drawRoutes();
  //   }
  // // }

  // var origins = [
  //   { point: { latitude: 21.63228, longitude: 85.89566 } },
  //   { point: { latitude: 21.63228, longitude: 85.89566 } }
  // ];
  // var destinations = [
  //   { point: { latitude: 23.3699, longitude: 85.32528 } },
  //   { point: { latitude: 23.3699, longitude: 85.32528 } }
  // ];
  // function callbackFn(routeGeoJson) {
  //   console.log(routeGeoJson);
  // }
  // ttapi.services.matrixRouting({
  //   key: "xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D",
  //   origins: origins,
  //   destinations: destinations,
  //   traffic: true
  // }).then(callbackFn);
  


  return (



    <div className="Apppp">
      <div >
        <div className="App" ref={mapElement}></div>
      </div>
     <div className="container">
     <h1 className="head">Enter Here...</h1>
      <input  className="input" type="text" placeholder="origin" value={city_1} onChange={(e) => { setCity_1(e.target.value) }} />
      <input className="input" type="text" placeholder="destination" value={city_2} onChange={(e) => { setCity_2(e.target.value) }} />
      <button className="btn" onClick={getData}>CLICK</button>
      <button className="btn" onClick={getRoute}>GET ROUTE</button>
      <button className="btn" onClick={drawRoute}>Draw Route</button>
      <br />
      <div className="cord cord-1">
        <h3>Latitude : {lat_1}</h3>
        <h3>Longitude : {lon_1}</h3>

      </div>
      <div className="cord cord-1">
        <h3>Latitude : {lat_2}</h3>
        <h3>Longitude : {lon_2}</h3>
      </div>
      <div className="cord">
        <h3>Total Length (in m) : {totalDistance} KM</h3>
        <h3>Total Time (in s) : {totalTime} hr</h3>
        <h3>Total traffic delay (in s) : {trafficDelay} sec</h3>
      </div>
     </div>
      {/* <div >
        <div className="map" ref={mapElement}></div>
      </div> */}


    </div>
  );
}

export default App;
