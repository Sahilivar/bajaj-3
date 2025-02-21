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

    try {
      const parsedInput = JSON.parse(input)
      const res = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput)
      })
      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError('Invalid JSON input')
    }
  }

  const handleOptionChange = (option) => {
    setSelectedOptions(prevOptions =>
      prevOptions.includes(option)
        ? prevOptions.filter(item => item !== option)
        : [...prevOptions, option]
    )
  }

  const renderResponse = () => {
    if (!response) return null
    
    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest alphabet') && (
          <div>
            <h3>Highest Alphabet:</h3>
            <p>{response.highestAlphabet}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>YOUR_ROLL_NUMBER</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>JSON Processor</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter JSON here (e.g., { "data": ["A","C","z"] })'
          />
          <button type="submit">Submit</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
        
        {response && (
          <div>
            <h2>Select options to display:</h2>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Alphabets')}
                onChange={() => handleOptionChange('Alphabets')}
              /> Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Numbers')}
                onChange={() => handleOptionChange('Numbers')}
              /> Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Highest alphabet')}
                onChange={() => handleOptionChange('Highest alphabet')}
              /> Highest alphabet
            </label>
          </div>
        )}
        
        {renderResponse()}
      </main>
    </div>
  )
}

