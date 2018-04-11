class ExpenseModel
{
    name: string;
    category: string;
    amount: number;
    currency: string;
    time: number;
}

class Expense
{
    name: string;
    category: string;
    amount: number;
    currency: string;
    time: number;

    constructor(model: ExpenseModel)
    {
        for(let v in model) this[v] = model[v];
    }

    get id() : number { return this.time; }
}

export { Expense };