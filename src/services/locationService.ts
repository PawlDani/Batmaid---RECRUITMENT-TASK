import locationsData from "../data/locations.json";

export interface Location {
  zip: string;
  city: string;
  hideCityName: boolean;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchLocations(): Promise<Location[]> {
  // Simulate network request
  await delay(500);

  // In a real app, this would be: 
  // const response = await fetch('/api/locations');
  // return response.json();

  return locationsData as Location[];
}
