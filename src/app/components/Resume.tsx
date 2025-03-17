'use client'
import { useState, useEffect } from 'react'

export default function Resume({ url }: { url: string }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (!url) {
        return <div></div>
    }

    return (
        <>
            <div style={{ backgroundColor: 'white' }}>
                <div style={{ width: '100%', height: '100vh' }}>
                    <iframe
                        src={url + "#toolbar=0"}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Resume PDF"
                    >
                    </iframe>
                </div>
            </div>
            <DownloadPDF pdfUrl={url} />
        </>
    );
}

const DownloadPDF = ({ pdfUrl }: { pdfUrl: string }) => {
    const downloadFile = async () => {
        const response = await fetch(pdfUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'file.pdf';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return <div style={{ display: 'flex', justifyContent: 'center' }}><button className='fixed bottom-[10vh] bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.3)] text-black font-bold py-2 px-4 rounded shadow-md backdrop-blur-md' onClick={downloadFile}>Download PDF</button></div>;

};