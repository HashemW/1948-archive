import type { AtrocityEvent } from '../types/history';

export const archiveData: AtrocityEvent[] = [
  {
    id: "deir-yassin",
    name: "Deir Yassin",
    type: "massacre",
    perpetrator: "israeli", // ADDED
    date: "1948-04-09",
    coordinates: { lng: 35.178, lat: 31.786 },
    description: "Right-wing Irgun and Lehi paramilitaries attacked the village, resulting in widespread civilian casualties. The event became a massive psychological catalyst for the Palestinian exodus.",
    fatalities: 110,
    citations: [
      {
        historian: "Benny Morris",
        book: "1948: A History of the First Arab-Israeli War",
        pageNumber: 126,
        quote: "The attackers killed some 100-110 Palestinians, including women and children... The massacre was heavily publicized by both sides."
      }
    ]
  },
  {
    id: "hadassah-convoy",
    name: "Hadassah Medical Convoy",
    type: "massacre",
    perpetrator: "arab", // ADDED NEW ARAB DATA POINT
    date: "1948-04-13",
    coordinates: { lng: 35.234, lat: 31.796 }, // Mount Scopus road
    description: "Arab forces ambushed a convoy of Jewish doctors, nurses, and medical students traveling to Hadassah Hospital on Mount Scopus.",
    fatalities: 78,
    citations: [
      {
        historian: "Benny Morris",
        book: "1948: A History of the First Arab-Israeli War",
        pageNumber: 128,
        quote: "The ambushers poured fire into the trapped vehicles... The British army, stationed nearby, failed to intervene for hours."
      }
    ]
  },
  {
    id: "lydda-march",
    name: "Lydda (Lod)",
    type: "expulsion",
    perpetrator: "israeli", // ADDED
    date: "1948-07-13",
    coordinates: { lng: 34.895, lat: 31.949 },
    description: "Following the capture of the city during Operation Dani, the IDF expelled tens of thousands of residents eastward on foot.",
    citations: [
      {
        historian: "Benny Morris",
        book: "The Birth of the Palestinian Refugee Problem Revisited",
        pageNumber: 428,
        quote: "The orders were clear: 'The inhabitants of Lydda must be expelled quickly without attention to age...'"
      }
    ]
  }
];