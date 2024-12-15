import opencvLogo from './assets/opencv.svg'
import wasmLogo from './assets/WebAssembly_Logo.svg'
import './App.css'
import { useRef } from 'react';

declare const Module: {
    _malloc: (size: number) => number;
    _free: (ptr: number) => void;
    _meanColor: (ptr: number, width: number, height: number) => number;
    HEAPU8: Uint8Array;
}

function App() {

    const canvas = useRef<HTMLCanvasElement>(null);

    const start = async () => {
        if (!canvas.current) return;
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: 'environment'
            }
        });

        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.crossOrigin = 'anonymous';
        video.muted = true;
        video.playsInline = true;
        video.play();
        const ctx = canvas.current.getContext('2d');
        if (!ctx) return;

        await new Promise<void>((resolve) => {
            video.onloadedmetadata = () => {
                resolve();
            }
        })

        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.current.width = width;
        canvas.current.height = height;

        (function render() {
            requestAnimationFrame(render);
            ctx.drawImage(video, 0, 0, width, height);
            const ptr = Module._malloc(width * height * 4);
            const data = new Uint8Array(Module.HEAPU8.buffer, ptr, width * height * 4);
            const imgData = ctx.getImageData(0, 0, width, height);
            data.set(imgData.data);
            const meanColor = Module._meanColor(ptr, width, height);
            Module._free(ptr);

            const color = new Uint8Array(Module.HEAPU8.buffer, meanColor, 4);
            Module._free(meanColor);
            document.body.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
        })()
    }

    return (<>
        <div>
            <img src={wasmLogo} className="logo" alt="wasm logo" />
            <img src={opencvLogo} className="logo spin" alt="opencv logo" />
        </div>
        <h1>WebAssembly + OpenCV</h1>
        <div className="card">
            <canvas 
                ref={canvas}
            ></canvas>
        </div>
        <button onClick={start}>Start</button>
    </>)
}

export default App
