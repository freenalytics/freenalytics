import React from 'react';

export type SidebarActiveItem = 'dashboard' | 'entries' | 'information' | 'settings';

export interface SidebarProps {
  active: SidebarActiveItem
  domain: string
  children: React.ReactNode
}
