# streamlit-keyup

If you're collecting text input from your users in your streamlit app, `st.text_input` works well -- as long as you're happy with
waiting to get the response when they're finished typing.

But, what if you want to get the input out, and do something with it every time they type a new key (AKA "on keyup")?

[![Open in Streamlit](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://key-up.streamlitapp.com)

![filtering](https://user-images.githubusercontent.com/4040678/186792601-a9e921e8-3051-45a0-80d6-e1673cf8ae37.gif)

## Installation


`pip install streamlit-keyup`

## Usage

```python
from st_keyup import st_keyup

value = st_keyup("Enter a value")

# Notice that value updates after every key press
st.write(value)

# If you want to set a default value, you can pass one
with_default = st_keyup("Enter a value", value="Example")

# If you want to limit how often the value gets updated, pass `debounce` value, which
# will force the value to only update after that many milliseconds have passed
with_debounce = st_keyup("Enter a value", debounce=500)
```
