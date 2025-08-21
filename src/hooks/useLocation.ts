import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Location as LocationType } from '@/types/weather';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Location permission denied');
        return false;
      }

      return true;
    } catch (err) {
      setError('Failed to request location permission');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const locationData: LocationType = {
          id: Date.now(), 
          name: reverseGeocode[0].city || 'Unknown City',
          country: reverseGeocode[0].country || 'Unknown Country',
          lat: currentLocation.coords.latitude,
          lon: currentLocation.coords.longitude,
        };

        setLocation(locationData);
        return locationData;
      }

      return null;
    } catch (err) {
      setError('Failed to get current location');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    loading,
    error,
    getCurrentLocation,
    requestLocationPermission,
  };
}; 