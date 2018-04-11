import { Injectable } from '@angular/core';
import { Expense } from '../../models/expense';

@Injectable()
export class ExpensesProvider
{
    private state: Expense[] = [];
    constructor() { }

    addExpense(e: Expense)
    {
        this.state.push(e);
        console.log("Expense added: ", e);
    }

    get expenses() : Expense[] { return this.state; }

}
