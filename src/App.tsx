import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useStudentData } from './hooks/useStudentData';
import { lembagaData, petugasList } from './data/constants';
import { getFilteredStudents, getPenilaianByLembaga } from './utils/helpers';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import FormScreen from './components/FormScreen';
import PenilaianScreen from './components/PenilaianScreen';
import AdminScreen from './components/AdminScreen';
import Toast from './components/Toast';
import SupabaseNotice from './components/SupabaseNotice';
import { View, Petugas } from './types';

const App = () => {
  const [view, setView] = useState<View>('login');
  
  const {
    users,
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    createUser,
    updateUser,
    deleteUser,
    resetPassword
  } = useAuth();

  const {
    userRole,
    selectedLembaga,
    registeredStudents,
    selectedStudent,
    formData,
    penilaianAnak,
    penilaianOrtu,
    editingId,
    filterLembaga,
    searchQuery,
    toast,
    setFilterLembaga,
    setSearchQuery,
    showToast,
    hideToast,
    handleLogin: handleRoleLogin,
    handleLogout: handleRoleLogout,
    handleAddStudent,
    handleEditStudent,
    handleDeleteStudent,
    handleSaveStudent,
    handleStartPenilaian,
    handleSavePenilaian,
    handleFormChange,
    handlePenilaianAnakChange,
    handlePenilaianOrtuChange,
    mathCorrect,
    hafalanBenar,
    handleMathCorrectChange,
    handleHafalanBenarChange
  } = useStudentData(currentUser);

  const handleLogin = (username: string, password: string) => {
    const result = login(username, password);
    if (result.success && result.user) {
      handleRoleLogin(result.user.role);
      setView('dashboard');
    }
    return result;
  };

  const handleLogout = () => {
    logout();
    handleRoleLogout();
    setView('login');
  };

  const handleOpenAdmin = () => {
    setView('admin');
  };

  // Auto-restore session setelah refresh
  useEffect(() => {
    if (!isLoading && isAuthenticated && currentUser) {
      // Restore role ke useStudentData
      handleRoleLogin(currentUser.role);
      // Set view ke dashboard jika belum
      if (view === 'login') {
        setView('dashboard');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, currentUser]);

  // Clear old data on first load
  useEffect(() => {
    const hasCleared = sessionStorage.getItem('status_migrated');
    if (!hasCleared) {
      // Clear localStorage items that might contain old status
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('students') || key.includes('registeredStudents'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      console.log('🧹 Cleared old student data from localStorage');
      sessionStorage.setItem('status_migrated', 'true');
    }
  }, []);

  const filteredStudents = getFilteredStudents(
    registeredStudents,
    filterLembaga,
    searchQuery,
    userRole
  );

  // Show loading saat check session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-400 to-blue-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
        <div className="relative z-10 text-center animate-scale-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-white/30 border-t-white mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-t-emerald-300 animate-spin mx-auto" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-white font-semibold text-lg drop-shadow-lg">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (view === 'login') {
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        <SupabaseNotice />
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </>
    );
  }

  // Dashboard Screen
  if (view === 'dashboard') {
    return (
      <>
        <DashboardScreen
          userRole={userRole}
          currentUser={currentUser}
          registeredStudents={registeredStudents}
          lembagaData={lembagaData}
          filterLembaga={filterLembaga}
          searchQuery={searchQuery}
          filteredStudents={filteredStudents}
          onLogout={handleLogout}
          onAddStudent={(lembaga) => {
            handleAddStudent(lembaga);
            setView('form');
          }}
          onEditStudent={(student) => {
            handleEditStudent(student, lembagaData);
            setView('form');
          }}
          onDeleteStudent={handleDeleteStudent}
          onStartPenilaian={(student) => {
            handleStartPenilaian(student);
            setView('penilaian');
          }}
          onFilterLembagaChange={setFilterLembaga}
          onSearchQueryChange={setSearchQuery}
          onOpenAdmin={handleOpenAdmin}
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </>
    );
  }

  // Admin Screen
  if (view === 'admin' && currentUser?.role === 'ADMIN') {
    return (
      <>
        <AdminScreen
          users={users}
          currentUser={currentUser}
          onCreateUser={createUser}
          onUpdateUser={updateUser}
          onDeleteUser={deleteUser}
          onResetPassword={resetPassword}
          onBack={() => setView('dashboard')}
          showToast={showToast}
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </>
    );
  }

  // Form Input Screen (TU Only)
  if (view === 'form') {
    // Sinkronisasi daftar Petugas TU dari Admin (users)
    const tuUsersPetugasList: Petugas[] = (users || [])
      .filter(u => u.role === 'TU')
      .map(u => ({ name: u.name, role: 'TU' }));
    const computedPetugasList: Petugas[] = tuUsersPetugasList.length > 0 ? tuUsersPetugasList : petugasList;

    return (
      <>
        <FormScreen
          selectedLembaga={selectedLembaga}
          formData={formData}
          editingId={editingId}
          petugasList={computedPetugasList}
          userRole={userRole}
          onBack={() => setView('dashboard')}
          onSave={() => {
            handleSaveStudent();
            setView('dashboard');
          }}
          onFormChange={handleFormChange}
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </>
    );
  }

  // Penilaian Screen (Penguji Only)
  if (view === 'penilaian' && selectedStudent) {
    const penilaian = getPenilaianByLembaga(selectedStudent.lembaga);
    
    return (
      <>
        <PenilaianScreen
          selectedStudent={selectedStudent}
          penilaian={penilaian}
          penilaianAnak={penilaianAnak}
          penilaianOrtu={penilaianOrtu}
          mathCorrect={mathCorrect}
          hafalanBenar={hafalanBenar}
          onBack={() => setView('dashboard')}
          onSave={() => {
            handleSavePenilaian();
            setView('dashboard');
          }}
          onPenilaianAnakChange={handlePenilaianAnakChange}
          onPenilaianOrtuChange={handlePenilaianOrtuChange}
          onMathCorrectChange={handleMathCorrectChange}
          onHafalanBenarChange={handleHafalanBenarChange}
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </>
    );
  }

  return null;
};

export default App;
