import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  User,
  Calendar,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit2,
  MessageSquare,
  Paperclip,
  Download,
  Eye,
  Share2,
  Archive,
  RefreshCw
} from 'lucide-react';
import '../styles/RequestDetail.css';

const RequestDetail = ({ requestData, onBack, onEdit, onUpdate }) => {
  const [request, setRequest] = useState(requestData);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ativo':
        return <CheckCircle className="status-icon active" />;
      case 'cancelada':
        return <XCircle className="status-icon cancelled" />;
      case 'fechada':
        return <Archive className="status-icon closed" />;
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

  const getDocumentStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="doc-status approved" />;
      case 'pending':
        return <Clock className="doc-status pending" />;
      case 'rejected':
        return <XCircle className="doc-status rejected" />;
      default:
        return <AlertCircle className="doc-status" />;
    }
  };

  const getDocumentStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'pending':
        return 'Pendente';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const getWorkflowStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="workflow-status completed" />;
      case 'in_progress':
        return <RefreshCw className="workflow-status in-progress" />;
      case 'pending':
        return <Clock className="workflow-status pending" />;
      default:
        return <AlertCircle className="workflow-status" />;
    }
  };

  const getWorkflowStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in_progress':
        return 'Em Andamento';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: 'Usuário Atual',
        date: new Date().toLocaleString('pt-BR'),
        text: newComment,
        type: 'comment'
      };
      
      setRequest(prev => ({
        ...prev,
        workflowHistory: [...prev.workflowHistory, comment]
      }));
      
      setNewComment('');
    }
  };

  const handleStatusChange = (newStatus) => {
    const statusUpdate = {
      id: Date.now(),
      step: `Status alterado para ${getStatusLabel(newStatus)}`,
      status: 'completed',
      user: 'Usuário Atual',
      userId: 'current-user',
      date: new Date().toLocaleString('pt-BR'),
      comments: `Status da solicitação alterado de ${getStatusLabel(request.status)} para ${getStatusLabel(newStatus)}`,
      details: 'Alteração de status realizada pelo usuário',
      type: 'status_change'
    };

    setRequest(prev => ({
      ...prev,
      status: newStatus,
      workflowHistory: [...prev.workflowHistory, statusUpdate],
      lastModifiedDate: new Date().toLocaleString('pt-BR')
    }));
  };

  const handleDownloadDocument = (document) => {
    // Simulação de download
    alert(`Download do documento: ${document.name}`);
  };

  const handleViewDocument = (document) => {
    // Simulação de visualização
    alert(`Visualizando documento: ${document.name}`);
  };

  return (
    <div className="request-detail">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={onBack}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <FileText size={28} />
            Solicitação {request.requestNumber}
          </h1>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setShowComments(!showComments)}>
            <MessageSquare size={20} />
            Comentários
          </button>
          <button className="btn-secondary" onClick={onEdit}>
            <Edit2 size={20} />
            Editar
          </button>
          <button className="btn-primary">
            <Share2 size={20} />
            Compartilhar
          </button>
        </div>
      </header>

      <div className="page-content">
        <div className="request-detail-grid">
          {/* Informações Principais */}
          <div className="detail-section">
            <h2 className="section-title">Informações da Solicitação</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Número da Solicitação:</label>
                <span className="request-number">{request.requestNumber}</span>
              </div>
              <div className="info-item">
                <label>Tipo:</label>
                <span>{request.type}</span>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className={`status-badge ${request.status}`}>
                  {getStatusIcon(request.status)}
                  {getStatusLabel(request.status)}
                </span>
              </div>
              <div className="info-item">
                <label>Prioridade:</label>
                <span className={`priority-badge ${request.priority}`}>
                  {getPriorityLabel(request.priority)}
                </span>
              </div>
              <div className="info-item">
                <label>Área de Atendimento:</label>
                <span>{request.areaName}</span>
              </div>
              <div className="info-item">
                <label>Data de Submissão:</label>
                <span>{new Date(request.submittedDate).toLocaleDateString('pt-BR')} às {request.submittedTime}</span>
              </div>
              <div className="info-item">
                <label>Prazo Estimado:</label>
                <span>{new Date(request.estimatedCompletion).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="info-item">
                <label>Responsável Atual:</label>
                <span>{request.assignedTo}</span>
              </div>
              <div className="info-item">
                <label>Etapa Atual:</label>
                <span>{request.currentStep}</span>
              </div>
            </div>

            {/* Ações de Status */}
            <div className="status-actions">
              <h3>Alterar Status:</h3>
              <div className="status-buttons">
                <button 
                  className={`status-btn ${request.status === 'ativo' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('ativo')}
                >
                  <CheckCircle size={16} />
                  Ativo
                </button>
                <button 
                  className={`status-btn ${request.status === 'cancelada' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('cancelada')}
                >
                  <XCircle size={16} />
                  Cancelada
                </button>
                <button 
                  className={`status-btn ${request.status === 'fechada' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('fechada')}
                >
                  <Archive size={16} />
                  Fechada
                </button>
              </div>
            </div>
          </div>

          {/* Informações do Solicitante */}
          <div className="detail-section">
            <h2 className="section-title">
              <User size={20} />
              Informações do Solicitante
            </h2>
            <div className="applicant-info">
              <div className="applicant-detail">
                <User size={16} />
                <span>{request.applicantName}</span>
              </div>
              <div className="applicant-detail">
                <Mail size={16} />
                <span>{request.applicantEmail}</span>
              </div>
              <div className="applicant-detail">
                <Phone size={16} />
                <span>{request.applicantPhone}</span>
              </div>
              <div className="applicant-detail">
                <MapPin size={16} />
                <span>{request.applicantAddress}</span>
              </div>
              <div className="applicant-detail">
                <Building size={16} />
                <span>Seção: {request.clubSection}</span>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="detail-section">
            <h2 className="section-title">Descrição da Solicitação</h2>
            <p className="request-description">{request.description}</p>
          </div>

          {/* Documentos */}
          <div className="detail-section">
            <h2 className="section-title">
              <Paperclip size={20} />
              Documentos ({request.documents.length})
            </h2>
            <div className="documents-list">
              {request.documents.map((doc, index) => (
                <div key={index} className={`document-item ${doc.status}`}>
                  <div className="document-info">
                    {getDocumentStatusIcon(doc.status)}
                    <div className="document-details">
                      <span className="document-name">{doc.name}</span>
                      <span className="document-date">
                        Enviado em: {new Date(doc.uploadedDate).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className="document-actions">
                    <span className={`document-status ${doc.status}`}>
                      {getDocumentStatusLabel(doc.status)}
                    </span>
                    <button 
                      className="btn-icon"
                      title="Visualizar"
                      onClick={() => handleViewDocument(doc)}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="btn-icon"
                      title="Download"
                      onClick={() => handleDownloadDocument(doc)}
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Histórico do Workflow */}
          <div className="detail-section">
            <h2 className="section-title">
              <Clock size={20} />
              Histórico do Workflow ({request.workflowHistory.length} eventos)
            </h2>
            <div className="workflow-timeline">
              {request.workflowHistory.map((step) => (
                <div key={step.id} className={`timeline-item ${step.status}`}>
                  <div className="timeline-marker">
                    {getWorkflowStatusIcon(step.status)}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="step-name">{step.step}</span>
                      <span className={`step-status ${step.status}`}>
                        {getWorkflowStatusLabel(step.status)}
                      </span>
                    </div>
                    <div className="timeline-details">
                      <div className="timeline-user">
                        <User size={14} />
                        {step.user}
                      </div>
                      <div className="timeline-date">
                        <Calendar size={14} />
                        {step.date}
                      </div>
                      {step.comments && (
                        <div className="timeline-comments">
                          <strong>Comentários:</strong> {step.comments}
                        </div>
                      )}
                      {step.details && (
                        <div className="timeline-details-text">
                          <strong>Detalhes:</strong> {step.details}
                        </div>
                      )}
                      {step.attachments && step.attachments.length > 0 && (
                        <div className="timeline-attachments">
                          <strong>Anexos:</strong>
                          <ul>
                            {step.attachments.map((attachment, idx) => (
                              <li key={idx}>
                                <Paperclip size={12} />
                                {attachment}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {step.ipAddress && (
                        <div className="timeline-meta">
                          <small>IP: {step.ipAddress}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comentários */}
          {showComments && (
            <div className="detail-section">
              <h2 className="section-title">
                <MessageSquare size={20} />
                Adicionar Comentário
              </h2>
              <div className="comments-section">
                <textarea
                  className="comment-input"
                  placeholder="Digite seu comentário aqui..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                />
                <div className="comment-actions">
                  <button className="btn-secondary" onClick={() => setNewComment('')}>
                    Cancelar
                  </button>
                  <button className="btn-primary" onClick={handleAddComment}>
                    <MessageSquare size={16} />
                    Adicionar Comentário
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;




