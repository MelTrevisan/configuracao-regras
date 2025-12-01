import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Plus, 
  Search,
  Filter,
  Edit2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  Building,
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';
import '../styles/RequestsManagement.css';
import RequestDetailForm from './RequestDetailForm';
import RequestDetail from './RequestDetail';

const RequestsManagement = () => {
  // Filtros avançados
  const [filters, setFilters] = useState({
    nome: '',
    codigo: '',
    dataInicial: '',
    dataFinal: '',
    status: 'all',
    tipo: 'all',
    area: 'all'
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isNewRequest, setIsNewRequest] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Simulação do usuário logado (será substituído pela integração com Keycloak)
  const [currentUser] = useState({
    id: 'user-001',
    name: 'Maria Santos',
    email: 'maria.santos@paulistano.com.br',
    roles: ['ADMIN', 'ATTENDANCE_MANAGER'],
    areas: ['ADMISSAO', 'FINANCEIRO', 'ATENDIMENTO']
  });

  const [requests, setRequests] = useState([
    {
      id: 1,
      requestNumber: 'REQ-2025-001',
      type: 'Admissão de Associado',
      status: 'ativo',
      priority: 'high',
      attendanceArea: 'ADMISSAO',
      areaName: 'Admissão de Associados',
      applicantName: 'João Silva Santos',
      applicantEmail: 'joao.silva@email.com',
      applicantPhone: '(11) 99999-9999',
      applicantAddress: 'Rua das Flores, 123 - São Paulo/SP',
      clubSection: 'Tênis',
      submittedDate: '2025-01-08',
      submittedTime: '14:30',
      currentStep: 'Análise Documental',
      assignedTo: 'Maria Santos',
      assignedToId: 'user-001',
      estimatedCompletion: '2025-01-15',
      description: 'Solicitação de admissão como associado da seção de Tênis do Club Athletico Paulistano. Candidato possui experiência prévia em tênis e atende aos critérios estabelecidos.',
      documents: [
        { name: 'Documento de Identidade', status: 'approved', uploadedDate: '2025-01-08 14:35' },
        { name: 'Comprovante de Residência', status: 'pending', uploadedDate: '2025-01-08 14:40' },
        { name: 'Carta de Recomendação', status: 'approved', uploadedDate: '2025-01-08 14:45' },
        { name: 'Certificado Médico', status: 'pending', uploadedDate: '2025-01-08 14:50' }
      ],
      workflowHistory: [
        {
          id: 1,
          step: 'Recebimento da Solicitação',
          status: 'completed',
          user: 'Sistema',
          userId: 'system',
          date: '2025-01-08 14:30',
          comments: 'Solicitação recebida automaticamente via website do Club Athletico Paulistano',
          details: 'Dados do formulário validados e registrados no sistema',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        {
          id: 2,
          step: 'Análise Documental',
          status: 'in_progress',
          user: 'Maria Santos',
          userId: 'user-001',
          date: '2025-01-08 15:00',
          comments: 'Iniciada análise dos documentos apresentados',
          details: 'Documentos recebidos e em análise pela equipe de admissão',
          attachments: ['documento_identidade.pdf', 'carta_recomendacao.pdf']
        }
      ],
      createdBy: 'user-001',
      lastModifiedBy: 'user-001',
      lastModifiedDate: '2025-01-08 15:00'
    },
    {
      id: 2,
      requestNumber: 'REQ-2025-002',
      type: 'Renovação de Mensalidade',
      status: 'ativo',
      priority: 'medium',
      attendanceArea: 'FINANCEIRO',
      areaName: 'Financeiro',
      applicantName: 'Ana Costa Lima',
      applicantEmail: 'ana.costa@email.com',
      applicantPhone: '(11) 88888-8888',
      applicantAddress: 'Av. Paulista, 456 - São Paulo/SP',
      clubSection: 'Natação',
      submittedDate: '2025-01-07',
      submittedTime: '10:15',
      currentStep: 'Aprovação Financeira',
      assignedTo: 'Carlos Oliveira',
      assignedToId: 'user-002',
      estimatedCompletion: '2025-01-12',
      description: 'Solicitação de renovação da mensalidade com desconto por tempo de associado (5 anos).',
      documents: [
        { name: 'Comprovante de Pagamento', status: 'approved', uploadedDate: '2025-01-07 10:20' },
        { name: 'Histórico de Associado', status: 'approved', uploadedDate: '2025-01-07 10:25' }
      ],
      workflowHistory: [
        {
          id: 1,
          step: 'Recebimento da Solicitação',
          status: 'completed',
          user: 'Sistema',
          userId: 'system',
          date: '2025-01-07 10:15',
          comments: 'Solicitação recebida via website',
          details: 'Dados validados automaticamente'
        },
        {
          id: 2,
          step: 'Verificação de Elegibilidade',
          status: 'completed',
          user: 'Maria Santos',
          userId: 'user-001',
          date: '2025-01-07 11:00',
          comments: 'Associado elegível para desconto',
          details: 'Verificação de tempo de associado realizada'
        },
        {
          id: 3,
          step: 'Aprovação Financeira',
          status: 'in_progress',
          user: 'Carlos Oliveira',
          userId: 'user-002',
          date: '2025-01-07 14:00',
          comments: 'Aguardando aprovação do departamento financeiro',
          details: 'Análise de documentos financeiros em andamento'
        }
      ],
      createdBy: 'user-001',
      lastModifiedBy: 'user-002',
      lastModifiedDate: '2025-01-07 14:00'
    },
    {
      id: 3,
      requestNumber: 'REQ-2025-003',
      type: 'Alteração de Dados',
      status: 'fechada',
      priority: 'low',
      attendanceArea: 'ATENDIMENTO',
      areaName: 'Atendimento ao Cliente',
      applicantName: 'Pedro Mendes',
      applicantEmail: 'pedro.mendes@email.com',
      applicantPhone: '(11) 77777-7777',
      applicantAddress: 'Rua Augusta, 789 - São Paulo/SP',
      clubSection: 'Fitness',
      submittedDate: '2025-01-05',
      submittedTime: '09:45',
      currentStep: 'Finalizada',
      assignedTo: 'Ana Paula',
      assignedToId: 'user-003',
      estimatedCompletion: '2025-01-06',
      description: 'Solicitação para alteração de endereço e telefone de contato.',
      documents: [
        { name: 'Comprovante de Residência', status: 'approved', uploadedDate: '2025-01-05 09:50' }
      ],
      workflowHistory: [
        {
          id: 1,
          step: 'Recebimento da Solicitação',
          status: 'completed',
          user: 'Sistema',
          userId: 'system',
          date: '2025-01-05 09:45',
          comments: 'Solicitação recebida via website',
          details: 'Dados validados automaticamente'
        },
        {
          id: 2,
          step: 'Verificação de Dados',
          status: 'completed',
          user: 'Ana Paula',
          userId: 'user-003',
          date: '2025-01-05 10:30',
          comments: 'Dados verificados e atualizados',
          details: 'Documentos conferidos e dados atualizados no sistema'
        },
        {
          id: 3,
          step: 'Finalização',
          status: 'completed',
          user: 'Ana Paula',
          userId: 'user-003',
          date: '2025-01-06 16:00',
          comments: 'Solicitação finalizada com sucesso',
          details: 'Processo concluído e cliente notificado'
        }
      ],
      createdBy: 'user-003',
      lastModifiedBy: 'user-003',
      lastModifiedDate: '2025-01-06 16:00'
    },
    {
      id: 4,
      requestNumber: 'REQ-2025-004',
      type: 'Transferência de Seção',
      status: 'ativo',
      priority: 'medium',
      attendanceArea: 'ADMISSAO',
      areaName: 'Admissão de Associados',
      applicantName: 'Fernanda Oliveira',
      applicantEmail: 'fernanda.oliveira@email.com',
      applicantPhone: '(11) 66666-6666',
      applicantAddress: 'Rua Consolação, 321 - São Paulo/SP',
      clubSection: 'Tênis',
      submittedDate: '2025-01-09',
      submittedTime: '11:20',
      currentStep: 'Aguardando Atribuição',
      assignedTo: 'Não Atribuído',
      assignedToId: null,
      estimatedCompletion: '2025-01-16',
      description: 'Solicitação para transferência da seção de Natação para Tênis.',
      documents: [
        { name: 'Carta de Transferência', status: 'approved', uploadedDate: '2025-01-09 11:25' },
        { name: 'Atestado Médico', status: 'pending', uploadedDate: '2025-01-09 11:30' }
      ],
      workflowHistory: [
        {
          id: 1,
          step: 'Recebimento da Solicitação',
          status: 'completed',
          user: 'Sistema',
          userId: 'system',
          date: '2025-01-09 11:20',
          comments: 'Solicitação recebida via website',
          details: 'Dados validados automaticamente'
        },
        {
          id: 2,
          step: 'Aguardando Atribuição',
          status: 'pending',
          user: 'Sistema',
          userId: 'system',
          date: '2025-01-09 11:20',
          comments: 'Solicitação aguardando atribuição de responsável',
          details: 'Necessário atribuir responsável da área de Admissão'
        }
      ],
      createdBy: 'system',
      lastModifiedBy: 'system',
      lastModifiedDate: '2025-01-09 11:20'
    },
    {
      id: 5,
      requestNumber: 'REQ-2025-005',
      type: 'Suspensão Temporária',
      status: 'ativo',
      priority: 'high',
      attendanceArea: 'FINANCEIRO',
      areaName: 'Financeiro',
      applicantName: 'Roberto Silva',
      applicantEmail: 'roberto.silva@email.com',
      applicantPhone: '(11) 55555-5555',
      applicantAddress: 'Av. Faria Lima, 1000 - São Paulo/SP',
      clubSection: 'Piscina',
      submittedDate: '2025-01-09',
      submittedTime: '14:15',
      currentStep: 'Aguardando Atribuição',
      assignedTo: 'Não Atribuído',
      assignedToId: null,
      estimatedCompletion: '2025-01-16',
      description: 'Solicitação de suspensão temporária da mensalidade por 3 meses devido a viagem de trabalho.',
      documents: [
        { name: 'Comprovante de Viagem', status: 'pending', uploadedDate: '2025-01-09 14:20' },
        { name: 'Carta da Empresa', status: 'pending', uploadedDate: '2025-01-09 14:25' }
      ],
      workflowHistory: [
        {
          id: 1,
          step: 'Recebimento da Solicitação',
          status: 'completed',
          user: 'Sistema',
          userId: 'system',
          date: '2025-01-09 14:15',
          comments: 'Solicitação recebida via website',
          details: 'Dados validados automaticamente'
        },
        {
          id: 2,
          step: 'Aguardando Atribuição',
          status: 'pending',
          user: 'Sistema',
          userId: 'system',
          date: '2025-01-09 14:15',
          comments: 'Solicitação aguardando atribuição de responsável',
          details: 'Necessário atribuir responsável da área Financeiro'
        }
      ],
      createdBy: 'system',
      lastModifiedBy: 'system',
      lastModifiedDate: '2025-01-09 14:15'
    }
  ]);

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'ativo', label: 'Ativo' },
    { value: 'cancelada', label: 'Cancelada' },
    { value: 'fechada', label: 'Fechada' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Todos os Tipos' },
    { value: 'Admissão de Associado', label: 'Admissão de Associado' },
    { value: 'Renovação de Mensalidade', label: 'Renovação de Mensalidade' },
    { value: 'Alteração de Dados', label: 'Alteração de Dados' },
    { value: 'Transferência de Seção', label: 'Transferência de Seção' },
    { value: 'Suspensão Temporária', label: 'Suspensão Temporária' }
  ];

  const areaOptions = [
    { value: 'all', label: 'Todas as Áreas' },
    { value: 'ADMISSAO', label: 'Admissão de Associados' },
    { value: 'FINANCEIRO', label: 'Financeiro' },
    { value: 'ATENDIMENTO', label: 'Atendimento ao Cliente' }
  ];

  const responsibleOptions = [
    { value: 'all', label: 'Todos os Responsáveis' },
    { value: 'not_assigned', label: 'Não Atribuído' },
    { value: 'Maria Santos', label: 'Maria Santos' },
    { value: 'Carlos Oliveira', label: 'Carlos Oliveira' },
    { value: 'Ana Paula', label: 'Ana Paula' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ativo':
        return <CheckCircle className="status-icon active" />;
      case 'cancelada':
        return <XCircle className="status-icon cancelled" />;
      case 'fechada':
        return <CheckCircle className="status-icon closed" />;
      default:
        return <Clock className="status-icon" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'cancelada':
        return 'Cancelada';
      case 'fechada':
        return 'Fechada';
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      nome: '',
      codigo: '',
      dataInicial: '',
      dataFinal: '',
      status: 'all',
      tipo: 'all',
      area: 'all'
    });
  };

  const filteredRequests = requests.filter(request => {
    const matchesNome = !filters.nome || 
                       request.applicantName.toLowerCase().includes(filters.nome.toLowerCase());
    const matchesCodigo = !filters.codigo || 
                         request.requestNumber.toLowerCase().includes(filters.codigo.toLowerCase());
    const matchesDataInicial = !filters.dataInicial || 
                              new Date(request.submittedDate) >= new Date(filters.dataInicial);
    const matchesDataFinal = !filters.dataFinal || 
                            new Date(request.submittedDate) <= new Date(filters.dataFinal);
    const matchesStatus = filters.status === 'all' || request.status === filters.status;
    const matchesType = filters.tipo === 'all' || request.type === filters.tipo;
    const matchesArea = filters.area === 'all' || request.attendanceArea === filters.area;
    
    return matchesNome && matchesCodigo && matchesDataInicial && matchesDataFinal && 
           matchesStatus && matchesType && matchesArea;
  });

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsNewRequest(false);
    setIsEditing(false);
  };

  const handleNewRequest = () => {
    const newRequest = {
      id: null,
      requestNumber: '',
      type: '',
      status: 'ativo',
      priority: 'medium',
      attendanceArea: '',
      areaName: '',
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      applicantAddress: '',
      clubSection: '',
      submittedDate: new Date().toISOString().split('T')[0],
      submittedTime: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      currentStep: 'Aguardando Atribuição',
      assignedTo: 'Não Atribuído',
      assignedToId: null,
      estimatedCompletion: '',
      description: '',
      documents: [],
      workflowHistory: [],
      createdBy: currentUser.id,
      lastModifiedBy: currentUser.id,
      lastModifiedDate: new Date().toLocaleString('pt-BR')
    };
    setSelectedRequest(newRequest);
    setIsNewRequest(true);
    setIsEditing(true);
  };

  const handleSaveRequest = (updatedRequest) => {
    if (isNewRequest) {
      // Gerar número de solicitação
      const newId = requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1;
      const year = new Date().getFullYear();
      const requestNumber = `REQ-${year}-${String(newId).padStart(3, '0')}`;
      
      const requestToSave = {
        ...updatedRequest,
        id: newId,
        requestNumber: requestNumber,
        workflowHistory: [
          {
            id: 1,
            step: 'Recebimento da Solicitação',
            status: 'completed',
            user: currentUser.name,
            userId: currentUser.id,
            date: new Date().toLocaleString('pt-BR'),
            comments: 'Solicitação criada manualmente',
            details: 'Solicitação criada pelo sistema'
          }
        ]
      };
      
      setRequests([...requests, requestToSave]);
      setSelectedRequest(requestToSave);
      setIsNewRequest(false);
      setIsEditing(false);
      alert('Solicitação criada com sucesso!');
    } else {
      const updatedRequests = requests.map(request => 
        request.id === updatedRequest.id ? updatedRequest : request
      );
      setRequests(updatedRequests);
      setSelectedRequest(updatedRequest);
      setIsEditing(false);
      alert('Solicitação atualizada com sucesso!');
    }
  };

  const handleCancelEdit = () => {
    if (isNewRequest) {
      setSelectedRequest(null);
      setIsNewRequest(false);
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleAssignToMe = (requestId) => {
    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        const assignmentLog = {
          id: Date.now(),
          step: 'Atribuição de Responsabilidade',
          status: 'completed',
          user: currentUser.name,
          userId: currentUser.id,
          date: new Date().toLocaleString('pt-BR'),
          comments: `Solicitação atribuída para ${currentUser.name}`,
          details: 'Usuário assumiu a responsabilidade pela solicitação',
          type: 'assignment'
        };

        return {
          ...request,
          assignedTo: currentUser.name,
          assignedToId: currentUser.id,
          workflowHistory: [...request.workflowHistory, assignmentLog],
          lastModifiedBy: currentUser.id,
          lastModifiedDate: new Date().toLocaleString('pt-BR')
        };
      }
      return request;
    });
    setRequests(updatedRequests);
  };

  if (selectedRequest) {
    // Se for nova solicitação ou estiver editando, mostra o formulário
    if (isNewRequest || isEditing) {
      return (
        <RequestDetailForm 
          request={selectedRequest}
          isNewRequest={isNewRequest}
          isEditing={isEditing}
          onSave={handleSaveRequest}
          onCancel={handleCancelEdit}
          onBack={() => {
            setSelectedRequest(null);
            setIsNewRequest(false);
            setIsEditing(false);
          }}
          onEdit={() => setIsEditing(true)}
          typeOptions={typeOptions}
          areaOptions={areaOptions}
          currentUser={currentUser}
        />
      );
    }
    
    // Caso contrário, mostra a visualização completa original
    return (
      <RequestDetail
        requestData={selectedRequest}
        onBack={() => {
          setSelectedRequest(null);
          setIsNewRequest(false);
          setIsEditing(false);
        }}
        onEdit={() => setIsEditing(true)}
        onUpdate={(updatedRequest) => {
          const updatedRequests = requests.map(request => 
            request.id === updatedRequest.id ? updatedRequest : request
          );
          setRequests(updatedRequests);
          setSelectedRequest(updatedRequest);
        }}
      />
    );
  }

  return (
    <div className="requests-management">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back">
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <FileText size={28} />
            Solicitações - Club Athletico Paulistano
          </h1>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleNewRequest}>
            <Plus size={20} />
            Nova Solicitação
          </button>
        </div>
      </header>

      <div className="page-content">
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
              <label className="filter-label">NOME:</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Filtrar por nome..."
                value={filters.nome}
                onChange={(e) => handleFilterChange('nome', e.target.value)}
              />
            </div>

            <div className="filter-item">
              <label className="filter-label">CÓDIGO:</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Filtrar por código..."
                value={filters.codigo}
                onChange={(e) => handleFilterChange('codigo', e.target.value)}
              />
            </div>

            <div className="filter-item filter-item-range">
              <label className="filter-label">DATA DE SUBMISSÃO:</label>
              <div className="range-inputs">
                <input
                  type="date"
                  className="filter-input"
                  placeholder="dd/mm/aaaa"
                  value={filters.dataInicial}
                  onChange={(e) => handleFilterChange('dataInicial', e.target.value)}
                />
                <span className="range-separator">até</span>
                <input
                  type="date"
                  className="filter-input"
                  placeholder="dd/mm/aaaa"
                  value={filters.dataFinal}
                  onChange={(e) => handleFilterChange('dataFinal', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-item">
              <label className="filter-label">STATUS:</label>
              <select
                className="filter-select"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">Todos</option>
                {statusOptions.filter(opt => opt.value !== 'all').map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label className="filter-label">TIPO:</label>
              <select
                className="filter-select"
                value={filters.tipo}
                onChange={(e) => handleFilterChange('tipo', e.target.value)}
              >
                <option value="all">Todos</option>
                {typeOptions.filter(opt => opt.value !== 'all').map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label className="filter-label">ÁREA:</label>
              <select
                className="filter-select"
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
              >
                <option value="all">Todos</option>
                {areaOptions.filter(opt => opt.value !== 'all').map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="requests-list">
          <div className="list-header">
            <div className="header-cell" style={{flex: 2}}>Solicitação</div>
            <div className="header-cell">Solicitante</div>
            <div className="header-cell">Tipo</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Prioridade</div>
            <div className="header-cell">Data</div>
            <div className="header-cell">Responsável</div>
            <div className="header-cell" style={{flex: 2}}>Fluxo</div>
            <div className="header-cell">Ações</div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} />
              <h3>Nenhuma solicitação encontrada</h3>
              <p>Não há solicitações que correspondam aos filtros aplicados</p>
            </div>
          ) : (
            filteredRequests.map(request => (
              <div key={request.id} className="list-row">
                <div className="cell" style={{flex: 2}}>
                  <div className="request-info">
                    <strong>{request.requestNumber}</strong>
                    <div className="request-meta">
                      <Building size={14} />
                      {request.clubSection}
                    </div>
                  </div>
                </div>
                <div className="cell">
                  <div className="applicant-info-compact">
                    <strong>{request.applicantName}</strong>
                    <small>{request.applicantEmail}</small>
                  </div>
                </div>
                <div className="cell">{request.type}</div>
                <div className="cell">
                  <span className={`status-badge ${request.status}`}>
                    {getStatusIcon(request.status)}
                    {getStatusLabel(request.status)}
                  </span>
                </div>
                <div className="cell">
                  <span className={`priority-badge ${request.priority}`}>
                    {getPriorityLabel(request.priority)}
                  </span>
                </div>
                <div className="cell">
                  <div className="date-info">
                    <div>{new Date(request.submittedDate).toLocaleDateString('pt-BR')}</div>
                    <small>{request.submittedTime}</small>
                  </div>
                </div>
                <div className="cell">
                  <div className="assigned-info">
                    <User size={14} />
                    {request.assignedTo}
                  </div>
                </div>
                <div className="cell workflow-preview-cell">
                  <div className="workflow-preview-inline">
                    {request.workflowHistory && request.workflowHistory.length > 0 ? (
                      <div className="workflow-steps-inline">
                        {request.workflowHistory.slice(0, 3).map((step, index) => (
                          <React.Fragment key={step.id}>
                            <span className={`workflow-step-badge ${step.status}`} title={step.step}>
                              {step.step.length > 20 ? step.step.substring(0, 20) + '...' : step.step}
                            </span>
                            {index < Math.min(request.workflowHistory.length, 3) - 1 && (
                              <span className="workflow-arrow-inline">→</span>
                            )}
                          </React.Fragment>
                        ))}
                        {request.workflowHistory.length > 3 && (
                          <span className="workflow-more">+{request.workflowHistory.length - 3}</span>
                        )}
                      </div>
                    ) : (
                      <span className="workflow-empty-text">Sem workflow</span>
                    )}
                  </div>
                </div>
                <div className="cell actions">
                  <button 
                    className="btn-icon" 
                    title="Visualizar Detalhes"
                    onClick={() => handleViewRequest(request)}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="btn-icon" 
                    title="Editar"
                    onClick={() => {
                      setSelectedRequest(request);
                      setIsNewRequest(false);
                      setIsEditing(true);
                    }}
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

export default RequestsManagement;
