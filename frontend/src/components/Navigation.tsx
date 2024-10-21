import React from 'react'
import { Nav } from '@douyinfe/semi-ui'
import { IconUser, IconUserGroup, IconKey, IconHome } from '@douyinfe/semi-icons'
import { useNavigate, useLocation } from 'react-router-dom'

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    { itemKey: '/', text: 'Dashboard', icon: <IconHome /> },
    { itemKey: '/users', text: 'Users', icon: <IconUser /> },
    { itemKey: '/roles', text: 'Roles', icon: <IconUserGroup /> },
    { itemKey: '/permissions', text: 'Permissions', icon: <IconKey /> },
  ]

  return (
    <Nav
      items={items}
      mode="horizontal"
      onSelect={key => navigate(key.itemKey as string)}
      selectedKeys={[location.pathname]}
    />
  )
}

export default Navigation
