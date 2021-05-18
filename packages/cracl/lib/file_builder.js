const functionalComponents = (fileName) => `
import React from 'react';

const ${fileName} = () => {
  return (
    <div>
      <p>${fileName} Component</p>
    </div>
  )
};

export default ${fileName};
`;

const hooks = (fileName) => `
import React, { useState } from 'react';

const ${fileName} = () => {
  const [variable, setVariable] = useState();

  return {
    variable
  }
}

export default ${fileName};
`;

const tests = (fileName) => `
import React from 'react';
import { render } from '@testing-library/react';
import ${fileName} from './${fileName}';

const props = {};

describe('${fileName}', () => {
  it('should render ${fileName}', () => {
    render(<${fileName} {...props} />);
  });
});
`;

const index = (fileName) => `
import ${fileName} from './${fileName}';

export default ${fileName};

`;

exports.file_builder = (dir, fileName) => {
  switch (dir) {
    case "components":
    case "routes":
    case "pages":
      return functionalComponents(fileName);
    case "hooks":
      return hooks(fileName);
    case "tests":
      return tests(fileName);
    case "index":
      return index(fileName);
    default:
      break;
  }
};
