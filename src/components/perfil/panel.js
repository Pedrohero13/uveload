import { useEffect, useState } from "react";
import Archivos from "./archivos";
import NavUser from "./navUser";
import Nuevo from "./nuevo";
export default function Panel(props) {
  const { user } = props;
  

  return (

    <div>
      <NavUser user={user}></NavUser>
    </div>


  )
}

