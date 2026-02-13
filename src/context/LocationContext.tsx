import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchLocations, type Location } from "../services/locationService";

interface LocationContextType {
  locations: Location[];
  isLoading: boolean;
  error: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLocations() {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (err) {
        setError("Failed to load locations");
      } finally {
        setIsLoading(false);
      }
    }

    loadLocations();
  }, []);

  return (
    <LocationContext.Provider value={{ locations, isLoading, error }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocations() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocations must be used within a LocationProvider");
  }
  return context;
}
