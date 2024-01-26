import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { CustomRender } from 'utils/helpers/testComponentsWrappers';
import { Title, BodyText } from 'components/general/Typography';
import { Icon } from 'components/general/Icon/Icon';

const onClickMock = jest.fn();

describe('Testing Title in Typography', () => {
  test('should render a title with text Testing title', () => {
    CustomRender(<Title>Testing title</Title>);

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Testing title');
  });

  test('should render a title with family DM Sans', () => {
    CustomRender(<Title font="DM Sans">Testing title</Title>);

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveStyle('font-family: DM Sans');
  });

  test('should render a title with size 24px', () => {
    CustomRender(<Title size="S">Testing title</Title>);

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveStyle('font-size: 24px');
  });

  test('should render a title with weight 700', () => {
    CustomRender(<Title fontWeight="B">Testing title</Title>);

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveStyle('font-weight: 700');
  });
});

describe('Testing BodyText in Typography', () => {
  test('should render a BodyText with text Testing bodytext', () => {
    CustomRender(
      <BodyText color="charcoal70" textType="bodyText" size="L" fontWeight="B">
        Testing bodytext
      </BodyText>
    );

    const bodytext = screen.getByRole('textbox');
    expect(bodytext).toBeInTheDocument();
    expect(bodytext).toHaveTextContent('Testing bodytext');
  });

  test('should render a BodyText with size L (18px)', () => {
    CustomRender(
      <BodyText color="charcoal70" textType="bodyText" size="L" fontWeight="R">
        Testing bodytext
      </BodyText>
    );

    const bodytext = screen.getByRole('textbox');
    expect(bodytext).toBeInTheDocument();
    expect(bodytext).toHaveStyle('font-size: 18px');
  });

  test('should render a BodyText with weight R (400)', () => {
    CustomRender(
      <BodyText color="charcoal70" textType="bodyText" size="L" fontWeight="R">
        Testing bodytext
      </BodyText>
    );

    const bodytext = screen.getByRole('textbox');
    expect(bodytext).toBeInTheDocument();
    expect(bodytext).toHaveStyle('font-weight: 400');
  });

  test('should render a BodyText with weight B (700)', () => {
    CustomRender(
      <BodyText color="charcoal70" textType="bodyText" size="L" fontWeight="B">
        Testing bodytext
      </BodyText>
    );

    const bodytext = screen.getByRole('textbox');
    expect(bodytext).toBeInTheDocument();
    expect(bodytext).toHaveStyle('font-weight: 700');
  });

  test('should render a BodyText and call onClick', () => {
    CustomRender(
      <BodyText color="charcoal70" textType="bodyText" size="L" fontWeight="B" onClick={onClickMock}>
        Testing bodytext
      </BodyText>
    );

    const bodytext = screen.getByRole('textbox');
    expect(bodytext).toBeInTheDocument();
    fireEvent.click(bodytext);
    expect(onClickMock).toHaveBeenCalled();
  });

  test('should render a BodyText and show cash Icon', () => {
    CustomRender(
      <BodyText color="charcoal70" textType="bodyText" size="L" fontWeight="B" icon={<Icon name="cash" size="small" color="orange" cursorPointer />}>
        Testing bodytext
      </BodyText>
    );

    const icon = screen.getByTestId('icon-cash');
    expect(icon).toBeInTheDocument();
  });

  test('should render a BodyText with text-align: end', () => {
    CustomRender(
      <BodyText color="charcoal70" textType="bodyText" size="L" fontWeight="B" textAlign="end">
        Testing bodytext
      </BodyText>
    );

    const bodytext = screen.getByRole('textbox');
    expect(bodytext).toBeInTheDocument();
    expect(bodytext).toHaveStyle('text-align: end');
  });

  test('should render a BodyText with display: inline', () => {
    CustomRender(
      <BodyText color="charcoal70" textType="bodyText" size="L" fontWeight="B" display="inline">
        Testing bodytext
      </BodyText>
    );

    const bodytext = screen.getByRole('textbox');
    expect(bodytext).toBeInTheDocument();
    expect(bodytext).toHaveStyle('display: inline');
  });

  test('should render a BodyText with margin-right: 5px', () => {
    CustomRender(
      <BodyText color="charcoal70" textType="bodyText" size="L" fontWeight="B" marginRight={5}>
        Testing bodytext
      </BodyText>
    );

    const bodytext = screen.getByRole('dialog');
    expect(bodytext).toBeInTheDocument();
    expect(bodytext).toHaveStyle('margin-right: 5px');
  });
});
