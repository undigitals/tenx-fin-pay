import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { CustomRender } from 'utils/helpers/testComponentsWrappers';
import { Chip } from './Chip';

describe('Chip working test', () => {
  test('Should render a Chip in document', () => {
    render(<Chip data-testid="custom-chip">Custom Chip</Chip>);

    expect(screen.getByTestId(/custom-chip/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Chip/i)).toBeInTheDocument();
  });

  test('Should getting click event and returned a value', () => {
    let newValue = '';

    const onClick = jest.fn((value: string) => {
      newValue = value;
    });

    CustomRender(
      <Chip preset="cream" data-testid="custom-chip" value="es" onChipClick={onClick}>
        Custom Chip
      </Chip>
    );

    fireEvent.click(screen.getByTestId(/custom-chip/i));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(newValue).toContain('es');
  });

  test('Should getting isActive event', () => {
    CustomRender(
      <>
        <Chip preset="cream" data-testid="custom-chip-not-active">
          Cream Chip
        </Chip>

        <Chip preset="cream" data-testid="custom-chip-active" isActive>
          Cream Chip
        </Chip>
      </>
    );

    const chipElement = screen.getByTestId(/custom-chip-not-active/i);
    const chipElementIsActive = screen.getByTestId(/custom-chip-active/i);

    expect(screen.getByTestId(/custom-chip-not-active/i)).toBeInTheDocument();
    expect(screen.getByTestId(/custom-chip-active/i)).toBeInTheDocument();
    expect(chipElement.className === chipElementIsActive.className).not.toBeTruthy();
  });
});
