/**
 * Author: Victoria Esko
 * Date: 31 May
 * 
 * This code is a React component that renders a tab panel. It takes in the following props: children, value, and index. The panel is hidden if the value prop is not equal to the index prop. When the value and index are the same, it displays the children prop wrapped inside a <Box> component from the Material-UI (MUI) library. The component is used to display tab interface.
 */

import React from "react";
import Box from "@mui/material/Box";

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabPanel;