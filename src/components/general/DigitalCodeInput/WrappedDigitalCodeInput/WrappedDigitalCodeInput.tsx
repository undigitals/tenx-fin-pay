import React, { KeyboardEvent, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Form } from 'antd';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { splitIndexesToArray, IValues } from 'components/general/DigitalCodeInput/DigitalCodeInput.helper';
import { SCodesBlock } from './WrappedDigitalCodeInput.styles';

interface IWrappedDigitalCodeInputProps {
  listName: string;
  name?: string;
  initialValues: any;
  separatorsAfter: number[];
  size: number;
  borderRadius?: string;
  onKeyDown: (evt: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp: (evt: KeyboardEvent<HTMLInputElement>) => void;
  onPointerDown: (evt: React.PointerEvent<HTMLInputElement>) => void;
  isError: boolean;
  isSuccess: boolean;
  onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValues: IValues;
}

interface ICodesBlocks {
  id: number;
  items: number[];
}

export const WrappedDigitalCodeInput: React.FC<IWrappedDigitalCodeInputProps> = ({
  listName,
  name,
  initialValues,
  separatorsAfter,
  size,
  borderRadius = '20px',
  onKeyDown,
  onKeyUp,
  onPointerDown,
  isError,
  isSuccess,
  onHandleChange,
  inputValues,
}) => {
  const form = Form.useFormInstance();
  const codesBlocks = useMemo(() => splitIndexesToArray(separatorsAfter, size), [separatorsAfter, size]);
  const getCodesBlocksItems = (items: ICodesBlocks[]) => items.map((item: ICodesBlocks) => item.items.length);
  const codesBlocksItemsLength = useMemo(() => getCodesBlocksItems(codesBlocks), [codesBlocks]);
  const [focusedBlockIndex, setFocusedBlockIndex] = useState<null | number>(null);

  const getCodesBlocksStatus = (index: number) => {
    if (index === 0) {
      return !form.getFieldValue(listName).slice(0, codesBlocksItemsLength[index]).includes('');
    }

    let currentIndex = 0;
    const separatedCodesBlocksField = codesBlocksItemsLength.map((codesBlockLength: number) => {
      const codesBlocksSubArray = form.getFieldValue(listName).slice(currentIndex, currentIndex + codesBlockLength);
      currentIndex += codesBlockLength;
      return codesBlocksSubArray;
    });

    return !separatedCodesBlocksField[index].includes('');
  };

  return (
    <Form.List name={listName} initialValue={Object.values(initialValues)}>
      {(fields) =>
        codesBlocks.map((codesBlock, codesIndex) => (
          <React.Fragment key={codesBlock.id}>
            {codesIndex > 0 && <CustomText>-</CustomText>}
            <SCodesBlock className={clsx({ success: getCodesBlocksStatus(codesIndex), error: isError, focused: focusedBlockIndex === codesIndex })} borderRadius={borderRadius}>
              {codesBlock.items.map((index) => (
                <Form.Item {...fields[index]} noStyle required validateTrigger={['onChange']}>
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
                    onBlur={() => setFocusedBlockIndex(null)}
                    onFocus={() => setFocusedBlockIndex(codesIndex)}
                    onPointerDown={onPointerDown}
                    isError={isError}
                    isSuccess={isSuccess}
                    type="tel"
                    onChange={onHandleChange}
                    value={inputValues[`${name}-${index}`]}
                    inputMode="tel"
                  />
                </Form.Item>
              ))}
            </SCodesBlock>
          </React.Fragment>
        ))
      }
    </Form.List>
  );
};
