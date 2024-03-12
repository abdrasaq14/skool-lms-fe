// import axios from 'axios';

// export default function PDFDownloadButton() {
//     const handleDownload = async () => {
//         try {
//           const response = await axios.get('http://localhost:3000/download-pdf', {
//             responseType: 'blob',
//           });
//           console.log(response);
//           const url = window.URL.createObjectURL(new Blob([response.data]));
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = 'download.pdf';
//           document.body.appendChild(a);
//           a.click();
//           window.URL.revokeObjectURL(url);
//           document.body.removeChild(a);
//         } catch (error) {
//           console.error('Error downloading PDF:', error);
//         }
//       };

//   return (
//     <svg
//     className="w-6 h-6 text-gray-800 dark:text-white"
//     aria-hidden="true"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     onClick={handleDownload}
//   >
//     <path
//       stroke="currentColor"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       stroke-width="2"
//       d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
//     />
//   </svg>
//   );
// }


import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PDFDownloadButton({ applicationId }: { applicationId: string }) {
    // const handleDownload = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/download-pdf', {
    //             responseType: 'blob',
    //         });
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = 'download.pdf';
    //         document.body.appendChild(a);
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //         document.body.removeChild(a);
    //     } catch (error) {
    //         console.error('Error downloading PDF:', error);
    //     }
    // };

    const handleDownload = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/download-pdf/${applicationId}`, {
          responseType: 'text',
        });
        const htmlContent = response.data;
  
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);
  
        html2canvas(tempDiv)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('download.pdf');
  
            document.body.removeChild(tempDiv);
          })
          .catch((error) => {
            console.error('Error creating PDF:', error);
            document.body.removeChild(tempDiv);
          });
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    };

    return (
        <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            onClick={handleDownload}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
            />
        </svg>
    );
}




