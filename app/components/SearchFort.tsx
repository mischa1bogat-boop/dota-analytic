'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchForm() {
  const [id, setId] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push("/?id=" + id)
  }

  return (
    <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="bg-[#0f1214] border-b-2 border-blue-500 focus:border-blue-400 outline-none p-4 text-xl"
        placeholder="Enter Steam ID"
      />
      <button type="submit" className="hover:bg-blue-500 transition-all uppercase font-bold tracking-widest bg-blue-600 p-2 rounded">Search</button>
    </form>
  );
}