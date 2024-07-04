# ng-components

This package provides custom Angular UI components, developed and maintained by IPI Soft LLC. <br>
Website: www.ipi-soft.com 

# Installation

```sh
npm install @ipi-soft/ng-components
```

# Components

[🔽 Button](#ipi-button-components) <br>
[🔽 Checkbox](#ipi-checkbox-component) <br>
[🔽 Chip](#ipi-checkbox-component) <br>
[🔽 Dialog](#ipi-dialog-component) <br>
[🔽 Expander](#ipi-expander-component) <br>
[🔽 Image](#ipi-image-component) <br>
[🔽 Input](#ipi-input-component) <br>
[🔽 Listbox](#ipi-listbox-component) <br>
[🔽 Radiobutton](#ipi-radio-button-component) <br>
[🔽 Select](#ipi-select-component) <br>
[🔽 Snackbar](#ipi-snackbar-service) <br>
[🔽 Table](#ipi-table-component) <br>
[🔽 Textarea](#ipi-textarea-component) <br>
[🔽 Tooltip](#ipi-tooltip-component) <br>


-----------------------------------------------------------------

# IPI Button Component
A simple button 

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiButtonComponent }
>from '@ipi-soft/ng-components/button';
>
>@Component({
>  imports: [ IpiButtonComponent ]
>})
>
>export class ButtonExampleComponent {
>
>  public handleClickChange(): void {
>    // click change login on button emit
>  }
>}
>```
>**`parent.component.html`**
>```html
><ipi-button 
>   [options]="{ 
>     iconLeft: 'icon.svg',
>     iconRight: 'icon.svg'
>   }"
>   [link]="routerLink"
>   [state]="routerLink state"
>   (clickChange)="handelClickChange()">
>       Click here 
></ipi-button>
>```

### Inputs

>#### options
>two icons inside the button can be passed optionally on the left or right side ot the text.

>#### clickChange
>event emitter to handle clicks

>#### link
>routerLink can be passed to for navigation

### CSS Variables
>Here are all the available CSS variables (and their default values) you can set when using the ipi-button:
>
>```css
>ipi-button {
>    /* Sizes: */
>    --ipi-button-border-radius: 4px;
>
>    /* Colors, Fills, Strokes: */
>    --ipi-button-disabled-background-color: #E7E7E7;
>
>    --ipi-button-left-svg-fill: #FFFFFF;
>    --ipi-button-left-svg-stroke: #FFFFFF00;
>
>    --ipi-button-right-svg-fill: #FFFFFF;
>    --ipi-button-right-svg-fill: #FFFFFF00;
>		
>    --ipi-button-text-color: #FFFFFF;
>    --ipi-button-border-color: none;
>    --ipi-button-background-color: #0B1222;
>
>/* Note: When you want to setup the color of your icon
> you should experiment with both these variables or consider
> using the one your icon is based on.  */
>}
>```

-----------------------------------------------------------------

# IPI Checkbox Component
A simple checkbox that can project content, be used with FormGroup and have a tooltip displayed 
with a IPI Tooltip.

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiCheckboxComponent, IpiCheckboxOptions } 
>from '@ipi-soft/ng-components/checkbox';
>
>@Component({
>  imports: [ IpiCheckboxComponent ]    
>})
>
>export class CheckboxExampleComponent {
>
>  public formGroup = new FormGroup({
>    checkboxControl: [false, [Validators.required]],
>   });
>
>  public checkboxOptions: IpiCheckboxOptions = {
>    formGroup: this.formGroup,
>    formControlName: 'checkboxControl',
>  }
>
>}
>```
>**`parent.component.html`**
>```html
><ipi-checkbox 
>  [checked]="true"
>  [disabled]="false"
>  [options]="checkboxOptions"
>  [tooltip]="'example tooltip text'">
></ipi-checkbox>
>
>```
### Inputs

>#### checked
>Sets the checked attribute of the checkbox input by default.

>#### disabled
>Can be used to disabled the input and to prevent a user from interacting with it.

>#### tooltip
>a text that if present triggers a tooltip component with it inside.

>#### formGroup
>Refference to the FormGroup that the ipi-checkbox will handle

>#### formControlName
>Refference to the name of the control that we will access in the FormGroup

### CSS Variables 
>Here are all the CSS variables (and their default values) you can set when using ipi-checkbox:
>
>```css
>ipi-checkbox {
>    /* Sizes */
>    --ipi-checkbox-font-size: 14px;
>
>    /* Colors, Fills, Strokes: */
>    --ipi-checkbox-background-color: #F7F8FB;
>    --ipi-checkbox-wrapper-border-color: transparent;
>    --ipi-checkbox-arrow-color: #FFFFFF;
>    --ipi-checkbox-tooltip-icon-stroke: #FFFFFF;
>
>    --ipi-checkbox-border-color: #E9E9E9; 
>    --ipi-checkbox-border-hover-color: #F96138;
>
>    /* Other */
>    --ipi-checkbox-box-shadow-color: #F96138;
>    --ipi-checkbox-disabled-opacity: 0.5;
>}
>```

-----------------------------------------------------------------

# IPI Chip component
A simple visual container for displaying a text, state, etc.

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiChipComponent } 
>from '@ipi-soft/ng-components/chip';
>
>@Component({
>  imports: [ IpiChipComponent ]
>})
>
>export class ChipExampleComponent { }
>
>```
>**`parent.component.html`**
>```html
><ipi-chip 
>  class="with-close-icon"
>  [closeIcon]="true"
>  (closeChange)="chipClose()">
>    With Close Icon
></ipi-chip>
>```
>

### Inputs
>#### closeIcon
>boolean that triggers an X icon that has the closeChange event emitter attached.

>#### closeChange
>event emitter to handle clicks

### CSS Variables
>Here all the available CSS variables (and their default values) you can set when using ipi-chip:
>
>```css
>ipi-chip {
>    /* Sizes: */
>    --ipi-chip-font-size: 12px;
>
>    /* Colors, Fills, Strokes: */
>    --ipi-chip-color: #FFFFFF;
>    --ipi-chip-background-color: #0B1222;
>    --ipi-chip-icon-color: #FFFFFF;
>}
>```

-----------------------------------------------------------------

# IPI Dialog Component
Simple Dialog component with the option to project everything necessary - close icon, title, description, other content, actions.
The styling is only for the Dialog itself, the close icon, the title, the description. The content and the actions can be anything so their styling is up to the parent component

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiDialogComponent }
>from '@ipi-soft/ng-components/dialog';
>
>@Component({
>  imports: [ IpiDialogComponent ]
>})
>
>export class DialogExampleComponent { }
>```
>**`parent.component.html`**
>```html
>@if (shouldRender) {
>    <ipi-dialog>
>        <ng-template #title>Title Here</ng-template>
>
>        <ng-template #description>Description Here</ng-template>
>
>        <ng-template #content>
>            <ipi-input [options]="{ label: 'Name' }"></ipi-input>
>        </ng-template>s
>
>        <ng-template #actions>
>            <ipi-button (clickChange)="shouldRender = false">
>                Cancel
>            </ipi-button>
>        </ng-template>
>    </ipi-dialog>
>}
>```

### Inputs
>#### Dialog Close Icon
>Shows a close icon. All you need is to pass [closeIcon]="true" and a function that closes the dialog. In example

>#### Dialog Title
>The title is projected with the Select=['title']. All you need is an HTML element with 'title' set. In example

>#### Dialog Description
>The description is projected with the Select=['description']. All you need is an HTML element with 'description' set. In example
>```html
><ng-template #description>Description Here</ng-template>
>```

>#### Dialog Content
>You can place anything you want here. From Forms to Lists or whatever other stuff you need.
>The Content is projected with the Select=['content']. All you need is an HTML element with 'content' set. In example
>
>**`parent.component.html`**
>```html
><ng-template #content>
>    <ipi-input [options]="{ label: 'Name' }"></ipi-input>
></ng-template>
>```
>
>**`parent.component.css`**
>```css
>ipi-input {
>    --ipi-input-error-color: red;
>}
>```

>#### Dialog Actions
>**`parent.component.html`**
>The Actions are projected with the Select=['actions']. All you need is an HTML element with 'actions' set. In example
>```html
><ng-template #actions>
>    <ipi-button>Close</ipi-button>
></ng-template>
>```
>**`parent.component.html`**
>Or with multiple actions:
>```html
><ng-template #actions>
>    <ipi-button (clickChange)="shouldRender = false">Close</ipi-button>
>    <ipi-button (clickChange)="triggerAction()">Trigger Action</ipi-button>
></ng-template>
>```
>Again, the styling of the buttons in this case should happen in the Parent component. You can group them in a div with 'display: flex'

### CSS Variables
>Here are all the available CSS variables (and their default values) you can set when using the ipi-dialog:
>
>```css
>ipi-dialog {
>    /* Sizes: */
>    --ipi-dialog-max-width: 432px;
>
>    /* Colors, Fills, Strokes: */
>    --ipi-dialog-backdrop-background: #0B1222;
>    --ipi-dialog-background: #FFFFFF;
>    --ipi-dialog-close-icon-color: #0B1222;
>    --ipi-dialog-close-icon-hover-color: #F96138;
>    --ipi-dialog-title-color: #0B1222;
>    --ipi-dialog-description-color: #5D6068;
>}
>```

-----------------------------------------------------------------

# IPI Expander Component
A simple component that has a title and and expanding option that displays additional text 
by expanding horizontally.

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiExpanderComponent } 
>from '@ipi-soft/ng-components/expander';
>
>@Component({
>  imports: [ IpiExpanderComponent ]
>})
>
>export class ExpanderExampleComponent { }
>```
>**`parent.component.html`**
>```html
><ipi-expander [isOpen]="true">
>    <ng-container title>
>        With Variables
>    </ng-container>
>
>    <ng-container content>
>        Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br> It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
>    </ng-container>
><ipi-expander>
>
>```

### Inputs

>#### isOpen -> boolean (false)
>Set this to "true", to make the expander open by default.

### CSS Variables
>Here are all the available CSS variables (and their default values) you can set when using the ipi-expander:
>```css
>ipi-expander {
>    /* Sizes: */
>    --ipi-expander-border: 0px;
>
>    /* Colors, Fills, Strokes: */
>    --ipi-expander-background-color: #FFFFFF;
>    --ipi-expander-title-color: #0B1222;
>    --ipi-expander-content-color: #5D6068;
>    --ipi-expander-chevron-color: #5D6068;
>    --ipi-expander-chevron-open-color: #F96138;
>
>    /* Other */
>    --ipi-expander-box-shadow: 0px 4px 8px 0px rgba(214, 214, 214, 0.35);
>}
>```

-----------------------------------------------------------------

# IPI Image Component
An image component that fetches an asset and displays it.

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiIconComponent } 
>from '@ipi-soft/ng-components/image';
>
>@Component({
>  imports: [ IpiIconComponent ]
>})
>
>export class IconExampleComponent { }
>
>```
>
>**`parent.component.html`**
>```html
>
><ipi-img 
>  [src]="assets/img/example.svg" 
>  [svgAriaLabel]="Example aria label for icon.">
></ipi-img>
>
>```

### Inputs
>#### src 
>A url path to the desired img.

>### svgAriaLabel
>a string value that labels the interactive element (for SVG only).

-----------------------------------------------------------------

# IPI Input Component
A Simple input field that handles formGroup, outputs validation errors, has helper messages and infos,
emits click events on customizable icons that can be used to handle input changes.

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiInputComponent, IpiInputOptions }
>from '@ipi-soft/ng-components/input';
>
>@Component({
>  imports: [ IpiInputComponent ]
>})
>
>export class InputExampleComponent {
>
>  public formGroup = new FormGroup({
>    inputControl: [[], [Validators.required]],
>   });
>
>  public inputOptions = {
>   label: 'Sample label',
>   type: 'text',
>   placeholder: 'sample placeholder',
>   info: 'Sample info message on hover',
>   infoImg: 'icon.svg',
>   helperText: 'Sample helperText',
>   helperRoute: '/forgot-password',
>   prefixImg: 'email.svg',
>   suffixImg: 'password-hide.svg'
>   formGroup: this.formGroup,
>   formControlName: 'inputControl',
>   errors: {
>       required: 'error message to display',
>       }
>  }
>
>}
>
>```
>**`parent.component.html`**
>```html
><ipi-input [options]="inputOptions">
></ipi-input>
>
>```

### Inputs

>#### label
>Label above the input field.

>#### type
>You can pass the default input type attribute. Default is 'text'.

>#### info && infoImg
>Info is used together with infoImg to display and icon next to the label that on hover triggers
>a tooltip with the info string.

>#### placeholder
>Replaces the input placeholder.

>#### helperText && helperRoute
>Positioned above the input on the right side ot the label & info can be used
>to navigate to a given route.

>#### prefixImg && suffixImg
>Two images for the beggining and end of the input field.
>suffixImg also emits event on clicks enabling additional logic to be added.

>#### formGroup
>Refference to the FormGroup that the ipi-input will handle

>#### formControlName
>Refference to the name of the control that we will access in the FormGroup

>#### errors
>An object with properties which keys are refferences to Form ValidationErrors and a message to display if
>the input Control has the error.

### CSS Variables
>Here are all the available CSS variables (and their default values) you can set when using the ipi-input:
>```css
>ipi-input {
>    /* Colors, Fills, Strokes: */
>    --ipi-input-header-color: #0B1222;
>    --ipi-input-placeholder-color: #0B1222;
>    --ipi-input-text-color: #0B1222;
>
>    /* when there are validator errors we make the text pop-up underneath and change its color */
>    --ipi-input-error-color: #F96138;
>    --ipi-input-border-error-width: 1px;
>
>    /* Tooltip icon styling */
>    --ipi-input-tooltip-icon-fill: transparent;
>    --ipi-input-tooltip-icon-stroke: #C6C6C6;
>
>    /* on all validators passed we make the text with this color  */
>    --ipi-input-success-color: #14BD6C;
>    --ipi-input-border-color: #E9E9E9;
>    --ipi-input-border-width: 1px;
>    --ipi-input-value-color: #0B1222;
>
>    /* Left icon fill & stroke : */
>    `--ipi-input-icon-left-fill: #FFFFFF;
>    `--ipi-input-icon-left-stroke: transparent;
>
>    /* Right icon fill & stroke: */
>    --ipi-input-icon-right-fill: #FFFFFF;
>    --ipi-input-icon-right-stroke: transparent;
>
>    /* Info icon (the one ot top with the label) fill & stroke */
>    `--ipi-input-icon-info-fill: #FFFFFF;
>    `--ipi-input-icon-info-stroke: transparent;
>
>/* Note: When you want to setup the color of your icon
> you should experiment with both these variables or consider
> using the one your icon is based on.  */
>}
>```

-----------------------------------------------------------------

# IPI Listbox Component
IPI Listbox provides selectable options in a list format.

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiListboxComponent, IpiListboxOptions } 
>from '@ipi-soft/ng-components/listbox';
>
>@Component({
>  imports: [ IpiListboxComponent ]
>})
>
>export class ListboxExampleComponent {
>
>  public formGroup = new FormGroup({
>    listboxControl: [[], [Validators.required]],
>   });
>
>  public listboxOptions = {
>   label: 'Sample label',
>   tooltip: 'Optional tooltip for listbox.'
>   data: [
>     { label: 'Option 1', value: 1 },
>     { label: 'Option 2', value: 2 },
>     { label: 'Option 3', value: 3 },
>     { label: 'Option 4', value: 4 },
>     { label: 'Option 5', value: 5 },
>   ],
>   formGroup: this.formGroup,
>   formControlName: 'listboxControl',
>  }
>
>  public selectChange(event) {
>    // handle change selection if you are not using a form control.
>  }
>}
>
>```
>**`parent.component.html`**
>```html
>
><ipi-listbox 
>  [options]="listboxOptions"
>  (selectChange)="$event">
></ipi-listbox>
>
>```

### Inputs

>#### label
>Label above the listbox container.

>#### formGroup
>Refference to the FormGroup that the ipi-listbox will handle a specific control

>#### formControlName
>Refference to the name of the control that we will access in the FormGroup

### CSS Variables
>Here are all the available CSS variables (and their default values) you can set when using the ipi-listbox:

>```css
>ipi-listbox {
>    /* Colors, Fills, Strokes: */
>    --ipi-listbox-label-color: default;
>    --ipi-listbox-background-color: #FFFFFF;
>
>    --ipi-listbox-item-color: #00000099;
>    --ipi-listbox-item-selected-color: #F96138;
>
>    /* Border */
>    --ipi-listbox-border-color: #F2F2F2;
>    --ipi-listbox-border-hovor-color: #4B5368;
>
>    /* Tooltip icon styling */
>    --ipi-listbox-tooltip-icon-fill: transparent;
>    --ipi-listbox-tooltip-icon-stroke: #C6C6C6;
>
>/* Note: When you want to setup the color of the icon you
> should experiment with both these variables >(fill&stroke)
> or consider using the one your icon is based on.  */
>}
>```

-----------------------------------------------------------------

# IPI Radio-button Component
Simple styled radio-button that can accept a formGroup and a control.

## Usage
>**`parent.component.html`**
>```html
><ipi-radio-button 
>   [options]="{ 
>     data: [dataOptionOne, dataOptionTwo],
>     inline: true
>     formGroup: formGroup
>     formControlName: formGroup.controls[controlName]
>   }">
></ipi-radio-button>
>
><ipi-radio-button 
>   [options]="{
>     checked: 1
>     data: [dataOptionsOne, dataOptionTwo]
>   }"
>   (selectChange)="handleChange($event)">
></ipi-radio-button>
>```

### Inputs

>#### data 
>Array of elements of type IpiSelectData

>#### inline
>Property that sets the flex-direction to row instead of column(default)

>#### checked
>Number refference to the index of the element inside the Array of data that we want to be checked by default.
>Note: for FormGroup use default value inside the FormControl building.

>#### formGroup
>Refference to the FormGroup that the radio-button will handle

>#### formControlName
>Refference to the name of the control that we will access in the FormGroup

### CSS Variables
>Here are all the available CSS variables (and their default values) you can set when using the ipi-radio-button:

>```css
>ipi-radio-button {
>    --ipi-radio-button-background-color: #FFFFFF;
>
>    --ipi-radio-button-text-color: #5D6068;
>
>    --ipi-radio-button-unchecked-border-color: #E9E9E9;
>    --ipi-radio-button-checked-border-color: #F96138;
>    --ipi-radio-button-disabled-border-color: #E7E7E7;
>}
>```

-----------------------------------------------------------------

# IPI Select Component

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiSelectComponent, IpiSelectOptions } 
>from '@ipi-soft/ng-components/select';
>
>@Component({
>  imports: [ IpiSelectComponent ],
>})
>
>export class SelectExampleComponent {
>
>   public selectForm = this.formBuilder.group({
>    selectControl: [[], [Validators.required]],
>   });
>
>   public execute() {
>     // bind any logic to select change or helperText click
>   }
>
>  public selectOptions: IpiSelectOptions = {
>    label: 'Example label',
>    data: [
>           { label: 'Any string', value: any },
>           { label: '', value: any },
>           { label: '', value: any },
>    ],
>    tooltip: 'tooltip text',
>    placeholder: 'Placeholder value',
>    helperText: 'Forgot password?',
>    prefixImg: 'example.svg',
>    formGroup: this.selectForm,
>    formControlName: 'selectControl',
>    errors: {
>      required: 'Select is required'
>    }
>  }
>}
>```
>**`parent.component.html`**
>```html 
>
><ipi-select 
>  [options]='selectOptions'
>  (selectChange)='execute()'
>  (helperTextChange)='execute()'>
><ipi-select>
>```

### CSS Variables
>Here are all the available CSS variables (and their default values) you can set when using the ipi-select:
>```css
>ipi-select {
>    /* Dropdown styling */
>    --ipi-select-dropdown-box-shadow: none;
>    --ipi-select-dropdown-max-height: 240px;
>
>    /* Input styling */
>    --ipi-select-input-text-color: #0B1222;
>    --ipi-select-input-text-selected-color: #F96138;
>    --ipi-select-input-placeholder-color: #0B1222;
>
>    /* tooltip icon styling */
>    --ipi-select-tooltip-icon-fill: transparent;
>    --ipi-input-tooltip-icon-stroke: #C6C6C6;
>
>    /* Prefix icon styling */
>    --ipi-select-icon-prefix-fill: #C6C6C6;
>    --ipi-select-icon-prefix-stroke: transparent;
>
>    /* Background color of the input element inside the select  */
>    --ipi-select-input-background-color: #FFFFFF00;
>
>    /* Border color of the input element inside the select  */
>    --ipi-select-input-border-color: #E9E9E9; 
>    --ipi-select-input-border-width: 1px;
>
>    /* Border color on hover  */
>    --ipi-select-input-border-hover-color: #4B5368;
>
>    /* Border color on disabled */
>    --ipi-select-input-border-disabled-color: #F2F2F2;
>
>    /* Border and text color for when Select is invalid */
>    --ipi-select-invalid-color: #F96138;
>    --ipi-select-invalid-border-width: 1px;
>
>    /* Arrow: */
>    --ipi-select-arrow-color: #5D6068;
>    --ipi-select-arrow-checked-color: #F96138;
>
>    /* Header: */
>    --ipi-select-header-color: #0B1222;
>    --ipi-select-helper-text-color: #5D6068;
>
>    /* if type table */
>    --ipi-select-input-table-color: #5D6068;
>
>    /* Dropdown: */
>    --ipi-select-dropdown-border-color: #E9E9E9;
>    --ipi-select-dropdown-background-color: #FFFFFF;
>
>/* Note: When you want to setup the color of your icon
> you should experiment with both these variables or consider
> using the one your icon is based on.  */
>}
>```

-----------------------------------------------------------------

# IPI Snackbar Service
A services that provides a way to display messages on the screen.

## Usage
>**`parent.component.ts`**
>```typescript
>
>import { 
>   IpiSnackbarService,
>   IpiSnackbarOptions,
>   horizontalPosition,
>   verticalPosition } 
>from '@ipi-soft/ng-components/snackbar';
>
>@Component({
>  imports: [],
>})
>
>export class SnackbarExample {
>
>   public message = 'Message to be displayed';
>
>   public options: IpiSnackbarOptions = {
>     error: true,
>     icon: 'example.svg',
>     animationDuration: 20
>   };
>
>    // Inject to the component from which you want to execute it
>   constructor(public snackbarService: IpiSnackbarService) {
>     // optionally setting the position
>     this.snackbarService.setPosition({
>       verticalPosition: verticalPosition.Bottom,
>       horizontalPosition: horizontalPosition.Center
>      });
>   }
>
>}
>```
>**`parent.component.html`**
>```html
><example-component 
>  (click)="this.snackbarService.open(message, options)">
></example-component>
>```
>

### Inputs

>#### positionOptions
>verticalPosition & horizontalPosition
>Optional properties of SnackbarPosition interface that is used to set custom 
>position of the snackbar

>#### message
>Message to be displayed

>#### options
>Options are of type IpiSnackbarOptions with the following properties:
>    animation-duration - number - used for how long the snackbar should be displayed
>    icon (optional) - string - icon name that must be located inside assets/img/ (using ipi-img)
>    error (optional) - boolean - used to distinguish error message from info.

### CSS Variables
>Note: The snackbars are initialized inside the body of the html outside of any routes.
>Changing colors should happen form a global css stylesheet.
>
>```css
>ipi-snackbar {
>    /* Colors, Fills, Strokes: */
>    --ipi-snackbar-background-color: #14BD6C;
>    --ipi-snackbar-error-background-color: #F96138;
>
>    --ipi-snackbar-placeholder-text-color: #FFFFFF;
>    --ipi-snackbar-message-text-color: #FFFFFF;
>
>    --ipi-snackbar-progress-color: #FFFFFF;
>
>    /* Color of closing icon of the snackbar */
>    --ipi-snackbar-x-icon-color: #FFFFFF;
>
>    --ipi-snackbar-animation-duration: 10s;
>}
>```

-----------------------------------------------------------------

# IPI Table Component
A simple table that can project data sorted by columns x rows providing editing, sorting and filtering 
of the data. 

Two types of tables are available. One with local data and local sorting & filtering and a server side one.

## Usage
>**`parent.component.ts`**
>```typescript
>import { 
>   IpiTableComponent,
>   IpiTableColumn,
>   IpiTableColumnType } 
>from '@ipi-soft/ng-components/table';
>
>@Component({
>  imports: [ IpiTableComponent ]
>})
>
>export class TableExampleComponent {
>
>  // Used for searching and filtering
>  public tableFilter: string;
>
>  public tableData = [{
>    id: 'D1954F',
>    name: 'John Doe',
>    admin: false,
>    years: 19,
>    listName: 'first list'
>  },
>  {
>    id: 'A7D543',
>    name: 'Alice Cooper',
>    years: 33,
>    admin: true,
>    listName: 'second list'
>  },
>  {
>    id: 'BB13DA',
>    name: 'Will Smith',
>    admin: true,
>    years: 33,
>    listName: 'third list',
>  }]
>
>  public tableColumns: IpiTableColumn[] = [
>    { label: 'Id', value: 'id', width: '70px' },
>    { label: 'Name', value: 'name', width: '70px' },
>    { label: 'Years', value: 'years', type: IpiTableColumnType.Number, width: '60px'}
>    { label: 'Admin', value: 'admin', type: IpiTableColumnType.Chip width: '70px' },
>    { label: 'List name', value: 'listName', width: '70px' },
>    { label: 'Actions', value: '', type: IpiTableColumnType.Actions, width: '100px',
>      singleActions: [
>        label: 'Download',
>        icon: 'img/download.svg',
>        execute: (row) = execute(row: any)
>      ]
>    }
>  ]
>   
>  public tableChange(from: number, to: number, nextSortingColumn?: any, filter?: string): any {
>    // Your server side data logic here
>  }
>
>  public execute(row: any) {
>    // bind any logic to customizable icon inside the table row
>  }
> 
>}
>```
>**`parent.component.html`**
>```html
><ipi-table #serverSide
>   [serverSide]="true"
>   [data]="tableData" [columns]="tableColumns"
>   [filter]="tableFilter" [pageable]="true" 
>   [dataLength]="tableData.length"
>   [isLoading]="true/false"
>   (tableChange)="tableChange($event.from, $event.to, $event.sort, $event.filter)">
></ipi-table>
>
><ipi-table #local
>   [data]="localData" [columns]="tableColumns"
>   [filter]="tableFilter" [pageable]="true">
></ipi-table>
>```

### Inputs

>#### serverSide
>When true it make the table emit events when a change happens with the following properties 
>{from, to, sort, filter} which we can use to create a request and get data.
>Also stops local filter and sorting logic from executing.

>#### data
>The data that the table initializes.

>#### columns
>The columns that will the table have and based on the columns the data will be visualized.

>#### pageable
>Whether or not the table has more than one page

>#### sortable
>Blocks local sorting when set to false

>#### currentSortedColumn / used with serverSide /
>Refference to the column that is used as a sorter needed for keeping track when changes occur (example
>page change, new sorting column, sorting same column (reverse sorting), filtering)

>#### isLoading / used with serverSide /
>When true triggers an animation that blocks the table and shows a loading bar.

>#### dataLength / used with serverSide /
>The length of the data passed from parent element needed to display properply the pages and the results count.


### CSS Variables
>Here are all the available CSS variables (and their default values) you can set when using the ipi-table:
>
>```css
>ipi-table {
>    /* Colors, Fills, Strokes: */
>    --ipi-table-background-color: #FFFFFF;
>    --ipi-table-row-bottom-border-color: #E9E9E9;
>    --ipi-table-first-row-text-color: #5D6068;
>    --ipi-table-arranger-hover-color: #F96138;
>    --ipi-table-loading-bar-color: #FF7F50;
>
>    /* Color of all icons on hover */
>    --ipi-table-action-icon-hover-fill: #F96138;
>    --ipi-table-action-icon-hover-stroke: #FFFFFF00;
>    --ipi-table-action-hover-background-color: #F7F8FB;
>
>    /* Color of the single icons */
>    --ipi-table-action-icon-fill: #5D6068;
>    --ipi-table-action-icon-stroke: #FFFFFF00;
>
>    /* Color of icon that opens the multiple actions */
>    --ipi-table-action-more-icon-fill: #F96138;
>    --ipi-table-action-more-icon-stroke: #FFFFFF00;
>
>    /* Color of the icons of multiple actions */
>    --ipi-table-dropdown-action-icon-fill: #5D6068;
>    --ipi-table-dropdown-action-icon-stroke: #FFFFFF00;
>
>    /* Background on dropdown if stacked actions are initialized */
>    --ipi-table-more-actions-dropdown-background-color: #FFFFFF;
>    --ipi-table-more-actions-dropdown-hover-background-color: #00000010;
>
>    /* Page picker styling */
>    --ipi-table-page-picker-text-color: #FFFFFF;
>    --ipi-table-page-picker-background: #F96138;
>
>    /* Chip columns color styling */
>    --ipi-table-chip-color: #F96138;
>    --ipi-table-chip-background-color: #FFF2EF;
>
>    --ipi-table-chip-color-secondary: #0B1222;
>    --ipi-table-chip-background-color-secondary: #E2E2E2;
>
>/* Note: When you want to setup the color of your icon
> you should experiment with both these variables or consider
> using the one your icon is based on.  */
>}
>```

-----------------------------------------------------------------

# IPI Textarea Component
A simple input textarea that handles formGroup control with validators.

## Usage
>**`parent.component.ts`**
>```typescript
>import { IpiTextAreaComponent, IpiTextAreaOptions }
>from '@ipi-soft/ng-components';
>
>@Component({
>  imports: [ IpiTextAreaComponent ]
>})
>
>export class TextAreaExample {
>
>  public formGroup = new FormGroup({
>    textareaControl: ['', [Validators.required]],
>   });
>
>  public textAreaOptions = {
>    label: 'Your message inside the placeholder',
>    icon: 'icon.svg',
>    formGroup: formGroup,
>    formControlName: 'textareaControl',
>   errors: {
>      required: 'Textarea is required',
>    }
>  }
>
>}
>
>```
>**`parent.component.html`**
>```html 
>
> <ipi-textarea 
>   class="fluid"
>   [options]="textAreaOptions">
> </ipi-textarea>
>
> <!-- No form group -->
><ipi-textarea 
>  [options]="{ label: 'Placeholder' }"
>  (textAreaChange)="textAreaChange($event)">
></ipi-textarea>
>
>```
>

### Inputs

>#### options
>Options of type IpiTextAreaOptions. Only label is required.
>{
>    label - initial placeholder message
>    icon - name of an icon that is inside in local assets/ path
>    formGroup - way to add the textarea to reactive form
>    formControlName - name of the control inside the formGroup
>}

>#### textAreaChange 
>EventEmitter when there is a change in the input of the textarea.

>#### class 'fluid'
>Adds custom width and height (100% 100%) based on a parent component.

### CSS Variables
>Here are all the available CSS variables (and their default values) you can set when using the ipi-textarea:

>```css
>ipi-textarea {
>    /* Colors, Fills, Strokes: */
>    --ipi-textarea-text-color: #0B1222;
>    --ipi-textarea-text-placeholder-color: #C6C6C6;
>
>    --ipi-textarea-background-color: transparent;
>
>    --ipi-textarea-icon-fill: #C6C6C6;
>    
>    /* Text area border styling */
>    --ipi-textarea-border-color: #E9E9E9;
>    --ipi-taxtarea-border-width: 1px;
>
>    --ipi-textarea-invalid-border-color: #F96138;
>    --ipi-textarea-invalid-border-width: 1px;
>
>    --ipi-textarea-disabled-border-color: #F2F2F2;
>
>    /* Text area scroll styling */
>    --ipi-textarea-scrollbar-color: #E2E2E2bb;
>    --ipi-textarea-scrollbar-hover-color: #E2E2E2;
>
>    /* Text area's error text underneath input color */
>    --ipi-textarea-footer-color: #F96138;
>
>/* Note: When you want to setup the color of your icon
> you should experiment with both these variables or consider
> using the one your icon is based on.  */
>}
>```

-----------------------------------------------------------------

# IPI Tooltip Component
Simple tooltip that pops up on hover on a given parent component implemented as a directive. Custom message can be passed and a position.

## Usage
Import the tooltip inside the component you want to use it and 
place it as a directive to a component:

>**`parent.component.ts`**
>```typescript
>import { IpiTooltipDirective, TooltipPosition }
> from '@ipi-soft/ng-components';
>
>@Component({
>  imports: [ IpiTooltipDirective ]
>})
>
>export class TooltipExampleComponent {}
>
>```
>
>**`parent.component.html`**
>```html
>
><div
>  ipiTooltip='tooltip text'
>  [tooltipPosition]="TooltipPosition.Above">
></div>
>
>```
>

### Input

>#### tooltipPosition
>Enum with the following options: Above, After, Before, Below. Used for positioning the tooltip based on parent's position.
>Default is Before.

-----------------------------------------------------------------
