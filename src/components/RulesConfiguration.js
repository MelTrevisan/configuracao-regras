import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Plus, 
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy
} from 'lucide-react';
import '../styles/RulesConfiguration.css';
import RuleBuilder from './RuleBuilder';

const RulesConfiguration = () => {
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('all');

  const [rules, setRules] = useState([
    {
      id: 1,
      codigoRegra: 'REG-001',
      name: 'Validação de CPF',
      module: 'Associados',
      field: 'CPF',
      type: 'validation',
      status: 'active',
      startDate: '2024-01-01',
      validationField: 'CPF',
      validationValue: 'Formato válido de CPF',
      lastModified: '08/10/2025 10:30'
    },
    {
      id: 2,
      codigoRegra: 'REG-002',
      name: 'Cálculo de Tempo de Efetividade',
      module: 'Associados',
      field: 'Tempo de Efetividade',
      type: 'formula',
      status: 'active',
      startDate: '2024-02-15',
      validationField: 'Data de Admissão',
      validationValue: 'Data não pode ser futura',
      lastModified: '07/10/2025 14:20'
    },
    {
      id: 3,
      codigoRegra: 'REG-003',
      name: 'Filtro de Status Ativo',
      module: 'Processos',
      field: 'Status',
      type: 'filter',
      status: 'active',
      startDate: '2024-03-01',
      validationField: 'Status',
      validationValue: 'Deve ser Ativo ou Inativo',
      lastModified: '05/10/2025 09:15'
    }
  ]);

  const modules = ['all', 'Candidatos', 'Associados', 'Visitantes'];

  const handleNewRule = () => {
    setSelectedRule(null);
    setShowRuleBuilder(true);
  };

  const handleEditRule = (rule) => {
    setSelectedRule(rule);
    setShowRuleBuilder(true);
  };

  const handleDeleteRule = (ruleId) => {
    if (window.confirm('Tem certeza que deseja excluir esta regra?')) {
      setRules(rules.filter(r => r.id !== ruleId));
    }
  };

  const handleDuplicateRule = (rule) => {
    const newRule = {
      ...rule,
      id: Math.max(...rules.map(r => r.id)) + 1,
      name: `${rule.name} (Cópia)`,
      lastModified: new Date().toLocaleString('pt-BR')
    };
    setRules([...rules, newRule]);
  };

  const handleSaveRule = (ruleData) => {
    if (selectedRule) {
      setRules(rules.map(r => 
        r.id === selectedRule.id 
          ? { ...r, ...ruleData, lastModified: new Date().toLocaleString('pt-BR') }
          : r
      ));
    } else {
      const newRule = {
        ...ruleData,
        id: Math.max(...rules.map(r => r.id), 0) + 1,
        lastModified: new Date().toLocaleString('pt-BR')
      };
      setRules([...rules, newRule]);
    }
    setShowRuleBuilder(false);
  };

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (rule.codigoRegra && rule.codigoRegra.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          rule.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rule.validationField.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (rule.validationValue && rule.validationValue.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesModule = filterModule === 'all' || rule.module === filterModule;
    return matchesSearch && matchesModule;
  });

  if (showRuleBuilder) {
    return (
      <RuleBuilder 
        onBack={() => setShowRuleBuilder(false)}
        onSave={handleSaveRule}
        initialRule={selectedRule}
        availableRules={rules.filter(r => r.status === 'active' && (!selectedRule || r.id !== selectedRule.id))}
      />
    );
  }

  return (
    <div className="rules-configuration">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back">
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <FileText size={28} />
            Configuração de Regras
          </h1>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleNewRule}>
            <Plus size={20} />
            Nova Regra
          </button>
        </div>
      </header>

      <div className="page-content">
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar regras por código, nome, campo ou critério de validação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <Filter size={18} />
            <label>Módulo:</label>
            <select 
              value={filterModule} 
              onChange={(e) => setFilterModule(e.target.value)}
            >
              {modules.map(module => (
                <option key={module} value={module}>
                  {module === 'all' ? 'Todos os Módulos' : module}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rules-list">
          <div className="list-header">
            <div className="header-cell">Código</div>
            <div className="header-cell" style={{flex: 2}}>Nome da Regra</div>
            <div className="header-cell">Módulo</div>
            <div className="header-cell">Campo</div>
            <div className="header-cell">Campo Validado</div>
            <div className="header-cell">Data Início</div>
            <div className="header-cell">Tipo</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Última Modificação</div>
            <div className="header-cell">Ações</div>
          </div>

          {filteredRules.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} />
              <h3>Nenhuma regra encontrada</h3>
              <p>Crie uma nova regra para começar</p>
              <button className="btn-primary" onClick={handleNewRule}>
                <Plus size={20} />
                Criar Primeira Regra
              </button>
            </div>
          ) : (
            filteredRules.map(rule => (
              <div key={rule.id} className="list-row">
                <div className="cell">
                  <strong>{rule.codigoRegra || '-'}</strong>
                </div>
                <div className="cell" style={{flex: 2}}>
                  <strong>{rule.name}</strong>
                  {rule.validationValue && (
                    <div className="validation-value">
                      <small>{rule.validationValue}</small>
                    </div>
                  )}
                </div>
                <div className="cell">{rule.module}</div>
                <div className="cell">{rule.field}</div>
                <div className="cell">
                  <strong>{rule.validationField}</strong>
                </div>
                <div className="cell">
                  {rule.startDate ? new Date(rule.startDate).toLocaleDateString('pt-BR') : '-'}
                </div>
                <div className="cell">
                  <span className={`badge badge-${rule.type}`}>
                    {rule.type === 'validation' ? 'Validação' : 
                     rule.type === 'formula' ? 'Fórmula' : 'Filtro'}
                  </span>
                </div>
                <div className="cell">
                  <span className={`status-badge ${rule.status}`}>
                    {rule.status === 'active' ? 'Ativa' : rule.status === 'inactive' ? 'Inativa' : 'Cancelada'}
                  </span>
                </div>
                <div className="cell">{rule.lastModified}</div>
                <div className="cell actions">
                  <button 
                    className="btn-icon" 
                    title="Editar"
                    onClick={() => handleEditRule(rule)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className="btn-icon" 
                    title="Duplicar"
                    onClick={() => handleDuplicateRule(rule)}
                  >
                    <Copy size={16} />
                  </button>
                  <button 
                    className="btn-icon btn-danger" 
                    title="Excluir"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    <Trash2 size={16} />
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

export default RulesConfiguration;
