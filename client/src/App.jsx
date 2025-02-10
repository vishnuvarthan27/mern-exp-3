import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');
    const [fuelData, setFuelData] = useState([]);
    const [fuelType, setFuelType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        // Fetch API
        axios.get("http://localhost:8000/")
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                setMessage(error.message);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFuelEntry = { fuelType, quantity, date };

        // Post new fuel entry to the server
        axios.post("http://localhost:8000/fuel", newFuelEntry)
            .then(response => {
                setFuelData([...fuelData, response.data]);
                setFuelType('');
                setQuantity('');
                setDate('');
                alert('Fuel entry added successfully!');
            })
            .catch(error => {
                console.error("There was an error adding the fuel entry!", error);
            });
    };

    return (
        <>
            <h1>Fuel Management System</h1>
            <div>
                Server Response: {message}
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Fuel Type:
                    <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} required>
                        <option value="">Select Fuel Type</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="gas">Gas</option>
                        <option value="electric">Electric</option>
                    </select>
                </label>
                <label>
                    Quantity (liters):
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        min="1"
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Fuel Entry</button>
            </form>
            <div>
                <h2>Fuel Entries</h2>
                <ul>
                    {fuelData.map((entry, index) => (
                        <li key={index}>
                            {entry.date}: {entry.quantity} liters of {entry.fuelType}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default App;
