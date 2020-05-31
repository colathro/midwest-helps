/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { Admin } from "./components/Admin";
import { Contact } from "./components/Contact";
import { DonationStatus } from "./components/DonationStatus";
import { List } from "./components/List";
import { About } from "./components/About";
import { Masks } from "./components/Masks";
import { Folks } from "./components/Folks";
import { Resources } from "./components/Resources";
import { MaskRequest } from "./components/MaskRequest";
import { Covid19 } from "./components/Covid19";
import { PrivateRoute } from "./components/AdminLogin/PrivateRoute";
import DocumentTitle from "react-document-title";

import "./App.scss";

const { Content } = Layout;

export const App: React.FC = () => (
  <Layout>
    <DocumentTitle title="Midwest Helps - Make a Difference" />
    <Content className="main-content">
      <Switch>
        <PrivateRoute path="/admin" component={Admin} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/folks" component={Folks} />
        <Route exact path="/resources" component={Resources} />
        <Route exact path="/about" component={About} />
        <Route exact path="/maskRequest" component={MaskRequest} />
        <Route exact path="/list" component={List} />
        <Route exact path="/covid19" component={Covid19} />
        <Route exact path="/donationStatus" component={DonationStatus} />
        <Route path="/" component={Masks} />
      </Switch>
    </Content>
  </Layout>
);
