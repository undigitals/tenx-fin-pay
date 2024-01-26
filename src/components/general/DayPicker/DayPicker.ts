/* eslint-disable prefer-destructuring, no-param-reassign */

import './DayPicker.css';

import assert from 'assert';

export type TDayPickerRange = [start: Date | null, end: Date | null];

export type TDayPickerChangeHandler = (range: TDayPickerRange) => void;

export type TDayPickerDisablePredicate = (date: Date) => boolean;

export type TDayPickerOptions = {
  locale: string;
  range?: boolean;
  value?: TDayPickerRange | null;
  onChange?: TDayPickerChangeHandler | null;
  disableBefore?: Date | null;
  disableAfter?: Date | null;
  disableWeekends?: boolean;
  disableDates?: Date[] | null;
  disableFn?: TDayPickerDisablePredicate;
};

export class DayPicker {
  private static startOfMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1);
  }

  private static startOfDay(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day);
  }

  private static isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  }

  // In a general case, we would need to create a copy of d2, decrement its day and then
  // compare the resulting date and d1 using #isSameDay. However, since we store all dates
  // with only year, month and day set and all other fields zeroed, we can simply compare
  // timestamps. This has a nice little benefit of avoiding memory allocation for the
  // temporary Date object.
  private static isDayBefore(d1: Date, d2: Date) {
    return d1.getTime() < d2.getTime();
  }

  private static isInRange(date: Date, start: Date, end: Date) {
    return DayPicker.isDayBefore(start, date) && DayPicker.isDayBefore(date, end);
  }

  private static isWeekend(date: Date) {
    return date.getDay() === 6 || date.getDay() === 0;
  }

  private static isValidRange(start: Date | null, end: Date | null, range: boolean) {
    if (end === null) {
      return true;
    }
    if (start === null) {
      return false;
    }
    if (!range) {
      return DayPicker.isSameDay(start, end);
    }
    return DayPicker.isDayBefore(start, end) || DayPicker.isSameDay(start, end);
  }

  private static newHeadingFormatter(locale: string) {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
    });
  }

  private static newWeekdayFormatter(locale: string) {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
    });
  }

  private headingFormatter: Intl.DateTimeFormat;

  private weekdayFormatter: Intl.DateTimeFormat;

  private container: HTMLElement;

  private range = false;

  private onChange: TDayPickerChangeHandler | null = null;

  private disableBefore: Date | null = null;

  private disableAfter: Date | null = null;

  private disableWeekends = false;

  private disableDates: Date[] | null = null;

  private disableFn: TDayPickerDisablePredicate | null = null;

  private picker: HTMLElement | null = null;

  private currentView: Date;

  private startDate: Date | null;

  private endDate: Date | null;

  constructor(container: HTMLElement, options: TDayPickerOptions = { locale: navigator.language }) {
    this.container = container;
    this.range = !!options.range;

    const startDate = options.value?.[0] ? DayPicker.startOfDay(options.value[0]) : null;
    const endDate = options.value?.[1] ? DayPicker.startOfDay(options.value[1]) : null;
    if (!DayPicker.isValidRange(startDate, endDate, this.range)) {
      throw new Error(`invalid range: [${startDate}, ${endDate}]`);
    }
    this.startDate = startDate;
    this.endDate = endDate;

    this.onChange = options.onChange ?? null;

    this.headingFormatter = DayPicker.newHeadingFormatter(options.locale);
    this.weekdayFormatter = DayPicker.newWeekdayFormatter(options.locale);

    this.disableBefore = options.disableBefore ? DayPicker.startOfDay(options.disableBefore) : null;
    this.disableAfter = options.disableAfter ? DayPicker.startOfDay(options.disableAfter) : null;
    this.disableWeekends = !!options.disableWeekends;
    this.disableDates = options.disableDates ?? null;
    this.disableFn = options.disableFn ?? null;

    this.currentView = DayPicker.startOfMonth(this.startDate ?? new Date());
  }

  setLocale(locale: string) {
    this.headingFormatter = DayPicker.newHeadingFormatter(locale);
    this.weekdayFormatter = DayPicker.newWeekdayFormatter(locale);
    this.updateHeading();
    this.updateWeekdays();
  }

  setValue(value: TDayPickerRange | undefined | null) {
    value ??= null;
    const startDate = value?.[0] ? DayPicker.startOfDay(value[0]) : null;
    const endDate = value?.[1] ? DayPicker.startOfDay(value[1]) : null;
    if (!DayPicker.isValidRange(startDate, endDate, this.range)) {
      throw new Error(`invalid range: [${startDate}, ${endDate}]`);
    }
    this.startDate = startDate;
    this.endDate = endDate;
    if (this.startDate !== null) {
      this.currentView = DayPicker.startOfMonth(this.startDate);
    }
    this.updateBody();
  }

  setChangeHandler(onChange: TDayPickerChangeHandler | undefined | null) {
    this.onChange = onChange ?? null;
  }

  setDisableBefore(before: Date | undefined | null) {
    before ??= null;
    this.disableBefore = before ?? null;
    if (before !== null) {
      if (this.startDate !== null && DayPicker.isDayBefore(this.startDate, before)) {
        this.startDate = null;
        this.endDate = null;
      }
    }
    this.updateBody();
  }

  setDisableAfter(after: Date | undefined | null) {
    after ??= null;
    this.disableAfter = after;
    if (after !== null) {
      if (this.endDate !== null && DayPicker.isDayBefore(after, this.endDate)) {
        this.endDate = null;
      }
    }
    this.updateBody();
  }

  setDisableWeekends(disable: boolean | undefined) {
    disable ??= false;
    this.disableWeekends = disable;
    if (!this.range && disable) {
      if (this.startDate !== null && DayPicker.isWeekend(this.startDate)) {
        this.startDate = null;
        this.endDate = null;
      } else if (this.endDate !== null && DayPicker.isWeekend(this.endDate)) {
        this.endDate = null;
      }
    }
    this.updateBody();
  }

  setDisableDates(dates: Date[] | undefined | null) {
    dates ??= null;
    this.disableDates = dates;
    if (!this.range && dates !== null && (this.startDate !== null || this.endDate !== null)) {
      let startDisabled = false;
      let endDisabled = false;
      for (const date of dates) {
        if (this.startDate !== null && DayPicker.isSameDay(date, this.startDate)) {
          startDisabled = true;
        }
        if (this.endDate !== null && DayPicker.isSameDay(date, this.endDate)) {
          endDisabled = true;
        }
      }
      if (startDisabled) {
        this.startDate = null;
        this.endDate = null;
      } else if (endDisabled) {
        this.endDate = null;
      }
    }
    this.updateBody();
  }

  setDisableFn(fn: TDayPickerDisablePredicate | undefined | null) {
    fn ??= null;
    this.disableFn = fn;
    if (!this.range && fn !== null) {
      if (this.startDate !== null && fn(this.startDate)) {
        this.startDate = null;
        this.endDate = null;
      } else if (this.endDate !== null && fn(this.endDate)) {
        this.endDate = null;
      }
    }
    this.updateBody();
  }

  mount() {
    if (!this.picker) {
      this.picker = this.createDOM();
      this.updateHeading();
      this.updateWeekdays();
      this.updateBody();
      this.attachHeaderListeners();
      this.container.appendChild(this.picker);
    }
  }

  unmount() {
    if (this.picker) {
      this.detachListeners();
      this.picker.remove();
      // allow detached picker to be garbage-collected
      this.picker = null;
    }
  }

  private createDOM() {
    const section = document.createElement('section');
    section.classList.add('picker', this.range ? 'range' : 'date');

    const header = section.appendChild(document.createElement('header'));
    header.append(document.createElement('h2'));
    header
      .appendChild(
        Object.assign(document.createElement('button'), {
          type: 'button',
        })
      )
      .appendChild(
        Object.assign(document.createElement('span'), {
          className: 'visually-hidden',
        })
      ).textContent = 'Previous month';
    header
      .appendChild(
        Object.assign(document.createElement('button'), {
          type: 'button',
        })
      )
      .appendChild(
        Object.assign(document.createElement('span'), {
          className: 'visually-hidden',
        })
      ).textContent = 'Next month';

    const table = section.appendChild(document.createElement('table'));
    const headRow = table.appendChild(document.createElement('thead')).appendChild(document.createElement('tr'));
    for (let i = 0; i < 7; i++) {
      headRow.append(
        Object.assign(document.createElement('th'), {
          scope: 'col',
        })
      );
    }
    table.append(document.createElement('tbody'));

    return section;
  }

  private detachListeners() {
    if (this.picker === null) {
      return;
    }
    const [backButton, forwardButton] = this.picker.querySelectorAll('header button');
    backButton.removeEventListener('click', this.onBackButtonClick);
    forwardButton.removeEventListener('click', this.onForwardButtonClick);

    for (const dateButton of this.picker.querySelectorAll('tbody td button')) {
      dateButton.removeEventListener('click', this.onDateButtonClick);
    }
  }

  private updateHeading() {
    const heading = this.picker?.querySelector('header h2');
    if (heading) {
      heading.textContent = this.headingFormatter.format(this.currentView);
    }
  }

  private updateWeekdays() {
    const thead = this.picker?.querySelector('thead');
    if (!thead) {
      return;
    }
    const tableHeaderRow = thead.firstElementChild as HTMLTableRowElement;
    for (let i = 0, date = new Date(this.currentView); i < 7; i++) {
      const weekday = date.getDay();
      tableHeaderRow.children[weekday].textContent = this.weekdayFormatter.format(date);
      date.setDate(date.getDate() + 1);
    }
  }

  private updateBody() {
    let monthStarted = false;
    let monthEnded = false;
    let week = 0;
    let weekday = 0;
    const date = this.getFirstDate();

    const tbody = this.picker?.querySelector('tbody');
    if (!tbody) {
      return;
    }
    const now = new Date();
    do {
      const inside = date.getMonth() === this.currentView.getMonth();
      if (inside) {
        if (!monthStarted) {
          monthStarted = true;
        }
      }

      if (tbody.childElementCount <= week) {
        const tr = tbody.appendChild(document.createElement('tr'));
        for (let i = 0; i < 7; i++) {
          tr.appendChild(document.createElement('td')).appendChild(
            Object.assign(document.createElement('button'), {
              type: 'button',
            })
          );
        }
      }

      const cell = tbody.children[week].children[weekday];
      const button = cell.firstElementChild as HTMLButtonElement;

      button.addEventListener('click', this.onDateButtonClick);
      button.textContent = String(date.getDate());

      cell.className = '';

      if (DayPicker.isSameDay(now, date)) {
        cell.classList.add('today');
      }

      if (this.startDate && DayPicker.isSameDay(date, this.startDate)) {
        cell.classList.add('start');
      }

      if (this.endDate && DayPicker.isSameDay(date, this.endDate)) {
        cell.classList.add('end');
      }

      if (this.startDate && this.endDate && DayPicker.isInRange(date, this.startDate, this.endDate)) {
        cell.classList.add('selected');
      }

      if (!inside) {
        cell.classList.add('outside', monthStarted ? 'next' : 'prev');
      }

      if (monthStarted && !monthEnded && date.getDate() === 1) {
        cell.classList.add('first');
      }

      if (this.shouldDisableDate(date)) {
        cell.classList.add('disabled');
        button.disabled = true;
      } else {
        button.disabled = false;
      }

      if (weekday === 6) {
        weekday = 0;
        week++;
      } else {
        weekday++;
      }

      date.setDate(date.getDate() + 1);

      if (monthStarted && date.getMonth() !== this.currentView.getMonth()) {
        if (!monthEnded) {
          monthEnded = true;
          cell.classList.add('last');
        }
      }
    } while (!monthEnded || date.getDay() !== 0);

    for (let i = 0, tr = tbody.lastElementChild as HTMLTableRowElement; i < tbody.childElementCount - week; i++) {
      for (const td of tr.children) {
        const button = td.firstElementChild as HTMLButtonElement;
        button.removeEventListener('click', this.onDateButtonClick);
      }
      const prev = tr.previousElementSibling as HTMLTableRowElement;
      tr.remove();
      tr = prev;
    }
  }

  private attachHeaderListeners() {
    if (this.picker === null) {
      return;
    }
    const [backButton, forwardButton] = this.picker.querySelectorAll('header button');
    backButton.addEventListener('click', this.onBackButtonClick);
    forwardButton.addEventListener('click', this.onForwardButtonClick);
  }

  private readonly onBackButtonClick = () => {
    this.currentView.setMonth(this.currentView.getMonth() - 1);
    this.updateHeading();
    this.updateBody();
  };

  private readonly onForwardButtonClick = () => {
    this.currentView.setMonth(this.currentView.getMonth() + 1);
    this.updateHeading();
    this.updateBody();
  };

  private readonly onDateButtonClick = (event: Event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const day = Number(button.textContent);
    const clickedDate = new Date(this.currentView);
    if (button.classList.contains('outside')) {
      if (button.classList.contains('prev')) {
        clickedDate.setMonth(clickedDate.getMonth() - 1);
      } else if (button.classList.contains('next')) {
        clickedDate.setMonth(clickedDate.getMonth() + 1);
      } else {
        assert(false);
      }
    }
    clickedDate.setDate(day);

    let newStartDate = this.startDate;
    let newEndDate = this.endDate;

    if (!this.range) {
      newStartDate = clickedDate;
      newEndDate = clickedDate;
    } else if (!this.startDate && !this.endDate) {
      newStartDate = clickedDate;
    } else if (!this.endDate) {
      assert(this.startDate !== null);
      if (DayPicker.isDayBefore(clickedDate, this.startDate)) {
        newStartDate = clickedDate;
      } else {
        newEndDate = clickedDate;
      }
    } else if (this.startDate && this.endDate) {
      newStartDate = clickedDate;
      newEndDate = null;
    } else {
      assert(false);
    }

    if (this.startDate?.getTime() === newStartDate?.getTime() && this.endDate?.getTime() === newEndDate?.getTime()) {
      return;
    }

    this.startDate = newStartDate;
    this.endDate = newEndDate;
    this.updateBody();

    if (this.onChange) {
      this.onChange([this.startDate, this.endDate]);
    }
  };

  private shouldDisableDate(date: Date) {
    if (!!this.disableBefore && DayPicker.isDayBefore(date, this.disableBefore)) {
      return true;
    }
    if (!!this.disableAfter && DayPicker.isDayBefore(this.disableAfter, date)) {
      return true;
    }
    if (!this.range && this.disableWeekends && DayPicker.isWeekend(date)) {
      return true;
    }
    if (!this.range && !!this.disableDates && this.disableDates.some((d) => DayPicker.isSameDay(d, date))) {
      return true;
    }
    if (!this.range && !!this.disableFn && this.disableFn(date)) {
      return true;
    }
    return false;
  }

  private getFirstDate() {
    const firstDate = DayPicker.startOfMonth(this.currentView);
    firstDate.setDate(firstDate.getDate() - firstDate.getDay());
    return firstDate;
  }
}
