import { useState } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { MEDICAL_SUBJECTS, GEOGRAPHIC_ZONES } from '../../utils/constants';

interface RevenueAnalyticsProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
  showGeographyFilter?: boolean;
  showSalesFilter?: boolean;
}

const RevenueAnalytics = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
  showGeographyFilter = false,
  showSalesFilter = false,
}: RevenueAnalyticsProps) => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedGeography, setSelectedGeography] = useState('all');
  const [selectedSalesAgent, setSelectedSalesAgent] = useState('all');

  const courses = ['All Courses', ...MEDICAL_SUBJECTS];

  const geographyOptions = ['All Regions', ...GEOGRAPHIC_ZONES];
  const salesAgents = [
    'All Agents',
    'Rajesh Kumar',
    'Priya Sharma',
    'Amit Singh',
    'Neha Patel',
    'Ravi Gupta',
  ];

  const generateRevenueData = () => {
    let baseMultiplier = 1;

    // Apply subject filter
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      baseMultiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }

    // Apply zone filter
    if (selectedZone !== 'all') {
      baseMultiplier *= 0.4; // Zone-specific data
    }

    const baseData =
      timeRange === '7days'
        ? [45000, 52000, 48000, 65000, 58000, 72000, 68000]
        : timeRange === '1month'
        ? [
            320000, 410000, 380000, 450000, 520000, 480000, 550000, 490000, 620000, 580000, 640000,
            610000, 680000, 650000, 720000, 695000, 750000, 720000, 780000, 760000, 820000, 800000,
            850000, 825000, 870000, 845000, 890000, 875000, 920000, 900000,
          ]
        : [
            8500000, 9200000, 8800000, 9800000, 10200000, 9600000, 10800000, 10400000, 11200000,
            10800000, 11600000, 11200000,
          ];

    return baseData.map((value) =>
      Math.floor(value * baseMultiplier * (0.9 + Math.random() * 0.2)),
    );
  };

  // generate previous year revenue data (slightly lower baseline and similar noise)
  const generatePreviousRevenueData = () => {
    let baseMultiplier = 0.92; // slightly lower baseline for previous year

    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      baseMultiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }

    if (selectedZone !== 'all') {
      baseMultiplier *= 0.4;
    }

    const baseData =
      timeRange === '7days'
        ? [42000, 50000, 46000, 62000, 56000, 69000, 66000]
        : timeRange === '1month'
        ? [
            300000, 395000, 365000, 430000, 500000, 460000, 530000, 475000, 600000, 560000, 615000,
            585000, 650000, 625000, 690000, 665000, 715000, 690000, 750000, 730000, 785000, 765000,
            820000, 795000, 840000, 815000, 860000, 845000, 890000, 870000,
          ]
        : [
            7800000, 8500000, 8200000, 9100000, 9500000, 9000000, 10100000, 9800000, 10600000,
            10200000, 10900000, 10600000,
          ];

    return baseData.map((value) => Math.floor(value * baseMultiplier * (0.9 + Math.random() * 0.2)));
  };

  const generateSalesData = () => {
    let baseMultiplier = 1;

    // Apply subject filter
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      baseMultiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }

    // Apply zone filter
    if (selectedZone !== 'all') {
      baseMultiplier *= 0.4; // Zone-specific data
    }

    const baseData =
      timeRange === '7days'
        ? [12, 15, 11, 18, 14, 20, 17]
        : timeRange === '1month'
        ? [
            85, 92, 88, 105, 98, 115, 108, 122, 118, 135, 128, 142, 138, 155, 148, 162, 158, 175,
            168, 182, 178, 195, 188, 202, 198, 215, 208, 222, 218, 235,
          ]
        : [450, 520, 480, 580, 540, 620, 590, 680, 650, 720, 690, 750];

    return baseData.map((value) =>
      Math.floor(value * baseMultiplier * (0.9 + Math.random() * 0.2)),
    );
  };

  // previous year sales for dotted line when showing sales metric
  const generatePreviousSalesData = () => {
    let baseMultiplier = 0.92;
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      baseMultiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }
    if (selectedZone !== 'all') {
      baseMultiplier *= 0.4;
    }

    const baseData =
      timeRange === '7days'
        ? [10, 13, 9, 16, 12, 18, 15]
        : timeRange === '1month'
        ? [
            78, 85, 82, 98, 92, 108, 103, 116, 112, 128, 122, 136, 132, 148, 142, 156, 150, 164,
            158, 172, 166, 180, 174, 188, 182, 196, 190, 204, 198, 212,
          ]
        : [420, 490, 450, 540, 500, 580, 560, 640, 610, 680, 650, 710];

    return baseData.map((value) => Math.floor(value * baseMultiplier * (0.9 + Math.random() * 0.2)));
  };

  const getChartLabels = () => {
    if (timeRange === '7days') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (timeRange === '1month') {
      return Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
  };

  // prepare current and previous data for chart
  const currentRevenueData = generateRevenueData();
  const previousRevenueData = generatePreviousRevenueData();
  const currentSalesData = generateSalesData();
  const previousSalesData = generatePreviousSalesData();

  const chartData = {
    series:
      selectedMetric === 'revenue'
        ? [
            {
              name: 'Revenue (₹) - Current',
              data: currentRevenueData,
              color: '#10b981',
            },
            {
              name: 'Revenue (₹) - Previous',
              data: previousRevenueData,
              color: '#ef4444',
            },
          ]
        : [
            { name: 'Sales Count - Current', data: currentSalesData, color: '#10b981' },
            { name: 'Sales Count - Previous', data: previousSalesData, color: '#ef4444' },
          ],
    options: {
      chart: {
        type: 'line' as const,
        height: 400,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
        },
      },
      stroke: {
        width: [3, 2],
        curve: 'smooth' as const,
        dashArray: [0, 6], // make previous year dotted
      },
      xaxis: {
        categories: getChartLabels(),
        title: {
          text: 'Time Period',
        },
      },
      yaxis: {
        title: {
          text: selectedMetric === 'revenue' ? 'Revenue (₹)' : 'Sales Count',
        },
        labels: {
          formatter: (value: number) => {
            if (selectedMetric === 'revenue') {
              if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
              if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
              if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
              return `₹${value}`;
            } else {
              return value.toString();
            }
          },
        },
      },
      grid: {
        strokeDashArray: 4,
      },
      markers: {
        size: 6,
        colors: undefined,
        strokeColors: '#fff',
        strokeWidth: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#059669'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Revenue Analytics</h2>
          <p className="text-gray-600 text-sm">
            Monthly & yearly revenue trends with course-wise breakdown
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Metric Selection */}
          <div className="flex bg-gray-100 rounded-md p-1">
            {[
              { id: 'revenue', label: 'Revenue', icon: 'solar:dollar-minimalistic-bold' },
              { id: 'sales', label: 'Sales Count', icon: 'solar:chart-2-bold' },
            ].map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedMetric === metric.id
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon icon={metric.icon} width={16} />
                {metric.label}
              </button>
            ))}
          </div>

          {/* Course Filter */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
          >
            {courses.map((course, index) => (
              <option key={index} value={course.toLowerCase().replace(/\s+/g, '-') }>
                {course}
              </option>
            ))}
          </select>

          {/* Geography Filter */}
          {showGeographyFilter && (
            <select
              value={selectedGeography}
              onChange={(e) => setSelectedGeography(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            >
              {geographyOptions.map((geo, index) => (
                <option key={index} value={geo.toLowerCase().replace(/\s+/g, '-') }>
                  {geo}
                </option>
              ))}
            </select>
          )}

          {/* Sales Agent Filter */}
          {showSalesFilter && (
            <select
              value={selectedSalesAgent}
              onChange={(e) => setSelectedSalesAgent(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            >
              {salesAgents.map((agent, index) => (
                <option key={index} value={agent.toLowerCase().replace(/\s+/g, '-') }>
                  {agent}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="mb-6">
        <Chart options={chartData.options} series={chartData.series} type="line" height={400} />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {selectedMetric === 'revenue' ? '₹1.25Cr' : '4,200'}
          </div>
          <div className="text-sm text-gray-600">
            Total {selectedMetric === 'revenue' ? 'Revenue' : 'Sales'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">+18.3%</div>
          <div className="text-sm text-gray-600">Growth Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {selectedMetric === 'revenue' ? '₹42.5L' : '1,250'}
          </div>
          <div className="text-sm text-gray-600">
            Peak {selectedMetric === 'revenue' ? 'Revenue' : 'Sales'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {selectedMetric === 'revenue' ? '₹2,800' : '8.5'}
          </div>
          <div className="text-sm text-gray-600">Average per College</div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
