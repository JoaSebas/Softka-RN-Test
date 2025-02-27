import React from 'react';
import { render } from '@testing-library/react-native';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage Component', () => {
  it('should not render anything when there are no errors', () => {
    const { queryByTestId } = render(<ErrorMessage errors={[]} />);
    expect(queryByTestId('error-message')).toBeNull();
  });

  it('should render a single error message correctly', () => {
    const { getByText } = render(<ErrorMessage errors={['This is an error']} />);
    expect(getByText('This is an error')).toBeTruthy();
  });

  it('should render multiple error messages correctly', () => {
    const errors = ['Error 1', 'Error 2', 'Error 3'];
    const { getByText } = render(<ErrorMessage errors={errors} />);

    errors.forEach((error) => {
      expect(getByText(error)).toBeTruthy();
    });
  });
});
