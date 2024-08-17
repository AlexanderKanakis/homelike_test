import { Apartment } from "../models/apartment.model";
import { Geolocation } from "../types/geolocation";

export function calculateDistance(g1: Geolocation, g2: Geolocation): number {
    const dLat = (g2.lat - g1.lat) * Math.PI / 180;
    const dLon = (g2.lon - g1.lon) * Math.PI / 180;
    const lat1 = (g1.lat) * Math.PI / 180;
    const lat2 = (g2.lon) * Math.PI / 180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const r = 6371;
    const d = r * c;
    return d;
};

export function getSortedApartmentsInDistance(apartments: Apartment[], userLocation: Geolocation, distance: Number): Apartment[] {
    return apartments.map((apartment) => {
        return { ...apartment, distance: calculateDistance(userLocation, apartment.geolocation) }
    })
    .filter((apartment) => apartment.distance <= distance)
    .sort((a, b) => a.distance - b.distance)
}