import React from 'react';
import SearchForm from "./components/SearchFort";


interface PlayerData {
  profile: {
    avatarfull: string;
    personaname: string;
    rank_tier: string;
  };
}

interface WLDOTA {
  win: number;
  lose: number;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ id?: string }> }) {

  const { id } = await searchParams;
  if (!id) return (
    <main className="flex min-h-screen flex-col items-center bg-[#0f1214] text-[#d6d8db] p-8">
      <SearchForm />
      <p>Enter your Steam ID</p>
    </main>
  )
  const resMatches = await fetch(`https://api.opendota.com/api/players/${id}/recentMatches`, { cache: 'no-store' });
  const res = await fetch('https://api.opendota.com/api/players/' + id, { cache: 'no-store' });
  const resWL = await fetch(`https://api.opendota.com/api/players/${id}/wl`, { cache: 'no-store' });
  const matchesData: any = await resMatches.json();
  const accountId = id;
  const wlDATA: WLDOTA = await resWL.json() as WLDOTA;
  const winrate = ((wlDATA.win / (wlDATA.win + wlDATA.lose)) * 100).toFixed(2);
  const PlayerData: PlayerData = await res.json() as PlayerData;

  const Private = (!PlayerData.profile) ? (<div className='text-red-500'>
    <p>Account private</p>
  </div>) : null;






  return (
    <main className="flex min-h-screen flex-col items-center bg-[#0f1214] text-[#d6d8db] p-8">
      <SearchForm />
      {id && (
        <div className="w-full max-w-5xl mt-10 animate-in fade-in duration-500">
          {PlayerData.profile && (
            <section className="flex items-center gap-6 bg-[#1c242d] p-6 rounded-t-lg border-b-4 border-blue-500">
              <img
                src={PlayerData.profile.avatarfull}
                className="w-32 h-32 rounded-lg border-2 border-[#333f48]"
                alt="avatar"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-white">{PlayerData.profile.personaname}</h1>
                <div className="flex gap-4">
                  <p className="text-green-500 font-bold">Wins: {wlDATA.win}</p>
                  <p className="text-red-500 font-bold">Losses: {wlDATA.lose}</p>
                  <p className="text-blue-400">Winrate: {winrate}%</p>
                </div>
                <div className="flex gap-4 text-sm uppercase tracking-widest font-bold">
                  <span className="text-gray-400">Rank Tier:</span>
                  <span className="text-blue-400">{PlayerData.rank_tier || "Unranked"}</span>
                </div>
              </div>
            </section>)}
          {matchesData.map((matches: any, index: number) => (
            <div key={index} className={`w-full max-w-5xl mt-10 animate-in fade-in duration-500 ${matches.radiant_win ? 'bg-green-600' : 'bg-red-600'
              }`}>
              <p>{matches.radiant_win}</p>
              <p>{matches.dire_win}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}