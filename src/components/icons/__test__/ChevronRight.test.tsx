import React from 'react';
import { render } from '@testing-library/react-native';
import ChevronRight from '../ChevronRight';

describe('ChevronRight Icon', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<ChevronRight />);
    expect(getByTestId('chevron-right-icon')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = render(<ChevronRight size={32} color="red" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
