import React from 'react';

const CitySelector = ({ selectedCity, setSelectedCity, cities }) => {
    return (
        <div>
            <label htmlFor="city">Select a city:</label>
            <select id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CitySelector;
