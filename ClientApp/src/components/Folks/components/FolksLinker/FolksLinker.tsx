import React from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "antd";

import "./FolksLinker.scss";

export const FolksLinker: React.FC = () => {
  const history = useHistory();

  const goFolks = () => {
    history.push("/folks");
  };

  return (
    <Typography id="folks-linker">
      <span className="made-by">Made by these </span>{" "}
      <span className="cool-folks" onClick={goFolks}>
        community-minded folks
      </span>{" "}
      💛
    </Typography>
  );
};
