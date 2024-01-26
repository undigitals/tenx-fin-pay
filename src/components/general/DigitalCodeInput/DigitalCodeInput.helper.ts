import { useState } from 'react';

export interface IValues {
  [key: string]: string;
}

export const defineValues = (name: string | undefined, size: number, value: string) => {
  const values: IValues = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < size; i++) {
    values[`${name || 'field'}-${i}`] = value[i] || '';
  }
  return values;
};

export const useInputValue = (initState: IValues) => {
  const [inputValues, setInputValues] = useState(initState);

  const onHandleChange = (event: { target: HTMLInputElement }) => {
    const { name, value, dataset } = event.target;
    setInputValues((prevState) => ({ ...prevState, [`${name}-${dataset.index}`]: value }));
  };

  return {
    inputValues,
    onHandleChange,
  };
};

export const splitIndexesToArray = (separatorsAfter: number[], size: number) => {
  const result = [];
  let startIndex = 0;
  let id = 1;

  for (let i = 0; i < separatorsAfter.length; i++) {
    const endIndex = separatorsAfter[i];

    if (endIndex > size) {
      break;
    }

    const subArray = [];
    for (let j = startIndex; j <= endIndex; j++) {
      subArray.push(j);
    }

    result.push({ id, items: subArray });
    startIndex = endIndex + 1;
    id += 1;
  }

  if (startIndex < size) {
    const subArray = [];
    for (let j = startIndex; j < size; j++) {
      subArray.push(j);
    }

    result.push({ id, items: subArray });
  }

  return result;
};
