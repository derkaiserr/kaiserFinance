import { useEffect, useState } from "react";

export default function  Loader() {
//   if (loading)
    // useEffect(() => setNav(false),[])
    return (
      <div className="abso bg-inherit flex h-[100vh] w-full justify-center items-center">
        <p className="loader"></p>
      </div>
    );
};
