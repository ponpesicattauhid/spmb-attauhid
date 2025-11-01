// Logo loader untuk menghandle file logo
// Import logo constants yang sudah dikonversi ke base64
import { LOGO_PONPES_ICT, LOGO_SMP_ATTAUHID, LOGO_SMA_ATTAUHID } from '../assets/logos/logoConstants';

export const LOGO_FILES = {
  ICT: LOGO_PONPES_ICT,
  SMP: LOGO_SMP_ATTAUHID,
  SMA: LOGO_SMA_ATTAUHID
};

// Fungsi untuk menambahkan logo dari konstanta ke PDF
export const addLogoFromFile = (doc: any, logoType: 'ICT' | 'SMP' | 'SMA', x: number, y: number, width: number = 24, height: number = 24) => {
  const logoData = LOGO_FILES[logoType];
  
  if (logoData.base64) {
    try {
      doc.addImage(logoData.base64, 'PNG', x, y, width, height);
    } catch (error) {
      console.warn('Failed to add logo, using placeholder');
      addLogoPlaceholder(doc, x + width/2, y + height/2, width/2, logoType);
    }
  } else {
    addLogoPlaceholder(doc, x + width/2, y + height/2, width/2, logoType);
  }
};

// Fungsi placeholder logo
const addLogoPlaceholder = (doc: any, centerX: number, centerY: number, radius: number, logoType: string = 'LOGO') => {
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1.5);
  doc.circle(centerX, centerY, radius);
  
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  
  if (logoType === 'ICT') {
    doc.text('PONPES', centerX, centerY - 2, { align: 'center' });
    doc.text('ICT', centerX, centerY + 2, { align: 'center' });
  } else if (logoType === 'SMP') {
    doc.text('SMP', centerX, centerY - 2, { align: 'center' });
    doc.text('AT-TAUHID', centerX, centerY + 2, { align: 'center' });
  } else if (logoType === 'SMA') {
    doc.text('SMA', centerX, centerY - 2, { align: 'center' });
    doc.text('AT-TAUHID', centerX, centerY + 2, { align: 'center' });
  } else {
    doc.text(logoType, centerX, centerY, { align: 'center' });
  }
};