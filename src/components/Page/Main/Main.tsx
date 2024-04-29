import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

interface MenuItem {
  key: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { key: '1', label: 'TH' },
  { key: '2', label: 'ENG' },
];

const menu = (
  <Menu onClick={(e) => console.log('Menu click', e)}>
    {menuItems.map(item => (
      <Menu.Item key={item.key}>{item.label}</Menu.Item>
    ))}
  </Menu>
);



const Main: React.FC = () => {


  return (
    <>
      <div><h1>หน้าหลัก</h1> 
        <div className="right-align-dropdown">
          <Dropdown overlay={menu}>
            <Button>
              แปลภาษา <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className='main-menu'>
          <Link to="/SPA"><Button>การจัดหน้าฟรอม</Button></Link>
          <Link to="/LA"><Button>Layout&style</Button></Link>
          
        </div>
      </div>
    </>
  );
}

export default Main;
