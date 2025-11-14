'use client';

import { useState } from 'react';
import MarketSelector from './components/MarketSelector';
import TradingChart from './components/TradingChart';
import AIAnalysis from './components/AIAnalysis';
import TechnicalIndicators from './components/TechnicalIndicators';

export default function Home() {
  const [selectedMarket, setSelectedMarket] = useState('EURUSD');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H');

  return (
    <div className="min-h-screen p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          منصة تحليل الأسواق المالية
        </h1>
        <p className="text-center text-gray-400">
          تحليل الأسهم والفوركس والعملات والذهب بالذكاء الاصطناعي
        </p>
      </header>

      <div className="max-w-7xl mx-auto">
        <MarketSelector
          selectedMarket={selectedMarket}
          setSelectedMarket={setSelectedMarket}
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="lg:col-span-2">
            <TradingChart
              symbol={selectedMarket}
              timeframe={selectedTimeframe}
            />
            <TechnicalIndicators symbol={selectedMarket} />
          </div>

          <div className="lg:col-span-1">
            <AIAnalysis
              symbol={selectedMarket}
              timeframe={selectedTimeframe}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
