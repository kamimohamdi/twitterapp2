import React from "react";
import LoadMessages from "@/components/modules/loading/loadingMessage/LoadMessage.js";
import NavBottom from "@/components/templates/mainSide/NavBottom";

function loading() {
  return (
    <>
      <LoadMessages />

      <NavBottom />
    </>
  );
}

export default loading;
