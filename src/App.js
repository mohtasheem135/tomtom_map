
import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import { render } from '@testing-library/react'
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import ZoomControls from '@tomtom-international/web-sdk-plugin-zoomcontrols';
import PanControls from '@tomtom-international/web-sdk-plugin-pancontrols';

function App() {

  const [value_1, setValue_1] = useState("");
  const [value_2, setValue_2] = useState("");
  const [lat_1, setLatitude_1] = useState("");
  const [lon_1, setLongitude_1] = useState("");
  const [lat_2, setLatitude_2] = useState("");
  const [lon_2, setLongitude_2] = useState("");
  const [city_1, setCity_1] = useState("");
  const [city_2, setCity_2] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [trafficDelay, setTrafficDellay] = useState("");
  const [cost, setCost] = useState("");
  const mapElement = useRef()
  const [map, setMap] = useState({});
  // var ll = new tt.LngLat(lon_2, lat_2);
  var ll = new tt.LngLat(85.32528, 23.3699);


  useEffect(() => {
    // const ttZoomControls = new ZoomControls({
    //   className: 'my-class-name', // default = ''
    //   animate: false // default = true
    // });
    let map = tt.map({
      key: "xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D",
      container: mapElement.current,
      center: ll,
      zoom: 14
    });
    setMap(map);
    return () => map.remove();
  }, []);

  // map.touchZoomRotate.enable();

  // map.addControl(ttZoomControls, 'top-left');


  // map.flyTo({
  //   center: [resp.results[0].position.lon, resp.results[0].position.lat],
  // })



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

          })
        })
      })
    })
  }


  function route() {

    const ttZoomControls = new ZoomControls({
      className: 'my-class-name', // default = ''
      animate: true // deafult = true
    });
    const ttPanControls = new PanControls({
      className: 'my-class-name', // default = ''
      panOffset: 150 // default = 100
    });

    let map = tt.map({

      key: "xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D",
      container: mapElement.current,
      style: {
        map: 'basic_main',
        trafficIncidents: 'incidents_day',
      },
      zoom: 15,
      center: [lon_1, lat_1],
      center: ll,
      pitch: 25,
    })
    map.flyTo({
      center: [lon_1, lat_1],
    })

    map.addControl(ttZoomControls, 'top-left');
    map.addControl(ttPanControls, 'top-left');

    var marker_1 = new tt.Marker()
      .setLngLat([lon_1, lat_1])
      .addTo(map);



    var marker_2 = new tt.Marker()
      .setLngLat([lon_2, lat_2])
      .addTo(map);

    ttapi.services.calculateRoute({
      key: 'xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D',
      traffic: false,
      locations: `${lon_1},${lat_1}:${lon_2},${lat_2}`,
      'computeTravelTimeFor': 'all'
    })
      .then(function (response) {
        console.log(response)
        console.log(response.toGeoJson)
        var geojson = response.toGeoJson();
        console.log(response.toGeoJson)
        map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': {
            'type': 'geojson',
            'data': geojson
          },
          'paint': {
            'line-color': '#4a90e2',
            'line-width': 8
          }
        });
      });

    fetch(`https://api.tomtom.com/routing/1/calculateRoute/${lat_1},${lon_1}:${lat_2},${lon_2}/json?key=xmGDg3yi0bPcCsg8sb6hIuKqGglCZw4D&routeRepresentation=polyline&computeTravelTimeFor=all`).then((result) => {
      result.json().then((resl) => {

        // console.log(resl);
        console.log("Total Length : " + resl.routes[0].summary.lengthInMeters / 1000 + "KM");
        console.log("Total traffic Delay : " + resl.routes[0].summary.trafficDelayInSeconds / 60 + "minutes");
        console.log("Total Time : " + resl.routes[0].summary.travelTimeInSeconds / 3600 + "hour");

        setTotalDistance((resl.routes[0].summary.lengthInMeters / 1000).toFixed(2));
        setTotalTime((resl.routes[0].summary.travelTimeInSeconds / 3600).toFixed(2));
        setTrafficDellay((resl.routes[0].summary.trafficDelayInSeconds / 60).toFixed(2));
        setCost(((resl.routes[0].summary.lengthInMeters * 40) / 1000).toFixed(2));
      })
    })



  }

  return (



    <div className="Apppp">
      <div >
        <div className="App" ref={mapElement}></div>
      </div>
      <div className="container">
        <h1 className="head">Enter Here...</h1>
        <input className="input" type="text" placeholder="Origin" value={city_1} onChange={(e) => { setCity_1(e.target.value) }} />
        <input className="input" type="text" placeholder="Destination" value={city_2} onChange={(e) => { setCity_2(e.target.value) }} />
        <button className="btn" onClick={getData}>CLICK</button>
        <button className="btn" onClick={route}>ROUTE</button>
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
          <h2>Total Fare Charge -: ₹{cost}</h2>
          <h3>Total Distance -: {totalDistance} KM</h3>
          <h3>Total Time -: {totalTime} hr</h3>
          <h3>Total traffic delay (in s) : {trafficDelay} sec</h3>
        </div>
      </div>


    </div>
  );
}

export default App;
