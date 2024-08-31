import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProfileData } from "@/app/types/profiletype";
import { formatDateTime } from '@/app/utils/dateUtils';

export const Uri_generatePdf = (data: [string, { result: string; remark: string }][], profileData: ProfileData) => {
  const doc = new jsPDF();

  const formattedTime = formatDateTime(new Date(profileData.reportDate), 'medium');


  // Company Information
  const imgWidth = 35; // Adjusted width for better fit
  const imgHeight = 30; // Adjusted height for better fit
  const imagePath = "/image/logo.PNG";
  const x = (doc.internal.pageSize.width - imgWidth) / 2;
  const y = 5; // Decreased y-position for better spacing

  doc.setFontSize(12);
  doc.addImage(imagePath, 'JPEG', 10, y, imgWidth, imgHeight);

  // Set font size and style for the main title
doc.setFontSize(22);
doc.setFont("helvetica", "bold");
doc.text('ULTRAHEALTH BIOMEDICAL', 120, 20, { align: 'center' });

// Set font size and style for the subtitle
doc.setFontSize(16);
doc.setFont("helvetica", "normal");
doc.text('ENGINEERING PLC', 120, 30, { align: 'center' });
  
  // Profile Information in 3 columns
  const profileStartY = y + imgHeight + 10; // Increased spacing between image and profile information
  const leftColumnX = 10;
  const middleColumnX = 75; // Position for the middle column
  const rightColumnX = 140; // Position for the right column

  doc.setFontSize(10); // Reduced font size for better fit

  doc.text(`Patient Name: ${profileData.clientName}`, leftColumnX, profileStartY);
  doc.text(`Location: ${profileData.location}`, middleColumnX, profileStartY);
  doc.text(`Phone Number: ${profileData.phoneNumber}`, rightColumnX, profileStartY);

  doc.text(`MRN: ${profileData.MRN}`, leftColumnX, profileStartY + 5);
  doc.text(`Sex: ${profileData.sex}`, middleColumnX, profileStartY + 5);
  doc.text(`Sample ID: ${profileData.SampleId}`, rightColumnX, profileStartY + 5);

  doc.text(`CRN: ${profileData.CRN}`, leftColumnX, profileStartY + 10);
  doc.text(`Age: ${profileData.age}`, middleColumnX, profileStartY + 10);
  doc.text(`Report Date: ${formattedTime}`, rightColumnX, profileStartY + 10);

   // Line below profile information
   doc.setDrawColor(139, 103, 60);
   doc.setLineWidth(2.5);
   doc.line(10, profileStartY + 14, 200, profileStartY + 14);
   doc.setDrawColor(29, 184, 205);
   doc.setLineWidth(1.3);
   doc.line(10, profileStartY + 17, 200, profileStartY + 17);
  // Add "Urinalysis" title
  doc.setFontSize(14);
  doc.text('Urinalysis', 10, profileStartY + 22);

  // First Table: URI and URINegItems
  const firstTableColumns = ["Test Name", "Result", "Ref.Range"];
  const firstTableRows = [
    ["Color", "", "Yellow"],
    ["Appearance", "", "Clear"],
    ["Specific Gravity", "", "1.005-1.030"],
    ["PH", "", "5-8"],
    ["Protein", "", "Negative"],
    ["Glucose", "", "Negative"],
    ["Bilirubin", "", "Negative"],
    ["Urobilinogen", "", "Normal"],
    ["Nitrite", "", "Negative"],
    ["Ketone", "", "Negative"],
    ["Blood", "", "Negative"],
    ["Leukocyte", "", "Negative"],
    ["HCG", "", "Negative"],
  ];

  // Populate first table rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = firstTableRows.find(r => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark; // Adjusted index for Remark column
    }
  });

  const filteredFirstTableRows = firstTableRows.filter(row => row[1] !== "");

  // Generate the first table only if there are filtered rows
  let finalY = profileStartY + 25; // Initial Y position for the first table
  if (filteredFirstTableRows.length > 0) {
    autoTable(doc, {
      startY: finalY, // Adjust to position table below the profile information
      head: [firstTableColumns],
      body: filteredFirstTableRows,
      styles: { fontSize: 8 } // Set the font size for table content
    });
    finalY = (doc as any).lastAutoTable.finalY; // Update finalY after table generation
  }

  // Second Table: Microscopy and MicroscopyNegItems
  const secondTableColumns = ["Test Name", "Result", "Ref.Range"];
  const secondTableRows = [
    ["WBC", "", "0-4/HPF"],
    ["RBC", "", "1-3/HPF"],
    ["Epithelial", "", "2-4 LPF"],
    ["WBC cast", "", "Negative"],
    ["RBC cast", "", "Negative"],
    ["Granular cast", "", "Negative"],
    ["Hyaline cast", "", "Negative"],
    ["Cal-Oxalet", "", "Negative"],
    ["Cystal", "", "Negative"],
    ["Bacteria", "", "Negative"],
    ["Parasite", "", "Negative"],
  ];

  // Populate second table rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = secondTableRows.find(r => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark; // Adjusted index for Remark column
    }
  });

  const filteredSecondTableRows = secondTableRows.filter(row => row[1] !== "");

  // Generate the second table only if there are filtered rows
  if (filteredSecondTableRows.length > 0) {
    autoTable(doc, {
      startY: finalY + 5, // Position below the first table
      head: [secondTableColumns],
      body: filteredSecondTableRows,
      styles: { fontSize: 8 } // Set the font size for table content
    });
    finalY = (doc as any).lastAutoTable.finalY; // Update finalY after table generation
  }

  // Recommendation Section
  const recommendation = data.find(([item]) => item === 'Recommendation')?.[1].result || '';
  if (recommendation) {
    doc.setFontSize(12);
    doc.text(`Recommendation: ${recommendation}`, 10, finalY + 5 ,{ maxWidth: 193 });
  }
  // Add footer
  const addFooter = () => {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      const authorized = "Result Authorized By: TILIKSEW MENGESHA";
      const footerTitle = "Address";
      const footerEmail = "Email";
      const footerTele = "Tel";
      const footerAddress = "Kazanchis, Addis Ababa, Ethiopia\nBehind Kazanchis Police Station";
      const footerMail = "P.O. Box: 6744\nethio.med.clinic@gmail.com";
      const footerTel = "0115526928\n0993928749";

      // Ensure the footer doesn't overlap with content
      const footerY = doc.internal.pageSize.height - 15;
      doc.setLineWidth(0.7);

      doc.setDrawColor(139, 103, 60);
      
      doc.line(10, footerY - 6, 200, footerY - 6);
      doc.setDrawColor(29, 184, 205);
      doc.line(10, footerY - 5, 200, footerY - 5);


      doc.setFontSize(10);
      doc.text(authorized, 10, footerY - 7);
      doc.text(footerTitle, 10, footerY);
      doc.text(footerEmail, 80, footerY);
      doc.text(footerTele, 160, footerY);
      doc.text(footerAddress, 10, footerY + 5);
      doc.text(footerMail, 80, footerY + 5);
      doc.text(footerTel, 160, footerY + 5);
    }
  };

  addFooter();

   // Save the PDF
   const pdfBlob = doc.output('blob');

   // Create a new window for the PDF and trigger print dialog
   const pdfUrl = URL.createObjectURL(pdfBlob);
   const printWindow = window.open(pdfUrl, '_blank');
   if (printWindow) {
     printWindow.onload = () => {
       printWindow.print();
       URL.revokeObjectURL(pdfUrl); // Clean up the URL object
     };
   }
 

  // Save the PDF
  doc.save(`${profileData.clientName}.pdf`);
};
