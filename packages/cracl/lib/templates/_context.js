module.exports = `import React from "react";

const {{filename}}Context = React.createContext();

function {{filename}}Provider(props) {
  return (
    <>
      <>{props.children}</>
    </>
  );
}

function use{{filename}}() {
  const context = React.useContext({{filename}}Context);
  if (context === undefined) {
    throw new Error('use{{filename}} must be used within a {{filename}}Provider');
  }
  return context;
}

export { {{filename}}Context, {{filename}}Provider, use{{filename}} };
`;
