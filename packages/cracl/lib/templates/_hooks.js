module.exports = `import React from 'react';

const {{filename}} = () => {
  const [variable, setVariable] = useState();

  return {
    variable,
    setVariable
  }
};

export default {{filename}};
`;
