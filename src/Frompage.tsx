import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import FromDetail from "./From";
const Frompage = () => {
  const { t } = useTranslation();
  return (
    <div className="h100vh  d-flex align-item-center">
      <div className="bordercard  mx-auto my-auto">
        <FromDetail></FromDetail>
      </div>

      
    </div>
  );
};

export default Frompage;
