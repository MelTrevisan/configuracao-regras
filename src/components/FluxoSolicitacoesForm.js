import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  GitBranch, 
  Save,
  X,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import '../styles/FluxoSolicitacoes.css';
import WorkflowBuilder from './WorkflowBuilder';

const FluxoSolicitacoesForm = ({ fluxoData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    tipoSolicitacao: '',
    tipoOrigem: 'negocio',
    descricao: '',
    ativo: true,
    dataCriacao: new Date().toISOString().split('T')[0],
    campos: [],
    workflow: {
      steps: []
    },
    // Campos específicos para fluxos de sistema
    frequencia: '',
    periodoInicial: '',
    periodoFinal: '',
    validador: '',
    regraId: ''
  });

  const [errors, setErrors] = useState({});

  // Campos disponíveis da solicitação
  const camposDisponiveis = [
    { key: 'applicantName', label: 'Nome do Solicitante', tipo: 'text' },
    { key: 'applicantEmail', label: 'Email', tipo: 'email' },
    { key: 'applicantPhone', label: 'Telefone', tipo: 'tel' },
    { key: 'applicantAddress', label: 'Endereço', tipo: 'text' },
    { key: 'clubSection', label: 'Seção do Clube', tipo: 'text' },
    { key: 'description', label: 'Descrição', tipo: 'textarea' },
    { key: 'priority', label: 'Prioridade', tipo: 'select' },
    { key: 'estimatedCompletion', label: 'Prazo Estimado', tipo: 'date' },
    { key: 'submittedDate', label: 'Data de Submissão', tipo: 'date' },
    { key: 'submittedTime', label: 'Hora de Submissão', tipo: 'time' }
  ];

  // Lista mockada de regras (em produção, viria de uma API ou contexto)
  const regrasDisponiveis = [
    { id: 1, codigoRegra: 'REG-001', name: 'Validação de CPF', status: 'active' },
    { id: 2, codigoRegra: 'REG-002', name: 'Cálculo de Tempo de Efetividade', status: 'active' },
    { id: 3, codigoRegra: 'REG-003', name: 'Filtro de Status Ativo', status: 'active' }
  ];

  // Lista mockada de usuários do sistema (em produção, viria de uma API)
  const usuariosSistema = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@paulistano.com.br' },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@paulistano.com.br' },
    { id: 3, nome: 'Pedro Costa', email: 'pedro.costa@paulistano.com.br' },
    { id: 4, nome: 'Ana Oliveira', email: 'ana.oliveira@paulistano.com.br' }
  ];

  useEffect(() => {
    if (fluxoData) {
      setFormData({
        tipoSolicitacao: fluxoData.tipoSolicitacao || '',
        tipoOrigem: fluxoData.tipoOrigem || 'negocio',
        descricao: fluxoData.descricao || '',
        ativo: fluxoData.ativo !== undefined ? fluxoData.ativo : true,
        dataCriacao: fluxoData.dataCriacao || new Date().toISOString().split('T')[0],
        campos: fluxoData.campos || [],
        workflow: fluxoData.workflow || { steps: [] },
        frequencia: fluxoData.frequencia || '',
        periodoInicial: fluxoData.periodoInicial || '',
        periodoFinal: fluxoData.periodoFinal || '',
        validador: fluxoData.validador || '',
        regraId: fluxoData.regraId || ''
      });
    }
  }, [fluxoData]);

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

  const handleToggleCampo = (campoKey) => {
    setFormData(prev => {
      const campos = [...prev.campos];
      const index = campos.indexOf(campoKey);
      
      if (index > -1) {
        campos.splice(index, 1);
      } else {
        campos.push(campoKey);
      }
      
      return { ...prev, campos };
    });
  };

  const handleWorkflowChange = (workflow) => {
    setFormData(prev => ({
      ...prev,
      workflow
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tipoSolicitacao.trim()) {
      newErrors.tipoSolicitacao = 'Tipo de solicitação é obrigatório';
    }

    if (!formData.tipoOrigem) {
      newErrors.tipoOrigem = 'Tipo de origem é obrigatório';
    }

    // Validações específicas para fluxos de sistema
    if (formData.tipoOrigem === 'sistema') {
      if (!formData.frequencia) {
        newErrors.frequencia = 'Frequência é obrigatória para fluxos de sistema';
      }
      
      if (formData.frequencia === 'periodo') {
        if (!formData.periodoInicial) {
          newErrors.periodoInicial = 'Período inicial é obrigatório quando a frequência é "Período"';
        }
        if (!formData.periodoFinal) {
          newErrors.periodoFinal = 'Período final é obrigatório quando a frequência é "Período"';
        }
        if (formData.periodoInicial && formData.periodoFinal && formData.periodoInicial > formData.periodoFinal) {
          newErrors.periodoFinal = 'Período final deve ser posterior ao período inicial';
        }
      }
      
      if (!formData.validador) {
        newErrors.validador = 'Validador é obrigatório para fluxos de sistema';
      }
      
      if (!formData.regraId) {
        newErrors.regraId = 'Regra é obrigatória para fluxos de sistema';
      }
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.dataCriacao) {
      newErrors.dataCriacao = 'Data de criação é obrigatória';
    }

    if (!formData.workflow.steps || formData.workflow.steps.length === 0) {
      newErrors.workflow = 'É necessário definir pelo menos um passo no workflow';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (onSave) {
        onSave(formData);
      } else {
        console.log('Dados a serem salvos:', formData);
        alert('Fluxo de solicitação salvo com sucesso!');
      }
    }
  };

  return (
    <div className="fluxo-solicitacoes-form">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={onCancel}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <GitBranch size={28} />
            {fluxoData ? 'Editar Fluxo de Solicitação' : 'Novo Fluxo de Solicitação'}
          </h1>
        </div>
      </header>

      <div className="page-content">
        <form className="form-container" onSubmit={handleSubmit}>
          {/* Informações Básicas */}
          <div className="form-section">
            <h2 className="section-title">Informações Básicas</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Tipo de Solicitação <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.tipoSolicitacao ? 'error' : ''}`}
                  value={formData.tipoSolicitacao}
                  onChange={(e) => handleChange('tipoSolicitacao', e.target.value)}
                  placeholder="Ex: Admissão de Associado"
                />
                {errors.tipoSolicitacao && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.tipoSolicitacao}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Tipo de Origem <span className="required">*</span>
                </label>
                <select
                  className={`form-input ${errors.tipoOrigem ? 'error' : ''}`}
                  value={formData.tipoOrigem}
                  onChange={(e) => handleChange('tipoOrigem', e.target.value)}
                >
                  <option value="negocio">Negócio</option>
                  <option value="sistema">Sistema</option>
                </select>
                <span className="form-hint">
                  Selecione se a solicitação é de negócio (criada por usuários) ou de sistema (automática)
                </span>
                {errors.tipoOrigem && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.tipoOrigem}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Data de Criação <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={`form-input ${errors.dataCriacao ? 'error' : ''}`}
                  value={formData.dataCriacao}
                  onChange={(e) => handleChange('dataCriacao', e.target.value)}
                />
                {errors.dataCriacao && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.dataCriacao}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={formData.ativo}
                      onChange={(e) => handleChange('ativo', e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">Ativo</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group form-group-full">
              <label className="form-label">
                Descrição <span className="required">*</span>
              </label>
              <textarea
                className={`form-input ${errors.descricao ? 'error' : ''}`}
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                placeholder="Descreva o fluxo de solicitação..."
                rows={4}
              />
              {errors.descricao && (
                <span className="error-message">
                  <AlertCircle size={14} />
                  {errors.descricao}
                </span>
              )}
            </div>
          </div>

          {/* Campos específicos para fluxos de sistema */}
          {formData.tipoOrigem === 'sistema' && (
            <div className="form-section">
              <h2 className="section-title">Configurações do Sistema</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Frequência <span className="required">*</span>
                  </label>
                  <select
                    className={`form-input ${errors.frequencia ? 'error' : ''}`}
                    value={formData.frequencia}
                    onChange={(e) => handleChange('frequencia', e.target.value)}
                  >
                    <option value="">Selecione a frequência</option>
                    <option value="diaria">Diária</option>
                    <option value="mensal">Mensal</option>
                    <option value="semestral">Semestral</option>
                    <option value="anual">Anual</option>
                    <option value="periodo">Período</option>
                  </select>
                  <span className="form-hint">
                    Define com que frequência o sistema executará esta solicitação
                  </span>
                  {errors.frequencia && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.frequencia}
                    </span>
                  )}
                </div>

                {formData.frequencia === 'periodo' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">
                        Período Inicial <span className="required">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-input ${errors.periodoInicial ? 'error' : ''}`}
                        value={formData.periodoInicial}
                        onChange={(e) => handleChange('periodoInicial', e.target.value)}
                      />
                      {errors.periodoInicial && (
                        <span className="error-message">
                          <AlertCircle size={14} />
                          {errors.periodoInicial}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Período Final <span className="required">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-input ${errors.periodoFinal ? 'error' : ''}`}
                        value={formData.periodoFinal}
                        onChange={(e) => handleChange('periodoFinal', e.target.value)}
                      />
                      {errors.periodoFinal && (
                        <span className="error-message">
                          <AlertCircle size={14} />
                          {errors.periodoFinal}
                        </span>
                      )}
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Validador <span className="required">*</span>
                  </label>
                  <select
                    className={`form-input ${errors.validador ? 'error' : ''}`}
                    value={formData.validador}
                    onChange={(e) => handleChange('validador', e.target.value)}
                  >
                    <option value="">Selecione o validador</option>
                    {usuariosSistema.map(usuario => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nome} ({usuario.email})
                      </option>
                    ))}
                  </select>
                  <span className="form-hint">
                    Usuário do sistema responsável por validar esta solicitação
                  </span>
                  {errors.validador && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.validador}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Regra <span className="required">*</span>
                  </label>
                  <select
                    className={`form-input ${errors.regraId ? 'error' : ''}`}
                    value={formData.regraId}
                    onChange={(e) => handleChange('regraId', e.target.value)}
                  >
                    <option value="">Selecione a regra</option>
                    {regrasDisponiveis
                      .filter(regra => regra.status === 'active')
                      .map(regra => (
                        <option key={regra.id} value={regra.id}>
                          {regra.codigoRegra} - {regra.name}
                        </option>
                      ))}
                  </select>
                  <span className="form-hint">
                    Regra que será aplicada neste fluxo de solicitação
                  </span>
                  {errors.regraId && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.regraId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Seleção de Campos */}
          <div className="form-section">
            <h2 className="section-title">Campos da Solicitação</h2>
            <p className="section-description">
              Selecione os campos que serão incluídos na tela de criação desta solicitação
            </p>
            <div className="campos-grid">
              {camposDisponiveis.map(campo => (
                <label key={campo.key} className="campo-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.campos.includes(campo.key)}
                    onChange={() => handleToggleCampo(campo.key)}
                    className="campo-checkbox"
                  />
                  <span className="campo-checkbox-custom"></span>
                  <div className="campo-info">
                    <span className="campo-name">{campo.label}</span>
                    <span className="campo-type">{campo.tipo}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Workflow Builder */}
          <div className="form-section">
            <h2 className="section-title">Workflow de Aprovação</h2>
            <p className="section-description">
              Configure a árvore lógica de aprovação definindo os passos e áreas responsáveis
            </p>
            {errors.workflow && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.workflow}
              </span>
            )}
            <WorkflowBuilder
              workflow={formData.workflow}
              onChange={handleWorkflowChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              <X size={20} />
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <Save size={20} />
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FluxoSolicitacoesForm;

