import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface MonthData {
  month: string;
  events: Array<{id: string, text: string}>;
  additionalNotes: string;
  eventCount: number;
}

export const generatePDF = async (monthsData: MonthData[]): Promise<void> => {
  // Create A4 landscape PDF
  const pdf = new jsPDF('l', 'mm', 'a4'); // 'l' for landscape
  const pageWidth = pdf.internal.pageSize.getWidth(); // ~297mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // ~210mm
  
  // Title
  pdf.setFontSize(20);
  pdf.setTextColor(60, 60, 60);
  pdf.text('Editable Yearly Planner', pageWidth / 2, 15, { align: 'center' });
  
  // Add date
  pdf.setFontSize(8);
  pdf.setTextColor(120, 120, 120);
  const currentDate = new Date().toLocaleDateString();
  pdf.text(`Generated on ${currentDate}`, pageWidth / 2, 20, { align: 'center' });

  // 4x3 grid layout for landscape
  const cardWidth = (pageWidth - 40) / 4; // 4 columns
  const cardHeight = (pageHeight - 50) / 3; // 3 rows
  const margin = 20;
  let currentY = 30;

  const monthColors = [
    [220, 20, 140],    // January - Pink
    [138, 43, 226],    // February - Purple  
    [60, 179, 113],    // March - Green
    [70, 130, 180],    // April - Light Blue
    [255, 215, 0],     // May - Yellow
    [220, 20, 140],    // June - Pink
    [220, 20, 140],    // July - Pink
    [138, 43, 226],    // August - Purple
    [60, 179, 113],    // September - Green
    [70, 130, 180],    // October - Light Blue
    [255, 215, 0],     // November - Yellow
    [220, 20, 140]     // December - Pink
  ];

  monthsData.forEach((monthData, index) => {
    const col = index % 4; // 4 columns
    const row = Math.floor(index / 4); // 3 rows
    
    const x = margin + col * (cardWidth + 5);
    const y = currentY + row * (cardHeight + 5);

    const color = monthColors[index];
    
    // Draw card background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(x, y, cardWidth, cardHeight, 'F');
    
    // Draw colored header
    pdf.setFillColor(color[0], color[1], color[2]);
    pdf.rect(x, y, cardWidth, 12, 'F');
    
    // Month name in header
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text(monthData.month, x + cardWidth / 2, y + 8, { align: 'center' });
    
    // Events content
    let contentY = y + 18;
    pdf.setFontSize(7);
    pdf.setTextColor(60, 60, 60);
    
    // Display imported events
    if (monthData.events.length > 0) {
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Events (${monthData.events.length}):`, x + 2, contentY);
      contentY += 4;
      
      pdf.setTextColor(60, 60, 60);
      monthData.events.forEach((event, eventIndex) => {
        if (contentY + 3 < y + cardHeight - 15) { // Check if we have space
          const eventText = pdf.splitTextToSize(event.text, cardWidth - 4);
          pdf.text(eventText[0], x + 2, contentY);
          contentY += 3;
        }
      });
      
      contentY += 2; // Add some space before notes
    }
    
    // Additional notes
    if (monthData.additionalNotes && contentY + 6 < y + cardHeight - 5) {
      pdf.setTextColor(100, 100, 100);
      pdf.text('Notes:', x + 2, contentY);
      contentY += 4;
      
      pdf.setTextColor(60, 60, 60);
      const noteLines = pdf.splitTextToSize(monthData.additionalNotes, cardWidth - 4);
      const maxNoteLines = Math.floor((y + cardHeight - contentY - 5) / 3);
      
      noteLines.slice(0, maxNoteLines).forEach((line: string) => {
        pdf.text(line, x + 2, contentY);
        contentY += 3;
      });
    }
    
    // Draw border
    pdf.setDrawColor(220, 220, 220);
    pdf.rect(x, y, cardWidth, cardHeight);
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