import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { mobileCallLocation } from 'services/mobileService';
import { selectLocation } from 'store/location.slice';
import { lsGetItem } from 'utils/helpers/storage';

interface IUserLocation {
  latitude: number | undefined;
  longitude: number | undefined;
}

export const useGetUserLocation = () => {
  const isMobileApp = lsGetItem('isMobileApp');
  const { currentLocation } = useSelector(selectLocation);
  const [userLocation, setUserLocation] = useState<IUserLocation>({
    latitude: undefined,
    longitude: undefined,
  });

  const success = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation({
      latitude,
      longitude,
    });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  };

  const error = () => {
    console.log('Unable to retrieve your location');
  };

  useEffect(() => {
    if (!isMobileApp && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else if (isMobileApp) {
      mobileCallLocation();
    } else {
      console.log('Geolocation not supported');
    }
  }, []);

  useEffect(() => {
    if (isMobileApp && currentLocation) {
      setUserLocation({
        latitude: currentLocation.x,
        longitude: currentLocation.y,
      });
    }
  }, [currentLocation]);

  return userLocation;
};
