import React from 'react';

export type SidebarActiveItem = 'dashboard' | 'settings';

export interface SidebarProps {
  active: SidebarActiveItem
  domain: string
  children: React.ReactNode
}
