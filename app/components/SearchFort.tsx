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
        className="text-white p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-600"
        placeholder="Enter Steam ID"
      />
      <button type="submit" className="bg-blue-600 p-2 rounded">Search</button>
    </form>
  );
}