import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  UserPlus, 
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Edit2,
  Plus,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  User
} from 'lucide-react';
import '../styles/Acompanhantes.css';

const AcompanhantesList = ({ onNavigate }) => {
  const [acompanhantes, setAcompanhantes] = useState([]);
  const [filteredAcompanhantes, setFilteredAcompanhantes] = useState([]);
  const [filters, setFilters] = useState({
    nome: '',
    documento: '',
    nascimentoInicial: '',
    nascimentoFinal: '',
    responsavel: '',
    periodoIni: '',
    periodoFim: '',
    situacao: 'all'
  });
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // Dados mockados dos acompanhantes
  useEffect(() => {
    const mockAcompanhantes = [
      {
        id: 1,
        nome: 'Maria Silva',
        ultimoNome: 'Santos',
        nascimento: '1990-05-15',
        sexo: 0, // 0=Feminino, 1=Masculino
        documento: '12345678900',
        tipoDocumento: 'CPF',
        situacao: 1, // 0=Inativo, 1=Ativo, 2=Sem Registro, 3=Pendente Pagto
        periodoIni: '2024-01-01',
        periodoFim: '2025-12-31',
        responsavel: {
          id: 12345,
          nome: 'João Silva',
          titulo: '12345'
        },
        nacionalidade: 'Brasileira',
        profissao: 'Advogada'
      },
      {
        id: 2,
        nome: 'Pedro',
        ultimoNome: 'Oliveira',
        nascimento: '1985-08-20',
        sexo: 1,
        documento: '98765432100',
        tipoDocumento: 'CPF',
        situacao: 1,
        periodoIni: '2024-06-01',
        periodoFim: '2025-05-31',
        responsavel: {
          id: 12346,
          nome: 'Ana Oliveira',
          titulo: '12346'
        },
        nacionalidade: 'Brasileira',
        profissao: 'Engenheiro'
      },
      {
        id: 3,
        nome: 'Carla',
        ultimoNome: 'Costa',
        nascimento: '1992-03-10',
        sexo: 0,
        documento: '11122233344',
        tipoDocumento: 'CPF',
        situacao: 3, // Pendente Pagamento
        periodoIni: '2025-01-01',
        periodoFim: '2025-12-31',
        responsavel: {
          id: 12347,
          nome: 'Roberto Costa',
          titulo: '12347'
        },
        nacionalidade: 'Brasileira',
        profissao: 'Médica'
      },
      {
        id: 4,
        nome: 'Lucas',
        ultimoNome: 'Ferreira',
        nascimento: '1988-11-25',
        sexo: 1,
        documento: '55566677788',
        tipoDocumento: 'CPF',
        situacao: 0, // Inativo
        periodoIni: '2023-01-01',
        periodoFim: '2023-12-31',
        responsavel: {
          id: 12348,
          nome: 'Patricia Ferreira',
          titulo: '12348'
        },
        nacionalidade: 'Brasileira',
        profissao: 'Professor'
      },
      {
        id: 5,
        nome: 'Fernanda',
        ultimoNome: 'Lima',
        nascimento: '1995-07-05',
        sexo: 0,
        documento: '99988877766',
        tipoDocumento: 'CPF',
        situacao: 2, // Sem Registro
        periodoIni: '2025-02-01',
        periodoFim: '2025-12-31',
        responsavel: {
          id: 12349,
          nome: 'Marcos Lima',
          titulo: '12349'
        },
        nacionalidade: 'Brasileira',
        profissao: 'Designer'
      }
    ];
    setAcompanhantes(mockAcompanhantes);
    setFilteredAcompanhantes(mockAcompanhantes);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      nome: '',
      documento: '',
      nascimentoInicial: '',
      nascimentoFinal: '',
      responsavel: '',
      periodoIni: '',
      periodoFim: '',
      situacao: 'all'
    });
  };

  useEffect(() => {
    // Aplicar filtros
    const filtered = acompanhantes.filter(acompanhante => {
      const matchesNome = !filters.nome || 
        `${acompanhante.nome} ${acompanhante.ultimoNome}`.toLowerCase().includes(filters.nome.toLowerCase());
      
      const matchesDocumento = !filters.documento || 
        acompanhante.documento.includes(filters.documento);
      
      const matchesNascimentoInicial = !filters.nascimentoInicial || 
        new Date(acompanhante.nascimento) >= new Date(filters.nascimentoInicial);
      
      const matchesNascimentoFinal = !filters.nascimentoFinal || 
        new Date(acompanhante.nascimento) <= new Date(filters.nascimentoFinal);
      
      const matchesResponsavel = !filters.responsavel || 
        acompanhante.responsavel.nome.toLowerCase().includes(filters.responsavel.toLowerCase()) ||
        acompanhante.responsavel.titulo.includes(filters.responsavel);
      
      const matchesPeriodoIni = !filters.periodoIni || 
        new Date(acompanhante.periodoIni) >= new Date(filters.periodoIni);
      
      const matchesPeriodoFim = !filters.periodoFim || 
        new Date(acompanhante.periodoFim) <= new Date(filters.periodoFim);
      
      const matchesSituacao = filters.situacao === 'all' || 
        acompanhante.situacao === parseInt(filters.situacao);

      return matchesNome && matchesDocumento && matchesNascimentoInicial && matchesNascimentoFinal &&
        matchesResponsavel && matchesPeriodoIni && matchesPeriodoFim && matchesSituacao;
    });

    // Aplicar ordenação
    if (sortField) {
      filtered = filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];

        if (sortField === 'responsavel') {
          aVal = a.responsavel.nome;
          bVal = b.responsavel.nome;
        } else if (sortField === 'nome') {
          aVal = `${a.nome} ${a.ultimoNome}`;
          bVal = `${b.nome} ${b.ultimoNome}`;
        }

        if (typeof aVal === 'string') {
          return sortDirection === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    setFilteredAcompanhantes(filtered);
  }, [acompanhantes, filters, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSituacaoLabel = (situacao) => {
    const situacoes = {
      0: { label: 'INATIVO', color: 'inativo', icon: XCircle },
      1: { label: 'ATIVO', color: 'ativo', icon: CheckCircle },
      2: { label: 'S/ REGISTRO', color: 'sem-registro', icon: AlertCircle },
      3: { label: 'PENDENTE PAGTO', color: 'pendente', icon: Clock }
    };
    return situacoes[situacao] || situacoes[0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleView = (acompanhante) => {
    onNavigate('acompanhante-detail', acompanhante);
  };

  const handleEdit = (acompanhante) => {
    onNavigate('acompanhante-form', acompanhante);
  };

  const handleNew = () => {
    onNavigate('acompanhante-form', null);
  };



  return (
    <div className="acompanhantes-list">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <UserPlus size={24} />
            Acompanhantes
          </h1>
          <div className="header-actions">
            <button className="btn-primary" onClick={handleNew}>
              <Plus size={20} />
              Novo Acompanhante
            </button>
          </div>
        </div>
      </div>

      <div className="filters-section advanced-filters">
        <div className="filters-header">
          <div className="filters-title">
            <Filter size={20} />
            <span>Filtros Avançados</span>
          </div>
          <button className="btn-clear-filters" onClick={handleClearFilters}>
            Limpar Filtros
          </button>
        </div>

        <div className="filters-grid-advanced">
          <div className="filter-item">
            <input
              type="text"
              className="filter-input"
              placeholder="NOME"
              value={filters.nome}
              onChange={(e) => handleFilterChange('nome', e.target.value)}
            />
          </div>

          <div className="filter-item">
            <input
              type="text"
              className="filter-input"
              placeholder="DOCUMENTO"
              value={filters.documento}
              onChange={(e) => handleFilterChange('documento', e.target.value)}
            />
          </div>

          <div className="filter-item filter-item-range">
            <div className="range-inputs">
              <input
                type="date"
                className="filter-input"
                placeholder="NASCIMENTO"
                value={filters.nascimentoInicial}
                onChange={(e) => handleFilterChange('nascimentoInicial', e.target.value)}
              />
              <span className="range-separator">até</span>
              <input
                type="date"
                className="filter-input"
                placeholder="NASCIMENTO"
                value={filters.nascimentoFinal}
                onChange={(e) => handleFilterChange('nascimentoFinal', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-item">
            <input
              type="text"
              className="filter-input"
              placeholder="RESPONSÁVEL"
              value={filters.responsavel}
              onChange={(e) => handleFilterChange('responsavel', e.target.value)}
            />
          </div>

          <div className="filter-item filter-item-range">
            <div className="range-inputs">
              <input
                type="date"
                className="filter-input"
                placeholder="PERÍODO INÍCIO"
                value={filters.periodoIni}
                onChange={(e) => handleFilterChange('periodoIni', e.target.value)}
              />
              <span className="range-separator">até</span>
              <input
                type="date"
                className="filter-input"
                placeholder="PERÍODO FIM"
                value={filters.periodoFim}
                onChange={(e) => handleFilterChange('periodoFim', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-item">
            <select
              className="filter-select"
              value={filters.situacao}
              onChange={(e) => handleFilterChange('situacao', e.target.value)}
            >
              <option value="all">SITUAÇÃO</option>
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
              <option value="2">Sem Registro</option>
              <option value="3">Pendente Pagamento</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('nome')} className="sortable">
                Nome
                {sortField === 'nome' && <ArrowUpDown size={14} />}
              </th>
              <th onClick={() => handleSort('documento')} className="sortable">
                Documento
                {sortField === 'documento' && <ArrowUpDown size={14} />}
              </th>
              <th onClick={() => handleSort('nascimento')} className="sortable">
                Nascimento
                {sortField === 'nascimento' && <ArrowUpDown size={14} />}
              </th>
              <th onClick={() => handleSort('responsavel')} className="sortable">
                Responsável
                {sortField === 'responsavel' && <ArrowUpDown size={14} />}
              </th>
              <th>Situação</th>
              <th onClick={() => handleSort('periodoIni')} className="sortable">
                Período Início
                {sortField === 'periodoIni' && <ArrowUpDown size={14} />}
              </th>
              <th onClick={() => handleSort('periodoFim')} className="sortable">
                Período Fim
                {sortField === 'periodoFim' && <ArrowUpDown size={14} />}
              </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAcompanhantes.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  Nenhum acompanhante encontrado
                </td>
              </tr>
            ) : (
              filteredAcompanhantes.map((acompanhante) => {
                const situacao = getSituacaoLabel(acompanhante.situacao);
                const SituacaoIcon = situacao.icon;
                return (
                  <tr key={acompanhante.id}>
                    <td>{acompanhante.nome} {acompanhante.ultimoNome}</td>
                    <td>{acompanhante.documento}</td>
                    <td>{formatDate(acompanhante.nascimento)}</td>
                    <td>
                      <div className="responsavel-info">
                        <span className="responsavel-nome">{acompanhante.responsavel.nome}</span>
                        <span className="responsavel-titulo">Título: {acompanhante.responsavel.titulo}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${situacao.color}`}>
                        <SituacaoIcon size={14} />
                        {situacao.label}
                      </span>
                    </td>
                    <td>{formatDate(acompanhante.periodoIni)}</td>
                    <td>{formatDate(acompanhante.periodoFim)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => handleView(acompanhante)}
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => handleEdit(acompanhante)}
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>Total: {filteredAcompanhantes.length} acompanhante(s)</span>
      </div>
    </div>
  );
};

export default AcompanhantesList;

