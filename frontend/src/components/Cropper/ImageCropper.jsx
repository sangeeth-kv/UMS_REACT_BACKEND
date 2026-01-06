import Cropper from "react-easy-crop";
import { useState } from "react";
import { X, RotateCcw, ZoomIn } from "lucide-react";

export default function ImageCropper({ image, onClose, onSave,shape="square" }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleSave = () => {
    console.log("called!")
    onSave({ croppedAreaPixels, rotation });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[420px] rounded-xl bg-white dark:bg-gray-900 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Crop Image
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        {/* Cropper */}
        <div className="relative h-72 bg-gray-100 dark:bg-gray-800">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape={shape}   // 🔥 remove if you want square
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="px-4 py-4 space-y-3">
          
          {/* Zoom */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <ZoomIn size={16} /> Zoom
            </label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Rotation */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <RotateCcw size={16} /> Rotate
            </label>
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={(e) => setRotation(e.target.value)}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-4 py-3 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
