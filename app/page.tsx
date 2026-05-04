import React from 'react';
import SearchForm from "./components/SearchFort";
import { motion } from "framer-motion"
import MatchCard from "./components/MatchCard";



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

  const [res, resMatches, resHeroes, resWL] = await Promise.all([
    fetch('https://api.opendota.com/api/players/' + id, { cache: 'no-store' }),
    fetch(`https://api.opendota.com/api/players/${id}/recentMatches`, { cache: 'no-store' }),
    fetch(`https://api.opendota.com/api/heroes`, { cache: 'no-store' }),
    fetch(`https://api.opendota.com/api/players/${id}/wl`, { cache: 'no-store' })
  ])
  const PlayerData: PlayerData = await res.json() as PlayerData;
  const matchesData: any = await resMatches.json();
  const heroesData: any = await resHeroes.json();
  const wlDATA: WLDOTA = await resWL.json() as WLDOTA;
  const rankIcon = Math.floor(PlayerData.rank_tier / 10);
  const rankMedal = (PlayerData.rank_tier % 10);
  const winrate = ((wlDATA.win / (wlDATA.win + wlDATA.lose)) * 100).toFixed(2);
  const accountId = id;
  if (!PlayerData.profile) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-[#0f1214] text-[#d6d8db] p-8">
        <SearchForm />
        <p className="text-red-500">Private account!</p>
      </main>
    );
  }
  if (wlDATA.win === 0 && wlDATA.lose === 0) return (
    <main className="flex min-h-screen flex-col items-center bg-[#0f1214] text-[#d6d8db] p-8">
      <SearchForm />
      <p className="text-red-500">Private account!</p>
    </main>
  )


  return (
    <main className="flex bg-gradient-to-b from-gray-800 to-black-900 min-h-screen flex-col items-center bg-[#0f1214] text-[#d6d8db] p-8">
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
                  <div className="relative w-24 h-24">
                    <img
                      src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${rankIcon}.png`}
                      className="w-full h-full absolute top-0 left-0"
                      alt="rank"
                    />
                    {rankMedal > 0 && rankIcon < 8 && (
                      <img
                        src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${rankMedal}.png`}
                        className="w-full h-full absolute top-0 left-0 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        alt="stars"
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>)}
          {matchesData.map((matches: any, index: number) => {
            const isRadiant = matches.player_slot < 128;
            const isWin = isRadiant === matches.radiant_win;
            const hero = heroesData.find((hero: any) => hero.id === matches.hero_id);

            return (
              <MatchCard
                key={index}
                matches={matches}
                hero={hero}
                isWin={isWin}
                index={index}
              />
            );
          })}

        </div>
      )}
    </main>
  )
}