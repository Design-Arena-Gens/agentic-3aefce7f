'use client';

import { useEffect, useState } from 'react';

interface TechnicalIndicatorsProps {
  symbol: string;
}

interface Indicator {
  name: string;
  value: number | string;
  signal: 'شراء' | 'بيع' | 'محايد';
  description: string;
}

export default function TechnicalIndicators({ symbol }: TechnicalIndicatorsProps) {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [summary, setSummary] = useState({ buy: 0, sell: 0, neutral: 0 });

  useEffect(() => {
    const updateIndicators = () => {
      const newIndicators = generateIndicators(symbol);
      setIndicators(newIndicators);

      const buy = newIndicators.filter((i) => i.signal === 'شراء').length;
      const sell = newIndicators.filter((i) => i.signal === 'بيع').length;
      const neutral = newIndicators.filter((i) => i.signal === 'محايد').length;

      setSummary({ buy, sell, neutral });
    };

    updateIndicators();
    const interval = setInterval(updateIndicators, 8000);

    return () => clearInterval(interval);
  }, [symbol]);

  const getOverallSignal = () => {
    if (summary.buy > summary.sell && summary.buy > summary.neutral) {
      return { text: 'شراء قوي', color: 'text-green-500', bg: 'bg-green-900/30' };
    } else if (summary.sell > summary.buy && summary.sell > summary.neutral) {
      return { text: 'بيع قوي', color: 'text-red-500', bg: 'bg-red-900/30' };
    } else if (summary.buy > summary.sell) {
      return { text: 'شراء', color: 'text-green-400', bg: 'bg-green-900/20' };
    } else if (summary.sell > summary.buy) {
      return { text: 'بيع', color: 'text-red-400', bg: 'bg-red-900/20' };
    } else {
      return { text: 'محايد', color: 'text-yellow-500', bg: 'bg-yellow-900/20' };
    }
  };

  const overallSignal = getOverallSignal();

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-4">المؤشرات الفنية</h2>

      <div className={`${overallSignal.bg} rounded-lg p-4 mb-4`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">الإشارة العامة</span>
          <span className={`text-xl font-bold ${overallSignal.color}`}>
            {overallSignal.text}
          </span>
        </div>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-gray-400">شراء: </span>
            <span className="text-green-400 font-bold">{summary.buy}</span>
          </div>
          <div>
            <span className="text-gray-400">بيع: </span>
            <span className="text-red-400 font-bold">{summary.sell}</span>
          </div>
          <div>
            <span className="text-gray-400">محايد: </span>
            <span className="text-yellow-400 font-bold">{summary.neutral}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {indicators.map((indicator, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors"
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-sm">{indicator.name}</h3>
                <p className="text-xs text-gray-400">{indicator.description}</p>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  indicator.signal === 'شراء'
                    ? 'bg-green-900/50 text-green-400'
                    : indicator.signal === 'بيع'
                    ? 'bg-red-900/50 text-red-400'
                    : 'bg-yellow-900/50 text-yellow-400'
                }`}
              >
                {indicator.signal}
              </span>
            </div>
            <div className="text-lg font-bold text-blue-400 mt-2">
              {typeof indicator.value === 'number'
                ? indicator.value.toFixed(2)
                : indicator.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function generateIndicators(symbol: string): Indicator[] {
  const rsi = 30 + Math.random() * 40;
  const macdValue = (Math.random() - 0.5) * 0.001;
  const adx = 20 + Math.random() * 40;
  const cci = -100 + Math.random() * 200;
  const stochastic = 20 + Math.random() * 60;
  const williamsR = -80 + Math.random() * 60;
  const atr = Math.random() * 0.01;
  const bb = Math.random();

  return [
    {
      name: 'RSI (14)',
      value: rsi,
      signal: rsi < 30 ? 'شراء' : rsi > 70 ? 'بيع' : 'محايد',
      description: 'مؤشر القوة النسبية',
    },
    {
      name: 'MACD (12,26,9)',
      value: macdValue,
      signal: macdValue > 0 ? 'شراء' : macdValue < 0 ? 'بيع' : 'محايد',
      description: 'مؤشر الماكد',
    },
    {
      name: 'ADX (14)',
      value: adx,
      signal: adx > 25 ? (Math.random() > 0.5 ? 'شراء' : 'بيع') : 'محايد',
      description: 'متوسط الحركة الاتجاهية',
    },
    {
      name: 'CCI (20)',
      value: cci,
      signal: cci < -100 ? 'شراء' : cci > 100 ? 'بيع' : 'محايد',
      description: 'مؤشر قناة السلع',
    },
    {
      name: 'Stochastic (14,3,3)',
      value: stochastic,
      signal: stochastic < 20 ? 'شراء' : stochastic > 80 ? 'بيع' : 'محايد',
      description: 'المذبذب العشوائي',
    },
    {
      name: "Williams %R (14)",
      value: williamsR,
      signal: williamsR < -80 ? 'شراء' : williamsR > -20 ? 'بيع' : 'محايد',
      description: 'مؤشر ويليامز',
    },
    {
      name: 'ATR (14)',
      value: atr,
      signal: 'محايد',
      description: 'متوسط المدى الحقيقي',
    },
    {
      name: 'Bollinger Bands',
      value: bb < 0.3 ? 'قرب السفلي' : bb > 0.7 ? 'قرب العلوي' : 'في الوسط',
      signal: bb < 0.3 ? 'شراء' : bb > 0.7 ? 'بيع' : 'محايد',
      description: 'نطاقات بولينجر',
    },
    {
      name: 'MA 50',
      value: Math.random() > 0.5 ? 'فوق السعر' : 'تحت السعر',
      signal: Math.random() > 0.5 ? 'شراء' : 'بيع',
      description: 'متوسط متحرك 50',
    },
    {
      name: 'MA 200',
      value: Math.random() > 0.5 ? 'فوق السعر' : 'تحت السعر',
      signal: Math.random() > 0.5 ? 'شراء' : 'بيع',
      description: 'متوسط متحرك 200',
    },
    {
      name: 'EMA 12',
      value: Math.random() > 0.5 ? 'صاعد' : 'هابط',
      signal: Math.random() > 0.5 ? 'شراء' : 'بيع',
      description: 'متوسط متحرك أسي 12',
    },
    {
      name: 'Volume',
      value: Math.random() > 0.5 ? 'مرتفع' : 'منخفض',
      signal: 'محايد',
      description: 'حجم التداول',
    },
  ];
}
