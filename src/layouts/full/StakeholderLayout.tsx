import { FC, useState } from 'react';
import { Outlet } from 'react-router';
import { Icon } from '@iconify/react';
import { TIME_RANGES, PRODUCTS, GEOGRAPHIC_ZONES, INDIAN_STATES, UG_PRODUCTS, PG_PRODUCTS, PRINTED_NOTES_PRODUCTS, STATE_ZONE_MAP } from '../../utils/constants';
import { useUiStore } from 'src/stores/uiStore';
import Profile from './header/Profile';
import ScrollToTop from 'src/components/shared/ScrollToTop';
import { Navbar, Sidebar, Drawer } from 'flowbite-react';
import FullLogo from './shared/logo/FullLogo';
// @ts-ignore
import SimpleBar from 'simplebar-react';
import MobileSidebar from './sidebar/MobileSidebar';

const StakeholderLayout: FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1month');
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('all');

  // Get additional state from UI store
  const { startDate, endDate, setDateRange } = useUiStore();

  // Handle refresh action
  const handleRefresh = () => {
    window.location.reload();
  };

  // Mobile sidebar drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const openMobileSidebar = () => setIsMobileOpen(true);
  const closeMobileSidebar = () => setIsMobileOpen(false);

  // Format date range for display
  const formatDateRange = () => {
    if (selectedTimeRange === 'custom') {
      const start = new Date(startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const end = new Date(endDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return `${start} - ${end}`;
    }

    const rangeLabels: { [key: string]: string } = {
      today: 'Today',
      yesterday: 'Yesterday',
      '7days': 'Last 7 Days',
      '15days': 'Last 15 Days',
      '1month': 'Last Month',
      '3months': 'Last 3 Months',
      '6months': 'Last 6 Months',
      '1year': 'Last Year',
    };

    return rangeLabels[selectedTimeRange] || 'Last 7 Days';
  };

  // Compute filtered products based on selected group
  let filteredProducts = PRODUCTS;
  if (selectedGroup === 'UG') filteredProducts = UG_PRODUCTS;
  else if (selectedGroup === 'PG') filteredProducts = PG_PRODUCTS;
  else if (selectedGroup === 'printed-notes') filteredProducts = PRINTED_NOTES_PRODUCTS;

  // Compute filtered states based on selected zone
  let filteredStates: string[] = [];
  let normalizedZone = selectedZone;
  if (normalizedZone.endsWith(' Zone')) normalizedZone = normalizedZone.replace(' Zone', '');
  if (selectedZone === 'all') {
    filteredStates = Object.keys(STATE_ZONE_MAP);
  } else {
    filteredStates = Object.keys(STATE_ZONE_MAP).filter(st => (STATE_ZONE_MAP as Record<string, string>)[st] === normalizedZone);
  }

  return (
    <>
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        {/* Stakeholder Sidebar - Match main dashboard styling */}
        <div className="xl:block hidden">
          <Sidebar
            className="fixed menu-sidebar bg-white dark:bg-darkgray rtl:pe-4 rtl:ps-0"
            aria-label="Stakeholder navigation sidebar"
          >
            {/* Logo */}
            <div className="px-6 py-4 flex items-center sidebarlogo">
              <FullLogo />
            </div>



            <SimpleBar>
              <Sidebar.Items className="px-5 mt-2">
                <Sidebar.ItemGroup className="sidebar-nav hide-menu">
                  <div className="caption">
                    <h5 className="text-link dark:text-white/70 caption font-semibold leading-6 tracking-widest text-xs pb-2 uppercase">
                      STAKEHOLDER VIEWS
                    </h5>
                    {[
                      { id: 'overview', label: 'Overview', icon: 'solar:chart-2-bold-duotone' },
                      { id: 'colleges', label: 'College Wise', icon: 'solar:buildings-3-bold-duotone' },
                      { id: 'product-wise', label: 'Product Wise', icon: 'solar:box-bold-duotone' },
                      { id: 'geography', label: 'Geography', icon: 'solar:map-point-bold-duotone' },
                      {
                        id: 'sales',
                        label: 'Agent Wise',
                        icon: 'solar:users-group-two-rounded-bold-duotone',
                      },
                    ].map((view) => (
                      <div key={view.id} className="mb-1">
                        <button
                          onClick={() => setSelectedView(view.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                            selectedView === view.id
                              ? 'bg-lightprimary text-primary dark:bg-primary/20 dark:text-primary'
                              : 'text-ld hover:bg-lightprimary hover:text-primary dark:text-white dark:hover:bg-primary/20 dark:hover:text-primary'
                          }`}
                        >
                          <Icon icon={view.icon} width={20} />
                          {view.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </SimpleBar>
          </Sidebar>
        </div>

        <div className="page-wrapper flex flex-col flex-1">
          {/* Stakeholder Navbar Header */}
          <header className="sticky top-0 z-[5] bg-indigo-600 shadow-lg rounded-b-lg overflow-hidden">
            <Navbar fluid className="bg-transparent py-4 md:py-8 px-4 md:px-6">
               <div className="flex items-center justify-between w-full">
                 {/* Left side - Mobile menu button and title */}
                 <div className="flex items-center gap-4">
                  {/* Mobile menu button */}
                  <button
                    className="xl:hidden p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openMobileSidebar();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        openMobileSidebar();
                      }
                    }}
                    aria-label="Open sidebar"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  
                  {/* Title for all screen sizes */}
                  <div>
                    <h1 className="text-lg md:text-2xl font-bold text-white">
                      Stakeholder Dashboard
                    </h1>
                    <p className="text-emerald-100 text-sm md:text-base hidden sm:block">Business Intelligence & Analytics</p>
                  </div>
                 </div>

                 {/* Right side - Filters and Controls */}
                 <div className="flex items-center gap-3 flex-wrap">
                  {/* Time Range Filter */}
                  <div className="hidden xl:flex items-center gap-2">
                    <select
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value)}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white text-sm focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    >
                      {TIME_RANGES.map((range) => (
                        <option key={range.value} value={range.value} className="text-gray-900">
                          {range.label}
                        </option>
                      ))}
                    </select>

                    {/* Custom Date Range Inputs */}
                    {selectedTimeRange === 'custom' && (
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setDateRange(e.target.value, endDate)}
                          className="px-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded text-white text-sm focus:ring-2 focus:ring-white/50"
                        />
                        <span className="text-white text-sm">to</span>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setDateRange(startDate, e.target.value)}
                          className="px-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded text-white text-sm focus:ring-2 focus:ring-white/50"
                        />
                      </div>
                    )}
                  </div>

                  {/* Group Filter - should come before Product Filter */}
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="hidden md:block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white text-sm focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  >
                    <option value="all" className="text-gray-900">All Groups</option>
                    <option value="UG" className="text-gray-900">UG</option>
                    <option value="PG" className="text-gray-900">PG</option>
                    <option value="printed-notes" className="text-gray-900">Printed Notes</option>
                  </select>

                  {/* Product Filter (renamed from Subjects) - now comes after Group */}
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="hidden md:block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white text-sm focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  >
                    <option value="all" className="text-gray-900">
                      All Products
                    </option>
                    {filteredProducts.map((product) => (
                      <option key={product} value={product} className="text-gray-900">
                        {product}
                      </option>
                    ))}
                  </select>

                  {/* Zone Filter (moved before State) */}
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="hidden md:block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white text-sm focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  >
                    <option value="all" className="text-gray-900">
                      All Zones
                    </option>
                    {GEOGRAPHIC_ZONES.map((zone) => (
                      <option key={zone} value={zone} className="text-gray-900">
                        {zone}
                      </option>
                    ))}
                  </select>

                  {/* State Filter (after Zone) */}
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="hidden md:block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white text-sm focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  >
                    <option value="all" className="text-gray-900">All States</option>
                    {filteredStates.map((st) => (
                      <option key={st} value={st} className="text-gray-900">
                        {st}
                      </option>
                    ))}
                  </select>

                  {/* Current Range Display removed to avoid duplication with the time range filter */}

                  {/* Refresh Button */}
                  <button
                    onClick={handleRefresh}
                    className="px-3 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-colors flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  {/* Profile */}
                  <Profile />
                </div>
              </div>

              {/* Mobile Navigation - Show navigation tabs on mobile */}
            </Navbar>
          </header>

          {/* Mobile Sidebar Drawer - renders stakeholder sidebar on mobile with filters on top */}
          <Drawer open={isMobileOpen} onClose={closeMobileSidebar} className="w-80 md:w-96 z-[9999]" position="left" aria-label="Stakeholder sidebar drawer">
            <div className="h-full bg-white dark:bg-darkgray flex flex-col">
              <div className="px-6 py-4 flex items-center sidebarlogo">
                <FullLogo />
              </div>

              {/* Filters block for mobile - placed above stakeholder views */}
              <div className="px-5 pb-4 border-b border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">Filters</h4>
                <div className="flex flex-col gap-3">
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {TIME_RANGES.map((r) => (
                      <option key={r.value} value={r.value} className="text-gray-900">
                        {r.label}
                      </option>
                    ))}
                  </select>

                  {/* Group Filter (mobile) - should come before Product Filter */}
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="all">All Groups</option>
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                    <option value="printed-notes">Printed Notes</option>
                  </select>

                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="all">All Products</option>
                    {filteredProducts.map((p) => (
                      <option key={p} value={p} className="text-gray-900">
                        {p}
                      </option>
                    ))}
                  </select>

                  {/* Zone Filter (moved before State) */}
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="all">All Zones</option>
                    {GEOGRAPHIC_ZONES.map((z) => (
                      <option key={z} value={z} className="text-gray-900">
                        {z}
                      </option>
                    ))}
                  </select>

                  {/* State Filter (after Zone) */}
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="all">All States</option>
                    {filteredStates.map((st) => (
                      <option key={st} value={st} className="text-gray-900">
                        {st}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={() => closeMobileSidebar()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTimeRange('1month');
                        setSelectedSubject('all');
                        setSelectedZone('all');
                        setSelectedState('all');
                      }}
                      className="flex-1 px-3 py-2 rounded-md text-sm bg-gray-100"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <SimpleBar className="flex-1">
                <div className="px-5 mt-4">
                  <div className="caption">
                    <h5 className="text-link dark:text-white/70 caption font-semibold leading-6 tracking-widest text-xs pb-2 uppercase">
                      STAKEHOLDER VIEWS
                    </h5>
                    {[
                      { id: 'overview', label: 'Overview', icon: 'solar:chart-2-bold-duotone' },
                      { id: 'colleges', label: 'College Wise', icon: 'solar:buildings-3-bold-duotone' },
                      { id: 'product-wise', label: 'Product Wise', icon: 'solar:box-bold-duotone' },
                      { id: 'geography', label: 'Geography', icon: 'solar:map-point-bold-duotone' },
                      {
                        id: 'sales',
                        label: 'Agent Wise',
                        icon: 'solar:users-group-two-rounded-bold-duotone',
                      },
                    ].map((view) => (
                      <div key={view.id} className="mb-1">
                        <button
                          onClick={() => {
                            setSelectedView(view.id);
                            closeMobileSidebar();
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                            selectedView === view.id
                              ? 'bg-lightprimary text-primary dark:bg-primary/20 dark:text-primary'
                              : 'text-ld hover:bg-lightprimary hover:text-primary dark:text-white dark:hover:bg-primary/20 dark:hover:text-primary'
                          }`}
                        >
                          <Icon icon={view.icon} width={20} />
                          {view.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </SimpleBar>
            </div>
          </Drawer>

          {/* Main Content Area */}
          <div className="flex-1 p-4 md:p-6 dark:bg-darkgray bg-gray-50">
            <ScrollToTop>
              <></>
            </ScrollToTop>
            <Outlet context={{ selectedTimeRange, selectedView, selectedSubject, selectedZone, selectedState, setSelectedView, setSelectedState, selectedGroup, filteredProducts }} />
          </div>
         </div>
       </div>
     </>
   );
 };
 
 export default StakeholderLayout;