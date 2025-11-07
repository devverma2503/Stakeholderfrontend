import { useOutletContext } from 'react-router';
import RevenueSummaryCards from '../../components/stakeholder/RevenueSummaryCards';
import RevenueAnalytics from '../../components/stakeholder/RevenueAnalytics';
import CourseSalesDistribution from '../../components/stakeholder/CourseSalesDistribution';
import GeographyRevenue from '../../components/stakeholder/GeographyRevenue';
import CourseRevenueTable from '../../components/stakeholder/CourseRevenueTable';
import SalesTeamPerformance from '../../components/stakeholder/SalesTeamPerformance';
import InstituteLevelEngagement from '../../components/stakeholder/InstituteLevelEngagement';
import CollegePerformanceOverview from '../../components/stakeholder/CollegePerformanceOverview';
import CollegeEngagementAnalytics from '../../components/stakeholder/CollegeEngagementAnalytics';
import CollegeSubjectPerformance from '../../components/stakeholder/CollegeSubjectPerformance';
import { Icon } from '@iconify/react';

interface OutletContext {
  selectedTimeRange: string;
  selectedView: string;
  selectedSubject: string;
  selectedZone: string;
  selectedState?: string;
  setSelectedView: (view: string) => void;
  selectedGroup?: string;
  filteredProducts?: string[];
}

const StakeholderDashboard = () => {
  const { selectedTimeRange, selectedView, selectedSubject, selectedZone, filteredProducts = [] } = useOutletContext<OutletContext>();

  return (
    <div className="space-y-6">
      {/* Revenue Summary Cards - Always visible */}
      <RevenueSummaryCards
        timeRange={selectedTimeRange}
        selectedSubject={selectedSubject}
        selectedZone={selectedZone}
        filteredProducts={filteredProducts}
      />

      {/* Dynamic Content Based on Selected View */}
      {selectedView === 'overview' && (
        <>
          {/* Revenue Analytics */}
          <RevenueAnalytics
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            filteredProducts={filteredProducts}
          />

          {/* Key Performance Grid */}
          {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6"> */}
          <CourseSalesDistribution
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            filteredProducts={filteredProducts}
          />
          {/* </div> */}

          {/* Geography Revenue with India Map */}
          <GeographyRevenue
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            showFullMetrics={false}
          />

          <CourseRevenueTable
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            filteredProducts={filteredProducts}
          />
        </>
      )}

      {selectedView === 'product-wise' && (
        <>
          {/* Product Wise view - reuse course/product related components */}
          <CourseSalesDistribution
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            filteredProducts={filteredProducts}
          />
          <CourseRevenueTable
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            filteredProducts={filteredProducts}
          />
        </>
      )}

      {selectedView === 'revenue' && (
        <>
          <RevenueAnalytics
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            filteredProducts={filteredProducts}
          />
          <CourseRevenueTable
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            filteredProducts={filteredProducts}
          />
        </>
      )}

      {selectedView === 'courses' && (
        <>
          <CourseSalesDistribution
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            filteredProducts={filteredProducts}
          />
          <CourseRevenueTable
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
            filteredProducts={filteredProducts}
          />
          {/* <InstituteLevelEngagement
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          /> */}
        </>
      )}

      {selectedView === 'colleges' && (
        <>
          <CollegePerformanceOverview
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <CollegeEngagementAnalytics
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <CollegeSubjectPerformance
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <InstituteLevelEngagement
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
        </>
      )}

      {selectedView === 'geography' && (
        <>
          <GeographyRevenue
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          {/* <RevenueAnalytics
              timeRange={selectedTimeRange}
              selectedSubject={selectedSubject}
              selectedZone={selectedZone}
              showGeographyFilter={true}
            />
            <CourseSalesDistribution
              timeRange={selectedTimeRange}
              selectedSubject={selectedSubject}
              selectedZone={selectedZone}
              showGeographyFilter={true}
            /> */}
        </>
      )}

      {selectedView === 'sales' && (
        <>
          <SalesTeamPerformance
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          {/* <RevenueAnalytics
        timeRange={selectedTimeRange}
        selectedSubject={selectedSubject}
        selectedZone={selectedZone}
        showSalesFilter={true}
        />
        <InstituteLevelEngagement
        timeRange={selectedTimeRange}
        selectedSubject={selectedSubject}
        selectedZone={selectedZone}
        /> */}
        </>
      )}

      {/* Footer */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <p className="text-base text-gray-600">
          DigiNerve Stakeholder Dashboard • Business Intelligence Platform •{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default StakeholderDashboard;
