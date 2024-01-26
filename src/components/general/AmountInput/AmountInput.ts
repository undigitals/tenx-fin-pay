/* eslint-disable no-param-reassign */
export type TAmountInputHandler = (value: string) => void;

export type TAmountInputOptions = {
  noPrefix?: boolean | null;
  className?: string | null;
  value?: string | null;
  onInput?: TAmountInputHandler | null;
  disabled?: boolean;
};

/*
 * The idea here is to use 'beforeinput' events to block any invalid input and to prepend the prefix whenever necessary.
 *
 * 'beforeinput' events are used here instead of 'input' events because they happen *before* the change has been written
 * to the 'value' attribute of the input. This allows us to inspect the new value-to-be-written and simply prevent
 * the input from propagating further if the new value would not be a valid decimal. Whereas, if 'input' events were used,
 * we would be stuck trying to undo the change that has already been written to the DOM.
 *
 * This has to be implemented outside of React, because React's support for 'beforeinput' is still nowhere near acceptable:
 * - Half the properties are missing **at runtime** both in the synthetic and in the native event, like the 'inputType'
 * property, which is kinda the main reason why anyone would even use 'beforeinput' events over 'input' events.
 * - Even the native event itself is of the wrong type: 'keypress' at the time of writing this comment, which means
 * that they don't even propagate the original 'beforeinput' event and instead reinvent the wheel and implement
 * their own, just like they love to do all the time.
 * - Typings are all over the place, very inconsistent: onBeforeInput callbacks get events of type React.FormEvent,
 * where in reality not only does this event has nothing to do with forms, but
 * to even access the 'data' property the event needs to be of type CompositionEvent instead.
 *
 * TODO: switch from <input type="text"> to using 'contenteditable' attribute to support rendering different
 * amount parts in different font sizes.
 */
export class AmountInput {
  private readonly PREFIX_REGEX = /^\$\s*(.*?)$/;
  private readonly LEADING_ZEROS_REGEX = /^0+(0|[^0].*?)$/;
  private readonly DECIMAL_REGEX = /^\d+(?:\.\d*)?$/;

  private readonly container: HTMLElement;

  private input: HTMLInputElement | null = null;

  /*
   * Whether to display the dollar sign in front of the input.
   */
  private noPrefix = false;

  private className: string | null = null;

  /*
   * The current value of the input, without the dollar sign.
   */
  private value = '';

  private onInputCb: TAmountInputHandler | null = null;

  private disabled: boolean | null = false;

  constructor(container: HTMLElement, options: TAmountInputOptions) {
    this.container = container;
    this.noPrefix = options.noPrefix ?? false;
    this.className = options.className ?? null;
    this.value = options.value ?? '';
    this.onInputCb = options.onInput ?? null;
    this.disabled = options.disabled ?? false;
  }

  setNoPrefix(noPrefix?: boolean | undefined | null) {
    this.noPrefix = noPrefix ?? false;
    if (!this.input) {
      return;
    }
    this.input.placeholder = this.noPrefix ? '0.00' : '$0.00';
    this.update();
  }

  setDisabled(disabled?: boolean | undefined | null) {
    this.disabled = disabled ?? false;

    if (!this.input) {
      return;
    }

    this.input.disabled = this.disabled;
  }

  setClassName(className: string | undefined | null) {
    this.className = className ?? null;
    if (!this.input) {
      return;
    }
    if (this.className === null) {
      this.input.removeAttribute('class');
    } else {
      this.input.setAttribute('class', this.className);
    }
  }

  setValue(value: string | undefined | null) {
    this.value = value ?? '';
    this.update();
  }

  setInputHandler(onInput: TAmountInputHandler | undefined | null) {
    this.onInputCb = onInput ?? null;
  }

  mount() {
    if (!this.input) {
      this.input = this.createDOM();
      this.attachListeners();
      if (this.className === null) {
        this.input.removeAttribute('class');
      } else {
        this.input.setAttribute('class', this.className);
      }
      this.update();
      this.container.appendChild(this.input);
    }
  }

  unmount() {
    if (this.input) {
      this.detachListeners();
      this.input.remove();
      this.input = null;
    }
  }

  private createDOM() {
    return Object.assign(document.createElement('input'), {
      /*
       * Inputs of type "number" do not have selectionStart and selectionEnd properties on their change events,
       * which makes it impossible to properly constrain the contents to decimal numbers, which is why
       * type "text" is used here instead.
       */
      type: 'text',
      inputMode: 'decimal',
      placeholder: this.noPrefix ? '0.00' : '$0.00',
    });
  }

