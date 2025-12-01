import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2,
  Edit2,
  Save,
  X,
  List
} from 'lucide-react';
import '../styles/DomainLists.css';

const DomainLists = ({ currentModule = '' }) => {
  const [domainLists, setDomainLists] = useState({
    'Visitantes': {
      'Grau de Parentesco': ['Pai', 'Mãe', 'Filho(a)', 'Cônjuge', 'Irmão(ã)', 'Avô(ó)', 'Neto(a)', 'Tio(a)', 'Sobrinho(a)'],
      'Tipo de Documento': ['RG', 'CPF', 'CNH', 'Passaporte', 'Certidão de Nascimento', 'Certidão de Casamento'],
      'Estado Civil': ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União Estável']
    },
    'Candidatos': {
      'Classe': ['Classe A', 'Classe B', 'Classe C', 'Classe D', 'Classe E'],
      'Situação': ['Ativo', 'Inativo', 'Pendente', 'Aprovado', 'Reprovado', 'Em Análise'],
      'Condição': ['Regular', 'Irregular', 'Suspenso', 'Bloqueado', 'Inadimplente']
    },
    'Associados': {
      'Classe': ['Classe A', 'Classe B', 'Classe C', 'Classe D', 'Classe E'],
      'Situação': ['Ativo', 'Inativo', 'Pendente', 'Aprovado', 'Reprovado', 'Em Análise'],
      'Condição': ['Regular', 'Irregular', 'Suspenso', 'Bloqueado', 'Inadimplente'],
      'Grau de Parentesco': ['Pai', 'Mãe', 'Filho(a)', 'Cônjuge', 'Irmão(ã)', 'Avô(ó)', 'Neto(a)', 'Tio(a)', 'Sobrinho(a)']
    }
  });

  const [selectedList, setSelectedList] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  // Determina qual módulo usar baseado na navegação
  const getCurrentModule = () => {
    if (currentModule) {
      const moduleMap = {
        'visitantes': 'Visitantes',
        'associados': 'Associados', 
        'candidatos': 'Candidatos'
      };
      return moduleMap[currentModule] || 'Visitantes';
    }
    return 'Visitantes';
  };

  const activeModule = getCurrentModule();

  const handleAddValue = () => {
    if (!selectedList || !newValue.trim()) {
      alert('Por favor, selecione uma lista e digite um valor.');
      return;
    }

    const updatedLists = { ...domainLists };
    if (updatedLists[activeModule][selectedList].includes(newValue.trim())) {
      alert('Este valor já existe na lista.');
      return;
    }

    updatedLists[activeModule][selectedList] = [...updatedLists[activeModule][selectedList], newValue.trim()];
    setDomainLists(updatedLists);
    setNewValue('');
  };

  const handleDeleteValue = (moduleName, listName, index) => {
    if (window.confirm('Tem certeza que deseja excluir este valor?')) {
      const updatedLists = { ...domainLists };
      updatedLists[moduleName][listName] = updatedLists[moduleName][listName].filter((_, i) => i !== index);
      setDomainLists(updatedLists);
    }
  };

  const handleEditValue = (moduleName, listName, index) => {
    setEditingIndex(`${moduleName}-${listName}-${index}`);
    setEditingValue(domainLists[moduleName][listName][index]);
  };

  const handleSaveEdit = () => {
    if (!editingIndex || !editingValue.trim()) {
      alert('O valor não pode estar vazio.');
      return;
    }

    const [moduleName, listName, indexStr] = editingIndex.split('-');
    const index = parseInt(indexStr);

    const updatedLists = { ...domainLists };
    updatedLists[moduleName][listName][index] = editingValue.trim();
    setDomainLists(updatedLists);
    setEditingIndex(null);
    setEditingValue('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingValue('');
  };

  return (
    <div className="domain-lists">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-back">
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="page-title">
            <List size={28} />
            Cadastros
          </h1>
        </div>
      </header>

      <div className="page-content">
        {/* Formulário de Adição */}
        <div className="domain-section">
          <h2 className="section-title">Adicionar Novo Valor - {activeModule}</h2>
          <div className="add-form">
            <div className="form-group">
              <label className="form-label">Selecione a Lista</label>
              <select
                className="form-select"
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
              >
                <option value="">Selecione uma lista</option>
                {Object.keys(domainLists[activeModule]).map(listName => (
                  <option key={listName} value={listName}>{listName}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Novo Valor</label>
              <input
                type="text"
                className="form-input"
                placeholder="Digite o novo valor"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddValue()}
              />
            </div>

            <button 
              className="btn-add"
              onClick={handleAddValue}
              disabled={!selectedList || !newValue.trim()}
            >
              <Plus size={20} />
              Adicionar
            </button>
          </div>
        </div>

        {/* Listas de Domínio */}
        <div className="domain-section">
          <h2 className="section-title">Listas de Domínio - {activeModule}</h2>
          <div className="lists-grid">
            {Object.keys(domainLists[activeModule]).map(listName => (
              <div key={listName} className="list-card">
                <div className="list-card-header">
                  <h4 className="list-name">{listName}</h4>
                  <span className="list-count">{domainLists[activeModule][listName].length} itens</span>
                </div>
                <div className="list-card-body">
                  {domainLists[activeModule][listName].length === 0 ? (
                    <p className="empty-list">Nenhum valor cadastrado</p>
                  ) : (
                    <ul className="values-list">
                      {domainLists[activeModule][listName].map((value, index) => (
                        <li key={index} className="value-item">
                          {editingIndex === `${activeModule}-${listName}-${index}` ? (
                            <div className="edit-mode">
                              <input
                                type="text"
                                className="edit-input"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                                autoFocus
                              />
                              <button
                                className="btn-icon-small btn-success"
                                onClick={handleSaveEdit}
                                title="Salvar"
                              >
                                <Save size={14} />
                              </button>
                              <button
                                className="btn-icon-small"
                                onClick={handleCancelEdit}
                                title="Cancelar"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <>
                              <span className="value-text">{value}</span>
                              <div className="value-actions">
                                <button
                                  className="btn-icon-small"
                                  onClick={() => handleEditValue(activeModule, listName, index)}
                                  title="Editar"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  className="btn-icon-small btn-danger"
                                  onClick={() => handleDeleteValue(activeModule, listName, index)}
                                  title="Excluir"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainLists;

