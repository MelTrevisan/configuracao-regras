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

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('solicitacoes');
  const [clubeData, setClubeData] = useState(null);
  const [fluxoData, setFluxoData] = useState(null);

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
      default:
        return <RequestsManagement />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
