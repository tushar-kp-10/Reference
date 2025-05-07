import React, { useState } from 'react';

const CropAssist = () => {
  const [formData, setFormData] = useState({
    pincode: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });

  const [recommendation, setRecommendation] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const recommendCrop = (nitrogen, phosphorus, potassium) => {
    const N = Number(nitrogen);
    const P = Number(phosphorus);
    const K = Number(potassium);

    // Simple demo logic — adjust as needed
    if (N > 40 && P > 30 && K > 50) return 'Recommended Crop: Wheat 🌾';
    if (N < 20) return 'Recommended Crop: Pulses 🌱';
    if (K < 30) return 'Recommended Crop: Banana 🍌';
    return 'Recommended Crop: Maize 🌽';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nitrogen, phosphorus, potassium } = formData;
    const result = recommendCrop(nitrogen, phosphorus, potassium);
    setRecommendation(result);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-4 mt-6">
      <h2 className="text-xl font-bold text-center">Crop Assist - User Input</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="pincode"
          placeholder="Enter Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="nitrogen"
          placeholder="Nitrogen (mg/kg)"
          value={formData.nitrogen}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="phosphorus"
          placeholder="Phosphorus (mg/kg)"
          value={formData.phosphorus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="potassium"
          placeholder="Potassium (mg/kg)"
          value={formData.potassium}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Get Recommendation
        </button>
      </form>

      {recommendation && (
        <p className="mt-4 text-center text-lg font-medium text-green-800">
          {recommendation}
        </p>
      )}
    </div>
  );
};

export default CropAssist;
