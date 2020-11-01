// import React from 'react';

import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {

  // const [ orphanages, setOrphanages ] = useState([]);
  const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

  const navigation = useNavigation();

  // console.log(orphanages);

  useEffect(() => {
    api.get('orphanages').then(response => {
       setOrphanages(response.data);
    })
  }, []);

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', {id});    
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');    
  }


  return (<View style={styles.container}>
    {/* <Text>Open up App.tsx to start working on your app!</Text> */}
    {/* <Text>Hello NLW!</Text> */}
    {/* <StatusBar style="auto" /> */}
    <MapView 
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: -27.2092052,
        longitude: -49.6401092,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
     >
       {/* <Marker 
        icon={mapMarker}
        calloutAnchor={{
          x: 2.7,
          y: 0.8,
        }}
        coordinate={{
          latitude: -27.2092052,
          longitude: -49.6401092,
        }}
       >
         {/* <Callout tooltip={true}> */}
         {/* <Callout tooltip onPress={() => {alert('oi')}}> */}
         {/* <Callout tooltip onPress={handleNavigateToOrphanageDetails}> */}
           {/* <Text>Lar das meninas</Text> */}
           {/* <View style={styles.calloutContainer}>
             <Text style={styles.calloutText}>Lar das meninas</Text>
           </View>
         </Callout>
       </Marker> */}

       {orphanages.map(orphanage => {
         return (
          <Marker
          key={orphanage.id}           
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
          }}
          >
           
            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}> 
             
             <View style={styles.calloutContainer}>
        <Text style={styles.calloutText}>{orphanage.name}</Text>
             </View>
           </Callout>
        </Marker>        
         )
       })}

    </MapView> 

    <View style={styles.footer}>
      {/* <Text style={styles.footerText}>2 orfanatos encontrados</Text> */}
      <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

      {/* <TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}}> */}
      {/* <TouchableOpacity style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
        <Feather name="plus" size={20} color="#FFF" />
      </TouchableOpacity> */}

      <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
        <Feather name="plus" size={20} color="#FFF" />
      </RectButton>

    </View>
    
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',

    // elevation: 3,
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'nutito700' ,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold' ,
    color: '#8fa7b3',
  },

  createOrphanageButton: {    
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

  },
});