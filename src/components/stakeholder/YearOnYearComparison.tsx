import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';

interface YearOnYearComparisonProps {
  timeRange?: string;
  selectedSubject?: string;
  selectedZone?: string;
  startDate?: string;
  endDate?: string;
}

const YearOnYearComparison = ({ timeRange, startDate, endDate }: YearOnYearComparisonProps) => {
  // Use similar dummy data logic as RevenueSummaryCards
  const multiplier = 1; // or getTimeRangeMultiplier(timeRange)
  const baseRevenue = 12500000 * multiplier;
  const revenueGrowth = 15;
  const currentYearData = [
    baseRevenue * 0.09,
    baseRevenue * 0.11,
    baseRevenue * 0.10,
    baseRevenue * 0.12,
    baseRevenue * 0.13,
    baseRevenue * 0.12,
    baseRevenue * 0.14,
    baseRevenue * 0.13,
    baseRevenue * 0.12,
    baseRevenue * 0.11,
    baseRevenue * 0.10,
    baseRevenue * 0.09,
  ];
  const previousYearData = currentYearData.map(v => v / (1 + revenueGrowth / 100));

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const chartData = {
    series: [
      {
        name: '2024',
        data: previousYearData,
        color: '#635BFF',
      },
      {
        name: '2025',
        data: currentYearData,
        color: '#10b981',
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 400,
        toolbar: { show: true },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          endingShape: 'rounded',
          borderRadius: 4,
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: {
        categories: months,
        title: { text: 'Month' },
      },
      yaxis: {
        title: { text: 'Revenue (₹)' },
        labels: {
          formatter: (value: number) => {
            if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
            if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
            if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
            return `₹${value}`;
          },
        },
      },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: (val: number) => {
            if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
            if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
            if (val >= 1000) return `₹${(val / 1000).toFixed(2)}K`;
            return `₹${val}`;
          },
        },
      },
      legend: {
        position: 'top' as const,
        horizontalAlign: 'center' as const,
      },
      grid: { strokeDashArray: 4 },
    },
  };

  // Calculate growth metrics
  const currentYearTotal = currentYearData.reduce((sum, val) => sum + val, 0);
  const previousYearTotal = previousYearData.reduce((sum, val) => sum + val, 0);
  const growthRate = (((currentYearTotal - previousYearTotal) / previousYearTotal) * 100).toFixed(1);

  const bestMonth = months[currentYearData.indexOf(Math.max(...currentYearData))];
  const worstMonth = months[currentYearData.indexOf(Math.min(...currentYearData))];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Year-on-Year Comparison</h2>
          <p className="text-gray-600 text-sm">
            Monthly revenue comparison between 2024 and 2025
          </p>
        </div>
      </div>

      <div className="mb-6">
        <Chart options={chartData.options} series={chartData.series} type="bar" height={400} />
      </div>

      {/* Growth Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div className="bg-emerald-50 rounded-md p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon icon="solar:chart-2-bold-duotone" className="text-emerald-600" width={20} />
            <span className="text-sm font-medium text-emerald-800">YoY Growth</span>
          </div>
          <div className="text-2xl font-bold text-emerald-600">+{growthRate}%</div>
        </div>

        <div className="bg-blue-50 rounded-md p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon icon="solar:star-bold-duotone" className="text-blue-600" width={20} />
            <span className="text-sm font-medium text-blue-800">Best Month</span>
          </div>
          <div className="text-lg font-bold text-blue-600">{bestMonth}</div>
        </div>

        <div className="bg-purple-50 rounded-md p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon
              icon="solar:danger-triangle-bold-duotone"
              className="text-purple-600"
              width={20}
            />
            <span className="text-sm font-medium text-purple-800">Needs Focus</span>
          </div>
          <div className="text-lg font-bold text-purple-600">{worstMonth}</div>
        </div>

        <div className="bg-orange-50 rounded-md p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon
              icon="solar:dollar-minimalistic-bold-duotone"
              className="text-orange-600"
              width={20}
            />
            <span className="text-sm font-medium text-orange-800">Avg Monthly</span>
          </div>
          <div className="text-lg font-bold text-orange-600">
            ₹{(currentYearTotal / 12 / 100000).toFixed(1)}L
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearOnYearComparison;
