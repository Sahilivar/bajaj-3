import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResponse(null)

   
    
  }
