import React, { useState } from 'react';
import axios from 'axios';

const Server = () => {
  const [imei, setImei] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // For handling errors

  // Function to fetch data from the API based on IMEI
  const fetchData = async () => {
    setLoading(true);
    setError(null);  // Reset error state
    try {
      const response = await fetch(`https://backend-server1-wiz3.onrender.com/get-data/${imei}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to render the table rows
  const renderRow = (item, index) => {
    return (
      <tr key={index} className="bg-white border-b hover:bg-gray-100 transition duration-150">
        <td className="px-4 py-2 text-gray-700">{item.timestamp || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.imei || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.data1 || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.data2 || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.data3 || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.data4 || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.data5 || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.data6 || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.data7 || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.data8 || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.faultStatus || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.createdAt || '--'}</td>
        <td className="px-4 py-2 text-gray-700">{item.updatedAt || '--'}</td>
      </tr>
    );
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="w-full flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Device Data Lookup</h1>
        <div className="w-full max-w-xl flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter IMEI Number"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
          />
          <button
            onClick={fetchData}
            className={`p-3 bg-blue-600 text-white rounded shadow-md transition duration-200 ease-in-out hover:bg-blue-700 ${loading || !imei ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading || !imei}
          >
            {loading ? 'Loading...' : 'Send'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-center">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-gray-600 font-medium">Timestamp</th>
              <th className="px-4 py-2 text-gray-600 font-medium">IMEI</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Data1</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Data2</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Data3</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Data4</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Data5</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Data6</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Data7</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Data8</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Fault Status</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Created At</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : (
              <tr>
                <td colSpan="13" className="text-center px-4 py-6 text-gray-500">No data available for the entered IMEI number.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Server;
