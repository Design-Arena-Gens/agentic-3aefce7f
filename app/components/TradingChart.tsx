'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';

interface TradingChartProps {
  symbol: string;
  timeframe: string;
}

export default function TradingChart({ symbol, timeframe }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1a1a1a' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#2a2a2a' },
        horzLines: { color: '#2a2a2a' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      rightPriceScale: {
        borderColor: '#2a2a2a',
      },
      timeScale: {
        borderColor: '#2a2a2a',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    seriesRef.current = candlestickSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Generate sample candlestick data
        const data = generateSampleData(symbol, timeframe);

        if (seriesRef.current) {
          seriesRef.current.setData(data);
          chartRef.current?.timeScale().fitContent();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Update data every 5 seconds for real-time simulation
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [symbol, timeframe]);

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">{symbol}</h2>
        {loading && (
          <span className="text-sm text-gray-400">جاري التحديث...</span>
        )}
      </div>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
}

function generateSampleData(symbol: string, timeframe: string): CandlestickData[] {
  const data: CandlestickData[] = [];
  const now = Date.now();
  const timeframeMs = getTimeframeMs(timeframe);
  const numCandles = 100;

  // Base price depends on symbol
  let basePrice = 1.1000;
  if (symbol.includes('BTC')) basePrice = 45000;
  else if (symbol.includes('ETH')) basePrice = 2500;
  else if (symbol.includes('XAU')) basePrice = 2000;
  else if (symbol === 'AAPL') basePrice = 180;
  else if (symbol === 'SPX') basePrice = 4500;

  let currentPrice = basePrice;

  for (let i = numCandles; i > 0; i--) {
    const time = Math.floor((now - i * timeframeMs) / 1000);

    const volatility = basePrice * 0.002;
    const change = (Math.random() - 0.5) * volatility;
    currentPrice += change;

    const open = currentPrice;
    const close = currentPrice + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;

    data.push({
      time: time as any,
      open,
      high,
      low,
      close,
    });

    currentPrice = close;
  }

  return data;
}

function getTimeframeMs(timeframe: string): number {
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (timeframe.endsWith('H')) {
    return parseInt(timeframe) * hour;
  } else if (timeframe.endsWith('D')) {
    return parseInt(timeframe) * day;
  } else if (timeframe.endsWith('W')) {
    return parseInt(timeframe) * 7 * day;
  } else {
    return parseInt(timeframe) * minute;
  }
}
