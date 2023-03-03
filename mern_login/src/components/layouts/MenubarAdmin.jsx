import * as React from 'react';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

export default function MenubarAdmin() {


  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper'}} >
        <NavLink to="/admin/index"><label htmlFor="" className="mt-2 mx-3">แดชบอร์ด</label></NavLink>
        <NavLink to="/admin/manage_admin"><label htmlFor="" className="mt-2 mx-3">จัดการผู้ใช้งาน</label></NavLink>
    </Box>
  );
}