import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Student, LembagaData } from '../types';

// Excel Export Functions
export const exportToExcel = (students: Student[], lembagaData: LembagaData[]) => {
  try {
    // Prepare data for Excel
    const excelData = students.map(student => {
      const lembaga = lembagaData.find(l => l.id === student.lembaga);
      
      return {
        'No. Tes': student.noTes,
        'Nama Siswa': student.data.namaSiswa,
        'Nama Orang Tua': student.data.namaOrangTua,
        'Lembaga': lembaga?.name || student.lembagaName,
        'Tanggal Tes': student.data.tanggalTes,
        'Jam Tes': student.data.jamTes,
        'Status': student.status,
        'Penguji': student.penguji || '-',
        'Nilai Wawancara': student.penilaianAnak ? Object.values(student.penilaianAnak).reduce((sum, score) => sum + score, 0) / Object.keys(student.penilaianAnak).length : 0,
        'Nilai Matematika': student.mathCorrect || 0,
        'Nilai Hafalan': student.hafalanBenar || 0,
        'Nilai Akhir': student.nilaiAkhir || 0,
        'Kelulusan': student.kelulusan || '-',
        'Riwayat Penyakit': student.riwayatPenyakit || '-',
        'Pekerjaan Orang Tua': student.pekerjaanOrangTua || '-',
        'Petugas TU': student.data.petugas || '-',
        'Petugas Cadangan': student.data.petugasCadangan || '-'
      };
    });

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 12 }, // No. Tes
      { wch: 25 }, // Nama Siswa
      { wch: 25 }, // Nama Orang Tua
      { wch: 15 }, // Lembaga
      { wch: 12 }, // Tanggal Tes
      { wch: 10 }, // Jam Tes
      { wch: 12 }, // Status
      { wch: 15 }, // Penguji
      { wch: 15 }, // Nilai Wawancara
      { wch: 15 }, // Nilai Matematika
      { wch: 15 }, // Nilai Hafalan
      { wch: 12 }, // Nilai Akhir
      { wch: 12 }, // Kelulusan
      { wch: 30 }, // Riwayat Penyakit
      { wch: 25 }, // Pekerjaan Orang Tua
      { wch: 20 }, // Petugas TU
      { wch: 20 }  // Petugas Cadangan
    ];
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hasil Tes SPMB');

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `Hasil_Tes_SPMB_${currentDate}.xlsx`;

    // Save file
    XLSX.writeFile(workbook, filename);

    return { success: true, message: `File Excel berhasil didownload: ${filename}` };
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return { success: false, message: 'Gagal mengexport ke Excel' };
  }
};

