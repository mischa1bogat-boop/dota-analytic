import React from 'react';
import SearchForm from "./components/SearchFort";


export default async function Home({ searchParams }: { searchParams: Promise<{ id?: string }> }) {

const { id } = await searchParams;
const accountId = id; 
  const res = await fetch('https://api.opendota.com/api/players/' + id, { cache: 'no-store' });
interface PlayerData {
  profile: {
    avatarfull: string;
    personaname: string;
    rank_tier: string;
  };
}

const PlayerData: PlayerData = await res.json() as PlayerData;

  return (
    <div className="flex min-h-screen flex-col items-center p-12 bg-slate-900 text-white font-sans">
      <SearchForm />
      <h1 className="text-4xl font-bold mb-4">Dota 2 Player Profile</h1>
      {PlayerData.profile && (
        <>
        <img 
        src={PlayerData.profile.avatarfull} alt="Player Avatar" className="rounded-full border-4 border-slate-700"/>
        <h2 className="text-2xl mb-2">{PlayerData.profile.personaname}</h2>
        <p className="text-lg">Rank: {PlayerData.profile.rank_tier}</p>
        </>
      )}
    </div>
  )
}