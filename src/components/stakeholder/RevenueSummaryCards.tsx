import { Icon } from '@iconify/react';
import { getTimeRangeMultiplier, formatCurrency, MEDICAL_SUBJECTS } from '../../utils/constants';

interface RevenueSummaryCardsProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
  filteredProducts?: string[];
}

const RevenueSummaryCards = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
  filteredProducts = [],
}: RevenueSummaryCardsProps) => {
  // Dynamic data based on filters
  const getFilteredData = () => {
    const multiplier = getTimeRangeMultiplier(timeRange);
    let baseMultiplier = 1;

    // Group-based multiplier
    let groupMultiplier = 1;
    if (filteredProducts.length > 0) {
      if (filteredProducts[0].toLowerCase().includes('printed notes')) groupMultiplier = 0.7;
      else if (filteredProducts.length > 20) groupMultiplier = 1.5; // PG
      else groupMultiplier = 1.0; // UG
    }
    baseMultiplier *= groupMultiplier;

    // Use filteredProducts for top performing subject
    const topPerformingSubjectValue =
      selectedSubject !== 'all'
        ? selectedSubject
        : filteredProducts.length > 0
        ? filteredProducts[0]
        : MEDICAL_SUBJECTS && MEDICAL_SUBJECTS.length
        ? MEDICAL_SUBJECTS[Math.floor(Math.random() * MEDICAL_SUBJECTS.length)]
        : 'DigiOne';

    // Apply subject filter
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      baseMultiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }

    // Apply zone filter
    if (selectedZone !== 'all') {
      baseMultiplier *= 0.3; // Zone-specific data is typically 30% of total
    }

    const baseRevenue = 12500000 * multiplier * baseMultiplier;
    const baseSubscriptions = 4200 * multiplier * baseMultiplier;
    const baseColleges = 150 * baseMultiplier;

    // Generate current period data
    const currentRevenue = baseRevenue * (0.9 + Math.random() * 0.2);
    const currentSubscriptions = Math.floor(baseSubscriptions * (0.9 + Math.random() * 0.2));
    const currentAvgRevenue = (baseRevenue / baseColleges) * (0.9 + Math.random() * 0.2);
    const currentSubjectRevenue = baseRevenue * 0.3 * (0.8 + Math.random() * 0.4);

    // Generate previous period data (typically 10-25% lower)
    const revenueGrowth = 15 + Math.random() * 15;
    const subscriptionGrowth = 12 + Math.random() * 12;
    const avgGrowth = 8 + Math.random() * 16;
    const subjectGrowth = 10 + Math.random() * 20;

    const previousRevenue = currentRevenue / (1 + revenueGrowth / 100);
    const previousSubscriptions = Math.floor(currentSubscriptions / (1 + subscriptionGrowth / 100));
    const previousAvgRevenue = currentAvgRevenue / (1 + avgGrowth / 100);
    const previousSubjectRevenue = currentSubjectRevenue / (1 + subjectGrowth / 100);

    return {
      // Current period
      totalRevenue: formatCurrency(currentRevenue),
      totalRevenueNum: currentRevenue,
      activeSubscriptions: currentSubscriptions,
      avgRevenuePerCollege: formatCurrency(currentAvgRevenue),
      avgRevenuePerCollegeNum: currentAvgRevenue,
      subjectRevenue: formatCurrency(currentSubjectRevenue),
      subjectRevenueNum: currentSubjectRevenue,

      // Previous period
      previousRevenue: formatCurrency(previousRevenue),
      previousRevenueNum: previousRevenue,
      previousSubscriptions: previousSubscriptions,
      previousAvgRevenue: formatCurrency(previousAvgRevenue),
      previousAvgRevenueNum: previousAvgRevenue,
      previousSubjectRevenue: formatCurrency(previousSubjectRevenue),
      previousSubjectRevenueNum: previousSubjectRevenue,

      // Changes
      revenueChange: `+${revenueGrowth.toFixed(1)}%`,
      subscriptionChange: `+${subscriptionGrowth.toFixed(1)}%`,
      avgChange: `+${avgGrowth.toFixed(1)}%`,
      subjectChange: `+${subjectGrowth.toFixed(1)}%`,

      topPerformingSubject: topPerformingSubjectValue,
    };
  };

  const data = getFilteredData();

  const makePercent = (prev?: number, curr?: number) => {
    if (prev == null || curr == null || curr === 0) return '-';
    return `${((prev / curr) * 100).toFixed(1)}%`;
  };

  const cards = [
    {
      title: 'Total Revenue',
      value: data.totalRevenue,
      previousValue: data.previousRevenue,
      previousPercent: makePercent(data.previousRevenueNum, data.totalRevenueNum),
      change: data.revenueChange,
      icon: 'mdi:currency-inr',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      iconColor: 'text-emerald-600',
      changeColor: 'text-emerald-600',
    },
    {
      title: 'Unique Subscriptions',
      value: data.activeSubscriptions.toLocaleString(),
      previousValue: data.previousSubscriptions.toLocaleString(),
      previousPercent: makePercent(data.previousSubscriptions, data.activeSubscriptions),
      change: data.subscriptionChange,
      icon: 'solar:users-group-two-rounded-bold-duotone',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      changeColor: 'text-blue-600',
    },
    {
      title: 'Top performing Zone',
      value: `${selectedZone !== 'all' ? (selectedZone.endsWith(' Zone') ? selectedZone.replace(' Zone', '') : selectedZone) : 'North'} (${data.avgRevenuePerCollege})`,
      previousValue: data.previousAvgRevenue,
      previousPercent: makePercent(data.previousAvgRevenueNum, data.avgRevenuePerCollegeNum),
      change: data.avgChange,
      icon: 'solar:buildings-3-bold-duotone',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      changeColor: 'text-purple-600',
    },
    {
      title: 'Top Performing Product',
      value: data.topPerformingSubject,
      previousValue: data.previousSubjectRevenue,
      previousPercent: makePercent(data.previousSubjectRevenueNum, data.subjectRevenueNum),
      change: data.subjectChange,
      icon: 'solar:medal-star-bold-duotone',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      changeColor: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} rounded-xl p-6 border border-gray-200/50`}>
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 ${card.bgColor
                .replace('50', '200')
                .replace('100', '300')} rounded-md flex items-center justify-center`}
            >
              <Icon icon={card.icon} className={card.iconColor} width={24} />
            </div>
            <div className="text-right">
              <div
                className={`text-xs font-medium ${card.changeColor} bg-white/70 px-2 py-1 rounded-full flex items-center gap-1`}
              >
                <Icon icon="solar:alt-arrow-up-bold" width={12} />
                {card.change}
                <span className="text-xs text-gray-500 ml-1">Target</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>

          {/* Previous period comparison */}
          <div className="mt-4 pt-4 border-t border-gray-200/30">
            <div className="flex items-center justify-between text-xs">
              <div className="text-gray-500">
                <span className={`ml-0 text-xs font-medium ${card.changeColor} bg-white/70 px-2 py-1 rounded-full flex items-center gap-1`}>
                  <Icon icon="solar:alt-arrow-up-bold" width={12} />
                  {card.previousPercent}
                  <span className="text-xs text-gray-500 ml-1">Previous Year</span>
                </span>
              </div>
              {/* decorative dots removed */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueSummaryCards;
