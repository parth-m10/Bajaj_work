import React, { useState, useEffect } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');

    // Set website title to roll number
    useEffect(() => {
        if (response && response.roll_number) {
            document.title = "21BAI1276";
        }
    }, [response]);

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

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>21BAI1276</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON'
                    style={styles.textarea}
                />
                <button type="submit" style={styles.submitButton}>Submit</button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
            {response && (
                <div style={styles.outputContainer}>
                    <select onChange={handleOptionChange} style={styles.select}>
                        <option value="">Select an option</option>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <div style={styles.output}>
                        {selectedOption === 'numbers' && (
                            <p>Numbers: {response.numbers.join(', ')}</p>
                        )}
                        {selectedOption === 'alphabets' && (
                            <p>Alphabets: {response.alphabets.join(', ')}</p>
                        )}
                        {selectedOption === 'highest_lowercase_alphabet' && response.highest_lowercase_alphabet.length > 0 && (
                            <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: 'auto',
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    textarea: {
        height: '100px',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    submitButton: {
        padding: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    submitButtonHover: {
        backgroundColor: '#218838',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    outputContainer: {
        marginTop: '20px',
    },
    select: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    output: {
        padding: '10px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
};

export default App;
