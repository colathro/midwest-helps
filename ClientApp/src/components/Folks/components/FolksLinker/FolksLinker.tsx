import React from "react";
import { useHistory } from "react-router-dom";

import "./FolksLinker.scss";

export const FolksLinker: React.FC = () => {
  const history = useHistory();

  const goFolks = () => {
    history.push("/folks");
  };

  return <div></div>;
};