// PDF Export Functions
export const exportToPDF = async (students: Student[], lembagaData: LembagaData[], elementId: string = 'pdf-export-content') => {
  try {
    // Create content for PDF
    const pdfContent = document.createElement('div');
    pdfContent.id = 'pdf-export-content';
    pdfContent.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      font-family: Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      color: #333;
      background: white;
      box-sizing: border-box;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 20px;
    `;
    header.innerHTML = `
      <h1 style="margin: 0; font-size: 18pt; color: #2563eb; font-weight: bold;">
        HASIL TES SELEKSI PENERIMAAN MURID BARU (SPMB)
      </h1>
      <h2 style="margin: 10px 0 0 0; font-size: 14pt; color: #374151; font-weight: normal;">
        Pondok Pesantren Ikhlas Cinta Tauhid
      </h2>
      <p style="margin: 5px 0 0 0; font-size: 10pt; color: #6b7280;">
        Tahun Ajaran ${new Date().getFullYear()}/${new Date().getFullYear() + 1}
      </p>
    `;

    // Summary statistics
    const totalStudents = students.length;
    const sudahDiuji = students.filter(s => s.status === 'SUDAH DIUJI').length;
    const belumDiuji = students.filter(s => s.status === 'BELUM DIUJI').length;
    const lulus = students.filter(s => s.kelulusan === 'LULUS').length;
    const tidakLulus = students.filter(s => s.kelulusan === 'TIDAK LULUS').length;

    const summary = document.createElement('div');
    summary.style.cssText = `
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 30px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
    `;
    summary.innerHTML = `
      <div style="text-align: center; padding: 10px; background: white; border-radius: 6px; border-left: 4px solid #3b82f6;">
        <div style="font-size: 16pt; font-weight: bold; color: #3b82f6;">${totalStudents}</div>
        <div style="font-size: 9pt; color: #6b7280;">Total Siswa</div>
      </div>
      <div style="text-align: center; padding: 10px; background: white; border-radius: 6px; border-left: 4px solid #10b981;">
        <div style="font-size: 16pt; font-weight: bold; color: #10b981;">${sudahDiuji}</div>
        <div style="font-size: 9pt; color: #6b7280;">Sudah Diuji</div>
      </div>
      <div style="text-align: center; padding: 10px; background: white; border-radius: 6px; border-left: 4px solid #f59e0b;">
        <div style="font-size: 16pt; font-weight: bold; color: #f59e0b;">${lulus}</div>
        <div style="font-size: 9pt; color: #6b7280;">Lulus</div>
      </div>
      <div style="text-align: center; padding: 10px; background: white; border-radius: 6px; border-left: 4px solid #ef4444;">
        <div style="font-size: 16pt; font-weight: bold; color: #ef4444;">${tidakLulus}</div>
        <div style="font-size: 9pt; color: #6b7280;">Tidak Lulus</div>
      </div>
    `;

    // Students table
    const tableContainer = document.createElement('div');
    tableContainer.style.cssText = `
      overflow-x: auto;
      margin-bottom: 20px;
    `;

    const table = document.createElement('table');
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
    `;

    // Table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr style="background: #2563eb; color: white;">
        <th style="padding: 8px 4px; text-align: left; border: 1px solid #1d4ed8;">No</th>
        <th style="padding: 8px 4px; text-align: left; border: 1px solid #1d4ed8;">No. Tes</th>
        <th style="padding: 8px 4px; text-align: left; border: 1px solid #1d4ed8;">Nama Siswa</th>
        <th style="padding: 8px 4px; text-align: left; border: 1px solid #1d4ed8;">Lembaga</th>
        <th style="padding: 8px 4px; text-align: center; border: 1px solid #1d4ed8;">Status</th>
        <th style="padding: 8px 4px; text-align: center; border: 1px solid #1d4ed8;">Nilai</th>
        <th style="padding: 8px 4px; text-align: center; border: 1px solid #1d4ed8;">Kelulusan</th>
        <th style="padding: 8px 4px; text-align: left; border: 1px solid #1d4ed8;">Penguji</th>
      </tr>
    `;

    // Table body
    const tbody = document.createElement('tbody');
    students.forEach((student, index) => {
      const lembaga = lembagaData.find(l => l.id === student.lembaga);
      const row = document.createElement('tr');
      row.style.cssText = index % 2 === 0 ? 'background: #f8fafc;' : 'background: white;';
      
      const statusColor = student.status === 'SUDAH DIUJI' ? '#10b981' : '#f59e0b';
      const kelulusanColor = student.kelulusan === 'LULUS' ? '#10b981' : 
                            student.kelulusan === 'TIDAK LULUS' ? '#ef4444' : '#6b7280';
      
      row.innerHTML = `
        <td style="padding: 6px 4px; border: 1px solid #e5e7eb; text-align: center;">${index + 1}</td>
        <td style="padding: 6px 4px; border: 1px solid #e5e7eb;">${student.noTes}</td>
        <td style="padding: 6px 4px; border: 1px solid #e5e7eb;">${student.data.namaSiswa}</td>
        <td style="padding: 6px 4px; border: 1px solid #e5e7eb;">${lembaga?.name || student.lembagaName}</td>
        <td style="padding: 6px 4px; border: 1px solid #e5e7eb; text-align: center; color: ${statusColor}; font-weight: bold;">${student.status}</td>
        <td style="padding: 6px 4px; border: 1px solid #e5e7eb; text-align: center; font-weight: bold;">${student.nilaiAkhir || '-'}</td>
        <td style="padding: 6px 4px; border: 1px solid #e5e7eb; text-align: center; color: ${kelulusanColor}; font-weight: bold;">${student.kelulusan || '-'}</td>
        <td style="padding: 6px 4px; border: 1px solid #e5e7eb;">${student.penguji || '-'}</td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = `
      margin-top: 40px;
      text-align: center;
      font-size: 9pt;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
      padding-top: 20px;
    `;
    footer.innerHTML = `
      <p>Dokumen ini dibuat otomatis pada: ${new Date().toLocaleString('id-ID')}</p>
      <p>Sistem SPMB - Pondok Pesantren Ikhlas Cinta Tauhid</p>
    `;

    // Assemble PDF content
    pdfContent.appendChild(header);
    pdfContent.appendChild(summary);
    pdfContent.appendChild(tableContainer);
    pdfContent.appendChild(footer);

    // Temporarily add to DOM
    document.body.appendChild(pdfContent);

    // Generate PDF
    const canvas = await html2canvas(pdfContent, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calculate dimensions for A4 fit to page
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Clean up
    document.body.removeChild(pdfContent);

    // Generate filename and save
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `Hasil_Tes_SPMB_${currentDate}.pdf`;
    pdf.save(filename);

    return { success: true, message: `File PDF berhasil didownload: ${filename}` };
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return { success: false, message: 'Gagal mengexport ke PDF' };
  }
};

// Export specific student data to PDF
export const exportStudentToPDF = async (student: Student, lembagaData: LembagaData[]) => {
  try {
    const lembaga = lembagaData.find(l => l.id === student.lembaga);
    
    // Create content for PDF
    const pdfContent = document.createElement('div');
    pdfContent.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      font-family: Arial, sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #333;
      background: white;
      box-sizing: border-box;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
    `;
    header.innerHTML = `
      <h1 style="margin: 0; font-size: 20pt; color: #2563eb; font-weight: bold;">
        HASIL TES SELEKSI PENERIMAAN MURID BARU
      </h1>
      <h2 style="margin: 10px 0 0 0; font-size: 16pt; color: #374151; font-weight: normal;">
        Pondok Pesantren Ikhlas Cinta Tauhid
      </h2>
      <p style="margin: 5px 0 0 0; font-size: 12pt; color: #6b7280;">
        Tahun Ajaran ${new Date().getFullYear()}/${new Date().getFullYear() + 1}
      </p>
    `;

    // Student info section
    const studentInfo = document.createElement('div');
    studentInfo.style.cssText = `
      background: #f8fafc;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 30px;
      border-left: 5px solid #2563eb;
    `;
    studentInfo.innerHTML = `
      <h3 style="margin: 0 0 15px 0; color: #2563eb; font-size: 16pt;">Informasi Calon Santri</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div><strong>No. Tes:</strong> ${student.noTes}</div>
        <div><strong>Nama Siswa:</strong> ${student.data.namaSiswa}</div>
        <div><strong>Nama Orang Tua:</strong> ${student.data.namaOrangTua}</div>
        <div><strong>Lembaga:</strong> ${lembaga?.name || student.lembagaName}</div>
        <div><strong>Tanggal Tes:</strong> ${student.data.tanggalTes}</div>
        <div><strong>Jam Tes:</strong> ${student.data.jamTes}</div>
        <div><strong>Status:</strong> <span style="color: ${student.status === 'SUDAH DIUJI' ? '#10b981' : '#f59e0b'}; font-weight: bold;">${student.status}</span></div>
        <div><strong>Penguji:</strong> ${student.penguji || '-'}</div>
      </div>
    `;

    // Results section
    const results = document.createElement('div');
    results.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 30px;
      border: 2px solid #e5e7eb;
    `;
    results.innerHTML = `
      <h3 style="margin: 0 0 20px 0; color: #2563eb; font-size: 16pt;">Hasil Penilaian</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        <div style="text-align: center; padding: 15px; background: #eff6ff; border-radius: 8px;">
          <div style="font-size: 24pt; font-weight: bold; color: #2563eb;">${student.nilaiAkhir || 0}</div>
          <div style="font-size: 12pt; color: #6b7280;">Nilai Akhir</div>
        </div>
        <div style="text-align: center; padding: 15px; background: ${student.kelulusan === 'LULUS' ? '#ecfdf5' : student.kelulusan === 'TIDAK LULUS' ? '#fef2f2' : '#f9fafb'}; border-radius: 8px;">
          <div style="font-size: 20pt; font-weight: bold; color: ${student.kelulusan === 'LULUS' ? '#10b981' : student.kelulusan === 'TIDAK LULUS' ? '#ef4444' : '#6b7280'};">${student.kelulusan || 'BELUM DINILAI'}</div>
          <div style="font-size: 12pt; color: #6b7280;">Status Kelulusan</div>
        </div>
      </div>
    `;

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = `
      margin-top: 40px;
      text-align: center;
      font-size: 10pt;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
      padding-top: 20px;
    `;
    footer.innerHTML = `
      <p>Dokumen ini dibuat otomatis pada: ${new Date().toLocaleString('id-ID')}</p>
      <p>Sistem SPMB - Pondok Pesantren Ikhlas Cinta Tauhid</p>
    `;

    // Assemble PDF content
    pdfContent.appendChild(header);
    pdfContent.appendChild(studentInfo);
    pdfContent.appendChild(results);
    pdfContent.appendChild(footer);

    // Temporarily add to DOM
    document.body.appendChild(pdfContent);

    // Generate PDF
    const canvas = await html2canvas(pdfContent, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Fit to A4 page
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Clean up
    document.body.removeChild(pdfContent);

    // Generate filename and save
    const filename = `Hasil_Tes_${student.noTes}_${student.data.namaSiswa.replace(/\s+/g, '_')}.pdf`;
    pdf.save(filename);

    return { success: true, message: `File PDF berhasil didownload: ${filename}` };
  } catch (error) {
    console.error('Error exporting student to PDF:', error);
    return { success: false, message: 'Gagal mengexport ke PDF' };
  }
};
