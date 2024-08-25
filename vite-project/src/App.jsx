import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResponse(null);       
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await fetch('http://localhost:3000/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsedInput)
            });
            const data = await res.json();
            setResponse(data);
        } catch (e) {
            setError('Invalid JSON format');
        }
    };
    return (
        <div>
            <h1>{response?.roll_number}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON'
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>}
            {response && (
                <div>
                    <select multiple onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <div>
                        {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                        {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                        {selectedOptions.includes('highest_lowercase_alphabet') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
                    </div>
                </div>
            )}
       </div>
    );
}

export default App;
