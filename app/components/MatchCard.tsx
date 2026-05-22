'use client'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'

export default function MatchCard({ matches, hero, isWin, index, playerId }: any) {
  const heroName = hero?.name?.replace("npc_dota_hero_", "");
  const router = useRouter();

  const handleMatchDetalis = () => {
    router.push(`/match/${matches.match_id}`)
  }
  const handlePlayerDetalis = () => {
  router.push(`/match/${matches.match_id}?player=${playerId}`)
}


  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={handleMatchDetalis}
      whileHover={{ scale: 1.02, backgroundColor: "#252e38", zIndex: 10 }}
      className={`flex items-center justify-between p-3 mb-2 bg-[#1c242d] rounded-lg border-l-4 transition-colors relative ${isWin ? "border-green-500" : "border-red-500"
        }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`}
          className="w-16 h-auto rounded shadow-lg"
          alt="hero"
        />
        <span className="font-bold text-white w-32">{hero?.localized_name}</span>
      </div>

      <span className={`font-black uppercase ${isWin ? "text-green-500" : "text-red-500"}`}>
        {isWin ? "Win" : "Loss"}
      </span>

      <div className="text-gray-400 font-mono">
        <span className="text-white">{matches.kills}</span> /
        <span className="text-white"> {matches.deaths}</span> /
        <span className="text-white"> {matches.assists}</span>
      </div>
    </motion.div>
  )
}

