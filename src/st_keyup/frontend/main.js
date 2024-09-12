function onKeyUp(event) {
  Streamlit.setComponentValue(event.target.value);
}

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event) {
  // Get the RenderData from the event

  // This is called on every render to allow changing themes via settings
  const root = document.getElementById("root");

  root.style.setProperty("--base", event.detail.theme.base);
  root.style.setProperty("--primary-color", event.detail.theme.primaryColor);
  root.style.setProperty("--background-color", event.detail.theme.backgroundColor);
  root.style.setProperty("--secondary-background-color", event.detail.theme.secondaryBackgroundColor);
  root.style.setProperty("--text-color", event.detail.theme.textColor);
  root.style.setProperty("--font", event.detail.theme.font);

  if (!window.rendered) {
    const {
      label,
      value,
      debounce: debounce_time,
      max_chars,
      type,
      placeholder,
      disabled,
      label_visibility,
      height,  // New height parameter
    } = event.detail.args;

    const inputContainer = document.createElement("div");  // Container for textarea
    inputContainer.classList.add("input");  // Add input class for styling

    const input = document.createElement("textarea");  // Change to textarea for multi-line input
    input.id = "input_box";
    input.classList.add("input-box");  // Use a class for styling specific to the textarea

    const label_el = document.createElement("label");
    label_el.id = "label";
    label_el.innerText = label;
    root.appendChild(label_el);
    root.appendChild(inputContainer);
    inputContainer.appendChild(input);

    if (value) {
      input.value = value;
    }

    if (max_chars) {
      input.maxLength = max_chars;
    }

    if (placeholder) {
      input.placeholder = placeholder;
    }

    if (disabled) {
      input.disabled = true;
      label_el.disabled = true;
      root.classList.add("disabled");
    }

    if (label_visibility === "hidden") {
      root.classList.add("label-hidden");
    } else if (label_visibility === "collapsed") {
      root.classList.add("label-collapsed");
      Streamlit.setFrameHeight(45);
    }

    if (debounce_time > 0) {  // is false if debounce_time is 0 or undefined
      input.onkeyup = debounce(onKeyUp, debounce_time);
    } else {
      input.onkeyup = onKeyUp;
    }

    // Set dynamic height for the textarea if provided
    if (height) {
      input.style.height = `${height}px`;
    }

    // Dynamically set the frame height based on the textarea height, adding extra for padding and label
    Streamlit.setFrameHeight(height ? height + 75 : 100);  // Adjust frame height

    window.rendered = true;
  }
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);
Streamlit.setComponentReady();
