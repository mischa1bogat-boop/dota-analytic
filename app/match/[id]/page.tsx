import MatchGraph from "@/app/components/MatchGraph";
import Link from 'next/link';


const getLaneName = (laneRole: number, isRoaming: boolean | null) => {
    switch (laneRole) {
        case 1: return "Safe Lane";
        case 2: return "Mid Lane";
        case 3: return "Offlane";
        case 4: return "Soft Support";
        case 5: return "Hard Support";
        default: return "Unknown Lane";
    }
};

export default async function MatchPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ player?: string }> }) {
    
    const { player } = await searchParams; 
    const { id } = await params;
    const res = await fetch(`https://api.opendota.com/api/matches/${id}`, { cache: 'no-store' });
    const matches = await res.json();
    const resHeroes = await fetch('https://api.opendota.com/api/heroes', { cache: 'no-store' });
    const heroesData = await resHeroes.json();
    const resItems = await fetch('https://api.opendota.com/api/constants/items', { cache: 'no-store' });
    const itemsData = await resItems.json();
    const isRadiantWin = matches.radiant_win;
    const isDireWin = !matches.radiant_win;
    const direScore = matches.dire_score;
    const radiantScore = matches.radiant_score;
    const radiantPlayers = matches.players.filter((p: any) => p.player_slot < 128);
    const direPlayers = matches.players.filter((p: any) => p.player_slot >= 128);

    

    return (
        
        <main className="flex bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex-col items-center p-8 text-white">
            <Link href={player ? `/?id=${player}` : "/"}  className="self-start bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded mb-4 transition-all">
                ← Назад
            </Link>
            <h1 className="text-2xl font-bold">Match Details: {id}</h1>
            <div className={` ${isRadiantWin && "text-green-500"} ${isDireWin && "text-red-500"} text-5xl font-bold justify-center items-center text-center mb-4 uppercase tracking-tighter`}>{isRadiantWin && "Radiant Win"} {isDireWin && "Dire Win"}</div>
            <h2 className={` ${radiantScore && "text-6xl flex justify-center items-center text-center font-bold text-green-500"} ${direScore && "text-6xl flex justify-center items-center text-center font-bold text-red-500"}`}>{radiantScore} - {direScore}</h2>
            <div className="w-full max-w-6xl bg-green-900/30 text-green-400 font-bold p-3 mb-2 mt-4 rounded border border-green-800">
                RADIANT
            </div>
            {radiantPlayers.map((player: any) => {
                const hero = heroesData.find((h: any) => h.id === player.hero_id);
                const heroName = hero?.name?.replace("npc_dota_hero_", "");
                const item0 = Object.values(itemsData).find((item: any) => item.id === player.item_0) as any;
                const item1 = Object.values(itemsData).find((item: any) => item.id === player.item_1) as any;
                const item2 = Object.values(itemsData).find((item: any) => item.id === player.item_2) as any;
                const item3 = Object.values(itemsData).find((item: any) => item.id === player.item_3) as any;
                const item4 = Object.values(itemsData).find((item: any) => item.id === player.item_4) as any;
                const item5 = Object.values(itemsData).find((item: any) => item.id === player.item_5) as any;

                return (
                    <div key={player.player_slot} className="flex items-center w-full max-w-6xl bg-[#1c242d]/50 mb-1 p-2 rounded hover:bg-[#252e38] transition-all group">
                        <div className="relative w-16 h-10 flex-shrink-0">
                            <img
                                src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`}
                                className="w-full h-full object-cover rounded shadow-md border border-gray-700"
                                alt="hero"
                            />
                            <span className="absolute -top-2 -left-2 bg-black border border-yellow-500 text-[10px] px-1 rounded font-bold text-yellow-500">
                                {player.level}
                            </span>
                        </div>
                        <div className="flex flex-col ml-4 w-48">
                            <span className="font-bold text-sm text-blue-400 truncate group-hover:text-blue-300">
                                {player.personaname || "Anonymous"}
                            </span>
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                                {getLaneName(player.lane_role, player.is_roaming)}
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-6 flex-1 px-4">
                            <div className="w-8 text-center text-lg font-black">{player.kills}</div>
                            <div className="w-8 text-center text-lg font-black text-red-500">{player.deaths}</div>
                            <div className="w-8 text-center text-lg font-black text-gray-400">{player.assists}</div>
                        </div>
                        <div className="w-32 flex flex-col items-end px-4">
                            <span className="text-yellow-500 font-bold text-sm">{player.gold_per_min?.toLocaleString()}</span>
                            <span className="text-[10px] text-gray-500 italic">GPM</span>
                        </div>
                        <div className="w-64 flex justify-end gap-1">
                            {item0 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item0.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 0" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item1 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item1.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 1" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item2 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item2.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 2" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item3 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item3.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 3" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item4 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item4.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 4" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item5 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item5.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 5" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                        </div>
                    </div>
                );
            })}

            <div className="w-full max-w-6xl bg-red-900/30 text-red-400 font-bold p-3 mb-2 mt-4 rounded border border-red-800">
                DIRE
            </div>
            {direPlayers.map((player: any) => {
                const hero = heroesData.find((h: any) => h.id === player.hero_id);
                const heroName = hero?.name?.replace("npc_dota_hero_", "");
                const item0 = Object.values(itemsData).find((item: any) => item.id === player.item_0) as any;
                const item1 = Object.values(itemsData).find((item: any) => item.id === player.item_1) as any;
                const item2 = Object.values(itemsData).find((item: any) => item.id === player.item_2) as any;
                const item3 = Object.values(itemsData).find((item: any) => item.id === player.item_3) as any;
                const item4 = Object.values(itemsData).find((item: any) => item.id === player.item_4) as any;
                const item5 = Object.values(itemsData).find((item: any) => item.id === player.item_5) as any;
                return (
                    <div key={player.player_slot} className="flex items-center w-full max-w-6xl bg-[#1c242d]/50 mb-1 p-2 rounded hover:bg-[#252e38] transition-all group">
                        <div className="relative w-16 h-10 flex-shrink-0">
                            <img
                                src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`}
                                className="w-full h-full object-cover rounded shadow-md border border-gray-700"
                                alt="hero"
                            />
                            <span className="absolute -top-2 -left-2 bg-black border border-yellow-500 text-[10px] px-1 rounded font-bold text-yellow-500">
                                {player.level}
                            </span>
                        </div>
                        <div className="flex flex-col ml-4 w-48">
                            <span className="font-bold text-sm text-blue-400 truncate group-hover:text-blue-300">
                                {player.personaname || "Anonymous"}
                            </span>
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                                {getLaneName(player.lane_role, player.is_roaming)}
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-6 flex-1 px-4">
                            <div className="w-8 text-center text-lg font-black">{player.kills}</div>
                            <div className="w-8 text-center text-lg font-black text-red-500">{player.deaths}</div>
                            <div className="w-8 text-center text-lg font-black text-gray-400">{player.assists}</div>
                        </div>
                        <div className="w-32 flex flex-col items-end px-4">
                            <span className="text-yellow-500 font-bold text-sm">{player.gold_per_min?.toLocaleString()}</span>
                            <span className="text-[10px] text-gray-500 italic">GPM</span>
                        </div>
                        <div className="w-64 flex justify-end gap-1">
                            {item0 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item0.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 0" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item1 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item1.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 1" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item2 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item2.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 2" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item3 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item3.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 3" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item4 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item4.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 4" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                            {item5 ? (
                                <img src={`https://cdn.cloudflare.steamstatic.com${item5.img}`} className="w-8 h-6 object-cover rounded shadow-md" alt="item 5" />
                            ) : (
                                <div className="w-8 h-6 bg-gray-800/50 rounded"></div>
                            )}
                        </div>
                    </div>
                );
            })}
            <MatchGraph gold={matches.radiant_gold_adv} />



        </main>
    )

}