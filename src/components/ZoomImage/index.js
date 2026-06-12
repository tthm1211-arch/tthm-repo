import React, {useState} from 'react';

export default function ZoomImage({src, alt}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        style={{cursor: 'zoom-in', maxWidth: '100%'}}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.85)',
            overflow: 'auto',            // 关键：滚动发生在这个遮罩层内部
            overscrollBehavior: 'contain', // 防止滚到头时带动底下页面
            cursor: 'zoom-out',
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              display: 'block',
              margin: '40px auto',
              maxWidth: 'none',          // 关键：不缩放，按原始尺寸显示
            }}
          />
        </div>
      )}
    </>
  );
}