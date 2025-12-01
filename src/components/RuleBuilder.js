import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2,
  Save,
  X,
  ChevronDown,
  History,
  User,
  Calendar,
  Play
} from 'lucide-react';
import '../styles/RuleBuilder.css';

const RuleBuilder = ({ onBack, onSave, initialRule = null }) => {
  const [ruleName, setRuleName] = useState(initialRule?.name || '');
  const [codigoRegra, setCodigoRegra] = useState(initialRule?.codigoRegra || '');
  const [ruleModule, setRuleModule] = useState(initialRule?.module || '');
  const [ruleType, setRuleType] = useState(initialRule?.type || 'validation');
  const [ruleStatus, setRuleStatus] = useState(initialRule?.status || 'active');
  const [ruleStartDate, setRuleStartDate] = useState(initialRule?.startDate || '');
  const [validationField, setValidationField] = useState(initialRule?.validationField || '');
  const [validationValue, setValidationValue] = useState(initialRule?.validationValue || '');
  const [selectedFields, setSelectedFields] = useState(initialRule?.selectedFields || []);
  const [fieldTypes, setFieldTypes] = useState(initialRule?.fieldTypes || {});
  const [conditions, setConditions] = useState(
    initialRule?.conditions || []
  );
  const [conditionGroups, setConditionGroups] = useState([0]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Histórico mockado de alterações
  const [ruleHistory] = useState([
    {
      id: 1,
      usuario: 'João Silva',
      dataInicio: '01/10/2025 10:00',
      dataFim: '05/10/2025 15:30',
      alteracao: 'Criação da regra',
      versao: '1.0'
    },
    {
      id: 2,
      usuario: 'Maria Santos',
      dataInicio: '05/10/2025 15:30',
      dataFim: '08/10/2025 09:15',
      alteracao: 'Alteração de condições',
      versao: '1.1'
    },
    {
      id: 3,
      usuario: 'Pedro Costa',
      dataInicio: '08/10/2025 09:15',
      dataFim: 'Atual',
      alteracao: 'Ajuste de operadores',
      versao: '1.2'
    }
  ]);

  // Opções disponíveis
  const modules = ['Candidatos', 'Associados', 'Visitantes'];
  
  const fields = ['Condição', 'Classe', 'Situação', 'Grau de Parentesco', 'Data de Admissão'];

  // Função para obter operadores baseados no tipo de valor
  const getOperatorsByValueType = (valueType) => {
    switch (valueType) {
      case 'text':
        return [
          { value: 'equals', label: 'Igual a' },
          { value: 'notEquals', label: 'Diferente de' },
          { value: 'contains', label: 'Contém' },
          { value: 'notContains', label: 'Não contém' },
          { value: 'startsWith', label: 'Começa com' },
          { value: 'endsWith', label: 'Termina com' },
          { value: 'inList', label: 'Em lista' },
          { value: 'notInList', label: 'Não está na lista' },
          { value: 'isNull', label: 'Nulo' },
          { value: 'isNotNull', label: 'Não nulo' }
        ];
      case 'number':
        return [
          { value: 'equals', label: 'Igual a' },
          { value: 'notEquals', label: 'Diferente de' },
          { value: 'greaterThan', label: 'Maior que' },
          { value: 'lessThan', label: 'Menor que' },
          { value: 'greaterThanOrEqual', label: 'Maior ou igual a' },
          { value: 'lessThanOrEqual', label: 'Menor ou igual a' },
          { value: 'between', label: 'Entre (inclusive)' },
          { value: 'isNull', label: 'Nulo' },
          { value: 'isNotNull', label: 'Não é nulo' }
        ];
      case 'date':
        return [
          { value: 'equals', label: 'Igual a (data exata)' },
          { value: 'before', label: 'Antes de' },
          { value: 'after', label: 'Depois de' },
          { value: 'between', label: 'Entre datas' },
          { value: 'today', label: 'Hoje' },
          { value: 'yesterday', label: 'Ontem' },
          { value: 'tomorrow', label: 'Amanhã' },
          { value: 'lastNDays', label: 'Nos últimos N dias' },
          { value: 'nextNDays', label: 'No próximo N dias' },
          { value: 'monthEquals', label: 'Mês igual a' },
          { value: 'dayOfWeekEquals', label: 'Dia da semana igual a' },
          { value: 'isNull', label: 'Nulo' },
          { value: 'isNotNull', label: 'Não nulo' }
        ];
      case 'boolean':
        return [
          { value: 'isTrue', label: 'É Verdadeiro' },
          { value: 'isFalse', label: 'É Falso' },
          { value: 'isNull', label: 'Nulo' },
          { value: 'isNotNull', label: 'Não nulo' }
        ];
      case 'list':
        return [
          { value: 'equals', label: 'Igual a' },
          { value: 'notEquals', label: 'Diferente de' },
          { value: 'in', label: 'Em (qualquer de…)' },
          { value: 'notIn', label: 'Não em' },
          { value: 'isNull', label: 'Nulo' },
          { value: 'isNotNull', label: 'Não nulo' }
        ];
      default:
        return [
          { value: 'equals', label: 'Igual a' },
          { value: 'notEquals', label: 'Diferente de' },
          { value: 'contains', label: 'Contém' },
          { value: 'greaterThan', label: 'Maior que' },
          { value: 'lessThan', label: 'Menor que' },
          { value: 'between', label: 'Entre' }
        ];
    }
  };

  const valueTypes = [
    { value: 'number', label: 'Número' },
    { value: 'date', label: 'Data' },
    { value: 'text', label: 'Texto' }
  ];

  const getFieldType = (fieldName) => {
    const dateFields = ['Data de Nascimento', 'Data de Cadastro', 'Data de Emissão', 'Data de Validade', 'Data de Abertura', 'Data de Fechamento', 'Data de Criação'];
    const numberFields = ['Número', 'Tempo de Efetividade', 'Pontuação', 'Ordem', 'Classificação', 'Valor', 'Nível de Acesso'];
    const booleanFields = ['Status', 'Aprovado', 'Permitido', 'Compartilhado'];
    
    if (dateFields.includes(fieldName)) return 'date';
    if (numberFields.includes(fieldName)) return 'number';
    if (booleanFields.includes(fieldName)) return 'boolean';
    return 'text';
  };

  const generateNoCodeText = () => {
    if (conditions.length === 0) return 'Nenhuma condição definida';
    
    let text = `Regra: ${ruleName || '[Nome da Regra]'}\n\n`;
    text += `Quando:\n`;
    
    conditions.forEach((condition, index) => {
      if (index > 0) {
        text += ` ${condition.logicalOperator} `;
      }
      
      if (condition.field && condition.operator) {
        // Mapeamento simples de operadores para labels
        const operatorLabels = {
          'equals': 'Igual a',
          'notEquals': 'Diferente de',
          'contains': 'Contém',
          'notContains': 'Não contém',
          'startsWith': 'Começa com',
          'endsWith': 'Termina com',
          'greaterThan': 'Maior que',
          'lessThan': 'Menor que',
          'greaterThanOrEqual': 'Maior ou igual a',
          'lessThanOrEqual': 'Menor ou igual a',
          'between': 'Entre',
          'isNull': 'Nulo',
          'isNotNull': 'Não nulo',
          'isTrue': 'É Verdadeiro',
          'isFalse': 'É Falso'
        };
        
        // Mapeamento simples de tipos para labels
        const typeLabels = {
          'text': 'Texto',
          'number': 'Número',
          'date': 'Data',
          'boolean': 'Booleano',
          'list': 'Lista'
        };
        
        const operatorLabel = operatorLabels[condition.operator] || condition.operator;
        const valueTypeLabel = typeLabels[condition.valueType] || '';
        const typeInfo = condition.valueType ? ` (${valueTypeLabel})` : '';
        
        if (condition.operator === 'between') {
          const valueDisplay1 = condition.value || '[valor1]';
          const valueDisplay2 = condition.value2 || '[valor2]';
          text += `${condition.field} ${operatorLabel} ${valueDisplay1} e ${valueDisplay2}${typeInfo}`;
        } else {
          const valueDisplay = condition.value || '[valor]';
          text += `${condition.field} ${operatorLabel} ${valueDisplay}${typeInfo}`;
        }
      } else {
        text += '[condição incompleta]';
      }
      
      if (index < conditions.length - 1) {
        const nextCondition = conditions[index + 1];
        const logicalOp = nextCondition.logicalOperator || 'AND';
        text += ` ${logicalOp === 'AND' ? 'E' : 'OU'}\n`;
      }
    });
    
    return text;
  };

  const removeCondition = (id) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(c => c.id !== id));
    }
  };

  const updateCondition = (id, field, value) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };


  const setFieldType = (field, type) => {
    setFieldTypes({ ...fieldTypes, [field]: type });
    
    // Se já existe uma condição para este campo, atualiza o tipo
    const existingCondition = conditions.find(c => c.field === field);
    if (existingCondition) {
      updateCondition(existingCondition.id, 'valueType', type);
      updateCondition(existingCondition.id, 'operator', ''); // Reset operator
    } else {
      // Cria uma nova condição para o campo
      const newCondition = {
        id: Date.now() + Math.random(),
        field: field,
        operator: '',
        valueType: type,
        value: '',
        value2: '',
        logicalOperator: 'AND'
      };
      setConditions([...conditions, newCondition]);
    }
  };

  const addCondition = () => {
    const newCondition = {
      id: Math.max(...conditions.map(c => c.id), 0) + 1,
      field: '',
      operator: '',
      valueType: '',
      value: '',
      value2: '',
      logicalOperator: 'AND'
    };
    setConditions([...conditions, newCondition]);
  };

  const handleSave = () => {
    if (!ruleName || !codigoRegra || !ruleModule || !ruleStartDate || !validationField) {
      alert('Por favor, preencha todos os campos obrigatórios: Nome da Regra, Código da Regra, Módulo, Data de Início e Campo a ser Validado.');
      return;
    }

    const validConditions = conditions.filter(c => {
      const hasBasicFields = c.field && c.operator && c.valueType && c.value;
      if (c.operator === 'between') {
        return hasBasicFields && c.value2;
      }
      return hasBasicFields;
    });
    
    if (validConditions.length === 0) {
      alert('Por favor, adicione ao menos uma condição válida com todos os campos preenchidos (Campo, Operador, Tipo de Dado e Valor).');
      return;
    }

    const ruleData = {
      name: ruleName,
      codigoRegra: codigoRegra,
      module: ruleModule,
      selectedFields: selectedFields,
      fieldTypes: fieldTypes,
      type: ruleType,
      status: ruleStatus,
      startDate: ruleStartDate,
      validationField: validationField,
      validationValue: validationValue,
      conditions: validConditions
    };

    onSave(ruleData);
  };

  const handleTestFormula = () => {
    if (!ruleName || !ruleModule) {
      alert('Por favor, preencha o nome da regra e selecione um módulo.');
      return;
    }

    const validConditions = conditions.filter(c => {
      const hasBasicFields = c.field && c.operator && c.valueType;
      // Para operadores que não precisam de valor (como isNull, today, etc.)
      const needsValue = !['isNull', 'isNotNull', 'today', 'yesterday', 'tomorrow', 'isTrue', 'isFalse'].includes(c.operator);
      if (needsValue && !c.value) {
        return false;
      }
      if (c.operator === 'between' || c.operator === 'inList' || c.operator === 'notInList' || c.operator === 'in' || c.operator === 'notIn') {
        return hasBasicFields && c.value2;
      }
      return hasBasicFields;
    });

    if (validConditions.length === 0) {
      alert('Por favor, adicione pelo menos uma condição válida para testar.');
      return;
    }

    // Simular dados de teste
    const testData = {
      'Condição': 'Ativo',
      'Classe': 'Premium',
      'Situação': 'Aprovado',
      'Grau de Parentesco': 'Filho',
      'Data de Admissão': '2024-01-15'
    };

    // Simular avaliação da regra
    let testResults = [];
    let overallResult = null;
    let previousResult = null;

    validConditions.forEach((condition, index) => {
      const fieldValue = testData[condition.field];
      let conditionResult = false;

      // Simular diferentes tipos de comparação
      switch (condition.operator) {
        case 'equals':
          conditionResult = fieldValue === condition.value;
          break;
        case 'notEquals':
          conditionResult = fieldValue !== condition.value;
          break;
        case 'contains':
          conditionResult = fieldValue && fieldValue.toLowerCase().includes(condition.value.toLowerCase());
          break;
        case 'notContains':
          conditionResult = !fieldValue || !fieldValue.toLowerCase().includes(condition.value.toLowerCase());
          break;
        case 'greaterThan':
          conditionResult = parseFloat(fieldValue) > parseFloat(condition.value);
          break;
        case 'lessThan':
          conditionResult = parseFloat(fieldValue) < parseFloat(condition.value);
          break;
        case 'isNull':
          conditionResult = !fieldValue || fieldValue === '';
          break;
        case 'isNotNull':
          conditionResult = fieldValue && fieldValue !== '';
          break;
        case 'isTrue':
          conditionResult = fieldValue === 'true';
          break;
        case 'isFalse':
          conditionResult = fieldValue === 'false';
          break;
        default:
          conditionResult = true;
      }

      const logicalOperator = condition.logicalOperator || 'AND';
      const conditionText = `${condition.field} ${condition.operator} ${condition.value || 'N/A'}`;
      
      testResults.push({
        condition: conditionText,
        result: conditionResult,
        fieldValue: fieldValue || 'N/A',
        logicalOperator: index > 0 ? logicalOperator : null
      });

      // Aplicar operador lógico
      if (index === 0) {
        // Primeira condição - resultado inicial
        overallResult = conditionResult;
        previousResult = conditionResult;
      } else {
        // Aplicar operador lógico com a condição anterior
        if (logicalOperator === 'AND') {
          overallResult = previousResult && conditionResult;
        } else if (logicalOperator === 'OR') {
          overallResult = previousResult || conditionResult;
        }
        previousResult = overallResult;
      }
    });

    // Mostrar resultados do teste
    const resultMessage = `🧪 TESTE DA FÓRMULA

📋 Regra: ${ruleName}
📦 Módulo: ${ruleModule}

📊 Dados de Teste:
${Object.entries(testData).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

🔍 Resultados das Condições:
${testResults.map((result, index) => {
  let line = `• Condição ${index + 1}: ${result.condition}
  Valor atual: ${result.fieldValue}
  Resultado: ${result.result ? '✅ PASSOU' : '❌ FALHOU'}`;
  
  if (result.logicalOperator) {
    line += `\n  Operador: ${result.logicalOperator === 'AND' ? 'E (AND)' : 'OU (OR)'}`;
  }
  
  return line;
}).join('\n\n')}

🎯 Resultado Final: ${overallResult ? '✅ REGRA APROVADA' : '❌ REGRA REJEITADA'}

💡 Nota: Este é um teste simulado com dados fictícios.`;

    alert(resultMessage);
  };

  const getAvailableOperators = (condition) => {
    return operators;
  };

  return (
    <div className="rule-builder">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={onBack}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            {initialRule ? 'Editar Regra' : 'Nova Regra'}
          </h1>
        </div>
        <div className="header-actions">
          <button className="btn-test" onClick={handleTestFormula}>
            <Play size={20} />
            Testar Fórmula
          </button>
          <button className="btn-primary" onClick={handleSave}>
            <Save size={20} />
            Salvar Regra
          </button>
        </div>
      </header>

      <div className="page-content">
        {/* Informações Básicas */}
        <div className="builder-section">
          <h2 className="section-title">Informações Básicas</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Nome da Regra *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: Validação de CPF único"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Código da Regra *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: REG-001"
                value={codigoRegra}
                onChange={(e) => setCodigoRegra(e.target.value.toUpperCase())}
              />
              <span className="form-hint">
                Código único para identificar a regra (usado em fluxos de solicitação)
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">Módulo *</label>
              <select
                className="form-select"
                value={ruleModule}
                onChange={(e) => setRuleModule(e.target.value)}
              >
                <option value="">Selecione um módulo</option>
                {modules.map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de Regra</label>
              <select
                className="form-select"
                value={ruleType}
                onChange={(e) => setRuleType(e.target.value)}
              >
                <option value="validation">Validação</option>
                <option value="formula">Fórmula</option>
                <option value="filter">Filtro</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={ruleStatus}
                onChange={(e) => setRuleStatus(e.target.value)}
              >
                <option value="active">Ativa</option>
                <option value="inactive">Inativa</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Data de Início da Regra *</label>
              <input
                type="date"
                className="form-input"
                value={ruleStartDate}
                onChange={(e) => setRuleStartDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Campo a ser Validado *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: CPF, Email, Nome, etc."
                value={validationField}
                onChange={(e) => setValidationField(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Valor/Critério de Validação</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: Formato válido, Valor mínimo, etc."
                value={validationValue}
                onChange={(e) => setValidationValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Seleção de Campos */}
        <div className="builder-section">
          <h2 className="section-title">Passo 1: Seleção de Campos</h2>
          <p className="section-description">
            Selecione um ou mais campos que serão utilizados na regra de validação.
          </p>
          
          <div className="fields-selection">
            <div className="fields-with-types">
              <label className="fields-label">Selecione os campos e seus tipos de dados:</label>
              
              <div className="fields-container">
                {fields.map(field => (
                  <div key={field} className="field-with-type">
                    <div className="field-checkbox-container">
                      <label className="field-checkbox-label">
                        <input
                          type="checkbox"
                          checked={selectedFields.includes(field)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              // Adiciona o campo
                              setSelectedFields([...selectedFields, field]);
                            } else {
                              // Remove o campo
                              const newSelected = selectedFields.filter(f => f !== field);
                              setSelectedFields(newSelected);
                              const newFieldTypes = { ...fieldTypes };
                              delete newFieldTypes[field];
                              setFieldTypes(newFieldTypes);
                              setConditions(conditions.filter(c => c.field !== field));
                            }
                          }}
                          className="field-checkbox"
                        />
                        <span className="field-name">{field}</span>
                      </label>
                    </div>
                    
                    {selectedFields.includes(field) && (
                      <div className="field-type-selector-inline">
                        <select
                          value={fieldTypes[field] || ''}
                          onChange={(e) => setFieldType(field, e.target.value)}
                          className="inline-type-select"
                        >
                          <option value="">Selecione o tipo</option>
                          <option value="text">Texto</option>
                          <option value="number">Número</option>
                          <option value="date">Data</option>
                          <option value="boolean">Booleano</option>
                          <option value="list">Lista</option>
                        </select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {selectedFields.length > 0 && (
              <div className="selected-fields-summary">
                <h4>Campos e Tipos Selecionados ({selectedFields.length}):</h4>
                <div className="selected-fields-details">
                  {selectedFields.map(field => (
                    <div key={field} className="field-detail">
                      <span className="field-name-detail">{field}</span>
                      <span className="field-type-detail">
                        {fieldTypes[field] ? (
                          <>
                            <span className="type-label">Tipo:</span>
                            <span className="type-value">{fieldTypes[field]}</span>
                          </>
                        ) : (
                          <span className="type-missing">Tipo não selecionado</span>
                        )}
                      </span>
                      <button 
                        onClick={() => {
                          const newSelected = selectedFields.filter(f => f !== field);
                          setSelectedFields(newSelected);
                          const newFieldTypes = { ...fieldTypes };
                          delete newFieldTypes[field];
                          setFieldTypes(newFieldTypes);
                          setConditions(conditions.filter(c => c.field !== field));
                        }}
                        className="remove-field-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuração de Operadores e Valores */}
        {selectedFields.length > 0 && Object.keys(fieldTypes).length > 0 && (
          <div className="builder-section">
            <h2 className="section-title">Passo 2: Operadores e Valores</h2>
            <p className="section-description">
              Configure os operadores e valores para cada campo.
            </p>

            <div className="conditions-container">
            {conditions.map((condition, index) => (
              <div key={condition.id} className="condition-wrapper">
                {index > 0 && (
                  <div className="logical-operator-selector">
                    <div className="logical-operator-label">Operador Lógico:</div>
                    <div className="logical-buttons-group">
                      <button
                        type="button"
                        className={`logical-btn ${condition.logicalOperator === 'AND' ? 'active' : ''}`}
                        onClick={() => updateCondition(condition.id, 'logicalOperator', 'AND')}
                        title="Todas as condições devem ser verdadeiras"
                      >
                        <span className="logical-btn-text">E</span>
                        <span className="logical-btn-label">(AND)</span>
                      </button>
                      <button
                        type="button"
                        className={`logical-btn ${condition.logicalOperator === 'OR' ? 'active' : ''}`}
                        onClick={() => updateCondition(condition.id, 'logicalOperator', 'OR')}
                        title="Pelo menos uma condição deve ser verdadeira"
                      >
                        <span className="logical-btn-text">OU</span>
                        <span className="logical-btn-label">(OR)</span>
                      </button>
                    </div>
                    <div className="logical-operator-connector">
                      <span className="connector-line"></span>
                    </div>
                  </div>
                )}

                <div className="condition-row">
                  <div className="condition-number">{index + 1}</div>
                  
                  <div className="condition-fields">
                    <div className="field-group">
                      <label className="field-label">Campo</label>
                      <select
                        value={condition.field}
                        onChange={(e) => {
                          updateCondition(condition.id, 'field', e.target.value);
                          updateCondition(condition.id, 'operator', '');
                        }}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="">Selecione</option>
                        <option value="Condição">Condição</option>
                        <option value="Classe">Classe</option>
                        <option value="Situação">Situação</option>
                        <option value="Grau de Parentesco">Grau de Parentesco</option>
                        <option value="Data de Admissão">Data de Admissão</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Tipo de Dado</label>
                      <select
                        value={condition.valueType}
                        onChange={(e) => {
                          updateCondition(condition.id, 'valueType', e.target.value);
                          updateCondition(condition.id, 'value', '');
                          updateCondition(condition.id, 'operator', '');
                        }}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="">Selecione</option>
                        <option value="number">Número</option>
                        <option value="date">Data</option>
                        <option value="text">Texto</option>
                        <option value="boolean">Booleano</option>
                        <option value="list">Lista</option>
                      </select>
                    </div>

                    {condition.valueType && (
                      <>
                        <div className="field-group">
                          <label className="field-label">Operadores</label>
                          <select
                            value={condition.operator}
                            onChange={(e) => {
                              updateCondition(condition.id, 'operator', e.target.value);
                            }}
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              fontSize: '14px',
                              backgroundColor: 'white'
                            }}
                          >
                            <option value="">Selecione</option>
                            {getOperatorsByValueType(condition.valueType).map(op => (
                              <option key={op.value} value={op.value}>{op.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="field-group">
                          <label className="field-label">{condition.operator === 'between' ? 'Valor Inicial' : 'Valor'}</label>
                          {condition.valueType === 'text' && (
                            <input
                              type="text"
                              placeholder="Digite o texto"
                              value={condition.value}
                              onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}
                            />
                          )}
                          {condition.valueType === 'number' && (
                            <input
                              type="number"
                              placeholder="Digite o número"
                              value={condition.value}
                              onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}
                            />
                          )}
                          {condition.valueType === 'date' && (
                            <input
                              type="date"
                              value={condition.value}
                              onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}
                            />
                          )}
                          {condition.valueType === 'boolean' && (
                            <select
                              value={condition.value}
                              onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px',
                                backgroundColor: 'white'
                              }}
                            >
                              <option value="">Selecione</option>
                              <option value="true">Verdadeiro</option>
                              <option value="false">Falso</option>
                            </select>
                          )}
                          {condition.valueType === 'list' && (
                            <select
                              value={condition.value}
                              onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px',
                                backgroundColor: 'white'
                              }}
                            >
                              <option value="">Selecione</option>
                              <option value="ativo">Ativo</option>
                              <option value="inativo">Inativo</option>
                              <option value="pendente">Pendente</option>
                              <option value="aprovado">Aprovado</option>
                              <option value="rejeitado">Rejeitado</option>
                            </select>
                          )}
                          {/* Campos especiais para operadores que não precisam de valor */}
                          {(condition.operator === 'isNull' || condition.operator === 'isNotNull' || 
                            condition.operator === 'today' || condition.operator === 'yesterday' || 
                            condition.operator === 'tomorrow' || condition.operator === 'isTrue' || 
                            condition.operator === 'isFalse') && (
                            <input
                              type="text"
                              value=""
                              disabled
                              placeholder="Este operador não requer valor"
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px',
                                backgroundColor: '#f5f5f5',
                                color: '#666'
                              }}
                            />
                          )}
                          {/* Campo para operadores com N dias */}
                          {(condition.operator === 'lastNDays' || condition.operator === 'nextNDays') && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input
                                type="number"
                                placeholder="N"
                                value={condition.value}
                                onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                                style={{
                                  width: '60px',
                                  padding: '8px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontSize: '14px'
                                }}
                              />
                              <select
                                value={condition.value2 || 'days'}
                                onChange={(e) => updateCondition(condition.id, 'value2', e.target.value)}
                                style={{
                                  flex: 1,
                                  padding: '8px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  backgroundColor: 'white'
                                }}
                              >
                                <option value="days">dias</option>
                                <option value="weeks">semanas</option>
                                <option value="months">meses</option>
                              </select>
                            </div>
                          )}
                          {!condition.valueType && (
                            <input
                              type="text"
                              placeholder="Selecione o tipo de dado primeiro"
                              disabled
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px',
                                backgroundColor: '#f5f5f5'
                              }}
                            />
                          )}
                        </div>

                        {(condition.operator === 'between' || condition.operator === 'inList' || condition.operator === 'notInList' || condition.operator === 'in' || condition.operator === 'notIn') && (
                          <div className="field-group">
                            <label className="field-label">Valor Final</label>
                            {condition.valueType === 'text' && (
                              <input
                                type="text"
                                placeholder="Digite o texto"
                                value={condition.value2}
                                onChange={(e) => updateCondition(condition.id, 'value2', e.target.value)}
                                style={{
                                  width: '100%',
                                  padding: '8px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontSize: '14px'
                                }}
                              />
                            )}
                            {condition.valueType === 'number' && (
                              <input
                                type="number"
                                placeholder="Digite o número"
                                value={condition.value2}
                                onChange={(e) => updateCondition(condition.id, 'value2', e.target.value)}
                                style={{
                                  width: '100%',
                                  padding: '8px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontSize: '14px'
                                }}
                              />
                            )}
                            {condition.valueType === 'date' && (
                              <input
                                type="date"
                                value={condition.value2}
                                onChange={(e) => updateCondition(condition.id, 'value2', e.target.value)}
                                style={{
                                  width: '100%',
                                  padding: '8px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontSize: '14px'
                                }}
                              />
                            )}
                            {condition.valueType === 'boolean' && (
                              <select
                                value={condition.value2}
                                onChange={(e) => updateCondition(condition.id, 'value2', e.target.value)}
                                style={{
                                  width: '100%',
                                  padding: '8px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  backgroundColor: 'white'
                                }}
                              >
                                <option value="">Selecione</option>
                                <option value="true">Verdadeiro</option>
                                <option value="false">Falso</option>
                              </select>
                            )}
                            {condition.valueType === 'list' && (
                              <select
                                value={condition.value2}
                                onChange={(e) => updateCondition(condition.id, 'value2', e.target.value)}
                                style={{
                                  width: '100%',
                                  padding: '8px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  backgroundColor: 'white'
                                }}
                              >
                                <option value="">Selecione</option>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                                <option value="pendente">Pendente</option>
                                <option value="aprovado">Aprovado</option>
                                <option value="rejeitado">Rejeitado</option>
                              </select>
                            )}
                            {!condition.valueType && (
                              <input
                                type="text"
                                placeholder="Selecione o tipo de dado primeiro"
                                disabled
                                style={{
                                  width: '100%',
                                  padding: '8px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  backgroundColor: '#f5f5f5'
                                }}
                              />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() => removeCondition(condition.id)}
                    disabled={conditions.length === 1}
                    title="Remover condição"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            </div>
          </div>
        )}

        {/* Preview da Regra em Formato No-Code */}
        <div className="builder-section">
          <h2 className="section-title">Regra em Texto (No-Code)</h2>
          <div className="nocode-container">
            <textarea
              className="nocode-textarea"
              value={generateNoCodeText()}
              readOnly
              rows={Math.max(5, conditions.length + 3)}
            />
            <p className="nocode-help">
              Esta é a representação em linguagem natural da sua regra. 
              Configure as condições acima para ver a regra atualizada.
            </p>
          </div>
        </div>

        {/* Histórico de Alterações */}
        {initialRule && (
          <div className="builder-section">
            <div className="section-header">
              <h2 className="section-title">
                <History size={20} style={{display: 'inline', marginRight: '8px'}} />
                Histórico de Alterações
              </h2>
              <button 
                className="btn-toggle-history"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? 'Ocultar' : 'Mostrar'} Histórico
              </button>
            </div>

            {showHistory && (
              <div className="history-container">
                <div className="history-header">
                  <div className="history-col">Versão</div>
                  <div className="history-col">Usuário</div>
                  <div className="history-col">Data Início</div>
                  <div className="history-col">Data Fim</div>
                  <div className="history-col">Alteração</div>
                </div>
                
                {ruleHistory.map((item) => (
                  <div key={item.id} className={`history-row ${item.dataFim === 'Atual' ? 'current' : ''}`}>
                    <div className="history-col">
                      <span className="version-badge">{item.versao}</span>
                    </div>
                    <div className="history-col">
                      <User size={14} style={{display: 'inline', marginRight: '4px'}} />
                      {item.usuario}
                    </div>
                    <div className="history-col">
                      <Calendar size={14} style={{display: 'inline', marginRight: '4px'}} />
                      {item.dataInicio}
                    </div>
                    <div className="history-col">
                      <Calendar size={14} style={{display: 'inline', marginRight: '4px'}} />
                      {item.dataFim}
                    </div>
                    <div className="history-col">{item.alteracao}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RuleBuilder;

