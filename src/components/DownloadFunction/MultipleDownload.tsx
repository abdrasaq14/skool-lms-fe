import{ useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function MultiplePDFDownloadButton({ applicationIds }: { applicationIds: string[] }) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleDownload = async () => {
        // Download PDFs for selected items
        for (const appId of selectedItems) {
            try {
                const response = await axios.get(`http://localhost:3000/download-pdf/${appId}`, {
                    responseType: 'text',
                });
                const htmlContent = response.data;

                // Generate PDF for each item
                generatePDF(htmlContent);
            } catch (error) {
                console.error('Error downloading PDF for application ID:', appId, error);
            }
        }
    };

    const generatePDF = async (htmlContent: string) => {
        try {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            document.body.appendChild(tempDiv);

            const canvas = await html2canvas(tempDiv);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('download.pdf');

            document.body.removeChild(tempDiv);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const handleSelectItem = (appId: string) => {
        const index = selectedItems.indexOf(appId);
        if (index === -1) {
            setSelectedItems([...selectedItems, appId]);
        } else {
            const updatedSelection = [...selectedItems];
            updatedSelection.splice(index, 1);
            setSelectedItems(updatedSelection);
        }
    };

    const handleDelete = async () => {
        // Perform deletion for selected items
        for (const appId of selectedItems) {
            try {
                // Perform deletion API call here
                console.log('Deleting application with ID:', appId);
            } catch (error) {
                console.error('Error deleting application ID:', appId, error);
            }
        }
    };

    return (
        <div>
            <button onClick={handleDownload}>Download Selected</button>
            <button onClick={handleDelete}>Delete Selected</button>
            {applicationIds.map((appId) => (
                <div key={appId}>
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(appId)}
                        onChange={() => handleSelectItem(appId)}
                    />
                    <span>{appId}</span>
                </div>
            ))}
        </div>
    );
}
