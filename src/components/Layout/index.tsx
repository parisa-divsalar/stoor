import { ReactNode } from 'react';

import classes from '@/components/Layout/layout.module.css';
import SideBar from '@/components/Layout/SideBar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classes.root}>
      <div className={classes.sidebarContainer}>
        <SideBar />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Layout;


