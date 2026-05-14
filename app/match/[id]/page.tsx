


export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const res = await fetch(`https://api.opendota.com/api/matches/${id}`, { cache: 'no-store' });
    const matches = await res.json();
    const isRadiantWin = matches.radiant_win;
    const isDireWin = !matches.radiant_win;
    const direScore = matches.dire_score;
    const radiantScore = matches.radiant_score;

    return (
        <main className="min-h-screen bg-[#0f1214] text-white p-8">

            <h1 className="text-2xl font-bold">Match Details: {id}</h1>
            <h1 className={` ${isRadiantWin && "text-green-500"} ${isDireWin && "text-red-500"} text-xl font-bold mb-4 uppercase tracking-tighter`}>{isRadiantWin && "Radiant Win"} {isDireWin && "Dire Win"}</h1>
            <h2 className={` ${radiantScore && "text-6xl font-bold text-green-500"} ${direScore && "text-6xl font-bold text-red-500"}`}>{radiantScore} - {direScore}</h2>


        </main>
    )

}