import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage
{
    form: FormGroup;

    categoryChosen: boolean = false;
    categories = ['General', 'Transport', 'Special', 'Medicine', 'Sweet\'s', 'Coffee', 'Fast food'];
    filteredCategories: string[] = [];

    expenses = [];

    constructor(
        public navCtrl: NavController,
        private fb: FormBuilder
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
            expenseAmount: ['', Validators.compose([Validators.required, Validators.pattern(currencyPattern)])]
        });
        window['home'] = this;
    }

    get name() : AbstractControl { return this.form.get('expenseName'); }
    get category() : AbstractControl { return this.form.get('expenseCategory'); }
    get amount() : AbstractControl { return this.form.get('expenseAmount'); }

    addCategory(category)
    {
        this.categories.push(category);
        this.categoryChosen = true;
    }

    addExpense()
    {
        if(this.form.invalid) return;
        let expense = {
            name: this.name.value || 'Unnamed expense',
            category: this.category.value || 'Uncategorized',
            amount: this.amount.value
        };
        console.log("Expense would be like: ", expense);
        this.expenses.push(expense);
    }

    chooseCategory(category)
    {
        this.category.setValue(category);
        this.categoryChosen = true;
        this.filterCategories();
    }

    filterCategories()
    {
        if(this.categoryChosen)
        {
            this.filteredCategories = [];
            return;
        }

        this.filteredCategories = this.categories.filter(v => v.toLowerCase().includes(this.category.value.toLowerCase()));
        if(this.filteredCategories.length > 3)
            this.filteredCategories = this.filteredCategories.slice(0, 3);
    }

    handleInput()
    {
        if(this.category.value && this.category.value.trim() === "") return;
        if(this.categoryChosen)
            this.categoryChosen = false;
        this.filterCategories();
    }

    currencyCheck()
    {
        console.log("!");
    }
}
