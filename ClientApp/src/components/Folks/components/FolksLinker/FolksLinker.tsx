import React from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "antd";

import "./FolksLinker.scss";

export const FolksLinker: React.FC = () => {
  const history = useHistory();

  const goFolks = () => {
    history.push("/folks");
  };

  const goCookie = () => {
    history.push("/cookie");
  };

  const goGDPR = () => {
    history.push("/gdpr");
  };

  const goTOS = () => {
    history.push("/tos");
  };

  const goAbout = () => {
    history.push("/about");
  };

  return (
    <Typography id="folks-linker">
      <div>
        <a onClick={goAbout}>about</a> | <a onClick={goTOS}>terms of service</a>{" "}
        | <a onClick={goCookie}>cookie policy</a> | <a onClick={goGDPR}>gdpr</a>
      </div>
      <div>
        <span className="made-by">Made by these </span>{" "}
        <span className="cool-folks" onClick={goFolks}>
          community-minded folks
        </span>{" "}
        💛
      </div>
    </Typography>
  );
};
