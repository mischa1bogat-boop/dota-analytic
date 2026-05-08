'use client'
import { motion } from "framer-motion"

export default function HeroCard({ hero, matches, index }: any) {
    const heroName = hero?.name?.replace("npc_dota_hero_", "");
    const winrate = ((matches.win / matches.games) * 100).toFixed(2);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01, backgroundColor: "#252e38", zIndex: 10 }}
            className="flex items-center justify-between p-4 mb-2 bg-[#1c242d] rounded-lg border-l-4 border-blue-500 transition-colors relative"
        >
            <div className="flex items-center gap-4 flex-1">
                <img
                    src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`}
                    className="w-16 h-auto rounded shadow-lg"
                    alt="hero"
                />
                <span className="font-bold text-white text-lg">{hero?.localized_name}</span>
            </div>
            <div className="w-32 flex flex-col items-center">
                <span className="text-white font-mono">{matches.games} MATCHES</span>
                <div className="w-full h-1.5 bg-gray-800 mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600" style={{ width: '100%' }} />
                </div>
            </div>
            <div className="w-32 flex flex-col items-center ml-8">
                <span className="text-green-500 font-bold">{winrate}%</span>
                <div className="w-full h-1.5 bg-gray-800 mt-1 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 shadow-[0_0_8px_#22c55e]"
                        style={{ width: `${winrate}%` }}
                    />
                </div>
            </div>
        </motion.div>
    )
}

