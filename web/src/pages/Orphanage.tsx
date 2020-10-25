import React, { useEffect, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
// import { useHistory } from 'react-router-dom';
// import L from 'leaflet';

// import mapMarkerImg from '../images/map-marker.svg';

import { useParams } from 'react-router-dom';

import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapsIcon";
import api from "../services/api";

// const happyMapIcon = L.icon({
//   iconUrl: mapMarkerImg,

//   iconSize: [58, 68],
//   iconAnchor: [29, 68],
//   popupAnchor: [0, -60]
// })

interface Orphanage { 
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id : string;
}

export default function Orphanage() {
  // const { goBack } = useHistory();

  const params = useParams<OrphanageParams>();

  const [orphanage, setOrphanage] = useState<Orphanage>();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data);
    });    
  }, [params.id]);

  return (
    <div id="page-orphanage">
      {/* <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside> */}

      <Sidebar />

      <main>
        <div className="orphanage-details">
          {/* <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" /> */}
          {/* <img src={orphanage?.images[0].url} alt={orphanage?.name} /> */}
          <img src={orphanage?.images[activeImageIndex].url} alt={orphanage?.name} />

          <div className="images">            
            {/* <button className="active" type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button> */}
            {orphanage?.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  // className="active" 
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >                   
                  <img src={image.url} alt={orphanage.name} />
                </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            {/* <h1>Lar das meninas</h1> */}
            <h1>{orphanage?.name}</h1>
            {/* <p>Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.</p> */}
            <p>
              {/* {orphanage?.description} */}
              {orphanage?.about}
            </p>

            <div className="map-container">
              <Map 
                // center={[-27.2092052,-49.6401092]} 
                center={[orphanage?.latitude || 0, orphanage?.longitude || 0]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                {/* <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} /> */}
                {/* <Marker interactive={false} icon={mapIcon} position={[-27.2092052,-49.6401092]} /> */}
                <Marker interactive={false} icon={mapIcon} position={[orphanage?.latitude || 0, orphanage?.longitude || 0]} />
              </Map>

              <footer>
                {/* <a href="">Ver rotas no Google Maps</a> */}
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            {/* <h2>Instruções para visita</h2> */}
            <h2>{orphanage?.instructions}</h2>
            <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {/* 8h às 18h */}
                {orphanage?.opening_hours}
              </div>
              {/* <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div> */}

              { orphanage?.open_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              ) : (
                <div className="open-on-weekends dont-open">
                <FiInfo size={32} color="#FF669D" />
                Não atendemos <br />
                fim de semana
              </div>

              ) }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}