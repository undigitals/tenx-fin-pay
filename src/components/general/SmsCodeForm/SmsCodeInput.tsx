import React, { KeyboardEvent, useRef, useEffect } from 'react';
import { Form } from 'antd';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { SFields, SInputNumber } from './SmsCodeForm.styles';
import { ISmsCodeInputProps } from './SmsCodeForm.types';

export const SmsCodeInput: React.FC<ISmsCodeInputProps> = ({ value = '', name, onChange, size = 5, separatorsAfter = [], placeholder = '', isCompleted = false, isWrongCode = false }) => {
  const valArr = value?.split?.('') ?? [];
  const emptySize = size - valArr.length;
  const codeItems = [...valArr, ...new Array(emptySize).fill(null)];
  const form = Form.useFormInstance();
  const numsRef = useRef<HTMLDivElement>(null);
  const listName = `list-${name}`;

  // @ts-ignore
  const fieldStatus = Form.Item.useStatus();
  const isError = fieldStatus?.status === 'error';

  const getInputItem = (index: number | string) => numsRef.current?.querySelector(`#${name}-num-${index}`) as HTMLInputElement | null;

  const onKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const currentIndex = Number(target.dataset?.index);
    const nextInput = getInputItem(currentIndex + 1);
    const regex = /\d|Backspace|Delete|Enter/;
    if (!regex.test(evt.key)) evt.preventDefault();

    if (target.value && evt.key !== 'Backspace') {
      nextInput?.focus();
    }
  };

  const onKeyUp = (evt: KeyboardEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const currentIndex = Number(target.dataset?.index);
    const codeValues = form.getFieldValue(listName);
    const prevInput = getInputItem(currentIndex - 1);
    const nextInput = getInputItem(currentIndex + 1);

    codeValues[currentIndex] = target.value;
    onChange?.(codeValues.join(''));

    if (evt.key === 'Backspace') {
      prevInput?.focus();
    }

    if (evt.key === 'Delete' || (target.value && !nextInput?.value)) {
      nextInput?.focus();
    }

    evt.preventDefault();
  };

  useEffect(() => {
    const firstInput = getInputItem(0);
    firstInput?.focus();
  }, []);

  return (
    <SFields ref={numsRef}>
      <Form.List name={listName} initialValue={codeItems}>
        {(fields) =>
          fields.map((field, index) => (
            <>
              <Form.Item {...field} noStyle required validateTrigger={['onChange']}>
                <SInputNumber
                  autoComplete="off"
                  data-index={index}
                  id={`${name}-num-${index}`}
                  data-testid={`${name}-num-${index}`}
                  maxLength={size}
                  minLength={1}
                  min={0}
                  max={9}
                  inputTheme="sms-code"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  isError={isError || isWrongCode}
                  type="tel"
                  stringMode
                  placeholder={placeholder}
                  isCompleted={isCompleted}
                  isWrongCode={isWrongCode}
                />
              </Form.Item>
              {separatorsAfter?.includes(index) && <CustomText>-</CustomText>}
            </>
          ))
        }
      </Form.List>
    </SFields>
  );
};
