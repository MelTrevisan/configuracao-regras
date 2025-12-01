import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  UserCircle, 
  ChevronLeft,
  Menu,
  List,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Building2,
  GitBranch,
  UserPlus
} from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ collapsed, onToggleCollapse, onNavigate, currentPage }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    { icon: ClipboardList, label: 'Solicitações', section: 'principal', page: 'solicitacoes' },
    { icon: Users, label: 'Associados', section: 'principal', page: 'associados' },
    { icon: UserPlus, label: 'Acompanhantes', section: 'principal', page: 'acompanhantes' },
    { icon: UserCircle, label: 'Visitantes', section: 'principal', page: 'visitantes' },
    { icon: Users, label: 'Candidatos', section: 'principal', page: 'candidatos' },
    { icon: Building2, label: 'Clubes Conveniados', section: 'principal', page: 'clubes-conveniados' },
  ];

  const configItems = [
    { icon: Settings, label: 'Configurações', page: 'configuracoes' },
    { 
      icon: List, 
      label: 'Cadastros', 
      page: 'cadastros',
      hasSubmenu: true,
      submenu: [
        { icon: UserCircle, label: 'Visitantes', page: 'cadastros-visitantes' },
        { icon: Users, label: 'Associados', page: 'cadastros-associados' },
        { icon: UserPlus, label: 'Acompanhantes', page: 'acompanhantes' },
        { icon: Users, label: 'Candidatos', page: 'cadastros-candidatos' },
        { icon: Building2, label: 'Clubes Conveniados', page: 'clubes-conveniados' }
      ]
    },
    { icon: GitBranch, label: 'Fluxo de Solicitações', page: 'fluxo-solicitacoes' },
  ];

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="user-info">
          <img 
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" 
            alt="Melissa Trevisan" 
            className="user-avatar" 
          />
          {!collapsed && (
            <div className="user-details">
              <h3>Melissa Trevisan</h3>
              <p>Diretor</p>
            </div>
          )}
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {!collapsed && <h4 className="section-title">Menu Principal</h4>}
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className={`nav-item ${currentPage === item.page ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.page);
              }}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          ))}
        </div>

        <div className="nav-section">
          {!collapsed && <h4 className="section-title">Configurações</h4>}
          {configItems.map((item, index) => (
            <div key={index}>
              {item.hasSubmenu ? (
                <>
                  <div 
                    className={`nav-item nav-item-with-submenu ${expandedMenus[item.page] ? 'expanded' : ''}`}
                    onClick={() => toggleSubmenu(item.page)}
                  >
                    <item.icon size={20} />
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && (
                      expandedMenus[item.page] ? 
                        <ChevronDown size={16} className="submenu-arrow" /> : 
                        <ChevronRight size={16} className="submenu-arrow" />
                    )}
                  </div>
                  {expandedMenus[item.page] && !collapsed && (
                    <div className="submenu">
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className={`nav-item submenu-item ${currentPage === subItem.page ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(subItem.page);
                          }}
                        >
                          <subItem.icon size={16} />
                          <span>{subItem.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a 
                  href="#" 
                  className={`nav-item ${currentPage === item.page ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.page);
                  }}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </a>
              )}
            </div>
          ))}
        </div>
      </nav>

      <button className="sidebar-toggle" onClick={onToggleCollapse}>
        {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        {!collapsed && <span>Esconder Menu</span>}
      </button>
    </div>
  );
};

export default Sidebar;
