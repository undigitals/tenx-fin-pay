import React, { KeyboardEvent, useRef } from 'react';
import { Form } from 'antd';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { SFields } from './DigitalCodeInput.styles';
import { IDigitalCodeInputProps } from './DigitalCodeInput.types';
import { defineValues, useInputValue } from './DigitalCodeInput.helper';
import { WrappedDigitalCodeInput } from './WrappedDigitalCodeInput/WrappedDigitalCodeInput';

export const DigitalCodeInput = ({ value = '', name, onChange, size = 5, separatorsAfter = [], borderRadius, isWrapped = false, showCaret = false }: IDigitalCodeInputProps) => {
  const initialValues = defineValues(name, size, value);
  const { inputValues, onHandleChange } = useInputValue(initialValues);

  const form = Form.useFormInstance();
  const numsRef = useRef<HTMLDivElement | null>(null);
  const listName = `list-${name}`;

  // @ts-ignore
  const fieldStatus = Form.Item.useStatus();
  const isError = fieldStatus.status === 'error';
  const isSuccess = fieldStatus.status === 'success';

  const getInputItem = (index: number | string) => numsRef.current?.querySelector(`#${name}-num-${index}`) as HTMLInputElement | null;

  const setFocusOnClosestEmptyInput = () => {
    const codeValues = form.getFieldValue(listName);
    const firstEmptyElemIndex = codeValues.findIndex((val: string) => !val);
    const nextInput = getInputItem(firstEmptyElemIndex);
    nextInput?.focus();
  };

  const onKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const currentIndex = Number(target.dataset?.index);
    const codeValues = form.getFieldValue(listName);
    const nextInput = getInputItem(currentIndex + 1);
    const regex = /\d|Backspace|Delete|Enter/;
    if (!regex.test(evt.key)) evt.preventDefault();

    if (target.value && evt.key !== 'Backspace' && evt.key !== 'ArrowLeft') {
      nextInput?.focus();
    }

    if (evt.key === 'Delete' || evt.key === 'Backspace') {
      codeValues[currentIndex] = '';
      onChange?.(codeValues.join(''));
    }
  };

  const onKeyUp = (evt: KeyboardEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const currentIndex = Number(target.dataset?.index);
    const codeValues = form.getFieldValue(listName);
    const prevInput = getInputItem(currentIndex - 1);

    codeValues[currentIndex] = target.value;
    onChange?.(codeValues.join(''));

    if (evt.key === 'Backspace' || evt.key === 'ArrowLeft') {
      prevInput?.focus();
    }

    evt.preventDefault();
  };

  const onPointerDown = (evt: React.PointerEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    if (!target.value) {
      setFocusOnClosestEmptyInput();
      evt.preventDefault();
    }
  };

  if (isWrapped) {
    return (
      <SFields ref={numsRef} isWrapped={isWrapped} showCaret={showCaret} className="SFields">
        <WrappedDigitalCodeInput
          listName={listName}
          name={name}
          initialValues={initialValues}
          separatorsAfter={separatorsAfter}
          size={size}
          borderRadius={borderRadius}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onPointerDown={onPointerDown}
          isError={isError}
          isSuccess={isSuccess}
          onHandleChange={onHandleChange}
          inputValues={inputValues}
        />
      </SFields>
    );
  }

  return (
    <SFields ref={numsRef} borderRadius={borderRadius} isWrapped={isWrapped}>
      <Form.List name={listName} initialValue={Object.values(initialValues)}>
        {(fields) =>
          fields.map((field, index) => (
            <React.Fragment key={field.key}>
              <Form.Item {...field} noStyle required validateTrigger={['onChange']}>
                <BaseInput
                  autoComplete="off"
                  data-index={index}
                  id={`${name}-num-${index}`}
                  data-testid={`${name}-num-${index}`}
                  maxLength={1}
                  minLength={1}
                  min={0}
                  max={9}
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onPointerDown={onPointerDown}
                  isError={isError}
                  isSuccess={isSuccess}
                  type="tel"
                  onChange={onHandleChange}
                  value={inputValues[`${name}-${index}`]}
                  inputMode="tel"
                />
              </Form.Item>
              {separatorsAfter?.includes(index) && <CustomText>-</CustomText>}
            </React.Fragment>
          ))
        }
      </Form.List>
    </SFields>
  );
};
