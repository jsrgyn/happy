import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
// import L from 'leaflet';
// import { useHistory } from "react-router-dom";

// import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

// import mapMarkerImg from '../images/map-marker.svg';

import Sidebar from "../components/Sidebar";

import mapIcon from "../utils/mapsIcon";
import api from "../services/api";

import '../styles/pages/create-orphanage.css';
import { useHistory } from "react-router-dom";

// const happyMapIcon = L.icon({
//   iconUrl: mapMarkerImg,

//   iconSize: [58, 68],
//   iconAnchor: [29, 68],
//   popupAnchor: [0, -60]
// })

export default function CreateOrphanage() {
  // const { goBack } = useHistory();

  const history = useHistory();

  const [position, setPosition ] = useState({ latitude: 0, longitude: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  

  // function handleMapClick(event : any) {
  function handleMapClick(event : LeafletMouseEvent) {
    console.log(event);
    console.log(event.latlng);

    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function handleSelectImages(event : ChangeEvent<HTMLInputElement>) {
    console.log(event);
    console.log(event.target.files);

    if (!event.target.files) {
      return
    }

    // setImages(Array.from(event.target.files));

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    console.log({
      name,
      about,
      latitude,
      longitude,
      instructions,      
      opening_hours,
      open_on_weekends,
      images,
    })

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app')

  }

  return (
    <div id="page-create-orphanage">
      < Sidebar />
      {/* <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside> */}

      <main>
        {/* <form className="create-orphanage-form"> */}
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                // url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              />

              {/* <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} /> */}
              {/* <Marker interactive={false} icon={mapIcon} position={[-27.2092052,-49.6401092]} /> */}

              {/* { position.latitude !== 0 
                ? <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
                : null
              } */}

              { position.latitude !== 0 && (
                 <Marker 
                   interactive={false} 
                   icon={mapIcon} 
                   position={[
                      position.latitude, 
                      position.longitude
                  ]} 
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              {/* <div className="uploaded-image">

              </div> */}

              <div className="images-container">
                {/* <button type="button" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </button> */}

                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

                <input multiple onChange={handleSelectImages} type="file" id="image[]" />

              {/* <button type="button" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button> */}
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                {/* <button type="button" className="active">Sim</button>
                <button type="button">Não</button> */}
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>

              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
