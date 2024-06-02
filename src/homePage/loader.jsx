import { useEffect, useState } from "react";

export default function  Loader() {
//   if (loading)
    // useEffect(() => setNav(false),[])
    return (
      <div className="absolute z-[300] bg-inherit flex h-full w-full justify-center items-center">
        <p className="loader"></p>
      </div>
    );
};
