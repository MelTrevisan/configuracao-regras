import React, { useState } from 'react';
import { 
  ArrowLeft,
  User, 
  Calendar,
  Clock,
  CreditCard,
  Car,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  Edit2,
  Save,
  X,
  AlertCircle,
  MapPin,
  Phone
} from 'lucide-react';
import '../styles/AssociadoProfile.css';

const AssociadoProfile = ({ personId, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('estatutarios');
  const [formData, setFormData] = useState({
    // Dados pessoais - baseados na imagem
    titulo: '16',
    nome: 'Ana Raquel Desporto Borges',
    cpf: '***.***.***-**',
    rg: '**.***.***-*',
    nascimento: '1969-07-18',
    sexo: 'feminino',
    nacionalidade: 'Brasileira',
    estadoCivil: 'divorciada',
    nomePai: 'PAULO HUMBERTO DONGES',
    nomeMae: 'MARIA HELENA DESPORTO',
    celular: '(011) 99975-7903',
    email: 'anara.desporto.borges@gmail.com',
    tratamento: 'ILMA.SRA.DRA.',
    instrucao: 'mestrado',
    
    // Dados do associado - baseados na imagem
    codigo: '60010',
    admissao: '2006-04-04',
    efetividade: '2006-04-04',
    tempoEfetividade: '19 anos 5 meses 21 dias',
    responsavel: '***',
    viaCarteira: '1',
    carteira: '18/03/2016 07:10:40',
    cadastro: '1998-10-15',
    situacao: 'ativa',
    classe: 'INDIV. ART. 28 § 2º',
    condicao: 'SOCIA E TITULAR',
    profissao: 'advogada',
    recadastramento: '2023-02-06',
    ultimaAtualizacao: '12/04/2013 10:16:27',
    
    // Opções e benefícios - baseados na imagem
    direitoSocial: true,
    cortesiaGaragem: false,
    considerarBrasileiro: true,
    necessidadeEspecial: false,
    interdicaoJudicial: false,
    falecido: false,
    cobrancaResponsavel: false,
    preEmidao: false
  });

  // Opções para dropdowns
  const situacaoOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'inativo', label: 'Inativo' },
    { value: 'suspenso', label: 'Suspenso' },
    { value: 'afastado', label: 'Afastado' },
    { value: 'transferido', label: 'Transferido' },
    { value: 'demitido', label: 'Demitido' },
    { value: 'aposentado', label: 'Aposentado' },
    { value: 'falecido', label: 'Falecido' }
  ];

  const classeOptions = [
    { value: 'INDIV. ART. 28 § 2º', label: 'INDIV. ART. 28 § 2º' },
    { value: 'EFETIVO', label: 'Efetivo' },
    { value: 'BENEFICIARIO', label: 'Beneficiário' },
    { value: 'DEPENDENTE', label: 'Dependente' },
    { value: 'CONVIDADO', label: 'Convidado' },
    { value: 'TEMPORARIO', label: 'Temporário' }
  ];

  const condicaoOptions = [
    { value: 'SOCIA E TITULAR', label: 'Sócia e Titular' },
    { value: 'regular', label: 'Regular' },
    { value: 'irregular', label: 'Irregular' },
    { value: 'pendente', label: 'Pendente' },
    { value: 'suspenso', label: 'Suspenso' },
    { value: 'bloqueado', label: 'Bloqueado' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar os dados
    console.log('Salvando dados do associado:', formData);
    setIsEditing(false);
    // Simular atualização da última atualização
    setFormData(prev => ({
      ...prev,
      ultimaAtualizacao: new Date().toLocaleString('pt-BR')
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Aqui você pode resetar os dados se necessário
  };

  const calculateTempoEfetividade = () => {
    const admissaoDate = new Date(formData.admissao);
    const efetividadeDate = new Date(formData.efetividade);
    const hoje = new Date();
    
    let dataBase = efetividadeDate;
    if (efetividadeDate > hoje) {
      dataBase = hoje;
    }
    
    const diffTime = Math.abs(dataBase - admissaoDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const anos = Math.floor(diffDays / 365);
    const meses = Math.floor((diffDays % 365) / 30);
    const dias = diffDays % 30;
    
    return `${anos} anos, ${meses} meses e ${dias} dias`;
  };

  const renderField = (label, field, type = 'text', options = null, icon = null) => {
    const IconComponent = icon;
    
    return (
      <div className="field-group">
        <label className="field-label">
          {IconComponent && <IconComponent size={16} />}
          {label}:
        </label>
        {isEditing ? (
          type === 'select' ? (
            <select
              className="field-input"
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === 'checkbox' ? (
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-label">
                {formData[field] ? 'Sim' : 'Não'}
              </span>
            </div>
          ) : type === 'datetime-local' ? (
            <input
              type="datetime-local"
              className="field-input"
              value={formData[field].replace(' ', 'T')}
              onChange={(e) => handleInputChange(field, e.target.value.replace('T', ' '))}
            />
          ) : (
            <input
              type={type}
              className="field-input"
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
            />
          )
        ) : (
          <span className="field-value">
            {type === 'checkbox' ? (formData[field] ? 'Sim' : 'Não') : formData[field]}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="associado-profile">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={onBack}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <User size={28} />
            Perfil do Associado
          </h1>
        </div>
        <div className="header-actions">
          {isEditing ? (
            <>
              <button className="btn-secondary" onClick={handleCancel}>
                <X size={20} />
                Cancelar
              </button>
              <button className="btn-primary" onClick={handleSave}>
                <Save size={20} />
                Salvar
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              <Edit2 size={20} />
              Editar
            </button>
          )}
        </div>
      </header>

      <div className="page-content">
        <div className="profile-container">
          {/* Profile Header - Design Moderno */}
          <div className="profile-header">
            <div className="profile-info-section">
              <div className="profile-avatar-large">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face" 
                  alt="Ana Raquel Borges" 
                />
                <div className="status-indicator active"></div>
              </div>
              <div className="profile-details">
                <h1 className="profile-name">{formData.nome}</h1>
                <div className="profile-badges">
                  <span className="badge badge-primary">ASSOCIADO</span>
                  <span className="badge badge-success">ATIVA</span>
                </div>
                <div className="profile-meta">
                  <span className="meta-item">
                    <User size={16} />
                    ID Pessoa: {formData.titulo}
                  </span>
                  <span className="meta-item">
                    <CreditCard size={16} />
                    Código: {formData.codigo}
                  </span>
                  <span className="meta-item">
                    <Calendar size={16} />
                    Desde: {new Date(formData.admissao).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn-action btn-secondary">
                <FileText size={18} />
                Relatório
              </button>
              <button className="btn-action btn-primary">
                <Edit2 size={18} />
                Editar
              </button>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>Tempo de Associado</h3>
                <p>{formData.tempoEfetividade}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Status</h3>
                <p className="status-text active">{formData.situacao.toUpperCase()}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <User size={24} />
              </div>
              <div className="stat-content">
                <h3>Classe</h3>
                <p>{formData.classe}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Calendar size={24} />
              </div>
              <div className="stat-content">
                <h3>Última Atualização</h3>
                <p>{formData.ultimaAtualizacao}</p>
              </div>
            </div>
          </div>

          {/* Tabs Navigation - Design Moderno */}
          <div className="tabs-container">
            <div className="tabs-nav">
              <button 
                className={`tab-button ${activeTab === 'estatutarios' ? 'active' : ''}`}
                onClick={() => setActiveTab('estatutarios')}
              >
                <User size={18} />
                Dados Estatutários
              </button>
              <button 
                className={`tab-button ${activeTab === 'pessoa' ? 'active' : ''}`}
                onClick={() => setActiveTab('pessoa')}
              >
                <User size={18} />
                Dados da Pessoa
              </button>
              <button 
                className={`tab-button ${activeTab === 'documentos' ? 'active' : ''}`}
                onClick={() => setActiveTab('documentos')}
              >
                <FileText size={18} />
                Documentos
              </button>
              <button 
                className={`tab-button ${activeTab === 'dependentes' ? 'active' : ''}`}
                onClick={() => setActiveTab('dependentes')}
              >
                <User size={18} />
                Dependentes
              </button>
            </div>

            {/* Tab Content - Design Moderno */}
            <div className="tab-content">
              {/* Tab Dados Estatutários */}
              <div className={`tab-panel ${activeTab === 'estatutarios' ? 'active' : ''}`}>
                <div className="content-sections">
                  {/* Seção de Contato */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <User size={20} />
                        Informações de Contato
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">E-mail</label>
                          <span className="field-value email">{formData.email}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Celular</label>
                          <span className="field-value">{formData.celular}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Nacionalidade</label>
                          <span className="field-value">{formData.nacionalidade}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Tratamento</label>
                          <span className="field-value">{formData.tratamento}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seção de Opções */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <CheckCircle size={20} />
                        Opções e Benefícios
                      </h2>
                    </div>
                    <div className="options-grid">
                      <div className={`option-card ${formData.direitoSocial ? 'active' : ''}`}>
                        <CheckCircle size={20} />
                        <span>Direito Social</span>
                      </div>
                      <div className={`option-card ${formData.considerarBrasileiro ? 'active' : ''}`}>
                        <CheckCircle size={20} />
                        <span>Considerar Brasileiro</span>
                      </div>
                      <div className={`option-card ${formData.cortesiaGaragem ? 'active' : ''}`}>
                        <Car size={20} />
                        <span>Cortesia Garagem</span>
                      </div>
                      <div className={`option-card ${formData.necessidadeEspecial ? 'active' : ''}`}>
                        <AlertCircle size={20} />
                        <span>Necessidade Especial</span>
                      </div>
                      <div className={`option-card ${formData.interdicaoJudicial ? 'active' : ''}`}>
                        <XCircle size={20} />
                        <span>Interdição Judicial</span>
                      </div>
                      <div className={`option-card ${formData.falecido ? 'active' : ''}`}>
                        <XCircle size={20} />
                        <span>Falecido</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Dados da Pessoa */}
              <div className={`tab-panel ${activeTab === 'pessoa' ? 'active' : ''}`}>
                <div className="content-sections">
                  {/* Informações Pessoais Básicas */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <User size={20} />
                        Ana Raquel Desporto Borges
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Nome Completo</label>
                          <span className="field-value">{formData.nome}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <Calendar size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Data de Nascimento</label>
                          <span className="field-value">{new Date(formData.nascimento).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Sexo</label>
                          <span className="field-value">Feminino</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Estado Civil</label>
                          <span className="field-value">{formData.estadoCivil.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Nacionalidade</label>
                          <span className="field-value">{formData.nacionalidade}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Profissão</label>
                          <span className="field-value">{formData.profissao.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documentos Pessoais */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <FileText size={20} />
                        Documentos Pessoais
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <FileText size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">CPF</label>
                          <span className="field-value">{formData.cpf}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <FileText size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">RG</label>
                          <span className="field-value">{formData.rg}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <CreditCard size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Título de Associado</label>
                          <span className="field-value">{formData.titulo}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <CreditCard size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Código do Associado</label>
                          <span className="field-value">{formData.codigo}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informações de Contato */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <User size={20} />
                        Informações de Contato
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">E-mail</label>
                          <span className="field-value email">{formData.email}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Celular</label>
                          <span className="field-value">{formData.celular}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Tratamento</label>
                          <span className="field-value">{formData.tratamento}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Instrução</label>
                          <span className="field-value">{formData.instrucao.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informações Familiares */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <User size={20} />
                        Informações Familiares
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Nome do Pai</label>
                          <span className="field-value">{formData.nomePai}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Nome da Mãe</label>
                          <span className="field-value">{formData.nomeMae}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Responsável</label>
                          <span className="field-value">{formData.responsavel}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Parentesco</label>
                          <span className="field-value">SEM PARENTESCO</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Endereço Residencial */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <MapPin size={20} />
                        Endereço Residencial
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <MapPin size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">CEP</label>
                          <span className="field-value">01234-567</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <MapPin size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Logradouro</label>
                          <span className="field-value">Rua das Flores, 123</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <MapPin size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Bairro</label>
                          <span className="field-value">Centro</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <MapPin size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Cidade</label>
                          <span className="field-value">São Paulo</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <MapPin size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">UF</label>
                          <span className="field-value">SP</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <MapPin size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Complemento</label>
                          <span className="field-value">Apto 45</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <CheckCircle size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Endereço de Correspondência</label>
                          <span className="field-value">SIM</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <CheckCircle size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Endereço de Cobrança</label>
                          <span className="field-value">SIM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Telefones */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <Phone size={20} />
                        Telefones
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <Phone size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">DDD</label>
                          <span className="field-value">11</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <Phone size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Telefone Residencial</label>
                          <span className="field-value">3333-4444</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <Phone size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Telefone Comercial</label>
                          <span className="field-value">5555-6666</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <Phone size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Celular</label>
                          <span className="field-value">{formData.celular}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dados Cadastrais */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <FileText size={20} />
                        Dados Cadastrais
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <Calendar size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Data de Cadastro</label>
                          <span className="field-value">15/03/2010</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <Calendar size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Última Atualização</label>
                          <span className="field-value">20/12/2024</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Usuário que Cadastrou</label>
                          <span className="field-value">Sistema</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Usuário que Atualizou</label>
                          <span className="field-value">Admin</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <FileText size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Observações</label>
                          <span className="field-value">Associado ativo sem pendências</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Documentos */}
              <div className={`tab-panel ${activeTab === 'documentos' ? 'active' : ''}`}>
                <div className="content-sections">
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <FileText size={20} />
                        Documentos do Associado
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <FileText size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">CPF</label>
                          <span className="field-value">{formData.cpf}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <FileText size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">RG</label>
                          <span className="field-value">{formData.rg}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <CreditCard size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Título</label>
                          <span className="field-value">{formData.titulo}</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <CreditCard size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Código</label>
                          <span className="field-value">{formData.codigo}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lista de Documentos */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <FileText size={20} />
                        Histórico de Documentos
                      </h2>
                    </div>
                    <div className="document-list">
                      <div className="document-item">
                        <div className="document-info">
                          <div className="document-icon">
                            <FileText size={16} />
                          </div>
                          <div className="document-details">
                            <h4>CPF</h4>
                            <p>Documento de identificação pessoal</p>
                          </div>
                        </div>
                        <div className="document-date">
                          15/10/1998
                        </div>
                      </div>
                      <div className="document-item">
                        <div className="document-info">
                          <div className="document-icon">
                            <FileText size={16} />
                          </div>
                          <div className="document-details">
                            <h4>RG</h4>
                            <p>Registro Geral de Identidade</p>
                          </div>
                        </div>
                        <div className="document-date">
                          15/10/1998
                        </div>
                      </div>
                      <div className="document-item">
                        <div className="document-info">
                          <div className="document-icon">
                            <CreditCard size={16} />
                          </div>
                          <div className="document-details">
                            <h4>Carteira de Associado</h4>
                            <p>Documento de identificação do associado</p>
                          </div>
                        </div>
                        <div className="document-date">
                          18/03/2016
                        </div>
                      </div>
                      <div className="document-item">
                        <div className="document-info">
                          <div className="document-icon">
                            <FileText size={16} />
                          </div>
                          <div className="document-details">
                            <h4>Comprovante de Residência</h4>
                            <p>Documento comprobatório de endereço</p>
                          </div>
                        </div>
                        <div className="document-date">
                          06/02/2023
                        </div>
                      </div>
                      <div className="document-item">
                        <div className="document-info">
                          <div className="document-icon">
                            <FileText size={16} />
                          </div>
                          <div className="document-details">
                            <h4>Foto Atualizada</h4>
                            <p>Foto para carteira de associado</p>
                          </div>
                        </div>
                        <div className="document-date">
                          18/03/2016
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cursos e Eventos */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <Calendar size={20} />
                        Cursos e Eventos
                      </h2>
                    </div>
                    <div className="event-list">
                      <div className="event-item">
                        <div className="event-icon">
                          <Calendar size={20} />
                        </div>
                        <div className="event-content">
                          <div className="event-title">Curso de Natação Adulto</div>
                          <div className="event-description">Aulas de natação para associados adultos</div>
                        </div>
                        <div className="event-date">15/01/2024</div>
                      </div>
                      <div className="event-item">
                        <div className="event-icon">
                          <Calendar size={20} />
                        </div>
                        <div className="event-content">
                          <div className="event-title">Evento de Confraternização</div>
                          <div className="event-description">Festa de fim de ano do clube</div>
                        </div>
                        <div className="event-date">20/12/2023</div>
                      </div>
                      <div className="event-item">
                        <div className="event-icon">
                          <Calendar size={20} />
                        </div>
                        <div className="event-content">
                          <div className="event-title">Workshop de Yoga</div>
                          <div className="event-description">Aulas de yoga para iniciantes</div>
                        </div>
                        <div className="event-date">10/11/2023</div>
                      </div>
                      <div className="event-item">
                        <div className="event-icon">
                          <Calendar size={20} />
                        </div>
                        <div className="event-content">
                          <div className="event-title">Torneio de Tênis</div>
                          <div className="event-description">Competição interna de tênis</div>
                        </div>
                        <div className="event-date">05/10/2023</div>
                      </div>
                      <div className="event-item">
                        <div className="event-icon">
                          <Calendar size={20} />
                        </div>
                        <div className="event-content">
                          <div className="event-title">Curso de Hidroginástica</div>
                          <div className="event-description">Aulas de hidroginástica para terceira idade</div>
                        </div>
                        <div className="event-date">28/09/2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Dependentes */}
              <div className={`tab-panel ${activeTab === 'dependentes' ? 'active' : ''}`}>
                <div className="content-sections">
                  {/* Dependente 1 - Esposa */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <User size={20} />
                        Lilian Ventura da Silva
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <Calendar size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Data de Nascimento</label>
                          <span className="field-value">15/03/1990</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Grau de Parentesco</label>
                          <span className="field-value">Esposa</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <CreditCard size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Número Carteirinha</label>
                          <span className="field-value">DEP-001</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dependente 2 - Filha */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <User size={20} />
                        Júlia Ventura da Silva
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <Calendar size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Data de Nascimento</label>
                          <span className="field-value">22/08/2005</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Grau de Parentesco</label>
                          <span className="field-value">Filha</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <CreditCard size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Número Carteirinha</label>
                          <span className="field-value">DEP-002</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dependente 3 - Filho */}
                  <div className="info-section">
                    <div className="section-header">
                      <h2 className="section-title">
                        <User size={20} />
                        Enzo Ventura da Silva
                      </h2>
                    </div>
                    <div className="fields-grid">
                      <div className="field-card">
                        <div className="field-icon">
                          <Calendar size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Data de Nascimento</label>
                          <span className="field-value">10/12/2013</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <User size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Grau de Parentesco</label>
                          <span className="field-value">Filho</span>
                        </div>
                      </div>
                      <div className="field-card">
                        <div className="field-icon">
                          <CreditCard size={16} />
                        </div>
                        <div className="field-content">
                          <label className="field-label">Número Carteirinha</label>
                          <span className="field-value">DEP-003</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociadoProfile;
