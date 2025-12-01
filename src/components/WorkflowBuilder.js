import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Building
} from 'lucide-react';
import '../styles/FluxoSolicitacoes.css';

const WorkflowBuilder = ({ workflow, onChange }) => {
  const [expandedSteps, setExpandedSteps] = useState({});

  const areas = [
    { value: 'ADMISSAO', label: 'Admissão de Associados' },
    { value: 'FINANCEIRO', label: 'Financeiro' },
    { value: 'ATENDIMENTO', label: 'Atendimento ao Cliente' }
  ];

  const toggleStep = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const addStep = () => {
    const newStep = {
      id: Date.now(),
      nome: '',
      area: '',
      ordem: (workflow.steps?.length || 0) + 1,
      condicoes: [],
      proximosPassos: []
    };

    const updatedWorkflow = {
      ...workflow,
      steps: [...(workflow.steps || []), newStep]
    };

    onChange(updatedWorkflow);
    setExpandedSteps(prev => ({ ...prev, [newStep.id]: true }));
  };

  const removeStep = (stepId) => {
    if (window.confirm('Tem certeza que deseja remover este passo?')) {
      const updatedSteps = workflow.steps.filter(s => s.id !== stepId);
      const updatedWorkflow = {
        ...workflow,
        steps: updatedSteps.map((step, index) => ({
          ...step,
          ordem: index + 1
        }))
      };
      onChange(updatedWorkflow);
    }
  };

  const updateStep = (stepId, field, value) => {
    const updatedSteps = workflow.steps.map(step => {
      if (step.id === stepId) {
        return { ...step, [field]: value };
      }
      return step;
    });

    onChange({
      ...workflow,
      steps: updatedSteps
    });
  };

  const addProximoPasso = (stepId) => {
    const updatedSteps = workflow.steps.map(step => {
      if (step.id === stepId) {
        const novoProximo = {
          id: Date.now(),
          stepId: null,
          condicao: ''
        };
        return {
          ...step,
          proximosPassos: [...(step.proximosPassos || []), novoProximo]
        };
      }
      return step;
    });

    onChange({
      ...workflow,
      steps: updatedSteps
    });
  };

  const removeProximoPasso = (stepId, proximoId) => {
    const updatedSteps = workflow.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          proximosPassos: step.proximosPassos.filter(p => p.id !== proximoId)
        };
      }
      return step;
    });

    onChange({
      ...workflow,
      steps: updatedSteps
    });
  };

  const updateProximoPasso = (stepId, proximoId, field, value) => {
    const updatedSteps = workflow.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          proximosPassos: step.proximosPassos.map(p => {
            if (p.id === proximoId) {
              return { ...p, [field]: value };
            }
            return p;
          })
        };
      }
      return step;
    });

    onChange({
      ...workflow,
      steps: updatedSteps
    });
  };

  const getStepById = (stepId) => {
    return workflow.steps.find(s => s.id === stepId);
  };

  return (
    <div className="workflow-builder">
      <div className="workflow-header">
        <h3>Passos de Aprovação</h3>
        <button type="button" className="btn-add-step" onClick={addStep}>
          <Plus size={16} />
          Adicionar Passo
        </button>
      </div>

      {(!workflow.steps || workflow.steps.length === 0) ? (
        <div className="workflow-empty">
          <p>Nenhum passo definido. Clique em "Adicionar Passo" para começar.</p>
        </div>
      ) : (
        <div className="workflow-steps">
          {workflow.steps.map((step, index) => (
            <div key={step.id} className="workflow-step">
              <div className="step-header">
                <div className="step-number">{step.ordem || index + 1}</div>
                <div className="step-content">
                  <div className="step-main-info">
                    <input
                      type="text"
                      className="step-name-input"
                      value={step.nome || ''}
                      onChange={(e) => updateStep(step.id, 'nome', e.target.value)}
                      placeholder="Nome do passo"
                    />
                    <select
                      className="step-area-select"
                      value={step.area || ''}
                      onChange={(e) => updateStep(step.id, 'area', e.target.value)}
                    >
                      <option value="">Selecione a área</option>
                      {areas.map(area => (
                        <option key={area.value} value={area.value}>
                          {area.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {step.proximosPassos && step.proximosPassos.length > 0 && (
                    <div className="step-proximos">
                      {step.proximosPassos.map(proximo => (
                        <div key={proximo.id} className="proximo-passo">
                          <ArrowRight size={14} />
                          <select
                            className="proximo-select"
                            value={proximo.stepId || ''}
                            onChange={(e) => updateProximoPasso(step.id, proximo.id, 'stepId', parseInt(e.target.value))}
                          >
                            <option value="">Selecione próximo passo</option>
                            {workflow.steps
                              .filter(s => s.id !== step.id)
                              .map(s => (
                                <option key={s.id} value={s.id}>
                                  Passo {s.ordem}: {s.nome || 'Sem nome'}
                                </option>
                              ))}
                          </select>
                          <input
                            type="text"
                            className="proximo-condicao"
                            value={proximo.condicao || ''}
                            onChange={(e) => updateProximoPasso(step.id, proximo.id, 'condicao', e.target.value)}
                            placeholder="Condição (opcional)"
                          />
                          <button
                            type="button"
                            className="btn-icon-small"
                            onClick={() => removeProximoPasso(step.id, proximo.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn-add-proximo"
                    onClick={() => addProximoPasso(step.id)}
                  >
                    <Plus size={14} />
                    Adicionar Próximo Passo
                  </button>
                </div>
                <button
                  type="button"
                  className="btn-remove-step"
                  onClick={() => removeStep(step.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="workflow-preview">
        <h4>Visualização do Fluxo:</h4>
        <div className="workflow-flow">
          {workflow.steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flow-step">
                <div className="flow-step-number">{step.ordem || index + 1}</div>
                <div className="flow-step-info">
                  <div className="flow-step-name">{step.nome || 'Sem nome'}</div>
                  <div className="flow-step-area">
                    <Building size={12} />
                    {areas.find(a => a.value === step.area)?.label || 'Área não definida'}
                  </div>
                </div>
              </div>
              {index < workflow.steps.length - 1 && (
                <div className="flow-arrow">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;

