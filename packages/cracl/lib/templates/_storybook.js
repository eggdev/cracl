module.exports = `import React from 'react';

import {{filename}} from './{{filename}}';

export default {
  title: 'Components/{{filename}}',
  component: {{filename}},
};

const Template = (args) => <{{filename}} {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: '{{filename}}',
};
`;
