import jsPDF from 'jspdf';
import { Student } from '../types';
import { lembagaData } from '../data/constants';

export const generateKartuPesertaPDF = (student: Student): jsPDF => {
  const doc = new jsPDF();
  // Layout constants untuk kolom
  const marginLeft = 20;
  const labelX = marginLeft + 5; // 25
  // Geser kolom titik dua dan nilai lebih ke kanan untuk kerapian
  const colonX = 95;
  const valueX = colonX + 5; // 100
  
  // Format tanggal untuk display
  const formatTanggal = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format jam untuk display
  const formatJam = (timeString: string) => {
    return timeString + ' WIB';
  };
  
  // Set font
  doc.setFont('helvetica');
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('KARTU PESERTA TES', 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('SPMB Ponpes IC At Tauhid', 105, 30, { align: 'center' });
  doc.text('Bangka Belitung', 105, 38, { align: 'center' });
  
  // Garis pemisah
  doc.setLineWidth(0.5);
  doc.line(20, 45, 190, 45);
  
  // Nomor Tes (Highlight)
  doc.setFillColor(46, 125, 50); // Green
  doc.rect(20, 50, 170, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('NOMOR TES:', 25, 59);
  doc.setFontSize(18);
  doc.text(student.noTes, 175, 59, { align: 'right' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Data Peserta
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('DATA CALON MURID', 20, 75);
  
  doc.setFont('helvetica', 'normal');
  const dataY = 85;
  const lineHeight = 8;
  
  doc.text('Nama Lengkap', labelX, dataY);
  doc.text(':', colonX, dataY);
  doc.text(student.data.namaSiswa, valueX, dataY);
  
  doc.text('Tempat, Tanggal Lahir', labelX, dataY + lineHeight);
  doc.text(':', colonX, dataY + lineHeight);
  doc.text(student.data.tempatLahir + ', ' + formatTanggal(student.data.tanggalLahir), valueX, dataY + lineHeight);
  
  doc.text('Jenis Kelamin', labelX, dataY + lineHeight * 2);
  doc.text(':', colonX, dataY + lineHeight * 2);
  doc.text(student.data.jenisKelamin, valueX, dataY + lineHeight * 2);
  
  doc.text('NIK', labelX, dataY + lineHeight * 3);
  doc.text(':', colonX, dataY + lineHeight * 3);
  doc.text(student.data.nik, valueX, dataY + lineHeight * 3);
  
  // Garis pemisah
  doc.setLineWidth(0.3);
  doc.line(20, dataY + lineHeight * 4 + 5, 190, dataY + lineHeight * 4 + 5);
  
  // Data Orang Tua
  doc.setFont('helvetica', 'bold');
  doc.text('DATA ORANG TUA', 20, dataY + lineHeight * 5 + 5);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Nama Orang Tua', labelX, dataY + lineHeight * 6 + 5);
  doc.text(':', colonX, dataY + lineHeight * 6 + 5);
  doc.text(student.data.namaOrangTua, valueX, dataY + lineHeight * 6 + 5);
  
  doc.text('Kontak Orang Tua', labelX, dataY + lineHeight * 7 + 5);
  doc.text(':', colonX, dataY + lineHeight * 7 + 5);
  doc.text(student.data.kontakOrtu, valueX, dataY + lineHeight * 7 + 5);
  
  // Garis pemisah
  doc.line(20, dataY + lineHeight * 8 + 10, 190, dataY + lineHeight * 8 + 10);
  
  // Jadwal Tes (Highlight)
  doc.setFillColor(33, 150, 243); // Blue
  doc.rect(20, dataY + lineHeight * 9 + 5, 170, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('JADWAL TES', 25, dataY + lineHeight * 9 + 14);
  
  // Reset
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Turunkan posisi jadwal agar tidak mepet header
  const jadwalBaseY = dataY + lineHeight * 11 + 15;
  doc.text('Tanggal', labelX, jadwalBaseY);
  doc.text(':', colonX, jadwalBaseY);
  doc.text(formatTanggal(student.data.tanggalTes), valueX, jadwalBaseY);
  
  doc.text('Jam', labelX, jadwalBaseY + lineHeight);
  doc.text(':', colonX, jadwalBaseY + lineHeight);
  doc.text(formatJam(student.data.jamTes), valueX, jadwalBaseY + lineHeight);
  
  // Get lembaga info
  const lembaga = lembagaData.find(l => l.id === student.lembaga);
  
  doc.text('Tempat', labelX, jadwalBaseY + lineHeight * 2);
  doc.text(':', colonX, jadwalBaseY + lineHeight * 2);
  doc.text(lembaga?.fullName || student.lembagaName, valueX, jadwalBaseY + lineHeight * 2);
  
  // Lokasi Tes (alamat) - tanpa emoji karena encoding issue
  if (lembaga?.address) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('LOKASI TES', 20, jadwalBaseY + lineHeight * 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(lembaga.address.building, 25, jadwalBaseY + lineHeight * 5);
    const streetLines = doc.splitTextToSize(lembaga.address.street, 165);
    doc.text(streetLines, 25, jadwalBaseY + lineHeight * 5 + 6);
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 255);
    doc.textWithLink('Lihat di Google Maps', 25, jadwalBaseY + lineHeight * 5 + 6 + (streetLines.length * 4), {
      url: lembaga.address.mapsUrl
    });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
  }
  
  // Catatan
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  const catatanY = lembaga?.address ? jadwalBaseY + lineHeight * 8 : dataY + lineHeight * 15 + 10;
  doc.text('Catatan:', 20, catatanY);
  doc.text('- Harap datang 15 menit sebelum jadwal tes', 25, catatanY + 7);
  doc.text('- Membawa alat tulis', 25, catatanY + 13);
  doc.text('- Berpakaian rapi dan sopan', 25, catatanY + 19);
  doc.text('- Kartu peserta ini wajib dibawa saat tes', 25, catatanY + 25);
  
  // Footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  // Geser sedikit lebih ke bawah agar terpisah dari konten
  doc.text('Dicetak pada: ' + new Date().toLocaleString('id-ID'), 105, 286, { align: 'center' });
  
  return doc;
};

export const downloadKartuPeserta = (student: Student) => {
  const doc = generateKartuPesertaPDF(student);
  doc.save(`Kartu-Peserta-${student.noTes}.pdf`);
};

export const getKartuPesertaBlob = (student: Student): Blob => {
  const doc = generateKartuPesertaPDF(student);
  return doc.output('blob');
};

export const sendViaWhatsApp = (student: Student) => {
  // Format nomor telepon (hapus karakter non-digit)
  const phoneNumber = student.data.kontakOrtu.replace(/\D/g, '');
  
  // Pastikan nomor dimulai dengan 62 (kode Indonesia)
  let formattedPhone = phoneNumber;
  if (phoneNumber.startsWith('0')) {
    formattedPhone = '62' + phoneNumber.substring(1);
  } else if (!phoneNumber.startsWith('62')) {
    formattedPhone = '62' + phoneNumber;
  }
  // Minimal panjang nomor (contoh: 62 + 9 digit)
  if (formattedPhone.length < 11) {
    alert('Nomor WhatsApp tidak valid. Pastikan format contoh: 62812XXXXXXX');
    return;
  }
  
  // Get lembaga info
  const lembaga = lembagaData.find(l => l.id === student.lembaga);
  
  // Format tanggal singkat
  const tglSingkat = new Date(student.data.tanggalTes).toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'short'
  });
  
  // Pesan WhatsApp (SANGAT SINGKAT - tanpa maps, detail ada di PDF)
  const message = `*TES SPMB PONPES IC AT TAUHID*

NO TES: *${student.noTes}*
Nama: ${student.data.namaSiswa}

JADWAL:
${tglSingkat}, ${student.data.jamTes} WIB
${lembaga?.fullName || student.lembagaName}

TUGAS TES:
• Hafal QS An Najm 1-15
• Tes Matematika Dasar
• Wawancara ortu/wali

BAWA: Alat tulis
Datang 15 menit lebih awal

Download Kartu Peserta (lengkap dgn alamat & maps) via Admin.

_Panitia SPMB_`;
  
  // Encode message untuk URL
  const encodedMessage = encodeURIComponent(message);
  
  // Buka WhatsApp dengan pesan pre-filled (gunakan api.whatsapp.com untuk kompatibilitas luas)
  const urls = [
    `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`,
    `https://wa.me/${formattedPhone}?text=${encodedMessage}`
  ];
  // Coba buka di tab baru; jika diblokir, fallback ganti location saat ini
  const win = window.open(urls[0], '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    // Popup diblokir → fallback ke redirect langsung
    window.location.href = urls[0];
  }
};