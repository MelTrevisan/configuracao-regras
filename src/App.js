import React, { useState } from 'react';
import './styles/App.css';
import Sidebar from './components/Sidebar';
import RulesConfiguration from './components/RulesConfiguration';
import DomainLists from './components/DomainLists';
import RequestsManagement from './components/RequestsManagement';
import AssociadoProfile from './components/AssociadoProfile';
import AssociadosList from './components/AssociadosList';
import ClubesConveniadosList from './components/ClubesConveniadosList';
import ClubesConveniadosForm from './components/ClubesConveniadosForm';
import FluxoSolicitacoesList from './components/FluxoSolicitacoesList';
import FluxoSolicitacoesForm from './components/FluxoSolicitacoesForm';
import AcompanhantesList from './components/AcompanhantesList';
import AcompanhantesForm from './components/AcompanhantesForm';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('solicitacoes');
  const [clubeData, setClubeData] = useState(null);
  const [fluxoData, setFluxoData] = useState(null);
  const [acompanhanteData, setAcompanhanteData] = useState(null);

  const handleNavigate = (page, data) => {
    if (data) {
      setClubeData(data);
    }
    setCurrentPage(page);
  };

  const handleSaveClube = (data) => {
    console.log('Salvando clube:', data);
    // Aqui você faria a chamada à API
    alert('Clube conveniado salvo com sucesso!');
    setCurrentPage('clubes-conveniados');
    setClubeData(null);
  };

  const handleCancelClube = () => {
    setCurrentPage('clubes-conveniados');
    setClubeData(null);
  };

  const handleNavigateFluxo = (page, data) => {
    if (data) {
      setFluxoData(data);
    }
    setCurrentPage(page);
  };

  const handleSaveFluxo = (data) => {
    console.log('Salvando fluxo:', data);
    alert('Fluxo de solicitação salvo com sucesso!');
    setCurrentPage('fluxo-solicitacoes');
    setFluxoData(null);
  };

  const handleCancelFluxo = () => {
    setCurrentPage('fluxo-solicitacoes');
    setFluxoData(null);
  };

  const handleNavigateAcompanhante = (page, data) => {
    if (data) {
      setAcompanhanteData(data);
    }
    setCurrentPage(page);
  };

  const handleSaveAcompanhante = (data) => {
    console.log('Salvando acompanhante:', data);
    alert('Acompanhante salvo com sucesso!');
    setCurrentPage('acompanhantes');
    setAcompanhanteData(null);
  };

  const handleCancelAcompanhante = () => {
    setCurrentPage('acompanhantes');
    setAcompanhanteData(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'solicitacoes':
        return <RequestsManagement />;
      case 'associado':
        return <AssociadoProfile personId="123" onBack={() => setCurrentPage('associados')} />;
      case 'associados':
        return <AssociadosList onNavigate={(page, data) => {
          if (page === 'associado') {
            setCurrentPage('associado');
          }
        }} />;
      case 'configuracoes':
        return <RulesConfiguration />;
      case 'cadastros':
      case 'cadastros-visitantes':
      case 'cadastros-associados':
      case 'cadastros-candidatos':
        return <DomainLists currentModule={currentPage.replace('cadastros-', '')} />;
      case 'visitantes':
      case 'candidatos':
        return <RulesConfiguration />;
      case 'clubes-conveniados':
        return <ClubesConveniadosList onNavigate={handleNavigate} />;
      case 'clubes-conveniados-form':
        return (
          <ClubesConveniadosForm 
            clubeData={clubeData}
            onSave={handleSaveClube}
            onCancel={handleCancelClube}
          />
        );
      case 'clube-conveniado-detail':
        // Por enquanto, redireciona para o formulário em modo visualização
        return (
          <ClubesConveniadosForm 
            clubeData={clubeData}
            onSave={handleSaveClube}
            onCancel={handleCancelClube}
          />
        );
      case 'fluxo-solicitacoes':
        return <FluxoSolicitacoesList onNavigate={handleNavigateFluxo} />;
      case 'fluxo-solicitacoes-form':
        return (
          <FluxoSolicitacoesForm 
            fluxoData={fluxoData}
            onSave={handleSaveFluxo}
            onCancel={handleCancelFluxo}
          />
        );
      case 'fluxo-solicitacoes-detail':
        return (
          <FluxoSolicitacoesForm 
            fluxoData={fluxoData}
            onSave={handleSaveFluxo}
            onCancel={handleCancelFluxo}
          />
        );
      case 'acompanhantes':
        return <AcompanhantesList onNavigate={handleNavigateAcompanhante} />;
      case 'acompanhante-form':
        return (
          <AcompanhantesForm 
            acompanhanteData={acompanhanteData}
            onSave={handleSaveAcompanhante}
            onCancel={handleCancelAcompanhante}
          />
        );
      case 'acompanhante-detail':
        return (
          <AcompanhantesForm 
            acompanhanteData={acompanhanteData}
            onSave={handleSaveAcompanhante}
            onCancel={handleCancelAcompanhante}
          />
        );
      default:
        return <RequestsManagement />;
    }
  };

  const handleSidebarNavigate = (page) => {
    // Limpar dados quando navegar para uma nova página
    if (page === 'acompanhantes' || page === 'acompanhante-form' || page === 'acompanhante-detail') {
      setAcompanhanteData(null);
    } else if (page === 'clubes-conveniados' || page === 'clubes-conveniados-form' || page === 'clube-conveniado-detail') {
      setClubeData(null);
    } else if (page === 'fluxo-solicitacoes' || page === 'fluxo-solicitacoes-form' || page === 'fluxo-solicitacoes-detail') {
      setFluxoData(null);
    }
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={handleSidebarNavigate}
        currentPage={currentPage}
      />
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
