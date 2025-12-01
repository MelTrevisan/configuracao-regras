import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit2,
  User,
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Download,
  Plus
} from 'lucide-react';
import '../styles/AssociadosList.css';

const AssociadosList = ({ onNavigate }) => {
  const [associados, setAssociados] = useState([]);
  const [filteredAssociados, setFilteredAssociados] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAssociado, setSelectedAssociado] = useState(null);

  // Dados mockados dos associados
  useEffect(() => {
    const mockAssociados = [
      {
        id: 1,
        titulo: 'ASSO-2025-001',
        codigo: '12345',
        nome: 'Caio Ventura da Silva',
        cpf: '123.456.789-09',
        admissao: '2020-01-15',
        efetividade: '2020-04-15',
        situacao: 'ativo',
        condicao: 'regular',
        classe: 'efetivo',
        responsavel: '789',
        ultimaAtualizacao: '2025-01-08',
        tempoEfetividade: '4 anos, 8 meses e 25 dias',
        direitoSocial: true,
        cortesiaGaragem: false,
        cobrancaResponsavel: true
      },
      {
        id: 2,
        titulo: 'ASSO-2025-002',
        codigo: '12346',
        nome: 'Ana Costa Lima',
        cpf: '987.654.321-00',
        admissao: '2019-03-20',
        efetividade: '2019-06-20',
        situacao: 'ativo',
        condicao: 'regular',
        classe: 'beneficiario',
        responsavel: '456',
        ultimaAtualizacao: '2025-01-07',
        tempoEfetividade: '5 anos, 9 meses e 18 dias',
        direitoSocial: true,
        cortesiaGaragem: true,
        cobrancaResponsavel: false
      },
      {
        id: 3,
        titulo: 'ASSO-2025-003',
        codigo: '12347',
        nome: 'Pedro Mendes Santos',
        cpf: '456.789.123-45',
        admissao: '2021-07-10',
        efetividade: '2021-10-10',
        situacao: 'suspenso',
        condicao: 'irregular',
        classe: 'efetivo',
        responsavel: '789',
        ultimaAtualizacao: '2025-01-06',
        tempoEfetividade: '3 anos, 5 meses e 28 dias',
        direitoSocial: false,
        cortesiaGaragem: false,
        cobrancaResponsavel: true
      },
      {
        id: 4,
        titulo: 'ASSO-2025-004',
        codigo: '12348',
        nome: 'Fernanda Oliveira',
        cpf: '789.123.456-78',
        admissao: '2018-11-05',
        efetividade: '2019-02-05',
        situacao: 'ativo',
        condicao: 'regular',
        classe: 'dependente',
        responsavel: '123',
        ultimaAtualizacao: '2025-01-05',
        tempoEfetividade: '6 anos, 2 meses e 3 dias',
        direitoSocial: true,
        cortesiaGaragem: false,
        cobrancaResponsavel: false
      },
      {
        id: 5,
        titulo: 'ASSO-2025-005',
        codigo: '12349',
        nome: 'Roberto Silva Costa',
        cpf: '321.654.987-12',
        admissao: '2022-02-14',
        efetividade: '2022-05-14',
        situacao: 'inativo',
        condicao: 'pendente',
        classe: 'temporario',
        responsavel: '456',
        ultimaAtualizacao: '2025-01-04',
        tempoEfetividade: '2 anos, 10 meses e 24 dias',
        direitoSocial: false,
        cortesiaGaragem: false,
        cobrancaResponsavel: true
      }
    ];
    
    setAssociados(mockAssociados);
    setFilteredAssociados(mockAssociados);
  }, []);

  // Opções para filtros
  const filterOptions = {
    situacao: ['ativo', 'inativo', 'suspenso', 'afastado', 'transferido', 'demitido', 'aposentado', 'falecido'],
    condicao: ['regular', 'irregular', 'pendente', 'suspenso', 'bloqueado'],
    classe: ['efetivo', 'beneficiario', 'dependente', 'convidado', 'temporario'],
    responsavel: ['123', '456', '789'],
    direitoSocial: ['sim', 'não'],
    cortesiaGaragem: ['sim', 'não'],
    cobrancaResponsavel: ['sim', 'não']
  };

  // Campos disponíveis para ordenação
  const sortableFields = [
    { key: 'titulo', label: 'Título' },
    { key: 'codigo', label: 'Código' },
    { key: 'nome', label: 'Nome' },
    { key: 'cpf', label: 'CPF' },
    { key: 'admissao', label: 'Admissão' },
    { key: 'efetividade', label: 'Efetividade' },
    { key: 'situacao', label: 'Situação' },
    { key: 'condicao', label: 'Condição' },
    { key: 'classe', label: 'Classe' },
    { key: 'responsavel', label: 'Responsável' },
    { key: 'ultimaAtualizacao', label: 'Última Atualização' }
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
    // Simular exportação de dados
    alert('Exportando dados dos associados...');
  };

  // Aplicar filtros e ordenação
  useEffect(() => {
    let filtered = [...associados];

    // Aplicar filtros
    Object.entries(filters).forEach(([field, value]) => {
      if (value && value !== '') {
        if (field.includes('Date')) {
          // Filtro de data
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
          // Filtro de faixa numérica
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
          // Filtro de texto
          filtered = filtered.filter(item => {
            const itemValue = item[field]?.toString().toLowerCase() || '';
            return itemValue.includes(value.toLowerCase());
          });
        }
      }
    });

    // Aplicar ordenação
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Converter para string se necessário
        if (typeof aValue === 'boolean') {
          aValue = aValue ? 'sim' : 'não';
          bValue = bValue ? 'sim' : 'não';
        }

        if (typeof aValue === 'string' && !isNaN(Date.parse(aValue))) {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredAssociados(filtered);
  }, [associados, filters, sortField, sortDirection]);

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown size={16} />;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const getStatusIcon = (situacao) => {
    switch (situacao) {
      case 'ativo':
        return <CheckCircle className="status-icon active" />;
      case 'inativo':
        return <XCircle className="status-icon inactive" />;
      case 'suspenso':
        return <AlertCircle className="status-icon suspended" />;
      default:
        return <Clock className="status-icon" />;
    }
  };

  const getStatusLabel = (situacao) => {
    return situacao.charAt(0).toUpperCase() + situacao.slice(1);
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
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        ) : type === 'dateRange' ? (
          <div className="date-range-input">
            <input
              type="date"
              className="filter-input"
              placeholder="Data inicial"
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
              placeholder="Data final"
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
    <div className="associados-list">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back">
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <Users size={28} />
            Lista de Associados - Club Athletico Paulistano
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
          <button className="btn-primary">
            <Plus size={20} />
            Novo Associado
          </button>
        </div>
      </header>

      <div className="page-content">
        {/* Filtros */}
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
              {renderFilterField('titulo', 'Título')}
              {renderFilterField('codigo', 'Código', 'numberRange')}
              {renderFilterField('nome', 'Nome')}
              {renderFilterField('cpf', 'CPF')}
              {renderFilterField('admissao', 'Admissão', 'dateRange')}
              {renderFilterField('efetividade', 'Efetividade', 'dateRange')}
              {renderFilterField('situacao', 'Situação', 'select')}
              {renderFilterField('condicao', 'Condição', 'select')}
              {renderFilterField('classe', 'Classe', 'select')}
              {renderFilterField('responsavel', 'Responsável', 'select')}
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className="stats-section">
          <div className="stat-card">
            <Users size={24} />
            <div>
              <h3>Total de Associados</h3>
              <p>{filteredAssociados.length} de {associados.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <CheckCircle size={24} />
            <div>
              <h3>Ativos</h3>
              <p>{filteredAssociados.filter(a => a.situacao === 'ativo').length}</p>
            </div>
          </div>
          <div className="stat-card">
            <AlertCircle size={24} />
            <div>
              <h3>Suspensos</h3>
              <p>{filteredAssociados.filter(a => a.situacao === 'suspenso').length}</p>
            </div>
          </div>
          <div className="stat-card">
            <XCircle size={24} />
            <div>
              <h3>Inativos</h3>
              <p>{filteredAssociados.filter(a => a.situacao === 'inativo').length}</p>
            </div>
          </div>
        </div>

        {/* Lista de Associados */}
        <div className="associados-table">
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

          {filteredAssociados.length === 0 ? (
            <div className="empty-state">
              <Users size={48} />
              <h3>Nenhum associado encontrado</h3>
              <p>Não há associados que correspondam aos filtros aplicados</p>
            </div>
          ) : (
            filteredAssociados.map(associado => (
              <div key={associado.id} className="table-row">
                <div className="cell" data-label="Título">
                  <strong>{associado.titulo}</strong>
                </div>
                <div className="cell" data-label="Código">{associado.codigo}</div>
                <div className="cell" data-label="Nome">
                  <div className="associado-info">
                    <strong>{associado.nome}</strong>
                    <small>CPF: {associado.cpf}</small>
                  </div>
                </div>
                <div className="cell" data-label="CPF">{associado.cpf}</div>
                <div className="cell" data-label="Admissão">{new Date(associado.admissao).toLocaleDateString('pt-BR')}</div>
                <div className="cell" data-label="Efetividade">{new Date(associado.efetividade).toLocaleDateString('pt-BR')}</div>
                <div className="cell" data-label="Situação">
                  <span className={`status-badge ${associado.situacao}`}>
                    {getStatusIcon(associado.situacao)}
                    {getStatusLabel(associado.situacao)}
                  </span>
                </div>
                <div className="cell" data-label="Condição">{getStatusLabel(associado.condicao)}</div>
                <div className="cell" data-label="Classe">{getStatusLabel(associado.classe)}</div>
                <div className="cell" data-label="Responsável">{associado.responsavel}</div>
                <div className="cell" data-label="Última Atualização">{new Date(associado.ultimaAtualizacao).toLocaleDateString('pt-BR')}</div>
                <div className="cell actions" data-label="Ações">
                  <button 
                    className="btn-icon" 
                    title="Visualizar"
                    onClick={() => {
                      console.log('Navegando para associado:', associado);
                      onNavigate && onNavigate('associado', associado);
                    }}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="btn-icon" 
                    title="Editar"
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

export default AssociadosList;
