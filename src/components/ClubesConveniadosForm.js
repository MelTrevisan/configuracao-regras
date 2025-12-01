import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  Save,
  X,
  Calendar,
  AlertCircle
} from 'lucide-react';
import '../styles/ClubesConveniados.css';

const ClubesConveniadosForm = ({ clubeData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    codigo: '',
    diasUtilizacao: '',
    frequenciaAcesso: 'Mensal',
    periodoInicial: '',
    periodoFinal: '',
    quantidadeFracoes: '',
    dataFimVigencia: '',
    dataInicioVigencia: '',
    dataInicioConvenio: '',
    status: 'ativo',
    ativo: true,
    logradouro: '',
    cep: '',
    bairro: '',
    numero: '',
    complemento: ''
  });

  const [errors, setErrors] = useState({});
  const [showPeriodoEspecifico, setShowPeriodoEspecifico] = useState(false);

  useEffect(() => {
    if (clubeData) {
      setFormData({
        nome: clubeData.nome || '',
        codigo: clubeData.codigo || '',
        diasUtilizacao: clubeData.diasUtilizacao || '',
        frequenciaAcesso: clubeData.frequenciaAcesso || 'Mensal',
        periodoInicial: clubeData.periodoInicial || '',
        periodoFinal: clubeData.periodoFinal || '',
        quantidadeFracoes: clubeData.quantidadeFracoes || '',
        dataFimVigencia: clubeData.dataFimVigencia || '',
        dataInicioVigencia: clubeData.dataInicioVigencia || '',
        dataInicioConvenio: clubeData.dataInicioConvenio || '',
        status: clubeData.status || 'ativo',
        ativo: clubeData.ativo !== undefined ? clubeData.ativo : true,
        logradouro: clubeData.logradouro || '',
        cep: clubeData.cep || '',
        bairro: clubeData.bairro || '',
        numero: clubeData.numero || '',
        complemento: clubeData.complemento || ''
      });
      setShowPeriodoEspecifico(clubeData.frequenciaAcesso === 'Período Específico');
    }
  }, [clubeData]);

  useEffect(() => {
    if (formData.frequenciaAcesso === 'Período Específico') {
      setShowPeriodoEspecifico(true);
    } else {
      setShowPeriodoEspecifico(false);
      // Limpar campos de período quando não for período específico
      if (formData.frequenciaAcesso !== 'Período Específico') {
        setFormData(prev => ({
          ...prev,
          periodoInicial: '',
          periodoFinal: ''
        }));
      }
    }
  }, [formData.frequenciaAcesso]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
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

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome do clube é obrigatório';
    }

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'Código é obrigatório';
    }

    if (!formData.diasUtilizacao || formData.diasUtilizacao <= 0) {
      newErrors.diasUtilizacao = 'Dias de utilização deve ser maior que zero';
    }

    if (!formData.frequenciaAcesso) {
      newErrors.frequenciaAcesso = 'Frequência de acesso é obrigatória';
    }

    if (formData.frequenciaAcesso === 'Período Específico') {
      if (!formData.periodoInicial) {
        newErrors.periodoInicial = 'Período inicial é obrigatório';
      }
      if (!formData.periodoFinal) {
        newErrors.periodoFinal = 'Período final é obrigatório';
      }
      if (formData.periodoInicial && formData.periodoFinal) {
        const inicio = new Date(formData.periodoInicial);
        const fim = new Date(formData.periodoFinal);
        if (fim < inicio) {
          newErrors.periodoFinal = 'Período final deve ser posterior ao período inicial';
        }
      }
    }

    if (!formData.quantidadeFracoes || formData.quantidadeFracoes <= 0) {
      newErrors.quantidadeFracoes = 'Quantidade de frações deve ser maior que zero';
    }

    if (!formData.dataFimVigencia) {
      newErrors.dataFimVigencia = 'Data fim de vigência é obrigatória';
    }

    if (!formData.dataInicioVigencia) {
      newErrors.dataInicioVigencia = 'Data início de vigência é obrigatória';
    }

    if (!formData.dataInicioConvenio) {
      newErrors.dataInicioConvenio = 'Data de início do convênio é obrigatória';
    }

    if (formData.dataInicioVigencia && formData.dataFimVigencia) {
      const inicio = new Date(formData.dataInicioVigencia);
      const fim = new Date(formData.dataFimVigencia);
      if (fim < inicio) {
        newErrors.dataFimVigencia = 'Data fim de vigência deve ser posterior à data início';
      }
    }

    if (!formData.logradouro.trim()) {
      newErrors.logradouro = 'Logradouro é obrigatório';
    }

    if (!formData.numero.trim()) {
      newErrors.numero = 'Número é obrigatório';
    }

    if (!formData.bairro.trim()) {
      newErrors.bairro = 'Bairro é obrigatório';
    }

    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
    } else {
      const cepRegex = /^\d{5}-?\d{3}$/;
      if (!cepRegex.test(formData.cep.replace(/\D/g, ''))) {
        newErrors.cep = 'CEP inválido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const dataToSave = {
        ...formData,
        diasUtilizacao: parseInt(formData.diasUtilizacao),
        quantidadeFracoes: parseInt(formData.quantidadeFracoes)
      };
      
      if (onSave) {
        onSave(dataToSave);
      } else {
        console.log('Dados a serem salvos:', dataToSave);
        alert('Clube conveniado salvo com sucesso!');
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="clubes-conveniados-form">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={handleCancel}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <Building2 size={28} />
            {clubeData ? 'Editar Clube Conveniado' : 'Novo Clube Conveniado'}
          </h1>
        </div>
      </header>

      <div className="page-content">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">Informações Básicas</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Nome do Clube <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.nome ? 'error' : ''}`}
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Digite o nome do clube"
                />
                {errors.nome && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.nome}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Código <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.codigo ? 'error' : ''}`}
                  value={formData.codigo}
                  onChange={(e) => handleChange('codigo', e.target.value)}
                  placeholder="Ex: CAM-001"
                />
                {errors.codigo && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.codigo}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Dias de Utilização no Período <span className="required">*</span>
                </label>
                <input
                  type="number"
                  className={`form-input ${errors.diasUtilizacao ? 'error' : ''}`}
                  value={formData.diasUtilizacao}
                  onChange={(e) => handleChange('diasUtilizacao', e.target.value)}
                  placeholder="Quantidade de dias"
                  min="1"
                />
                <span className="form-hint">
                  Quantidade de dias que o associado conveniado tem direito a acessar o clube durante o período estabelecido
                </span>
                {errors.diasUtilizacao && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.diasUtilizacao}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Frequência de Acesso <span className="required">*</span>
                </label>
                <select
                  className={`form-input ${errors.frequenciaAcesso ? 'error' : ''}`}
                  value={formData.frequenciaAcesso}
                  onChange={(e) => handleChange('frequenciaAcesso', e.target.value)}
                >
                  <option value="Mensal">Mensal</option>
                  <option value="Semestre">Semestre</option>
                  <option value="Ano">Ano</option>
                  <option value="Período Específico">Período Específico</option>
                </select>
                <span className="form-hint">
                  Período estabelecido para controle da quantidade de dias que o associado conveniado tem direito a acessar o clube
                </span>
                {errors.frequenciaAcesso && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.frequenciaAcesso}
                  </span>
                )}
              </div>
            </div>

            {showPeriodoEspecifico && (
              <div className="form-grid">
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
                  <span className="form-hint">
                    Período estabelecido de início para controle da quantidade de dias
                  </span>
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
                  <span className="form-hint">
                    Período estabelecido de fim para controle da quantidade de dias
                  </span>
                  {errors.periodoFinal && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.periodoFinal}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Quantidade de Frações de Uso <span className="required">*</span>
                </label>
                <input
                  type="number"
                  className={`form-input ${errors.quantidadeFracoes ? 'error' : ''}`}
                  value={formData.quantidadeFracoes}
                  onChange={(e) => handleChange('quantidadeFracoes', e.target.value)}
                  placeholder="Quantidade de frações"
                  min="1"
                />
                <span className="form-hint">
                  Quantidade de frações de uso que o associado conveniado tem direito a acessar o clube durante o período estabelecido
                </span>
                {errors.quantidadeFracoes && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.quantidadeFracoes}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Endereço do Clube</h2>
            <div className="form-grid">
              <div className="form-group form-group-full">
                <label className="form-label">
                  Logradouro <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.logradouro ? 'error' : ''}`}
                  value={formData.logradouro}
                  onChange={(e) => handleChange('logradouro', e.target.value)}
                  placeholder="Rua, Avenida, etc."
                />
                {errors.logradouro && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.logradouro}
                  </span>
                )}
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Número <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.numero ? 'error' : ''}`}
                  value={formData.numero}
                  onChange={(e) => handleChange('numero', e.target.value)}
                  placeholder="Número"
                />
                {errors.numero && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.numero}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Complemento</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.complemento}
                  onChange={(e) => handleChange('complemento', e.target.value)}
                  placeholder="Apto, Bloco, etc."
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Bairro <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.bairro ? 'error' : ''}`}
                  value={formData.bairro}
                  onChange={(e) => handleChange('bairro', e.target.value)}
                  placeholder="Bairro"
                />
                {errors.bairro && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.bairro}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  CEP <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.cep ? 'error' : ''}`}
                  value={formData.cep}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    const formattedValue = value.replace(/(\d{5})(\d)/, '$1-$2');
                    handleChange('cep', formattedValue);
                  }}
                  placeholder="00000-000"
                  maxLength="9"
                />
                {errors.cep && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.cep}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Vigência da Parceria</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Data de Início do Convênio <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={`form-input ${errors.dataInicioConvenio ? 'error' : ''}`}
                  value={formData.dataInicioConvenio}
                  onChange={(e) => handleChange('dataInicioConvenio', e.target.value)}
                />
                <span className="form-hint">
                  Data de início do convênio entre o clube conveniado e o Paulistano
                </span>
                {errors.dataInicioConvenio && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.dataInicioConvenio}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Data Início de Vigência <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={`form-input ${errors.dataInicioVigencia ? 'error' : ''}`}
                  value={formData.dataInicioVigencia}
                  onChange={(e) => handleChange('dataInicioVigencia', e.target.value)}
                />
                {errors.dataInicioVigencia && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.dataInicioVigencia}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Data Fim de Vigência <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={`form-input ${errors.dataFimVigencia ? 'error' : ''}`}
                  value={formData.dataFimVigencia}
                  onChange={(e) => handleChange('dataFimVigencia', e.target.value)}
                />
                <span className="form-hint">
                  Data do final da vigência de parceria entre o clube conveniado e o Paulistano
                </span>
                {errors.dataFimVigencia && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.dataFimVigencia}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Status</h2>
            <div className="form-grid">
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
                <span className="form-hint">
                  Marque para ativar ou desativar o clube conveniado
                </span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleCancel}>
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

export default ClubesConveniadosForm;

