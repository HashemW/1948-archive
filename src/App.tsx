import { useState } from 'react';
import { MapShell } from './components/MapShell';
import { archiveData } from './data/events';

function App() {
  // 1. The memory state: null means nothing is selected, otherwise it holds the string ID
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // 2. Find the full event object in our clean TypeScript data array using the ID
  const selectedEvent = archiveData.find(event => event.id === selectedEventId);

  return (
    <main className="flex h-screen w-screen bg-black overflow-hidden m-0 p-0">
      
      {/* SIDEBAR */}
      <section className="w-96 h-full bg-[#0a0a0a] border-r border-slate-800 flex flex-col z-10 flex-none m-0">
        <div className="p-6 shrink-0">
          <h1 className="text-xl font-bold tracking-tighter text-white uppercase italic">1948 Archive</h1>
          <p className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-widest">Digital Mapping Project</p>
          <hr className="my-6 border-slate-800" />
        </div>

        {/* DYNAMIC CONTENT AREA */}
        <div className="px-6 flex-1 overflow-y-auto pb-6">
          {!selectedEvent ? (
            // The "Waiting" State
            <div className="text-sm text-slate-500 italic font-mono">
              [SYSTEM AWAITING INPUT] <br/><br/>
              Select a secure node on the map to view verified citations from New Historian archives.
            </div>
          ) : (
            // The "Data Render" State
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header Info */}
              <div>
                <div className="text-xs text-[#ff003c] font-bold uppercase tracking-widest mb-1 font-mono">
                  CLASSIFICATION: {selectedEvent.type}
                </div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  {selectedEvent.name}
                </h2>
                <div className="text-sm text-slate-400 mt-2 font-mono">
                  DATE: {selectedEvent.date}
                </div>
                {selectedEvent.fatalities && (
                  <div className="text-sm text-slate-400 font-mono">
                    CASUALTIES: {selectedEvent.fatalities}
                  </div>
                )}
              </div>

              {/* Historical Description */}
              <div className="text-sm text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-4 bg-slate-900/20 p-3">
                {selectedEvent.description}
              </div>

              {/* Verified Citations */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3 border-b border-slate-800 pb-2 font-mono">
                  Verified Citations
                </h3>
                <div className="space-y-4">
                  {selectedEvent.citations.map((cite, idx) => (
                    <div key={idx} className="bg-[#111] border border-slate-800 p-4 rounded-sm">
                      <div className="text-xs text-slate-400 mb-3 font-mono border-b border-slate-800/50 pb-2">
                        <span className="text-white font-bold">{cite.historian}</span> <br/>
                        <span className="italic text-slate-500">{cite.book}</span>, p. {cite.pageNumber}
                      </div>
                      <blockquote className="text-sm italic text-slate-300 font-serif">
                        "{cite.quote}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* MAP INTERFACE */}
      <section className="flex-1 h-full relative m-0 p-0">
        {/* We pass the state-updating function down into the map component */}
        <MapShell onEventClick={setSelectedEventId} />
      </section>

    </main>
  );
}

export default App;