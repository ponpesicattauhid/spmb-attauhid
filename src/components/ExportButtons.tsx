import React from 'react';
import { Download, FileSpreadsheet, File } from 'lucide-react';
import { exportToExcel, exportToPDF, exportStudentToPDF } from '../utils/exportUtils';
import { Student, LembagaData } from '../types';

interface ExportButtonsProps {
  students: Student[];
  lembagaData: LembagaData[];
  student?: Student; // For individual student export
  className?: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ 
  students, 
  lembagaData, 
  student, 
  className = "" 
}) => {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      const result = exportToExcel(students, lembagaData);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengexport ke Excel');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const result = await exportToPDF(students, lembagaData);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengexport ke PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportStudentPDF = async () => {
    if (!student) return;
    
    try {
      const result = await exportStudentToPDF(student, lembagaData);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengexport PDF siswa');
    }
  };

  if (student) {
    // Individual student export
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={handleExportStudentPDF}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-sm font-semibold"
          title="Export Hasil Tes PDF"
        >
          <Download className="w-4 h-4" />
          Hasil PDF
        </button>
      </div>
    );
  }

  // Bulk export
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleExportExcel}
        disabled={isExporting || students.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm font-semibold"
        title="Export ke Excel"
      >
        <FileSpreadsheet className="w-4 h-4" />
        <span className="hidden md:inline">Excel</span>
      </button>
      
      <button
        onClick={handleExportPDF}
        disabled={isExporting || students.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm font-semibold"
        title="Export ke PDF"
      >
        <File className="w-4 h-4" />
        <span className="hidden md:inline">PDF</span>
      </button>
    </div>
  );
};

export default ExportButtons;
