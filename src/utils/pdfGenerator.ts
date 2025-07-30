import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface MonthData {
  month: string;
  text: string;
  eventCount: number;
}

export const generatePDF = async (monthsData: MonthData[]): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Title
  pdf.setFontSize(24);
  pdf.setTextColor(60, 60, 60);
  pdf.text('Annual Calendar Overview', pageWidth / 2, 20, { align: 'center' });
  
  // Add date
  pdf.setFontSize(10);
  pdf.setTextColor(120, 120, 120);
  const currentDate = new Date().toLocaleDateString();
  pdf.text(`Generated on ${currentDate}`, pageWidth / 2, 28, { align: 'center' });

  const monthColors = [
    [70, 130, 180],    // January - Steel Blue
    [220, 20, 60],     // February - Crimson
    [60, 179, 113],    // March - Medium Sea Green
    [255, 215, 0],     // April - Gold
    [138, 43, 226],    // May - Blue Violet
    [30, 144, 255],    // June - Dodger Blue
    [255, 69, 0],      // July - Red Orange
    [255, 140, 0],     // August - Dark Orange
    [148, 0, 211],     // September - Dark Violet
    [255, 99, 71],     // October - Tomato
    [72, 61, 139],     // November - Dark Slate Blue
    [220, 20, 60]      // December - Crimson
  ];

  const cardWidth = (pageWidth - 30) / 3; // 3 columns with margins
  const cardHeight = 45;
  const margin = 10;
  let currentY = 40;

  monthsData.forEach((monthData, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    
    const x = margin + col * (cardWidth + 5);
    const y = currentY + row * (cardHeight + 5);

    // Check if we need a new page
    if (y + cardHeight > pageHeight - 20) {
      pdf.addPage();
      currentY = 20;
      const newRow = 0;
      const newY = currentY + newRow * (cardHeight + 5);
    }

    const finalY = y;
    const color = monthColors[index];
    
    // Draw card background
    pdf.setFillColor(248, 249, 250);
    pdf.rect(x, finalY, cardWidth, cardHeight, 'F');
    
    // Draw colored header
    pdf.setFillColor(color[0], color[1], color[2]);
    pdf.rect(x, finalY, cardWidth, 8, 'F');
    
    // Month name in header
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.text(monthData.month.toUpperCase(), x + cardWidth / 2, finalY + 5.5, { align: 'center' });
    
    // Event count
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`${monthData.eventCount} events`, x + 2, finalY + 12);
    
    // Content text
    pdf.setFontSize(8);
    pdf.setTextColor(60, 60, 60);
    const lines = pdf.splitTextToSize(monthData.text || 'No custom text added', cardWidth - 4);
    
    // Limit lines to fit in card
    const maxLines = Math.floor((cardHeight - 15) / 3);
    const displayLines = lines.slice(0, maxLines);
    
    displayLines.forEach((line: string, lineIndex: number) => {
      pdf.text(line, x + 2, finalY + 18 + lineIndex * 3);
    });
    
    if (lines.length > maxLines) {
      pdf.setTextColor(150, 150, 150);
      pdf.text('...', x + cardWidth - 8, finalY + 18 + (maxLines - 1) * 3);
    }
    
    // Draw border
    pdf.setDrawColor(220, 220, 220);
    pdf.rect(x, finalY, cardWidth, cardHeight);
  });

  // Save the PDF
  pdf.save('calendar-overview.pdf');
};

export const generateAdvancedPDF = async (elementId: string): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20; // 10mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // Start position with 10mm top margin

    // Add first page
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20; // Subtract margins

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    pdf.save('calendar-overview.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};