// Add this to your existing types/history.ts
export type AtrocityType = 'massacre' | 'expulsion' | 'depopulation' | 'skirmish';

export interface Citation {
  historian: string;
  book: string;
  pageNumber: number;
  quote: string;
}

export interface AtrocityEvent {
  id: string;
  name: string;
  type: AtrocityType;
  perpetrator: 'israeli' | 'arab' | 'other'; // NEW STRICT FIELD
  date: string;
  coordinates: {
    lng: number;
    lat: number;
  };
  description: string;
  fatalities?: number;
  citations: Citation[];
}

export interface MapData {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
    properties: AtrocityEvent;
  }>;
}