import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit2,
  Plus,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import '../styles/ClubesConveniados.css';

const ClubesConveniadosList = ({ onNavigate }) => {
  const [clubes, setClubes] = useState([]);
  const [filteredClubes, setFilteredClubes] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  // Dados mockados dos clubes conveniados
  useEffect(() => {
    const mockClubes = [
      {
        id: 1,
        nome: 'Clube Atlético Mineiro',
        codigo: 'CAM-001',
        diasUtilizacao: 30,
        frequenciaAcesso: 'Mensal',
        periodoInicial: '2025-01-01',
        periodoFinal: '2025-01-31',
        quantidadeFracoes: 10,
        dataFimVigencia: '2025-12-31',
        dataInicioVigencia: '2024-01-01',
        dataInicioConvenio: '2023-12-01',
        status: 'ativo',
        ativo: true,
        logradouro: 'Avenida Antônio Abrahão Caram',
        numero: '1001',
        complemento: 'Sede Social',
        bairro: 'Pampulha',
        cep: '31270-901'
      },
      {
        id: 2,
        nome: 'Clube de Regatas Flamengo',
        codigo: 'CRF-002',
        diasUtilizacao: 60,
        frequenciaAcesso: 'Semestre',
        periodoInicial: '2025-01-01',
        periodoFinal: '2025-06-30',
        quantidadeFracoes: 20,
        dataFimVigencia: '2026-12-31',
        dataInicioVigencia: '2024-01-01',
        dataInicioConvenio: '2023-11-15',
        status: 'ativo',
        ativo: true,
        logradouro: 'Rua Barão de São Francisco',
        numero: '53',
        complemento: '',
        bairro: 'Vasco da Gama',
        cep: '20921-060'
      },
      {
        id: 3,
        nome: 'São Paulo Futebol Clube',
        codigo: 'SPFC-003',
        diasUtilizacao: 365,
        frequenciaAcesso: 'Ano',
        periodoInicial: '2025-01-01',
        periodoFinal: '2025-12-31',
        quantidadeFracoes: 50,
        dataFimVigencia: '2027-12-31',
        dataInicioVigencia: '2023-01-01',
        dataInicioConvenio: '2022-12-01',
        status: 'ativo',
        ativo: true,
        logradouro: 'Praça Roberto Gomes Pedrosa',
        numero: '1',
        complemento: 'Morumbi',
        bairro: 'Morumbi',
        cep: '05653-070'
      },
      {
        id: 4,
        nome: 'Clube Atlético Paranaense',
        codigo: 'CAP-004',
        diasUtilizacao: 15,
        frequenciaAcesso: 'Período Específico',
        periodoInicial: '2025-02-01',
        periodoFinal: '2025-02-15',
        quantidadeFracoes: 5,
        dataFimVigencia: '2025-06-30',
        dataInicioVigencia: '2024-07-01',
        dataInicioConvenio: '2024-06-01',
        status: 'ativo',
        ativo: true,
        logradouro: 'Rua Buenos Aires',
        numero: '1260',
        complemento: '',
        bairro: 'Água Verde',
        cep: '80620-010'
      },
      {
        id: 5,
        nome: 'Grêmio Foot-Ball Porto Alegrense',
        codigo: 'GFPA-005',
        diasUtilizacao: 90,
        frequenciaAcesso: 'Semestre',
        periodoInicial: '2025-01-01',
        periodoFinal: '2025-03-31',
        quantidadeFracoes: 15,
        dataFimVigencia: '2025-05-31',
        dataInicioVigencia: '2024-06-01',
        dataInicioConvenio: '2024-05-01',
        status: 'vencido',
        ativo: false,
        logradouro: 'Avenida Padre Leopoldo Brentano',
        numero: '110',
        complemento: '',
        bairro: 'Humaitá',
        cep: '90250-590'
      }
    ];
    
    setClubes(mockClubes);
    setFilteredClubes(mockClubes);
  }, []);

  const filterOptions = {
    frequenciaAcesso: ['Ano', 'Semestre', 'Mensal', 'Período Específico'],
    status: ['ativo', 'vencido', 'inativo'],
    ativo: ['sim', 'não']
  };

  const sortableFields = [
    { key: 'nome', label: 'Nome' },
    { key: 'codigo', label: 'Código' },
    { key: 'diasUtilizacao', label: 'Dias de Utilização' },
    { key: 'frequenciaAcesso', label: 'Frequência' },
    { key: 'periodoInicial', label: 'Período Inicial' },
    { key: 'periodoFinal', label: 'Período Final' },
    { key: 'quantidadeFracoes', label: 'Frações' },
    { key: 'dataFimVigencia', label: 'Fim de Vigência' },
    { key: 'status', label: 'Status' }
  ];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setFilters({});
    setSortField('');
    setSortDirection('asc');
  };

  const exportData = () => {
    alert('Exportando dados dos clubes conveniados...');
  };

  // Aplicar filtros e ordenação
  useEffect(() => {
    let filtered = [...clubes];

    Object.entries(filters).forEach(([field, value]) => {
      if (value && value !== '') {
        if (field.includes('Date')) {
          const [startDate, endDate] = value.split(' - ');
          filtered = filtered.filter(item => {
            const itemDate = new Date(item[field.replace('Date', '')]);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            
            if (start && end) {
              return itemDate >= start && itemDate <= end;
            } else if (start) {
              return itemDate >= start;
            } else if (end) {
              return itemDate <= end;
            }
            return true;
          });
        } else if (field.includes('Range')) {
          const [min, max] = value.split(' - ');
          filtered = filtered.filter(item => {
            const numValue = parseFloat(item[field.replace('Range', '')]);
            const minVal = min ? parseFloat(min) : null;
            const maxVal = max ? parseFloat(max) : null;
            
            if (minVal !== null && maxVal !== null) {
              return numValue >= minVal && numValue <= maxVal;
            } else if (minVal !== null) {
              return numValue >= minVal;
            } else if (maxVal !== null) {
              return numValue <= maxVal;
            }
            return true;
          });
        } else {
          filtered = filtered.filter(item => {
            const itemValue = item[field]?.toString().toLowerCase() || '';
            return itemValue.includes(value.toLowerCase());
          });
        }
      }
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (typeof aValue === 'string' && !isNaN(Date.parse(aValue))) {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredClubes(filtered);
  }, [clubes, filters, sortField, sortDirection]);

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown size={16} />;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ativo':
        return <CheckCircle className="status-icon active" />;
      case 'vencido':
        return <XCircle className="status-icon inactive" />;
      case 'inativo':
        return <AlertCircle className="status-icon suspended" />;
      default:
        return <AlertCircle className="status-icon" />;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      'ativo': 'Ativo',
      'vencido': 'Vencido',
      'inativo': 'Inativo'
    };
    return labels[status] || status;
  };

  const renderFilterField = (field, label, type = 'text') => {
    return (
      <div className="filter-field">
        <label className="filter-label">{label}:</label>
        {type === 'select' ? (
          <select
            className="filter-input"
            value={filters[field] || ''}
            onChange={(e) => handleFilterChange(field, e.target.value)}
          >
            <option value="">Todos</option>
            {filterOptions[field]?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'dateRange' ? (
          <div className="date-range-input">
            <input
              type="date"
              className="filter-input"
              value={filters[field]?.split(' - ')[0] || ''}
              onChange={(e) => {
                const currentEnd = filters[field]?.split(' - ')[1] || '';
                handleFilterChange(field, `${e.target.value} - ${currentEnd}`);
              }}
            />
            <span>até</span>
            <input
              type="date"
              className="filter-input"
              value={filters[field]?.split(' - ')[1] || ''}
              onChange={(e) => {
                const currentStart = filters[field]?.split(' - ')[0] || '';
                handleFilterChange(field, `${currentStart} - ${e.target.value}`);
              }}
            />
          </div>
        ) : type === 'numberRange' ? (
          <div className="number-range-input">
            <input
              type="number"
              className="filter-input"
              placeholder="Mín"
              value={filters[field]?.split(' - ')[0] || ''}
              onChange={(e) => {
                const currentMax = filters[field]?.split(' - ')[1] || '';
                handleFilterChange(field, `${e.target.value} - ${currentMax}`);
              }}
            />
            <span>até</span>
            <input
              type="number"
              className="filter-input"
              placeholder="Máx"
              value={filters[field]?.split(' - ')[1] || ''}
              onChange={(e) => {
                const currentMin = filters[field]?.split(' - ')[0] || '';
                handleFilterChange(field, `${currentMin} - ${e.target.value}`);
              }}
            />
          </div>
        ) : (
          <input
            type={type}
            className="filter-input"
            placeholder={`Filtrar por ${label.toLowerCase()}...`}
            value={filters[field] || ''}
            onChange={(e) => handleFilterChange(field, e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="clubes-conveniados-list">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => onNavigate && onNavigate('solicitacoes')}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <Building2 size={28} />
            Clubes Conveniados
          </h1>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={exportData}>
            <Download size={20} />
            Exportar
          </button>
          <button className="btn-secondary" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={20} />
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
          <button 
            className="btn-primary"
            onClick={() => onNavigate && onNavigate('clubes-conveniados-form')}
          >
            <Plus size={20} />
            Novo Clube
          </button>
        </div>
      </header>

      <div className="page-content">
        {showFilters && (
          <div className="filters-section">
            <div className="filters-header">
              <h3>
                <Filter size={18} />
                Filtros Avançados
              </h3>
              <button className="btn-clear-filters" onClick={clearFilters}>
                Limpar Filtros
              </button>
            </div>
            
            <div className="filters-grid">
              {renderFilterField('nome', 'Nome')}
              {renderFilterField('codigo', 'Código')}
              {renderFilterField('diasUtilizacao', 'Dias de Utilização', 'numberRange')}
              {renderFilterField('frequenciaAcesso', 'Frequência de Acesso', 'select')}
              {renderFilterField('quantidadeFracoes', 'Quantidade de Frações', 'numberRange')}
              {renderFilterField('dataFimVigencia', 'Data Fim de Vigência', 'dateRange')}
              {renderFilterField('status', 'Status', 'select')}
            </div>
          </div>
        )}

        <div className="stats-section">
          <div className="stat-card">
            <Building2 size={24} />
            <div>
              <h3>Total de Clubes</h3>
              <p>{filteredClubes.length} de {clubes.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <CheckCircle size={24} />
            <div>
              <h3>Ativos</h3>
              <p>{filteredClubes.filter(c => c.status === 'ativo').length}</p>
            </div>
          </div>
          <div className="stat-card">
            <XCircle size={24} />
            <div>
              <h3>Vencidos</h3>
              <p>{filteredClubes.filter(c => c.status === 'vencido').length}</p>
            </div>
          </div>
          <div className="stat-card">
            <AlertCircle size={24} />
            <div>
              <h3>Inativos</h3>
              <p>{filteredClubes.filter(c => c.status === 'inativo').length}</p>
            </div>
          </div>
        </div>

        <div className="clubes-table">
          <div className="table-header">
            {sortableFields.map(field => (
              <div 
                key={field.key}
                className="header-cell"
                onClick={() => handleSort(field.key)}
              >
                <span>{field.label}</span>
                {getSortIcon(field.key)}
              </div>
            ))}
            <div className="header-cell">Ações</div>
          </div>

          {filteredClubes.length === 0 ? (
            <div className="empty-state">
              <Building2 size={48} />
              <h3>Nenhum clube encontrado</h3>
              <p>Não há clubes conveniados que correspondam aos filtros aplicados</p>
            </div>
          ) : (
            filteredClubes.map(clube => (
              <div key={clube.id} className="table-row">
                <div className="cell" data-label="Nome">
                  <strong>{clube.nome}</strong>
                </div>
                <div className="cell" data-label="Código">{clube.codigo}</div>
                <div className="cell" data-label="Dias de Utilização">{clube.diasUtilizacao}</div>
                <div className="cell" data-label="Frequência">{clube.frequenciaAcesso}</div>
                <div className="cell" data-label="Período Inicial">
                  {new Date(clube.periodoInicial).toLocaleDateString('pt-BR')}
                </div>
                <div className="cell" data-label="Período Final">
                  {new Date(clube.periodoFinal).toLocaleDateString('pt-BR')}
                </div>
                <div className="cell" data-label="Frações">{clube.quantidadeFracoes}</div>
                <div className="cell" data-label="Fim de Vigência">
                  {new Date(clube.dataFimVigencia).toLocaleDateString('pt-BR')}
                </div>
                <div className="cell" data-label="Status">
                  <span className={`status-badge ${clube.status}`}>
                    {getStatusIcon(clube.status)}
                    {getStatusLabel(clube.status)}
                  </span>
                </div>
                <div className="cell actions" data-label="Ações">
                  <button 
                    className="btn-icon" 
                    title="Visualizar"
                    onClick={() => onNavigate && onNavigate('clube-conveniado-detail', clube)}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="btn-icon" 
                    title="Editar"
                    onClick={() => onNavigate && onNavigate('clubes-conveniados-form', clube)}
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubesConveniadosList;

