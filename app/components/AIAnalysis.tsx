'use client';

import { useEffect, useState } from 'react';

interface AIAnalysisProps {
  symbol: string;
  timeframe: string;
}

interface Analysis {
  signal: 'شراء' | 'بيع' | 'محايد';
  strength: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number[];
  confidence: number;
  reasoning: string[];
  indicators: {
    name: string;
    signal: string;
    value: string;
  }[];
}

export default function AIAnalysis({ symbol, timeframe }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);

      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newAnalysis = generateAIAnalysis(symbol, timeframe);
      setAnalysis(newAnalysis);
      setLoading(false);
    };

    fetchAnalysis();

    // Update every 10 seconds
    const interval = setInterval(fetchAnalysis, 10000);

    return () => clearInterval(interval);
  }, [symbol, timeframe]);

  if (loading || !analysis) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-800 rounded mb-4"></div>
          <div className="h-32 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  const signalColor =
    analysis.signal === 'شراء'
      ? 'text-green-500'
      : analysis.signal === 'بيع'
      ? 'text-red-500'
      : 'text-yellow-500';

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">تحليل الذكاء الاصطناعي</h2>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-2xl font-bold ${signalColor}`}>
            {analysis.signal}
          </span>
          <div className="text-left">
            <div className="text-sm text-gray-400">قوة الإشارة</div>
            <div className="text-xl font-bold">{analysis.strength}%</div>
          </div>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full ${
              analysis.signal === 'شراء'
                ? 'bg-green-500'
                : analysis.signal === 'بيع'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}
            style={{ width: `${analysis.strength}%` }}
          ></div>
        </div>

        <div className="text-sm text-gray-400 mb-1">
          مستوى الثقة: {analysis.confidence}%
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <h3 className="font-semibold mb-2 text-blue-400">تفاصيل الصفقة</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">سعر الدخول:</span>
              <span className="font-bold">{analysis.entryPrice.toFixed(5)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">وقف الخسارة:</span>
              <span className="font-bold text-red-400">
                {analysis.stopLoss.toFixed(5)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">الهدف الأول:</span>
              <span className="font-bold text-green-400">
                {analysis.takeProfit[0].toFixed(5)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">الهدف الثاني:</span>
              <span className="font-bold text-green-400">
                {analysis.takeProfit[1].toFixed(5)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">الهدف الثالث:</span>
              <span className="font-bold text-green-400">
                {analysis.takeProfit[2].toFixed(5)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-700">
              <span className="text-gray-400">الإطار الزمني المقترح:</span>
              <span className="font-bold">{timeframe}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3">
          <h3 className="font-semibold mb-2 text-purple-400">المؤشرات الفنية</h3>
          <div className="space-y-2">
            {analysis.indicators.map((indicator, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-400">{indicator.name}</span>
                <div className="text-left">
                  <div
                    className={`font-semibold ${
                      indicator.signal === 'شراء'
                        ? 'text-green-400'
                        : indicator.signal === 'بيع'
                        ? 'text-red-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {indicator.signal}
                  </div>
                  <div className="text-xs text-gray-500">{indicator.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3">
          <h3 className="font-semibold mb-2 text-yellow-400">تحليل السوق</h3>
          <ul className="space-y-2 text-sm">
            {analysis.reasoning.map((reason, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-400 ml-2">•</span>
                <span className="text-gray-300">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 text-xs">
          <p className="text-blue-300">
            ⚠️ تنبيه: هذا التحليل مبني على الذكاء الاصطناعي والبيانات المتاحة.
            يرجى إجراء البحث الخاص بك قبل اتخاذ أي قرارات تداول.
          </p>
        </div>
      </div>
    </div>
  );
}

function generateAIAnalysis(symbol: string, timeframe: string): Analysis {
  // Simulate AI analysis with random but realistic values
  const signals: Array<'شراء' | 'بيع' | 'محايد'> = ['شراء', 'بيع', 'محايد'];
  const signal = signals[Math.floor(Math.random() * signals.length)];

  // Base price depends on symbol
  let basePrice = 1.1;
  if (symbol.includes('BTC')) basePrice = 45000;
  else if (symbol.includes('ETH')) basePrice = 2500;
  else if (symbol.includes('XAU')) basePrice = 2000;
  else if (symbol === 'AAPL') basePrice = 180;
  else if (symbol === 'SPX') basePrice = 4500;

  const entryPrice = basePrice + (Math.random() - 0.5) * basePrice * 0.02;
  const volatility = basePrice * 0.015;

  let stopLoss, takeProfit;
  if (signal === 'شراء') {
    stopLoss = entryPrice - volatility;
    takeProfit = [
      entryPrice + volatility * 1,
      entryPrice + volatility * 2,
      entryPrice + volatility * 3,
    ];
  } else {
    stopLoss = entryPrice + volatility;
    takeProfit = [
      entryPrice - volatility * 1,
      entryPrice - volatility * 2,
      entryPrice - volatility * 3,
    ];
  }

  const indicators = [
    {
      name: 'RSI (14)',
      signal: signal === 'محايد' ? 'محايد' : signal,
      value: `${Math.floor(40 + Math.random() * 20)}`,
    },
    {
      name: 'MACD',
      signal: signal === 'محايد' ? 'محايد' : signal,
      value: signal === 'شراء' ? 'إيجابي' : signal === 'بيع' ? 'سلبي' : 'متعادل',
    },
    {
      name: 'المتوسط المتحرك 50',
      signal: signal === 'محايد' ? 'محايد' : signal,
      value: entryPrice > basePrice ? 'فوق' : 'تحت',
    },
    {
      name: 'المتوسط المتحرك 200',
      signal: signal === 'محايد' ? 'محايد' : signal,
      value: entryPrice > basePrice * 0.98 ? 'فوق' : 'تحت',
    },
    {
      name: 'Stochastic',
      signal: signal === 'محايد' ? 'محايد' : signal,
      value: `${Math.floor(30 + Math.random() * 40)}`,
    },
  ];

  const reasoningOptions = {
    شراء: [
      'السعر يختبر مستوى دعم قوي مع إشارات انعكاس صعودية',
      'المؤشرات الفنية تشير إلى تشبع بيعي وفرصة للارتداد',
      'حجم التداول يزداد مع حركة صعودية واضحة',
      'التحليل الفني يظهر نموذج انعكاسي إيجابي على هذا الإطار الزمني',
      'الاتجاه العام صاعد مع إشارات شراء من عدة مؤشرات فنية',
    ],
    بيع: [
      'السعر وصل لمقاومة رئيسية مع إشارات انعكاس هبوطية',
      'المؤشرات الفنية تشير إلى تشبع شرائي ومخاطر تصحيح',
      'انخفاض حجم التداول مع ضعف في الزخم الصعودي',
      'التحليل الفني يظهر نموذج انعكاسي سلبي على هذا الإطار الزمني',
      'الاتجاه العام هابط مع إشارات بيع من عدة مؤشرات فنية',
    ],
    محايد: [
      'السوق في حالة توازن دون اتجاه واضح حالياً',
      'المؤشرات الفنية متضاربة وتنتظر إشارة أقوى',
      'السعر يتحرك في نطاق محدود بين الدعم والمقاومة',
      'يُنصح بانتظار اختراق واضح قبل الدخول في صفقة',
    ],
  };

  const reasoning = reasoningOptions[signal]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return {
    signal,
    strength: Math.floor(60 + Math.random() * 35),
    entryPrice,
    stopLoss,
    takeProfit,
    confidence: Math.floor(70 + Math.random() * 25),
    reasoning,
    indicators,
  };
}
