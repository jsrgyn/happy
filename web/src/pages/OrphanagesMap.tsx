// import React from 'react';
import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { FiPlus } from 'react-icons/fi';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

// import { Map, TileLayer } from 'react-leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

// import Leaflet, { popup } from 'leaflet';

// import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapsIcon';

import '../styles/pages/orphanages-map.css';
import api from '../services/api';
import { setFlagsFromString } from 'v8';

// const mapIcon = Leaflet.icon({
//   iconUrl: mapMarkerImg,

//   iconSize: [58, 68],
//   iconAnchor: [29, 68],

//   popupAnchor: [170, 2]
// })

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}


function OrphanagesMap() {
   
  // const [orphanages, setOrphanages] = useState([]);
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  console.log('Render: ', orphanages);

  useEffect(() => {
    api.get('orphanages').then(response => {
      console.log(response);
      console.log(response.data);

      setOrphanages(response.data);
    });    
  }, []);

  return (
    // <h1>Hello World</h1>
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Rio do Sul</strong>
          <span>Santa Catarina</span>          
        </footer>
      </aside>

      {/* <div></div> */}
      <Map
        center={[-27.2092052,-49.6401092]}
        zoom={15}
        style={{width: '100%', height: '100%'}}
      >

        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} /> */}

        {/* <Marker
          icon={mapIcon}  
          position={[-27.2092052,-49.6401092]}
        >
          <Popup 
            closeButton={false}
            minWidth={240}
            maxHeight={240}
            className="map-popup"
          >
            Lar das meninas

            <Link to="/orphanages/1">
              <FiArrowRight size={20} color="#FFF"/>
            </Link>
          </Popup>
        </Marker> */}

        {orphanages.map(orphanage => {
          return (
            <Marker
            key={orphanage.id}
            icon={mapIcon}  
            // position={[-27.2092052,-49.6401092]}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup 
              closeButton={false}
              minWidth={240}
              maxHeight={240}
              className="map-popup"
            >
              {/* Lar das meninas */}
              {orphanage.name}

              {/* <Link to="/orphanages/1"> */}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF"/>
              </Link>
            </Popup>
          </Marker>
          )
        })}

      </Map>


      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>

  )
}

export default OrphanagesMap;