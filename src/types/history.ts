export type AtrocityType = 'massacre' | 'expulsion' | 'depopulation' | 'skirmish';

export interface Citation {
  historian: 'Benny Morris' | 'Avi Shlaim' | 'Ilan Pappe' | 'Other';
  book: string;
  pageNumber: number;
  quote: string;
  archiveReference?: string; // e.g., "IDF Archive 123/456"
}

export interface AtrocityEvent {
  id: string;
  name: string;
  type: AtrocityType;
  date: string; // ISO format: "1948-05-15"
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