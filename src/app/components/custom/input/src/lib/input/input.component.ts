import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgIf, NgClass, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SvgIconComponent } from 'angular-svg-icon';

import { IpiTooltipDirective, TooltipPosition } from '@ipi-soft/ng-components/tooltip';

export interface IpiInputOptions {
  label: string;
  type?: string;
  tooltip?: string;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  helperRoute?: string;
  prefixImg?: string;
  suffixImg?: string;
  formGroup?: FormGroup;
  formControlName?: string;
  errors?: IpiControlErrors;
}

export interface IpiControlErrors {
  [x: string]: string;
}

@Component({
  selector: 'ipi-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgTemplateOutlet,
    RouterLink,
    FormsModule,
    SvgIconComponent,
    ReactiveFormsModule,
    IpiTooltipDirective
  ]
})

export class IpiInputComponent implements OnInit {

  @Input() options: IpiInputOptions | null = null;

  @Output() inputChange = new EventEmitter<string>();
  @Output() suffixImgChange = new EventEmitter<void>();
  @Output() helperTextChange = new EventEmitter<void>();

  constructor() { }

  public control!: AbstractControl | null;

  public tooltipPosition = TooltipPosition;

  public ngOnInit(): void {
    this.control = this.getControl();
  
    if (this.options && !this.options.placeholder) {
      this.options.placeholder = this.options.label;
    }
  }

  public onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.inputChange.emit(target.value);
  }

  public onSuffixImage(): void {
    this.suffixImgChange.emit();
  }

  public onHelperText(): void {
    this.helperTextChange.emit();
  }

  public getLabel(): string {
    const options = this.options!;
    const formGroup = options.formGroup;
    const formControlName = options.formControlName;

    let label!: string;

    if (formGroup && formControlName && options.errors && this.checkIfControlInvalid()) {
  
      for (const error in options.errors) {
        if (formGroup.controls[formControlName].hasError(error)) {
          label = options.errors[error];
        }
      }

    }

    return label;
  }

  public checkIfControlInvalid(): boolean {
    if (this.control) {
      return this.control.touched && this.control.invalid;
    }

    return false;
  }

  public checkIfControlDisabled(): boolean {
    if (this.options?.disabled) {
      this.control?.disable();

      return true;
    }

    if (this.control) {
      return this.control.disabled;
    }

    return false;
  }

  private getControl(): AbstractControl | null {
    if (this.options && this.options.formGroup && this.options.formControlName) {
      return this.options.formGroup.controls[this.options.formControlName];
    }

    return null;
  }

}
