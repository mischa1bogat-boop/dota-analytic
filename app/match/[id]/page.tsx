


export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const res = await fetch(`https://api.opendota.com/api/matches/${id}`, { cache: 'no-store' });
    const matches = await res.json();
    const resHeroes = await fetch('https://api.opendota.com/api/heroes', { cache: 'no-store' });
    const heroesData = await resHeroes.json();
    const isRadiantWin = matches.radiant_win;
    const isDireWin = !matches.radiant_win;
    const direScore = matches.dire_score;
    const radiantScore = matches.radiant_score;
    const radiantPlayers = matches.players.filter((p: any) => p.player_slot < 128);
    const direPlayers = matches.players.filter((p: any) => p.player_slot >= 128);



    return (
        <main className="flex bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex-col items-center p-8 text-white">

            <h1 className="text-2xl font-bold">Match Details: {id}</h1>
            <div className={` ${isRadiantWin && "text-green-500"} ${isDireWin && "text-red-500"} text-5xl font-bold justify-center items-center text-center mb-4 uppercase tracking-tighter`}>{isRadiantWin && "Radiant Win"} {isDireWin && "Dire Win"}</div>
            <h2 className={` ${radiantScore && "text-6xl flex justify-center items-center text-center font-bold text-green-500"} ${direScore && "text-6xl flex justify-center items-center text-center font-bold text-red-500"}`}>{radiantScore} - {direScore}</h2>
            <div className="w-full h-full flex text-green" >Radiant</div>
            {radiantPlayers.map((player: any) => {
                const hero = heroesData.find((h: any) => h.id === player.hero_id);
                const heroName = hero?.name?.replace("npc_dota_hero_", "");
                return (
                    <div key={player.player_slot} className="flex items-center gap-4 p-2">
                        <img
                            src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`}
                            className="w-16 h-auto rounded"
                            alt="hero"
                        />
                        <p className="font-bold">{player.personaname || "Anonymous"}</p>
                        <p className="text-gray-400">{player.kills} / {player.deaths} / {player.assists}</p>
                    </div>
                );
            })}

            <div className="w-full h-full flex text-red " >Dire</div>
            {direPlayers.map((player: any) => {
                const hero = heroesData.find((h: any) => h.id === player.hero_id);
                const heroName = hero?.name?.replace("npc_dota_hero_", "");
                return (
                    <div key={player.player_slot} className="flex items-center gap-4 p-2">
                        <img
                            src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`}
                            className="w-16 h-auto rounded"
                            alt="hero"
                        />
                        <p className="font-bold">{player.personaname || "Anonymous"}</p>
                        <p className="text-gray-400">{player.kills} / {player.deaths} / {player.assists}</p>
                    </div>
                );
            })}



        </main>
    )

}