import React, { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import axios from '../api/axios.config.js'


const Home = () => {
  const [details,setDetails]=useState({});
  
  useEffect(()=>{
    const getDetails=async()=>{
      try{
     const  response=await axios.get('/dashBoard/details');
     setDetails(response.data.data)

      }catch(err){
        console.log(err.response.message);
      }
    }
    getDetails();
  },[]);









  const [selectedPeriod, setSelectedPeriod] = useState('MONTHLY');

  // Sample data for the sales graph
  const salesData = [
    { month: 'JUL', value: 50 },
    { month: 'AUG', value: 75 },
    { month: 'SEP', value: 100 },
    { month: 'OCT', value: 80 },
    { month: 'NOV', value: 60 },
    { month: 'DEC', value: 380 }
  ];

  
  const statsData = [
    {
      title: 'Total Locations',
      value: details.totalLocations
    },
    {
      title: 'Total Orders',
      value: details.totalOrders
      
    },
    {
      title: 'Total Shops',
      value: details.totalShops
     
    },
    {
      title: 'Total Products',
      value: details.totalProducts
      
    }
  ];


  const StatCard = ({ title, value}) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex-1 ">
      <div className="flex items-center justify-center  mb-4 ">
        <h3 className="text-gray-600 text-sm font-medium text-center">{title}:</h3>
       
      </div>
      
      <div className="flex items-center mb-2 justify-center">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-1 rounded-lg ">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
          </svg>
        </div>
        <div className="text-2xl font-bold text-gray-900 ">{value}</div>
      </div>
      
     
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <div className="max-w-7xl mx-auto lg:w-3/5 ">
        {/* Header */}
        <div className="mb-6 w-9/10 m-auto ">
          <div className="flex items-center justify-between flex-wrap gap-4 m-auto">
            <div className="flex flex-col m-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
              
            </div>
            <div className=" px-4 py-2 rounded-lg border border-gray-200 flex items-center m-auto bg-gradient-to-r from-slate-800 to-slate-900">
             
             <h3 className='text-white font-bold'>Welcome To Prakriti</h3>
            </div>
          </div>
        </div>
        <div className="w-full h-2">
               
              </div>

        {/* Stats Cards - Flexbox Layout */}
        <div className="mb-8">
         

          {/* Tablet: 2 rows of 2 cards each */}
          <div className=" flex  flex-col gap-2 ">
            <div className="flex not-xl_custom:flex-col gap-2 ">
              {statsData.slice(0, 2).map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                 
                />
              ))}
            </div>
            <div className="flex gap-2 not-xl:flex-col ">
              {statsData.slice(2, 4).map((stat, index) => (
                <StatCard
                  key={index + 2}
                  title={stat.title}
                  value={stat.value}
                  percentage={stat.percentage}
                  isUp={stat.isUp}
                  icon={stat.icon}
                />
              ))}
            </div>
          </div>

        
        </div>
        <div className='w-full h-4'>

        </div>

        {/* Charts and Best Sellers Row - Flexbox Layout */}
        <div className="">
          {/* Sales Graph */}
          <div className="flex-grow lg:flex-shrink-0  bg-white rounded-lg p-6 shadow-sm border border-gray-100 mx-auto">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4 ">
              <h2 className="text-lg font-semibold text-gray-900">Sale Graph</h2>
              <div className="flex flex-wrap gap-2">
                {['MONTHLY'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedPeriod === period
                        ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white'
                        : 'bg-gradient-to-r from-slate-800 to-slate-900 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#5b21b6" 
                    strokeWidth={3}
                    dot={{ fill: '#5b21b6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#5b21b6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Home;