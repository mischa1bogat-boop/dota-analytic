import React from 'react';
import SearchForm from "./components/SearchFort";
import { motion } from "framer-motion"
import MatchCard from "./components/MatchCard";
import HeroCard from "./components/Hero";



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
  const { id, tab } = await searchParams;
  if (!id) return (
    <main className="flex min-h-screen flex-col items-center bg-[#0f1214] text-[#d6d8db] p-8">
      <SearchForm />
      <p>Enter your Steam ID</p>
    </main>
  )

  const [res, resMatches, resHeroes, resWL, resPlayerHeroes, resHeroesStats] = await Promise.all([
    fetch('https://api.opendota.com/api/players/' + id, { cache: 'no-store' }),
    fetch(`https://api.opendota.com/api/players/${id}/recentMatches`, { cache: 'no-store' }),
    fetch(`https://api.opendota.com/api/heroes`, { cache: 'no-store' }),
    fetch(`https://api.opendota.com/api/players/${id}/wl`, { cache: 'no-store' }),
    fetch(`https://api.opendota.com/api/players/${id}/heroes`, { cache: 'no-store' }),
    fetch(`https://api.opendota.com/api/players/${id}/heroStats`, { cache: 'no-store' })
  ])
  const PlayerData: PlayerData = await res.json() as PlayerData;
  console.log("PLAYER DATA:", PlayerData);

  const matchesData: any = await resMatches.json();
  const heroesData: any = await resHeroes.json();
  const wlDATA: WLDOTA = await resWL.json() as WLDOTA;
  const heroesStats: any = await resHeroesStats.json();
  const playerHeroesData: any = await resPlayerHeroes.json();
  const rankIcon = Math.floor(PlayerData.rank_tier / 10);
  const rankMedal = (PlayerData.rank_tier % 10);

  const accountId = id;

  if (PlayerData.error === 'daily api limit exceeded') {
    return (
      <main className="flex min-h-screen flex-col items-center bg-[#0f1214] text-[#d6d8db] p-8">
        <SearchForm />
        <p className="text-yellow-500 font-bold">API Limit Exceeded! OpenDota is tired. Please wait a bit.</p>
      </main>
    );
  }

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
  const totalGames = wlDATA.win + wlDATA.lose;
  const winrate = totalGames > 0
    ? ((wlDATA.win / totalGames) * 100).toFixed(2)
    : "0";
  const heroesArray = Array.isArray(playerHeroesData) ? playerHeroesData : [];
  const topHeroes = heroesArray.sort((a: any, b: any) => b.games - a.games).slice(0, 10);

  return (
    <main className="flex bg-gradient-to-b from-gray-800 to-black-900 min-h-screen flex-col items-center bg-[#0f1214] text-[#d6d8db] p-8">
      <SearchForm />
      {id && (
        <div className="w-full max-w-5xl mt-10 animate-in fade-in duration-500">
          {PlayerData.profile && (
            <section className="flex items-center gap-6 bg-[#1c242d] p-6 rounded-t-lg border-b-4 border-[#1c242d]">
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
          <div className="bg-gradient-to-b from-gray-800 to-blue-800 p-1 rounded-b-lg">
            <nav className="flex gap-8 w-full max-w-5xl mt-4 border-b border-gray-800 pb-2">
              <a href={`/?id=${id}&tab=matches`} className={`uppercase font-bold text-sm ${!tab || tab === 'matches' ? 'text-gray-900 border-b-2 border-blue-500' : 'text-blue-400'}`}>Matches</a>
              <a href={`/?id=${id}&tab=heroes`} className={`uppercase font-bold text-sm ${tab === 'heroes' ? 'text-gray-900 border-b-2 border-blue-500' : 'text-blue-400'}`}>Heroes</a>
            </nav>
          </div>
          {(!tab || tab === 'matches') &&
            matchesData.map((matches: any, index: number) => {
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
          {tab === 'heroes' && (
            <div className="flex flex-col w-full bg-[#1c242d] rounded-lg overflow-hidden">
              <div className="flex p-4 bg-[#11161d] text-gray-400 text-sm font-bold uppercase">
                <span className="flex-1">Hero (top 10)</span>
                <span className="w-24 text-center">Matches</span>
                <span className="w-24 text-center">Winrate</span>
              </div>
              {topHeroes.map((hero: any, index: number) => {
                const heroInfo = heroesData.find((h: any) => h.id === hero.hero_id);
                const wr = ((hero.win / hero.games) * 100).toFixed(2);
                return (
                  <HeroCard
                    key={index}
                    hero={heroInfo}
                    matches={hero}
                    index={index}
                  />
                );
              })}
            </div>


          )}

        </div>
      )}

    </main>
  )
}