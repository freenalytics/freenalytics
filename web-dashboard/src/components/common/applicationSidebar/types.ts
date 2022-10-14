import React from 'react';

export type SidebarActiveItem = 'dashboard' | 'settings';

export interface SidebarProps {
  active: SidebarActiveItem
  children: React.ReactNode
}
