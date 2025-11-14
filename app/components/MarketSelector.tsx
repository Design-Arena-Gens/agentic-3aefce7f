'use client';

interface MarketSelectorProps {
  selectedMarket: string;
  setSelectedMarket: (market: string) => void;
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
}

const markets = [
  { category: 'فوركس', items: ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'NZDUSD'] },
  { category: 'عملات رقمية', items: ['BTCUSD', 'ETHUSD', 'BNBUSD', 'XRPUSD', 'ADAUSD', 'SOLUSD'] },
  { category: 'ذهب ومعادن', items: ['XAUUSD', 'XAGUSD', 'COPPER', 'PLATINUM'] },
  { category: 'أسهم أمريكية', items: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA'] },
  { category: 'مؤشرات', items: ['SPX', 'DJI', 'NDX', 'FTSE', 'DAX', 'NIKKEI'] },
];

const timeframes = [
  { label: '1د', value: '1' },
  { label: '5د', value: '5' },
  { label: '15د', value: '15' },
  { label: '30د', value: '30' },
  { label: '1س', value: '1H' },
  { label: '4س', value: '4H' },
  { label: 'يومي', value: '1D' },
  { label: 'أسبوعي', value: '1W' },
];

export default function MarketSelector({
  selectedMarket,
  setSelectedMarket,
  selectedTimeframe,
  setSelectedTimeframe,
}: MarketSelectorProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">الإطار الزمني</label>
        <div className="flex flex-wrap gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setSelectedTimeframe(tf.value)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedTimeframe === tf.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">الأسواق</label>
        <div className="space-y-3">
          {markets.map((market) => (
            <div key={market.category}>
              <h3 className="text-xs text-gray-400 mb-2">{market.category}</h3>
              <div className="flex flex-wrap gap-2">
                {market.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedMarket(item)}
                    className={`px-3 py-1.5 rounded text-sm transition-all ${
                      selectedMarket === item
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
