import { Sidebar } from 'flowbite-react';
import SidebarContent from './Sidebaritems';
import NavItems from './NavItems';
// @ts-ignore
import SimpleBar from 'simplebar-react';
import React from 'react';
import FullLogo from '../shared/logo/FullLogo';
import 'simplebar-react/dist/simplebar.min.css';
import { useAuthStore } from 'src/stores/authStore';
import { useUiStore } from 'src/stores/uiStore';

const MobileSidebar = () => {
  const { colleges } = useAuthStore();
  const { selectedCollege, setSelectedCollege } = useUiStore();

  return (
    <>
      <div>
        <Sidebar
          className="fixed inset-0 md:inset-auto md:top-0 md:left-0 md:w-80 menu-sidebar pt-0 bg-white dark:bg-darkgray transition-all"
          aria-label="Sidebar with multi-level dropdown example"
        >
          <div className="px-5 py-4 pb-7 flex items-center sidebarlogo">
            <FullLogo />
          </div>

          {/* College Selector for Mobile */}
          <div className="px-5 pb-4">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select College
              </label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {colleges &&
                  // explicitly type college and index to avoid implicit any
                  (colleges as Array<any>).map((college: any, idx: number) => (
                    <option key={idx} value={college.name}>
                      {college.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <SimpleBar className="h-[calc(100vh_-_180px)] md:h-[calc(100vh_-_120px)]">
            <Sidebar.Items className="px-5 mt-2">
              <Sidebar.ItemGroup className="sidebar-nav hide-menu">
                {SidebarContent &&
                  // explicitly type SidebarContent and mapping parameters
                  (SidebarContent as Array<any>).map((item: any, itemIdx: number) => (
                    <div className="caption" key={item.heading}>
                      <React.Fragment key={itemIdx}>
                        <h5 className="text-link dark:text-white/70 caption font-semibold leading-6 tracking-widest text-xs pb-2 uppercase">
                          {item.heading}
                        </h5>
                        {item.children?.map((child: any, childIdx: number) => (
                          <React.Fragment key={child.id ?? childIdx}>
                            <div className="w-full">
                              <NavItems item={child} />
                            </div>
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    </div>
                  ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </SimpleBar>
        </Sidebar>
      </div>
    </>
  );
};

export default MobileSidebar;
