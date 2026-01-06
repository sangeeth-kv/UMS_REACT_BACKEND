function AvatarUploadingPreview({ src }) {
  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden">
      
      {/* Blurred image */}
      <img
        src={src}
        alt="Uploading"
        className="w-full h-full object-cover blur-sm scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <span className="text-white text-xs font-medium">
          Uploading…
        </span>
      </div>

    </div>
  );
}

export default AvatarUploadingPreview;
