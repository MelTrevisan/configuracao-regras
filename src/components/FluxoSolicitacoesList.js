import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  GitBranch, 
  Plus,
  Edit2,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';
import '../styles/FluxoSolicitacoes.css';

const FluxoSolicitacoesList = ({ onNavigate }) => {
  const [fluxos, setFluxos] = useState([]);
  const [filteredFluxos, setFilteredFluxos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTipoOrigem, setFilterTipoOrigem] = useState('all');

  useEffect(() => {
    const mockFluxos = [
      {
        id: 1,
        tipoSolicitacao: 'Admissão de Associado',
        tipoOrigem: 'negocio',
        descricao: 'Fluxo para admissão de novos associados ao clube',
        ativo: true,
        dataCriacao: '2024-01-15',
        workflow: {
          steps: [
            { id: 1, area: 'ADMISSAO', ordem: 1, nome: 'Análise Documental' },
            { id: 2, area: 'FINANCEIRO', ordem: 2, nome: 'Aprovação Financeira' },
            { id: 3, area: 'ADMISSAO', ordem: 3, nome: 'Finalização' }
          ]
        },
        campos: ['applicantName', 'applicantEmail', 'applicantPhone', 'applicantAddress', 'clubSection', 'description']
      },
      {
        id: 2,
        tipoSolicitacao: 'Renovação de Mensalidade',
        tipoOrigem: 'negocio',
        descricao: 'Fluxo para renovação de mensalidade com desconto',
        ativo: true,
        dataCriacao: '2024-02-10',
        workflow: {
          steps: [
            { id: 1, area: 'FINANCEIRO', ordem: 1, nome: 'Verificação de Elegibilidade' },
            { id: 2, area: 'FINANCEIRO', ordem: 2, nome: 'Aprovação Financeira' }
          ]
        },
        campos: ['applicantName', 'applicantEmail', 'description']
      },
      {
        id: 3,
        tipoSolicitacao: 'Alteração de Dados',
        tipoOrigem: 'sistema',
        descricao: 'Fluxo para alteração de dados cadastrais',
        ativo: false,
        dataCriacao: '2024-03-05',
        workflow: {
          steps: [
            { id: 1, area: 'ATENDIMENTO', ordem: 1, nome: 'Verificação de Dados' },
            { id: 2, area: 'ATENDIMENTO', ordem: 2, nome: 'Finalização' }
          ]
        },
        campos: ['applicantName', 'applicantEmail', 'applicantPhone', 'applicantAddress', 'description'],
        frequencia: 'mensal',
        periodoInicial: '',
        periodoFinal: '',
        validador: '1',
        regraId: '1'
      }
    ];
    
    setFluxos(mockFluxos);
    setFilteredFluxos(mockFluxos);
  }, []);

  useEffect(() => {
    let filtered = [...fluxos];

    if (searchTerm) {
      filtered = filtered.filter(fluxo =>
        fluxo.tipoSolicitacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fluxo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(fluxo => 
        filterStatus === 'ativo' ? fluxo.ativo : !fluxo.ativo
      );
    }

    if (filterTipoOrigem !== 'all') {
      filtered = filtered.filter(fluxo => 
        (fluxo.tipoOrigem || 'negocio') === filterTipoOrigem
      );
    }

    setFilteredFluxos(filtered);
  }, [fluxos, searchTerm, filterStatus, filterTipoOrigem]);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este fluxo de solicitação?')) {
      setFluxos(fluxos.filter(f => f.id !== id));
    }
  };

  const getStatusBadge = (ativo) => {
    return ativo ? (
      <span className="status-badge active">
        <CheckCircle size={14} />
        Ativo
      </span>
    ) : (
      <span className="status-badge inactive">
        <XCircle size={14} />
        Inativo
      </span>
    );
  };

  return (
    <div className="fluxo-solicitacoes-list">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => onNavigate && onNavigate('solicitacoes')}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <GitBranch size={28} />
            Fluxo de Solicitações
          </h1>
        </div>
        <div className="header-actions">
          <button 
            className="btn-primary"
            onClick={() => onNavigate && onNavigate('fluxo-solicitacoes-form')}
          >
            <Plus size={20} />
            Novo Fluxo
          </button>
        </div>
      </header>

      <div className="page-content">
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por tipo ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <Filter size={18} />
            <label>Status:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div className="filter-group">
            <Filter size={18} />
            <label>Tipo de Origem:</label>
            <select 
              value={filterTipoOrigem} 
              onChange={(e) => setFilterTipoOrigem(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="negocio">Negócio</option>
              <option value="sistema">Sistema</option>
            </select>
          </div>
        </div>

        <div className="fluxos-grid">
          {filteredFluxos.length === 0 ? (
            <div className="empty-state">
              <GitBranch size={48} />
              <h3>Nenhum fluxo encontrado</h3>
              <p>Não há fluxos de solicitação que correspondam aos filtros aplicados</p>
            </div>
          ) : (
            filteredFluxos.map(fluxo => (
              <div key={fluxo.id} className="fluxo-card">
                <div className="fluxo-card-header">
                  <div className="fluxo-title-section">
                    <h3 className="fluxo-title">{fluxo.tipoSolicitacao}</h3>
                    <div className="fluxo-badges">
                      {getStatusBadge(fluxo.ativo)}
                      <span className={`tipo-origem-badge ${fluxo.tipoOrigem || 'negocio'}`}>
                        {fluxo.tipoOrigem === 'sistema' ? 'Sistema' : 'Negócio'}
                      </span>
                    </div>
                  </div>
                  <div className="fluxo-actions">
                    <button 
                      className="btn-icon"
                      title="Visualizar"
                      onClick={() => onNavigate && onNavigate('fluxo-solicitacoes-detail', fluxo)}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="btn-icon"
                      title="Editar"
                      onClick={() => onNavigate && onNavigate('fluxo-solicitacoes-form', fluxo)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="btn-icon btn-danger"
                      title="Excluir"
                      onClick={() => handleDelete(fluxo.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="fluxo-card-body">
                  <p className="fluxo-description">{fluxo.descricao}</p>
                  
                  <div className="fluxo-info">
                    <div className="info-item">
                      <strong>Tipo de Origem:</strong>
                      <span className={`tipo-origem-text ${fluxo.tipoOrigem || 'negocio'}`}>
                        {fluxo.tipoOrigem === 'sistema' ? 'Sistema' : 'Negócio'}
                      </span>
                    </div>
                    <div className="info-item">
                      <strong>Data de Criação:</strong>
                      <span>{new Date(fluxo.dataCriacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="info-item">
                      <strong>Passos no Workflow:</strong>
                      <span>{fluxo.workflow.steps.length}</span>
                    </div>
                    <div className="info-item">
                      <strong>Campos Incluídos:</strong>
                      <span>{fluxo.campos.length}</span>
                    </div>
                    {fluxo.tipoOrigem === 'sistema' && (
                      <>
                        {fluxo.frequencia && (
                          <div className="info-item">
                            <strong>Frequência:</strong>
                            <span>
                              {fluxo.frequencia === 'diaria' ? 'Diária' :
                               fluxo.frequencia === 'mensal' ? 'Mensal' :
                               fluxo.frequencia === 'semestral' ? 'Semestral' :
                               fluxo.frequencia === 'anual' ? 'Anual' :
                               fluxo.frequencia === 'periodo' ? 'Período' : fluxo.frequencia}
                            </span>
                          </div>
                        )}
                        {fluxo.regraId && (
                          <div className="info-item">
                            <strong>Regra:</strong>
                            <span>
                              {fluxo.regraId === '1' ? 'REG-001' :
                               fluxo.regraId === '2' ? 'REG-002' :
                               fluxo.regraId === '3' ? 'REG-003' :
                               `REG-${String(fluxo.regraId).padStart(3, '0')}`}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="workflow-preview">
                    <strong>Workflow:</strong>
                    <div className="workflow-steps-preview">
                      {fluxo.workflow.steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                          <span className="workflow-step-preview">{step.nome}</span>
                          {index < fluxo.workflow.steps.length - 1 && (
                            <span className="workflow-arrow">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FluxoSolicitacoesList;

