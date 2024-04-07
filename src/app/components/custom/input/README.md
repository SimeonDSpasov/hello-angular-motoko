## IPI Input Component
A Simple input field that handles formGroup, outputs validation errors, has helper messages and infos,
emits click events on customizable icons that can be used to handle input changes.

## Usage
>**`parent.component.html`**
>```html
><ipi-input [options]="{
>   label: 'Sample label',
>   type: 'text',
>   placeholder: 'sample placeholder',
>   info: 'Sample info message on hover',
>   infoImg: 'icon.svg',
>   helperText: 'Sample helperText',
>   helperRoute: '/forgot-password',
>   prefixImg: 'email.svg',
>   suffixImg: 'password-hide.svg'
>   formGroup: exampleFormGroup,
>   formControlName: 'exampleFormGroupControl',
>   errors: {
>       firstSampleError: 'error message to display',
>       secondSampleError: 'errom message to dispaly on second'
>   }
>}">
></ipi-input>
>
>```

## label
Label above the input field.

## type
You can pass the default input type attribute. Default is 'text'.

## info && infoImg
Info is used together with infoImg to display and icon next to the label that on hover triggers
a tooltip with the info string.

## placeholder
Replaces the input placeholder.

## helperText && helperRoute
Positioned above the input on the right side ot the label & info can be used
to navigate to a given route.

## prefixImg && suffixImg
Two images for the beggining and end of the input field.
suffixImg also emits event on clicks enabling additional logic to be added.

## formGroup
Refference to the FormGroup that the ipi-input will handle

## formControlName
Refference to the name of the control that we will access in the FormGroup

## errors
An object with properties which keys are refferences to Form ValidationErrors and a message to display if
the input Control has the error.

### CSS Variables
Here are all the available CSS variables (and their default values) you can set when using the ipi-input:

```css
ipi-input {
    /* Colors, Fills, Strokes: */
    --ipi-input-header-color: #0B1222;
    --ipi-input-placeholder-color: #0B1222;
    --ipi-input-text-color: #0B1222;

    /* when there are validator errors we make the text pop-up underneath and change its color */
    --ipi-input-error-color: #F96138;
    --ipi-input-border-error-width: 1px;

    /* Tooltip icon styling */
    --ipi-input-tooltip-icon-fill: transparent;
    --ipi-input-tooltip-icon-stroke: #C6C6C6;

    /* on all validators passed we make the text with this color  */
    --ipi-input-success-color: #14BD6C;
    --ipi-input-border-color: #E9E9E9;
    --ipi-input-border-width: 1px;
    --ipi-input-value-color: #0B1222;

    /* Left icon fill & stroke : */
    `--ipi-input-icon-left-fill: #FFFFFF;
    `--ipi-input-icon-left-stroke: transparent;

    /* Right icon fill & stroke: */
    --ipi-input-icon-right-fill: #FFFFFF;
    --ipi-input-icon-right-stroke: transparent;

    /* Info icon (the one ot top with the label) fill & stroke */
    `--ipi-input-icon-info-fill: #FFFFFF;
    `--ipi-input-icon-info-stroke: transparent;

/* Note: When you want to setup the color of your icon you should experiment with both these variables or consider using the one your icon is based on.  */

}
```

[Go back](/README.md)
