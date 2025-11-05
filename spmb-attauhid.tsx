import React from 'react';
import { useStudentData } from './hooks/useStudentData';
import { lembagaData, petugasList } from './data/constants';
import { getFilteredStudents, getPenilaianByLembaga } from './utils/helpers';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import FormScreen from './components/FormScreen';
import PenilaianScreen from './components/PenilaianScreen';

const App = () => {
  const {
    userRole,
    selectedLembaga,
    view,
    registeredStudents,
    selectedStudent,
    formData,
    penilaianAnak,
    penilaianOrtu,
    mathCorrect,
    hafalanBenar,
    riwayatPenyakit,
    pekerjaanOrangTua,
    catatanPenguji,
    editingId,
    filterLembaga,
    searchQuery,
    setView,
    setFilterLembaga,
    setSearchQuery,
    handleLogin,
    handleLogout,
    handleAddStudent,
    handleEditStudent,
    handleDeleteStudent,
    handleSaveStudent,
    handleStartPenilaian,
    handleSavePenilaian,
    handleFormChange,
    handlePenilaianAnakChange,
    handlePenilaianOrtuChange,
    handleMathCorrectChange,
    handleHafalanBenarChange,
    handleRiwayatPenyakitChange,
    handlePekerjaanOrangTuaChange,
    handleCatatanPengujiChange
  } = useStudentData();

  const filteredStudents = getFilteredStudents(
    registeredStudents,
    filterLembaga,
    'ALL', // filterStatus default
    searchQuery
  );

  // Login Screen
  if (view === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Dashboard Screen
  if (view === 'dashboard') {
    return (
      <DashboardScreen
        userRole={userRole}
        registeredStudents={registeredStudents}
        lembagaData={lembagaData}
        filterLembaga={filterLembaga}
        searchQuery={searchQuery}
        filteredStudents={filteredStudents}
        onLogout={handleLogout}
        onAddStudent={handleAddStudent}
        onEditStudent={(student) => handleEditStudent(student, lembagaData)}
        onDeleteStudent={handleDeleteStudent}
        onStartPenilaian={handleStartPenilaian}
        onFilterLembagaChange={setFilterLembaga}
        onSearchQueryChange={setSearchQuery}
      />
    );
  }

  // Form Input Screen (TU Only)
  if (view === 'form') {
    return (
      <FormScreen
        selectedLembaga={selectedLembaga}
        formData={formData}
        editingId={editingId}
        petugasList={petugasList}
        onBack={() => setView('dashboard')}
        onSave={handleSaveStudent}
        onFormChange={handleFormChange}
      />
    );
  }

  // Penilaian Screen (Penguji Only)
  if (view === 'penilaian' && selectedStudent) {
    const penilaian = getPenilaianByLembaga(selectedStudent.lembaga);
    
    return (
      <PenilaianScreen
        selectedStudent={selectedStudent}
        penilaian={penilaian}
        penilaianAnak={penilaianAnak}
        penilaianOrtu={penilaianOrtu}
        mathCorrect={mathCorrect}
        hafalanBenar={hafalanBenar}
        riwayatPenyakit={riwayatPenyakit}
        pekerjaanOrangTua={pekerjaanOrangTua}
        catatanPenguji={catatanPenguji}
        onBack={() => setView('dashboard')}
        onSave={handleSavePenilaian}
        onPenilaianAnakChange={handlePenilaianAnakChange}
        onPenilaianOrtuChange={handlePenilaianOrtuChange}
        onMathCorrectChange={handleMathCorrectChange}
        onHafalanBenarChange={handleHafalanBenarChange}
        onRiwayatPenyakitChange={handleRiwayatPenyakitChange}
        onPekerjaanOrangTuaChange={handlePekerjaanOrangTuaChange}
        onCatatanPengujiChange={handleCatatanPengujiChange}
      />
    );
  }

  return null;
};

export default App;
