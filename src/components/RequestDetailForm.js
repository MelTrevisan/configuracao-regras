import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Save,
  X,
  User,
  Calendar,
  Building,
  Phone,
  Mail,
  MapPin,
  AlertCircle
} from 'lucide-react';
import '../styles/RequestsManagement.css';

const RequestDetailForm = ({ 
  request, 
  isNewRequest, 
  isEditing, 
  onSave, 
  onCancel, 
  onBack,
  onEdit,
  typeOptions,
  areaOptions,
  currentUser
}) => {
  const [formData, setFormData] = useState(request);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(request);
  }, [request]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type.trim()) {
      newErrors.type = 'Tipo de solicitação é obrigatório';
    }

    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Nome do solicitante é obrigatório';
    }

    if (!formData.applicantEmail.trim()) {
      newErrors.applicantEmail = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicantEmail)) {
      newErrors.applicantEmail = 'Email inválido';
    }

    if (!formData.applicantPhone.trim()) {
      newErrors.applicantPhone = 'Telefone é obrigatório';
    }

    if (!formData.attendanceArea) {
      newErrors.attendanceArea = 'Área de atendimento é obrigatória';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const areaName = areaOptions.find(a => a.value === formData.attendanceArea)?.label || formData.attendanceArea;
      const dataToSave = {
        ...formData,
        areaName: areaName,
        lastModifiedBy: currentUser.id,
        lastModifiedDate: new Date().toLocaleString('pt-BR')
      };
      
      onSave(dataToSave);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ativo':
        return <span className="status-icon active">●</span>;
      case 'cancelada':
        return <span className="status-icon cancelled">●</span>;
      case 'fechada':
        return <span className="status-icon closed">●</span>;
      default:
        return <span className="status-icon">●</span>;
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

  const canEdit = isNewRequest || isEditing;

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
            {isNewRequest ? 'Nova Solicitação' : `Solicitação ${request.requestNumber || ''}`}
          </h1>
        </div>
        <div className="header-actions">
          {canEdit ? (
            <>
              <button type="button" className="btn-secondary" onClick={onCancel}>
                <X size={20} />
                Cancelar
              </button>
              <button type="submit" form="request-form" className="btn-primary">
                <Save size={20} />
                Salvar
              </button>
            </>
          ) : (
            <button className="btn-secondary" onClick={onEdit}>
              <FileText size={20} />
              Editar
            </button>
          )}
        </div>
      </header>

      <div className="page-content">
        <form id="request-form" onSubmit={handleSubmit}>
          <div className="request-detail-grid">
            {/* Informações Principais */}
            <div className="detail-section">
              <h2 className="section-title">Informações da Solicitação</h2>
              <div className="info-grid">
                {!isNewRequest && (
                  <div className="info-item">
                    <label>Número da Solicitação:</label>
                    {canEdit ? (
                      <input
                        type="text"
                        className="form-input"
                        value={formData.requestNumber || ''}
                        readOnly
                        disabled
                      />
                    ) : (
                      <span className="request-number">{formData.requestNumber}</span>
                    )}
                  </div>
                )}
                
                <div className="info-item">
                  <label>Tipo: <span className="required">*</span></label>
                  {canEdit ? (
                    <select
                      className={`form-input ${errors.type ? 'error' : ''}`}
                      value={formData.type}
                      onChange={(e) => handleChange('type', e.target.value)}
                    >
                      <option value="">Selecione o tipo</option>
                      {typeOptions.filter(opt => opt.value !== 'all').map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{formData.type}</span>
                  )}
                  {errors.type && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.type}
                    </span>
                  )}
                </div>

                <div className="info-item">
                  <label>Status:</label>
                  {canEdit ? (
                    <select
                      className="form-input"
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                    >
                      <option value="ativo">Ativo</option>
                      <option value="cancelada">Cancelada</option>
                      <option value="fechada">Fechada</option>
                    </select>
                  ) : (
                    <span className={`status-badge ${formData.status}`}>
                      {getStatusIcon(formData.status)}
                      {getStatusLabel(formData.status)}
                    </span>
                  )}
                </div>

                <div className="info-item">
                  <label>Prioridade:</label>
                  {canEdit ? (
                    <select
                      className="form-input"
                      value={formData.priority}
                      onChange={(e) => handleChange('priority', e.target.value)}
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </select>
                  ) : (
                    <span className={`priority-badge ${formData.priority}`}>
                      {getPriorityLabel(formData.priority)}
                    </span>
                  )}
                </div>

                <div className="info-item">
                  <label>Área de Atendimento: <span className="required">*</span></label>
                  {canEdit ? (
                    <select
                      className={`form-input ${errors.attendanceArea ? 'error' : ''}`}
                      value={formData.attendanceArea}
                      onChange={(e) => handleChange('attendanceArea', e.target.value)}
                    >
                      <option value="">Selecione a área</option>
                      {areaOptions.filter(opt => opt.value !== 'all').map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{formData.areaName}</span>
                  )}
                  {errors.attendanceArea && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.attendanceArea}
                    </span>
                  )}
                </div>

                <div className="info-item">
                  <label>Data de Submissão:</label>
                  {canEdit ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="date"
                        className="form-input"
                        value={formData.submittedDate}
                        onChange={(e) => handleChange('submittedDate', e.target.value)}
                      />
                      <input
                        type="time"
                        className="form-input"
                        value={formData.submittedTime}
                        onChange={(e) => handleChange('submittedTime', e.target.value)}
                      />
                    </div>
                  ) : (
                    <span>{new Date(formData.submittedDate).toLocaleDateString('pt-BR')} às {formData.submittedTime}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Prazo Estimado:</label>
                  {canEdit ? (
                    <input
                      type="date"
                      className="form-input"
                      value={formData.estimatedCompletion}
                      onChange={(e) => handleChange('estimatedCompletion', e.target.value)}
                    />
                  ) : (
                    <span>{formData.estimatedCompletion ? new Date(formData.estimatedCompletion).toLocaleDateString('pt-BR') : 'Não definido'}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Responsável Atual:</label>
                  {canEdit ? (
                    <input
                      type="text"
                      className="form-input"
                      value={formData.assignedTo}
                      onChange={(e) => handleChange('assignedTo', e.target.value)}
                      placeholder="Nome do responsável"
                    />
                  ) : (
                    <span>{formData.assignedTo}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Etapa Atual:</label>
                  {canEdit ? (
                    <input
                      type="text"
                      className="form-input"
                      value={formData.currentStep}
                      onChange={(e) => handleChange('currentStep', e.target.value)}
                      placeholder="Etapa atual"
                    />
                  ) : (
                    <span>{formData.currentStep}</span>
                  )}
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
                  {canEdit ? (
                    <input
                      type="text"
                      className={`form-input ${errors.applicantName ? 'error' : ''}`}
                      value={formData.applicantName}
                      onChange={(e) => handleChange('applicantName', e.target.value)}
                      placeholder="Nome completo"
                    />
                  ) : (
                    <span>{formData.applicantName}</span>
                  )}
                  {errors.applicantName && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.applicantName}
                    </span>
                  )}
                </div>
                <div className="applicant-detail">
                  <Mail size={16} />
                  {canEdit ? (
                    <input
                      type="email"
                      className={`form-input ${errors.applicantEmail ? 'error' : ''}`}
                      value={formData.applicantEmail}
                      onChange={(e) => handleChange('applicantEmail', e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  ) : (
                    <span>{formData.applicantEmail}</span>
                  )}
                  {errors.applicantEmail && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.applicantEmail}
                    </span>
                  )}
                </div>
                <div className="applicant-detail">
                  <Phone size={16} />
                  {canEdit ? (
                    <input
                      type="tel"
                      className={`form-input ${errors.applicantPhone ? 'error' : ''}`}
                      value={formData.applicantPhone}
                      onChange={(e) => handleChange('applicantPhone', e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  ) : (
                    <span>{formData.applicantPhone}</span>
                  )}
                  {errors.applicantPhone && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.applicantPhone}
                    </span>
                  )}
                </div>
                <div className="applicant-detail">
                  <MapPin size={16} />
                  {canEdit ? (
                    <input
                      type="text"
                      className="form-input"
                      value={formData.applicantAddress}
                      onChange={(e) => handleChange('applicantAddress', e.target.value)}
                      placeholder="Endereço completo"
                    />
                  ) : (
                    <span>{formData.applicantAddress}</span>
                  )}
                </div>
                <div className="applicant-detail">
                  <Building size={16} />
                  {canEdit ? (
                    <input
                      type="text"
                      className="form-input"
                      value={formData.clubSection}
                      onChange={(e) => handleChange('clubSection', e.target.value)}
                      placeholder="Seção do clube"
                    />
                  ) : (
                    <span>Seção: {formData.clubSection}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="detail-section">
              <h2 className="section-title">Descrição da Solicitação <span className="required">*</span></h2>
              {canEdit ? (
                <textarea
                  className={`form-input ${errors.description ? 'error' : ''}`}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Descreva a solicitação..."
                  rows={6}
                />
              ) : (
                <p className="request-description">{formData.description}</p>
              )}
              {errors.description && (
                <span className="error-message">
                  <AlertCircle size={14} />
                  {errors.description}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestDetailForm;

