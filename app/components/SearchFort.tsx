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
    <div className="flex gap-2 mb-4">
      <input 
        type="text" 
        value={id} 
        onChange={(e) => setId(e.target.value)}
        className="text-black p-2 rounded" // щоб бачити текст на темному фоні
        placeholder="Введи Steam ID"
      />
      <button type="submit" className="bg-blue-600 p-2 rounded">Шукати</button>
    </div>
  );
}