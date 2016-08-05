INPUTS
------

-	[UIButton](#uibutton)
-	[UIButtonGroup](#uibuttongroup)
-	[UISwitch](#uiswitch)
-	[UICheckbox](#uicheckbox)
-	[UIRadio](#uiradio)
-	[UIOptionGroup](#uioptiongroup)
-	[UIInput](#uiinput)
-	[UIPhone](#uiphone)
-	[UIFile](#uifile)
-	[UIDate](#uidate)
-	[UIDateView](#uidateview)
-	[UIInputDual](#uiinputdual)
-	[UITextArea](#uitextarea)
-	[UILanguage](#uilanguage)
-	[UIMarkdown](#uimarkdown)
-	[UICombo](#uicombo)
-	[UIList](#uilist)
-	[UITags](#uitags)
-	[UIReorder](#uireorder)

---

### UIButton

```html
<ui-button icon.bind=? label.bind=? disabled.bind=? click.trigger=?
    (theme) primary|info|danger|success|warning
    (size) normal|small|large
    (icon-align) left|top
    (style) normal|round|square>

    <!-- menu options for dropdown buttons -->
</ui-button>
```

---

### UIButtonGroup

If `disabled | theme` set on button group, it will override the properties of individual buttons

```html
<ui-button-group value.bind=? disabled.bind=? change.trigger=?

    toggle.bind="single|multiple" // Enable toggle

    (theme for toggle) primary|info|danger|success|warning
    (size) normal|small|large
    (icon-align) left|top
    (style) normal|round|square>

    <!-- ui-button value.bind=? -->
</ui-button>
```

---

### UISwitch

```html
<ui-switch checked.bind=? disabled.bind=? change.trigger=?
    (theme) primary|info|danger|success|warning
    label-on=? label-off=? width='?'>
    <!-- Label text -->
</ui-switch>
```

-	width must be in `em` units

---

### UICheckbox

UIOptionGroup as parent container is optional

```html
<ui-checkbox checked.bind=? disabled.bind=? change.trigger=?>
    <!-- Label text -->
</ui-checkbox>
```

---

### UIRadio

UIOptionGroup as parent container is mandatory

```html
<ui-radio value.bind=? disabled.bind=?>
    <!-- Label text -->
</ui-radio>
```

---

### UIOptionGroup

`name` and `value` properties only applicable for radio button groups

```html
<ui-option-group label.bind=? name.bind=? value.bind=? change.trigger=?>
    <!-- ui-radio | ui-checkbox -->
</ui-option-group>
```

---

### UIInput

```html
<ui-input text|email|number|decimal|url|search|password|capitalize>Label</ui-input>
```

Attributes common to all input elements except checkbox/radio

-	Singular attributes

	-	`checkbox`: add a checkbox to enable/disable input

	-	`label-hide`: hide the label

	-	`label-top`: place label label above the input control

-	Bindable attributes

	-	`dir`: not applicable to phone input

	-	`disabled`

	-	`readonly`

	-	`placeholder`

	-	`checked`: available only if checkbox is enabled

	-	`help-text`: text to be displayed below the input field

	-	`prefix-icon`: Add-On prefix icon

	-	`prefix-text`: Add-On prefix text

	-	`suffix-icon`: Add-On suffix icon

	-	`suffix-text`: Add-On suffix text

	-	`button-icon`: Add-On button icon

	-	`button-text`: Add-On button text

-	Events

	-	`checked.trigger`

	-	`buttonclick.trigger`

	-	`change.trigger`

---

### UIPhone

```html
<ui-phone international|national country.bind=?
    value.bind=? isd-code.bind=? area-code.bind=? phone.bind=? extension.bind=?>Label</ui-phone>
```

-	All input attributes are applicable except input type

-	`international`: accept full phone input, including ISD code

-	`national`: requires the country to be set else defaults to US phone format and validation

-	`country`: ISO-2 standard country code

-	`value`: Full unformatted phone number. eg. +15551234567,123

---

### UIInputDual

```html
<ui-input-dual value-second.bind=? placeholder-second.bind=?>Label</ui-input-dual>
```

---

### UIDate

```html
<ui-date date.bind=? format="DD-MMM-YYYY" date-end.bind=? options.bind=UIDateOptions>Label</ui-date>
```

> To enable time input, format should have `hh:mm`

-	Singular attributes

	-	`range`: enable date range input, `date-end` bind is only available for date range.

```typescript
interface UIDateOptions {
  minDate = null;
  maxDate = null;
  validDates: Array<any> | Function;
  invalidDates: Array<any> | Function;
}
```

> validDates/invalidDates check is not implemented yet.

---

### UITextArea

```html
<ui-textarea rows.bind=?>Label</ui-textarea>
```

---

### UIMarkDown

```html
<ui-markdown full-view rows.bind=? value.bind=? dir.bind=?
    placeholder=? disabled.bind=? readonly.bind=?>Label</ui-markdown>
```

-	`full-view` will stretch the editor to fill the page, tab/body body
-	`side-view` will place the editor and preview side-by-side
