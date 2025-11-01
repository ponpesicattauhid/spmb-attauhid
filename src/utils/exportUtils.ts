import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student, LembagaData } from '../types';
import { getTahunAjaran, parseTahunAjaranFromNoTes, formatTahunAjaranDisplay } from './helpers';

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
        'Status Asrama': student.data.asrama || '-',
        'Petugas TU': student.data.petugas || '-'
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

// PDF Export Functions - Using jsPDF with Plain Text (No html2canvas)
export const exportToPDF = async (students: Student[], lembagaData: LembagaData[]) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Tentukan tahun ajaran display
    const taOverride = getTahunAjaran();
    const taFromFirst = students.length > 0 ? (parseTahunAjaranFromNoTes(students[0].noTes) || taOverride) : taOverride;
    const taDisplay = formatTahunAjaranDisplay(taFromFirst);

    // ===== HEADER DOKUMEN =====
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPos = 20;

    // Logo/Header placeholder (bisa ditambahkan logo jika ada)
    pdf.setFillColor(37, 99, 235); // Blue color
    pdf.rect(0, 0, pageWidth, 15, 'F');

    // Judul Utama
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(255, 255, 255);
    pdf.text('HASIL TES SELEKSI PENERIMAAN MURID BARU (SPMB)', pageWidth / 2, 10, { align: 'center' });

    // Reset warna teks
    pdf.setTextColor(0, 0, 0);
    yPos = 25;

    // Sub-header
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Pondok Pesantren Islamic Centre At Tauhid', pageWidth / 2, yPos, { align: 'center' });
    yPos += 7;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text('Bangka Belitung', pageWidth / 2, yPos, { align: 'center' });
    yPos += 6;

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Tahun Ajaran ${taDisplay}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    // Garis pemisah
    pdf.setDrawColor(37, 99, 235);
    pdf.setLineWidth(0.5);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;

    // ===== RINGKASAN DATA =====
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('RINGKASAN DATA', 20, yPos);
    yPos += 8;

    // Statistik
    const totalStudents = students.length;
    const sudahDiuji = students.filter(s => s.status === 'SUDAH DIUJI').length;
    const belumDiuji = students.filter(s => s.status === 'BELUM DIUJI').length;
    const lulus = students.filter(s => s.kelulusan === 'LULUS').length;
    const tidakLulus = students.filter(s => s.kelulusan === 'TIDAK LULUS').length;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);

    // Summary boxes
    const boxWidth = 40;
    const boxHeight = 15;
    const boxSpacing = 5;
    const startX = 20;

    const summaryData = [
      { label: 'Total Siswa', value: totalStudents.toString(), color: [59, 130, 246] },
      { label: 'Sudah Diuji', value: sudahDiuji.toString(), color: [16, 185, 129] },
      { label: 'Belum Diuji', value: belumDiuji.toString(), color: [245, 158, 11] },
      { label: 'Lulus', value: lulus.toString(), color: [34, 197, 94] },
      { label: 'Tidak Lulus', value: tidakLulus.toString(), color: [239, 68, 68] }
    ];

    let currentX = startX;
    summaryData.forEach((item, index) => {
      if (index === 4) {
        // Move to next row for 5th item
        currentX = startX;
        yPos += boxHeight + boxSpacing;
      }

      // Draw box
      pdf.setFillColor(item.color[0], item.color[1], item.color[2]);
      pdf.rect(currentX, yPos, boxWidth, boxHeight, 'F');

      // Draw value
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text(item.value, currentX + boxWidth / 2, yPos + 7, { align: 'center' });

      // Draw label
      pdf.setFontSize(8);
      pdf.text(item.label, currentX + boxWidth / 2, yPos + 12, { align: 'center' });

      currentX += boxWidth + boxSpacing;
    });

    yPos += boxHeight + 15;

    // ===== TABEL DATA SISWA =====
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('DAFTAR HASIL TES', 20, yPos);
    yPos += 5;

    // Prepare table data
    const tableData = students.map((student, index) => {
      const lembaga = lembagaData.find(l => l.id === student.lembaga);
      return [
        (index + 1).toString(),
        student.noTes,
        student.data.namaSiswa,
        lembaga?.name || student.lembagaName,
        student.status,
        (student.nilaiAkhir || 0).toString(),
        student.kelulusan || '-',
        student.penguji || '-'
      ];
    });

    // Use autoTable for professional table styling
    autoTable(pdf, {
      startY: yPos,
      head: [['No', 'No. Tes', 'Nama Siswa', 'Lembaga', 'Status', 'Nilai', 'Kelulusan', 'Penguji']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 2
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 10 },
        1: { halign: 'center', cellWidth: 25 },
        2: { halign: 'left', cellWidth: 35 },
        3: { halign: 'left', cellWidth: 20 },
        4: { halign: 'center', cellWidth: 22 },
        5: { halign: 'center', cellWidth: 15 },
        6: { halign: 'center', cellWidth: 22 },
        7: { halign: 'left', cellWidth: 21 }
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      margin: { left: 20, right: 20 },
      didParseCell: function(data: any) {
        // Color coding for status and kelulusan columns
        if (data.section === 'body') {
          if (data.column.index === 4) { // Status column
            const status = data.cell.raw;
            if (status === 'SUDAH DIUJI') {
              data.cell.styles.textColor = [16, 185, 129]; // Green
              data.cell.styles.fontStyle = 'bold';
            } else {
              data.cell.styles.textColor = [245, 158, 11]; // Orange
              data.cell.styles.fontStyle = 'bold';
            }
          }
          if (data.column.index === 6) { // Kelulusan column
            const kelulusan = data.cell.raw;
            if (kelulusan === 'LULUS') {
              data.cell.styles.textColor = [16, 185, 129]; // Green
              data.cell.styles.fontStyle = 'bold';
            } else if (kelulusan === 'TIDAK LULUS') {
              data.cell.styles.textColor = [239, 68, 68]; // Red
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      }
    });

    // ===== FOOTER =====
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add footer to all pages
    const pageCount = (pdf as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      
      // Footer line
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.3);
      pdf.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
      
      // Footer text
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      
      const currentDate = new Date().toLocaleString('id-ID');
      pdf.text(`Dicetak pada: ${currentDate}`, 20, pageHeight - 15);
      pdf.text('Sistem SPMB - Ponpes IC At Tauhid Bangka Belitung', pageWidth / 2, pageHeight - 15, { align: 'center' });
      pdf.text(`Halaman ${i} dari ${pageCount}`, pageWidth - 20, pageHeight - 15, { align: 'right' });
    }

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

// Export specific student data to PDF - Using jsPDF with Plain Text (No html2canvas)
export const exportStudentToPDF = async (student: Student, lembagaData: LembagaData[]) => {
  try {
    const lembaga = lembagaData.find(l => l.id === student.lembaga);
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Tahun ajaran per santri
    const taStudent = parseTahunAjaranFromNoTes(student.noTes) || getTahunAjaran();
    const taStudentDisplay = formatTahunAjaranDisplay(taStudent);

    // ===== HEADER DOKUMEN =====
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPos = 20;

    // Header dengan background
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, pageWidth, 15, 'F');

    // Judul
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255);
    pdf.text('HASIL TES SELEKSI PENERIMAAN MURID BARU', pageWidth / 2, 10, { align: 'center' });

    // Reset
    pdf.setTextColor(0, 0, 0);
    yPos = 25;

    // Sub-header
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Pondok Pesantren Islamic Centre At Tauhid', pageWidth / 2, yPos, { align: 'center' });
    yPos += 7;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text('Bangka Belitung', pageWidth / 2, yPos, { align: 'center' });
    yPos += 6;

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Tahun Ajaran ${taStudentDisplay}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    // Garis pemisah
    pdf.setDrawColor(37, 99, 235);
    pdf.setLineWidth(0.8);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 12;

    // ===== INFORMASI CALON SANTRI =====
    pdf.setTextColor(0, 0, 0);
    
    // Box header untuk section
    pdf.setFillColor(239, 246, 255);
    pdf.rect(20, yPos, pageWidth - 40, 10, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(37, 99, 235);
    pdf.text('INFORMASI CALON SANTRI', 25, yPos + 7);
    yPos += 15;

    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);

    const labelX = 25;
    const colonX = 75;
    const valueX = 80;
    const lineHeight = 7;

    // Format tanggal
    const formatTanggal = (dateStr: string) => {
      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      } catch {
        return dateStr;
      }
    };

    // Data santri
    const studentData = [
      { label: 'No. Tes', value: student.noTes },
      { label: 'Nama Lengkap', value: student.data.namaSiswa },
      { label: 'Tempat, Tanggal Lahir', value: `${student.data.tempatLahir || '-'}, ${student.data.tanggalLahir ? formatTanggal(student.data.tanggalLahir) : '-'}` },
      { label: 'Jenis Kelamin', value: student.data.jenisKelamin || '-' },
      { label: 'NIK', value: student.data.nik || '-' },
      { label: 'Nama Orang Tua', value: student.data.namaOrangTua },
      { label: 'Kontak Orang Tua', value: student.data.kontakOrtu || '-' },
      { label: 'Lembaga', value: lembaga?.name || student.lembagaName },
      { label: 'Tanggal Tes', value: formatTanggal(student.data.tanggalTes) },
      { label: 'Jam Tes', value: student.data.jamTes + ' WIB' },
      { label: 'Status Tes', value: student.status },
      { label: 'Penguji', value: student.penguji || 'Belum ditentukan' }
    ];

    studentData.forEach((item, index) => {
      // Alternating background
      if (index % 2 === 0) {
        pdf.setFillColor(248, 250, 252);
        pdf.rect(20, yPos - 4, pageWidth - 40, lineHeight, 'F');
      }

      pdf.setFont('helvetica', 'bold');
      pdf.text(item.label, labelX, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(':', colonX, yPos);
      
      // Special color for status
      if (item.label === 'Status Tes') {
        if (item.value === 'SUDAH DIUJI') {
          pdf.setTextColor(16, 185, 129);
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setTextColor(245, 158, 11);
          pdf.setFont('helvetica', 'bold');
        }
      }
      
      const textLines = pdf.splitTextToSize(item.value, pageWidth - valueX - 25);
      pdf.text(textLines, valueX, yPos);
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
      
      yPos += lineHeight;
    });

    yPos += 8;

    // ===== HASIL PENILAIAN =====
    // Box header
    pdf.setFillColor(239, 246, 255);
    pdf.rect(20, yPos, pageWidth - 40, 10, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(37, 99, 235);
    pdf.text('HASIL PENILAIAN', 25, yPos + 7);
    yPos += 15;

    pdf.setTextColor(0, 0, 0);

    // Nilai boxes
    const boxWidth = 70;
    const boxHeight = 30;
    const boxGap = 10;
    const boxStartX = (pageWidth - (boxWidth * 2 + boxGap)) / 2;

    // Box Nilai Akhir
    pdf.setFillColor(239, 246, 255);
    pdf.rect(boxStartX, yPos, boxWidth, boxHeight, 'F');
    pdf.setDrawColor(37, 99, 235);
    pdf.setLineWidth(0.5);
    pdf.rect(boxStartX, yPos, boxWidth, boxHeight, 'S');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.setTextColor(37, 99, 235);
    pdf.text((student.nilaiAkhir || 0).toString(), boxStartX + boxWidth / 2, yPos + 15, { align: 'center' });
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Nilai Akhir', boxStartX + boxWidth / 2, yPos + 23, { align: 'center' });

    // Box Kelulusan
    const kelulusan = student.kelulusan || 'BELUM DINILAI';
    const kelulusanColor = kelulusan === 'LULUS' ? [236, 253, 245] : 
                          kelulusan === 'TIDAK LULUS' ? [254, 242, 242] : [249, 250, 251];
    const textColor = kelulusan === 'LULUS' ? [16, 185, 129] : 
                     kelulusan === 'TIDAK LULUS' ? [239, 68, 68] : [107, 114, 128];

    pdf.setFillColor(kelulusanColor[0], kelulusanColor[1], kelulusanColor[2]);
    pdf.rect(boxStartX + boxWidth + boxGap, yPos, boxWidth, boxHeight, 'F');
    pdf.setDrawColor(textColor[0], textColor[1], textColor[2]);
    pdf.rect(boxStartX + boxWidth + boxGap, yPos, boxWidth, boxHeight, 'S');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.text(kelulusan, boxStartX + boxWidth + boxGap + boxWidth / 2, yPos + 15, { align: 'center' });
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Status Kelulusan', boxStartX + boxWidth + boxGap + boxWidth / 2, yPos + 23, { align: 'center' });

    yPos += boxHeight + 12;

    // ===== DETAIL NILAI (if available) =====
    if (student.penilaianAnak || student.mathCorrect !== undefined || student.hafalanBenar !== undefined) {
      pdf.setTextColor(0, 0, 0);
      pdf.setFillColor(239, 246, 255);
      pdf.rect(20, yPos, pageWidth - 40, 10, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(37, 99, 235);
      pdf.text('RINCIAN NILAI', 25, yPos + 7);
      yPos += 15;

      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);

      const detailData = [];
      
      if (student.mathCorrect !== undefined) {
        detailData.push({ label: 'Nilai Matematika', value: student.mathCorrect.toString() });
      }
      
      if (student.hafalanBenar !== undefined) {
        detailData.push({ label: 'Nilai Hafalan', value: student.hafalanBenar.toString() });
      }
      
      if (student.penilaianAnak) {
        const avgWawancara = Object.values(student.penilaianAnak).reduce((sum, val) => sum + val, 0) / Object.keys(student.penilaianAnak).length;
        detailData.push({ label: 'Nilai Wawancara', value: avgWawancara.toFixed(1) });
      }

      detailData.forEach((item, index) => {
        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(20, yPos - 4, pageWidth - 40, lineHeight, 'F');
        }

        pdf.setFont('helvetica', 'bold');
        pdf.text(item.label, labelX, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.text(':', colonX, yPos);
        pdf.text(item.value, valueX, yPos);
        
        yPos += lineHeight;
      });

      yPos += 5;
    }

    // ===== FOOTER =====
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    
    const currentDate = new Date().toLocaleString('id-ID');
    pdf.text(`Dicetak pada: ${currentDate}`, 20, pageHeight - 15);
    pdf.text('Sistem SPMB - Ponpes IC At Tauhid Bangka Belitung', pageWidth / 2, pageHeight - 15, { align: 'center' });

    // Generate filename and save
    const filename = `Hasil_Tes_${student.noTes}_${student.data.namaSiswa.replace(/\s+/g, '_')}.pdf`;
    pdf.save(filename);

    return { success: true, message: `File PDF berhasil didownload: ${filename}` };
  } catch (error) {
    console.error('Error exporting student to PDF:', error);
    return { success: false, message: 'Gagal mengexport ke PDF' };
  }
};