  private attachListeners() {
    if (!this.input) {
      return;
    }
    this.input.addEventListener('beforeinput', this.onBeforeInput);
    this.input.addEventListener('focus', this.onFocus);
    this.input.addEventListener('blur', this.onBlur);
  }

  private detachListeners() {
    if (!this.input) {
      return;
    }
    this.input.removeEventListener('beforeinput', this.onBeforeInput);
    this.input.removeEventListener('focus', this.onFocus);
    this.input.removeEventListener('blur', this.onBlur);
  }

  private readonly onBeforeInput = (event: InputEvent) => {
    if (!this.input) {
      return;
    }
    const inputType = event.inputType;
    // selectionStart, selectionEnd are never null for <input type="text"> elements
    const selectionStart = this.input.selectionStart!;
    const selectionEnd = this.input.selectionEnd!;
    const value = this.input.value;
    const input = event.data;
    /*
     * Some part of text is always selected, in the degenerate case of an empty selection
     * let's consider it to be an empty selection.
     */
    const beforeSelectionStart = value.substring(0, selectionStart);
    const afterSelectionEnd = value.substring(selectionEnd);

    let newValue;
    switch (inputType) {
      // insert text at caret position, removing any selected text
      case 'insertText':
      case 'insertFromPaste':
        if (!this.noPrefix && selectionStart === selectionEnd && value.indexOf('$') === 0 && (selectionStart === 0 || selectionStart === 1)) {
          /*
           * Special case: user placed the caret either right before or right after the dollar sign
           * and inserted something. This insertion should be treated as if the caret was placed
           * immediately after the value.
           */
          newValue = `${value}${input}`;
        } else {
          newValue = `${beforeSelectionStart}${input}${afterSelectionEnd}`;
        }
        break;

      // remove selected text or, if no text is selected, remove the last character before caret
      case 'deleteContentBackward':
        if (selectionStart === selectionEnd) {
          newValue = `${beforeSelectionStart.substring(0, selectionStart - 1)}${afterSelectionEnd}`;
        } else {
          newValue = `${beforeSelectionStart}${afterSelectionEnd}`;
        }
        break;

      // remove selected text or, if no text is selected, remove the first character after caret
      case 'deleteContentForward':
        if (!this.noPrefix && selectionStart === selectionEnd && value.indexOf('$') === 0 && (selectionStart === 0 || selectionStart === 1)) {
          /*
           * Special case: user placed the caret either right before or right after the dollar sign
           * and pressed Delete. This deletion should be treated as if the caret was placed
           * immediately before the value.
           */
          newValue = `$${value.substring(3)}`;
        } else if (selectionStart === selectionEnd) {
          newValue = `${beforeSelectionStart}${afterSelectionEnd.substring(1)}`;
        } else {
          newValue = `${beforeSelectionStart}${afterSelectionEnd}`;
        }
        break;

      // remove selected text
      case 'deleteByCut':
        newValue = `${beforeSelectionStart}${afterSelectionEnd}`;
        break;
      default:
        return; // let input events of unsupported types pass
    }

    // Prevent propagation of events that we're able to handle by ourselves.
    // From here on we need to manually update input's value.
    event.preventDefault();
    const newValuePolished = this.validateAndPolish(newValue);
    if (newValuePolished !== null) {
      this.fireChange(newValuePolished);
    }
  };

  /*
   * Returns the numeric value of the input.
   * Returns null if the value is not valid.
   */
  private validateAndPolish(value: string): string | null {
    value = value.trim();

    // remove prefix
    let match = this.PREFIX_REGEX.exec(value);
    if (match !== null) {
      value = match[1];
    }

    // remove any leading zeros
    match = this.LEADING_ZEROS_REGEX.exec(value);
    if (match !== null) {
      value = match[1];
    }

    if (value.length === 0) {
      return '';
    }

    match = this.DECIMAL_REGEX.exec(value);
    return match?.[0] ?? null;
  }

  private readonly onFocus = () => {
    if (!this.input) {
      return;
    }
    if (!this.noPrefix && this.input.value.indexOf('$') === 0) {
      if (this.input.selectionStart === this.input.selectionEnd) {
        this.input.setSelectionRange(2, 2);
      }
    }
  };

  private readonly onBlur = () => {
    if (this.value) {
      this.fireChange(Number(this.value).toFixed(2));
    }
  };

  private fireChange(value: string) {
    if (this.onInputCb) {
      this.onInputCb(value);
    }
  }

  private update() {
    if (!this.input) {
      return;
    }
    if (!this.value) {
      this.input.value = '';
    } else if (this.noPrefix) {
      this.input.value = this.value;
    } else {
      this.input.value = `$${this.value}`;
    }
    this.input.dataset.value = this.value;
  }
}
