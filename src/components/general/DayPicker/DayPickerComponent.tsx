import React, { CSSProperties, useEffect, useRef } from 'react';
import assert from 'assert';
import { DayPicker, TDayPickerOptions } from './DayPicker';
import { SDayPickerContainer } from './DayPickerComponent.style';

export type DayPickerComponentProps = TDayPickerOptions & {
  open: boolean;
  className?: string;
  style?: CSSProperties;
};

export const DayPickerComponent = ({ open, className, style, ...options }: DayPickerComponentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pickerRef = useRef<DayPicker | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    assert(containerRef.current !== null);
    pickerRef.current = new DayPicker(containerRef.current, options);
    return () => pickerRef.current?.unmount();
    // this ignore is intentional, because we don't want to recreate the picker every time the options change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(pickerRef.current !== null);
      pickerRef.current.setLocale(options.locale);
    }
  }, [options.locale]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(pickerRef.current !== null);
      pickerRef.current.setValue(options.value);
    }
  }, [options.value]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(pickerRef.current !== null);
      pickerRef.current.setChangeHandler(options.onChange);
    }
  }, [options.onChange]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(pickerRef.current !== null);
      pickerRef.current.setDisableBefore(options.disableBefore);
    }
  }, [options.disableBefore]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(pickerRef.current !== null);
      pickerRef.current.setDisableAfter(options.disableAfter);
    }
  }, [options.disableAfter]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(pickerRef.current !== null);
      pickerRef.current.setDisableWeekends(options.disableWeekends);
    }
  }, [options.disableWeekends]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(pickerRef.current !== null);
      pickerRef.current.setDisableDates(options.disableDates);
    }
  }, [options.disableDates]);

  useEffect(() => {
    if (!isFirstRender.current) {
      assert(pickerRef.current !== null);
      pickerRef.current.setDisableFn(options.disableFn);
    }
  }, [options.disableFn]);

  useEffect(() => {
    assert(pickerRef.current !== null);
    if (open) {
      pickerRef.current.mount();
    } else {
      pickerRef.current.unmount();
    }
  }, [open]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return <SDayPickerContainer className={className} style={style} ref={containerRef} />;
};
