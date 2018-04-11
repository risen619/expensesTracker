import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

import { DropdownInputComponent } from '../../components/dropdown-input/dropdown-input';
import { ExpensesProvider } from '../../providers';
import { Expense } from '../../models/expense';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage
{
    @ViewChild(DropdownInputComponent) dropdownInput: DropdownInputComponent;
    form: FormGroup;

    presetCategories = ['General', 'Transport', 'Special', 'Medicine', 'Sweets', 'Coffee', 'Fast food'];

    expenses = [];

    constructor(
        public navCtrl: NavController,
        private fb: FormBuilder,
        private expensesProvider: ExpensesProvider
    )
    {
        this.createForm();
    }

    createForm()
    {
        let currencyPattern = /^[1-9]\d*\.?\d{0,2}$/;
        this.form = this.fb.group({
            expenseName: '',
            expenseCategory: '',
            expenseAmount: ['', Validators.compose([Validators.required, Validators.pattern(currencyPattern)])],
            expenseCurrency: ['uah', Validators.required]
        });
        window['home'] = this;
    }

    get name() : AbstractControl { return this.form.get('expenseName'); }
    get category() : AbstractControl { return this.form.get('expenseCategory'); }
    get amount() : AbstractControl { return this.form.get('expenseAmount'); }
    get currency() : AbstractControl { return this.form.get('expenseCurrency'); }

    get categoryValue() : string { return this.category.value; }
    set categoryValue(s: string) { this.category.setValue(s); }

    addCategory(category)
    {
        this.presetCategories.push(category);
        this.dropdownInput.refreshItems();
    }

    addExpense()
    {
        if(this.form.invalid) return;
        let expense: Expense = new Expense({
            name: this.name.value || 'Unnamed expense',
            category: this.category.value || ['Uncategorized'],
            amount: this.amount.value || 0,
            currency: this.currency.value || 'No Currency',
            time: Date.now()
        });
        this.expensesProvider.addExpense(expense);
    }
}
