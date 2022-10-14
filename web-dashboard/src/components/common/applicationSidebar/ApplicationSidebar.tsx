import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';
import { SidebarProps } from './types';

const ApplicationSidebar: React.FC<SidebarProps> = ({ children, ...props }) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  if (isMobile) {
    return (
      <MobileSidebar {...props}>
        {children}
      </MobileSidebar>
    );
  }

  return (
    <DesktopSidebar {...props}>
      {children}
    </DesktopSidebar>
  );
};

export default ApplicationSidebar;
