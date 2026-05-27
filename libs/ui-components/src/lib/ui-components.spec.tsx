import { render } from '@testing-library/react';

import OrgUiComponents from './ui-components';

describe('OrgUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrgUiComponents />);
    expect(baseElement).toBeTruthy();
  });
});
