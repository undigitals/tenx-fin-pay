import React, { useEffect, useRef } from 'react';
import assert from 'assert';
import { AmountInput, TAmountInputHandler, TAmountInputOptions } from './AmountInput';
import { SAmountInput } from './AmountInputComponent.styles';

/*
 * Rename onInput to onChange so that antd validator can connect to this component.
 * I don't believe that this callback should be named onChange in AmountInput as well,
 * because in real DOM onInput and onChange are actually two very different things;
 * just because the React team didn't bother to follow the existing DOM standard
 * doesn't make it less so.
 */
export type IAmountInputComponentProps = Omit<TAmountInputOptions, 'onInput'> & {
  wrapperClassName?: string;
  onChange?: TAmountInputHandler | null;
};

export const AmountInputComponent = ({ wrapperClassName, ...options }: IAmountInputComponentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<AmountInput | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    assert(containerRef.current !== null);
    inputRef.current = new AmountInput(containerRef.current, {
      ...options,
      onInput: options.onChange,
    });
    inputRef.current.mount();
    return () => inputRef.current?.unmount();
    // this ignore is intentional, because we don't want to recreate the input every time the options change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(inputRef.current !== null);
      inputRef.current.setNoPrefix(options.noPrefix);
    }
  }, [options.noPrefix]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(inputRef.current !== null);
      inputRef.current.setClassName(options.className);
    }
  }, [options.className]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(inputRef.current !== null);
      inputRef.current.setValue(options.value);
    }
  }, [options.value]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(inputRef.current !== null);
      inputRef.current.setInputHandler(options.onChange);
    }
  }, [options.onChange]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(inputRef.current !== null);
      inputRef.current.setDisabled(options.disabled);
    }
  }, [options.disabled]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return <SAmountInput ref={containerRef} className={wrapperClassName} />;
};
