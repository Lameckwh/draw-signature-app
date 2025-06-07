import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

function App() {
  const sigCanvas = useRef(null);
  const [penWidth, setPenWidth] = useState(2.5);

  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const save = () => {
    if (!sigCanvas.current) return;
    if (sigCanvas.current.isEmpty()) return;

    // Use getCanvas since getTrimmedCanvas is broken in 1.1.0-alpha.2
    const sourceCanvas = sigCanvas.current.getCanvas();
    const scale = 2;
    const width = sourceCanvas.width * scale;
    const height = sourceCanvas.height * scale;

    // Create export canvas
    const exportC = document.createElement('canvas');
    exportC.width = width;
    exportC.height = height;
    const ctx = exportC.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Clear the export canvas with transparent background
    ctx.clearRect(0, 0, width, height);

    // Draw the source canvas onto the export canvas
    ctx.drawImage(sourceCanvas, 0, 0, width, height);

    // Remove white background by setting white pixels to transparent
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (r === 255 && g === 255 && b === 255 && a === 255) {
        data[i + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    // Generate Data URL
    const dataURL = exportC.toDataURL('image/png');

    // Trigger download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `signature_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <Analytics />
      <SpeedInsights />
      <h1>Signature Generator</h1>
      <div style={{ marginBottom: 10 }}>
        <label htmlFor="penWidth">Pen Width: </label>
        <input
          id="penWidth"
          type="range"
          min={0.5}
          max={10}
          step={0.1}
          value={penWidth}
          onChange={e => setPenWidth(Number(e.target.value))}
        />
        <span style={{ marginLeft: 8 }}>{penWidth}</span>
      </div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        minWidth={penWidth}
        maxWidth={penWidth}
        canvasProps={{
          width: window.innerWidth < 800 ? window.innerWidth * 0.95 : 700,
          height: window.innerWidth < 500 ? 120 : window.innerWidth < 800 ? 160 : 200,
          className: 'sigCanvas',
          style: {
            touchAction: 'none',
            width: '100%',
            maxWidth: '700px',
            height: window.innerWidth < 500 ? '120px' : window.innerWidth < 800 ? '160px' : '200px',
            display: 'block',
          }
        }}
        backgroundColor="#fff"
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={clear}>Clear</button>
        <button onClick={save} style={{ marginLeft: 10 }}>Save</button>
      </div>
      <footer style={{ marginTop: 40, textAlign: 'center', color: '#888', fontSize: '0.95rem' }}>
        &copy; {new Date().getFullYear()} Lameck-dev
      </footer>
    </div>
  );
}

export default App;