import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Home = () => {
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

  // Stats data
  const statsData = [
    {
      title: 'Total Orders',
      value: '₹126,500',
      percentage: '34.7%',
      isUp: true,
      icon: '🛒'
    },
    {
      title: 'Active Orders',
      value: '₹126,500',
      percentage: '34.7%',
      isUp: true,
      icon: '📦'
    },
    {
      title: 'Completed Orders',
      value: '₹126,500',
      percentage: '34.7%',
      isUp: true,
      icon: '✅'
    },
    {
      title: 'Return Orders',
      value: '₹126,500',
      percentage: '34.7%',
      isUp: true,
      icon: '↩️'
    }
  ];

  // Best sellers data
  const bestSellers = [
    {
      id: 1,
      name: 'Lorem Ipsum',
      price: '₹126.50',
      originalPrice: '₹126.500',
      sales: '999 sales'
    },
    {
      id: 2,
      name: 'Lorem Ipsum',
      price: '₹126.50',
      originalPrice: '₹126.500',
      sales: '999 sales'
    },
    {
      id: 3,
      name: 'Lorem Ipsum',
      price: '₹126.50',
      originalPrice: '₹126.500',
      sales: '999 sales'
    }
  ];

  const StatCard = ({ title, value, percentage, isUp, icon }) => (
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
      
      {/* <div className="flex items-center">
        <svg className={`w-4 h-4 mr-1 ${isUp ? 'text-green-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d={isUp ? "M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" : "M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"}/>
        </svg>
        <span className={`text-sm font-medium mr-2 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {percentage}
        </span>
        <span className="text-xs text-gray-500">Compared to Oct 2023</span>
      </div> */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <div className="max-w-7xl mx-auto lg:w-3/5 ">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4 m-auto">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
              <div className="text-sm text-gray-500 flex items-center">
                <span>Home</span>
                <span className="mx-2"></span>
                <span>Dashboard</span>
              </div>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
              </svg>
              <span className="text-sm text-gray-700 whitespace-nowrap">Oct 11,2023 - Nov 11,2022</span>
            </div>
          </div>
        </div>

        {/* Stats Cards - Flexbox Layout */}
        <div className="mb-8">
          {/* Desktop: All 4 cards in one row */}
          {/* <div className="flex gap-6 hidden">
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                percentage={stat.percentage}
                isUp={stat.isUp}
                icon={stat.icon}
              />
            ))}
          </div> */}

          {/* Tablet: 2 rows of 2 cards each */}
          <div className=" flex  flex-col gap-2 ">
            <div className="flex not-xl_custom:flex-col gap-2 ">
              {statsData.slice(0, 2).map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  percentage={stat.percentage}
                  isUp={stat.isUp}
                  icon={stat.icon}
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

          {/* Mobile: Single column */}
          {/* <div className=" flex-col gap-4">
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                percentage={stat.percentage}
                isUp={stat.isUp}
                icon={stat.icon}
              />
            ))}
          </div> */}
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