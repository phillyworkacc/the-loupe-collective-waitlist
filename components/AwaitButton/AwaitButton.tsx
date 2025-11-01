'use client'
import { wait } from "@/utils/wait";
import { CSSProperties, useState } from "react";
import { CustomSpinner } from "../Spinner/Spinner";

type AwaitButtonProps = {
   className: string;
   styles?: CSSProperties;
   onClick: Function;
   children: React.ReactNode;
   waitTime?: number;
   afterRunFunction?: Function;
   blackSpinner?: boolean;
}

export default function AwaitButton ({ children, onClick, className, waitTime = 0.4, afterRunFunction, blackSpinner, styles }: AwaitButtonProps) {
   const [loadingState, setLoadingState] = useState(false);

   const callback = () => setLoadingState(false);

   const clickBtn = async () => {
      setLoadingState(true);
      await wait(waitTime);
      onClick(callback);
      if (afterRunFunction) afterRunFunction();
      return;
   }
   return (
      <button className={className} onClick={clickBtn} disabled={loadingState} style={styles}>
         {loadingState ? <>
            <CustomSpinner color={blackSpinner ? 'black' : 'white'} size={16} /> {children}
         </> : children}
      </button>
   )
}
