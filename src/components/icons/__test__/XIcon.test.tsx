import React from 'react';
import { render } from '@testing-library/react-native';
import XIcon from '../XIcon';

describe('XIcon', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<XIcon />);
    expect(getByTestId('x-icon')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = render(<XIcon size={32} color="red" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
