import React from 'react';

export type SidebarActiveItem = 'dashboard' | 'information' | 'settings';

export interface SidebarProps {
  active: SidebarActiveItem
  domain: string
  children: React.ReactNode
}
