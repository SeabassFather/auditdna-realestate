<<<<<<< HEAD
import React from 'react';
=======
ï»¿import React from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export default function UploadWidget({ onUpload }) {
  return (
    <div className='p-4 border-2 border-dashed border-gray-300 rounded-lg'>
      <input type='file' onChange={(e) => onUpload && onUpload(e.target.files)} className='w-full' />
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

