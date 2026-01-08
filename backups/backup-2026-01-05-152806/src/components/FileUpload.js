<<<<<<< HEAD
import React,{useState} from 'react';
=======
﻿import React,{useState} from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
export default function FileUpload({onUpload}){
  const [files,setFiles]=useState([]);
  const handleChange=e=>{
    const f=[...e.target.files];
    setFiles(f);
    if(onUpload) onUpload(f);
  };
  return(
    <div className='upload-box'>
      <input type='file' multiple onChange={handleChange}/>
      <ul>{files.map((f,i)=><li key={i}>{f.name}</li>)}</ul>
    </div>
  );
}



<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
