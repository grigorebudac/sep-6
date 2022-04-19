import React from "react";
import { Provider } from "react-redux";
import { ThemeContainer } from "./ThemeContainer";

import store from "redux/store";

const AppContainer: React.FC = (props) => {
  return (
    <Provider store={store}>
      <ThemeContainer>{props.children}</ThemeContainer>
    </Provider>
  );
};

export default AppContainer;
