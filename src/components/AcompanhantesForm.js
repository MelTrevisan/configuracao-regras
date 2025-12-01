import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  UserPlus, 
  Save,
  X,
  Calendar,
  AlertCircle,
  Upload,
  Camera
} from 'lucide-react';
import '../styles/Acompanhantes.css';

const AcompanhantesForm = ({ acompanhanteData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    ultimoNome: '',
    nascimento: '',
    sexo: '',
    nacionalidade: '',
    documento: '',
    tipoDocumento: '',
    via: '',
    carteira: '',
    profissao: '',
    responsavel: '',
    responsavelId: null,
    periodoIni: '',
    periodoFim: '',
    situacao: 1, // 1=Ativo por padrão
    foto: null
  });

  const [errors, setErrors] = useState({});
  const [responsavelSearch, setResponsavelSearch] = useState('');
  const [showResponsavelResults, setShowResponsavelResults] = useState(false);

  // Mock de responsáveis (associados)
  const mockResponsaveis = [
    { id: 12345, nome: 'João Silva', titulo: '12345' },
    { id: 12346, nome: 'Ana Oliveira', titulo: '12346' },
    { id: 12347, nome: 'Roberto Costa', titulo: '12347' },
    { id: 12348, nome: 'Patricia Ferreira', titulo: '12348' },
    { id: 12349, nome: 'Marcos Lima', titulo: '12349' }
  ];

  const tiposDocumento = [
    { id: 1, descricao: 'CPF' },
    { id: 2, descricao: 'RG' },
    { id: 3, descricao: 'CNH' },
    { id: 4, descricao: 'Passaporte' },
    { id: 5, descricao: 'RNE' }
  ];

  const nacionalidades = [
    { id: 1, descricao: 'Brasileira' },
    { id: 2, descricao: 'Argentina' },
    { id: 3, descricao: 'Chilena' },
    { id: 4, descricao: 'Uruguaia' },
    { id: 5, descricao: 'Outra' }
  ];

  const profissoes = [
    { id: 1, descricao: 'Advogado(a)' },
    { id: 2, descricao: 'Médico(a)' },
    { id: 3, descricao: 'Engenheiro(a)' },
    { id: 4, descricao: 'Professor(a)' },
    { id: 5, descricao: 'Designer' },
    { id: 6, descricao: 'Contador(a)' },
    { id: 7, descricao: 'Outra' }
  ];

  useEffect(() => {
    if (acompanhanteData) {
      setFormData({
        nome: acompanhanteData.nome || '',
        ultimoNome: acompanhanteData.ultimoNome || '',
        nascimento: acompanhanteData.nascimento || '',
        sexo: acompanhanteData.sexo !== undefined ? acompanhanteData.sexo : '',
        nacionalidade: acompanhanteData.nacionalidade || '',
        documento: acompanhanteData.documento || '',
        tipoDocumento: acompanhanteData.tipoDocumento || '',
        via: acompanhanteData.via || '',
        carteira: acompanhanteData.carteira || '',
        profissao: acompanhanteData.profissao || '',
        responsavel: acompanhanteData.responsavel?.nome || '',
        responsavelId: acompanhanteData.responsavel?.id || null,
        periodoIni: acompanhanteData.periodoIni || '',
        periodoFim: acompanhanteData.periodoFim || '',
        situacao: acompanhanteData.situacao !== undefined ? acompanhanteData.situacao : 1,
        foto: acompanhanteData.foto || null
      });
    }
  }, [acompanhanteData]);

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

  const handleResponsavelSearch = (value) => {
    setResponsavelSearch(value);
    setShowResponsavelResults(value.length > 0);
  };

  const selectResponsavel = (responsavel) => {
    setFormData(prev => ({
      ...prev,
      responsavel: responsavel.nome,
      responsavelId: responsavel.id
    }));
    setResponsavelSearch(responsavel.nome);
    setShowResponsavelResults(false);
  };

  const filteredResponsaveis = mockResponsaveis.filter(r =>
    r.nome.toLowerCase().includes(responsavelSearch.toLowerCase()) ||
    r.titulo.includes(responsavelSearch)
  );

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            foto: reader.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setErrors(prev => ({
          ...prev,
          foto: 'Por favor, selecione um arquivo de imagem'
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.ultimoNome.trim()) {
      newErrors.ultimoNome = 'Último nome é obrigatório';
    }

    if (!formData.nascimento) {
      newErrors.nascimento = 'Data de nascimento é obrigatória';
    } else {
      const nascimento = new Date(formData.nascimento);
      const hoje = new Date();
      if (nascimento > hoje) {
        newErrors.nascimento = 'Data de nascimento não pode ser futura';
      }
    }

    if (formData.sexo === '') {
      newErrors.sexo = 'Sexo é obrigatório';
    }

    if (!formData.documento.trim()) {
      newErrors.documento = 'Documento é obrigatório';
    }

    if (!formData.tipoDocumento) {
      newErrors.tipoDocumento = 'Tipo de documento é obrigatório';
    }

    if (!formData.responsavelId) {
      newErrors.responsavel = 'Responsável é obrigatório';
    }

    if (!formData.periodoIni) {
      newErrors.periodoIni = 'Período inicial é obrigatório';
    }

    if (!formData.periodoFim) {
      newErrors.periodoFim = 'Período final é obrigatório';
    }

    if (formData.periodoIni && formData.periodoFim) {
      const inicio = new Date(formData.periodoIni);
      const fim = new Date(formData.periodoFim);
      if (fim < inicio) {
        newErrors.periodoFim = 'Período final deve ser posterior ao período inicial';
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
        responsavel: {
          id: formData.responsavelId,
          nome: formData.responsavel,
          titulo: mockResponsaveis.find(r => r.id === formData.responsavelId)?.titulo || ''
        }
      };
      
      if (onSave) {
        onSave(dataToSave);
      } else {
        console.log('Dados a serem salvos:', dataToSave);
        alert('Acompanhante salvo com sucesso!');
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="acompanhantes-form">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={handleCancel}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <UserPlus size={28} />
            {acompanhanteData ? 'Editar Acompanhante' : 'Novo Acompanhante'}
          </h1>
        </div>
      </header>

      <div className="page-content">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">Dados Pessoais</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Nome <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.nome ? 'error' : ''}`}
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Digite o nome"
                  maxLength={50}
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
                  Último Nome <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.ultimoNome ? 'error' : ''}`}
                  value={formData.ultimoNome}
                  onChange={(e) => handleChange('ultimoNome', e.target.value)}
                  placeholder="Digite o último nome"
                  maxLength={30}
                />
                {errors.ultimoNome && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.ultimoNome}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Data de Nascimento <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={`form-input ${errors.nascimento ? 'error' : ''}`}
                  value={formData.nascimento}
                  onChange={(e) => handleChange('nascimento', e.target.value)}
                />
                {errors.nascimento && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.nascimento}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Sexo <span className="required">*</span>
                </label>
                <select
                  className={`form-input ${errors.sexo ? 'error' : ''}`}
                  value={formData.sexo}
                  onChange={(e) => handleChange('sexo', parseInt(e.target.value))}
                >
                  <option value="">Selecione</option>
                  <option value="0">Feminino</option>
                  <option value="1">Masculino</option>
                </select>
                {errors.sexo && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.sexo}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Nacionalidade</label>
                <select
                  className="form-input"
                  value={formData.nacionalidade}
                  onChange={(e) => handleChange('nacionalidade', e.target.value)}
                >
                  <option value="">Selecione</option>
                  {nacionalidades.map(nac => (
                    <option key={nac.id} value={nac.descricao}>{nac.descricao}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Profissão</label>
                <select
                  className="form-input"
                  value={formData.profissao}
                  onChange={(e) => handleChange('profissao', e.target.value)}
                >
                  <option value="">Selecione</option>
                  {profissoes.map(prof => (
                    <option key={prof.id} value={prof.descricao}>{prof.descricao}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Documento</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Tipo de Documento <span className="required">*</span>
                </label>
                <select
                  className={`form-input ${errors.tipoDocumento ? 'error' : ''}`}
                  value={formData.tipoDocumento}
                  onChange={(e) => handleChange('tipoDocumento', e.target.value)}
                >
                  <option value="">Selecione</option>
                  {tiposDocumento.map(tipo => (
                    <option key={tipo.id} value={tipo.descricao}>{tipo.descricao}</option>
                  ))}
                </select>
                {errors.tipoDocumento && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.tipoDocumento}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Número do Documento <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.documento ? 'error' : ''}`}
                  value={formData.documento}
                  onChange={(e) => handleChange('documento', e.target.value)}
                  placeholder="Digite o número do documento"
                  maxLength={20}
                />
                {errors.documento && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.documento}
                  </span>
                )}
              </div>

              <div className="form-group form-group-inline">
                <div className="form-group-inline-item">
                  <label className="form-label">Via</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.via}
                    onChange={(e) => handleChange('via', e.target.value)}
                    placeholder="Via (2 caracteres)"
                    maxLength={2}
                  />
                </div>
                <div className="form-group-inline-item">
                  <label className="form-label">Carteira</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.carteira}
                    onChange={(e) => handleChange('carteira', e.target.value)}
                    placeholder="Número da carteira"
                    maxLength={20}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Responsável</h2>
            <div className="form-grid">
              <div className="form-group form-group-full">
                <label className="form-label">
                  Associado Responsável <span className="required">*</span>
                </label>
                <div className="search-container">
                  <input
                    type="text"
                    className={`form-input ${errors.responsavel ? 'error' : ''}`}
                    value={responsavelSearch}
                    onChange={(e) => handleResponsavelSearch(e.target.value)}
                    placeholder="Buscar por nome ou título do responsável..."
                    onFocus={() => setShowResponsavelResults(responsavelSearch.length > 0)}
                  />
                  {showResponsavelResults && filteredResponsaveis.length > 0 && (
                    <div className="search-results">
                      {filteredResponsaveis.map(resp => (
                        <div
                          key={resp.id}
                          className="search-result-item"
                          onClick={() => selectResponsavel(resp)}
                        >
                          <div className="result-name">{resp.nome}</div>
                          <div className="result-titulo">Título: {resp.titulo}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.responsavel && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.responsavel}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Período de Validade</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Período Inicial <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={`form-input ${errors.periodoIni ? 'error' : ''}`}
                  value={formData.periodoIni}
                  onChange={(e) => handleChange('periodoIni', e.target.value)}
                />
                {errors.periodoIni && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.periodoIni}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Período Final <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={`form-input ${errors.periodoFim ? 'error' : ''}`}
                  value={formData.periodoFim}
                  onChange={(e) => handleChange('periodoFim', e.target.value)}
                />
                {errors.periodoFim && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.periodoFim}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Situação</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Situação</label>
                <select
                  className="form-input"
                  value={formData.situacao}
                  onChange={(e) => handleChange('situacao', parseInt(e.target.value))}
                >
                  <option value="0">Inativo</option>
                  <option value="1">Ativo</option>
                  <option value="2">Sem Registro</option>
                  <option value="3">Pendente Pagamento</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Foto</h2>
            <div className="form-grid">
              <div className="form-group form-group-full">
                <div className="foto-upload-container">
                  {formData.foto ? (
                    <div className="foto-preview">
                      <img src={formData.foto} alt="Foto do acompanhante" />
                      <button
                        type="button"
                        className="btn-remove-foto"
                        onClick={() => handleChange('foto', null)}
                      >
                        <X size={16} />
                        Remover Foto
                      </button>
                    </div>
                  ) : (
                    <div className="foto-upload-area">
                      <label htmlFor="foto-upload" className="foto-upload-label">
                        <Camera size={48} />
                        <span>Clique para fazer upload da foto</span>
                        <span className="foto-hint">ou arraste e solte aqui</span>
                      </label>
                      <input
                        id="foto-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  )}
                </div>
                {errors.foto && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.foto}
                  </span>
                )}
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

export default AcompanhantesForm;

