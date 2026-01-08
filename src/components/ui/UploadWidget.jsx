import React from 'react';

export default function UploadWidget({ onUpload }) {
  return (
    <div className='p-4 border-2 border-dashed border-gray-300 rounded-lg'>
      <input type='file' onChange={(e) => onUpload && onUpload(e.target.files)} className='w-full' />
    </div>
  );
}


