'use client'
import "./ImageChanger.css"
import Spacing from "../Spacing/Spacing";
import { ChangeEvent, useState } from "react";

type ImageChangerProps = {
   onChange: (file: File) => void;
}

export default function ImageChanger ({ onChange }: ImageChangerProps) {
   const [newImage, setNewImage] = useState("");

   function handleImgUpload (event: ChangeEvent<HTMLInputElement>) {
      const file = event.target.files![0];
      if (!file) return;
      onChange(file);
      
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
         setNewImage(ev?.target?.result! as string);
      };
      fileReader.readAsDataURL(file);
   }

   return (
      <div className="profile-image-changer">
         <div className="info-label">
            <div className="text-xs fit">Click below to change picture</div>
         </div>
         <Spacing />
         <label htmlFor="file">
            {newImage ? (<>
               <div className="profile-image-viewer">
                  <img src={newImage} alt="profile-image" />
               </div>
            </>) : (<>
               <div className="no-image-selector">
                  Drag & Drop or Click to Select from your device
               </div>
            </>)}
            <input 
               type="file" name="file" id="file"
               onChange={handleImgUpload}
               accept=".jpg,.png"
            />
         </label>
      </div>
   )
}
