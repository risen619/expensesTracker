import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dropdown-input',
    templateUrl: 'dropdown-input.html'
})
export class DropdownInputComponent
{
    /* UI part */
    @Input() label: string = "";
    @Input() placeholder: string = "";
    @Input() horizontalPadding: boolean = false;

    /* Logic part */
    @Input() private items: any[] = [];
    @Input() private limit: number = -1;
    @Input('query') private _query: string = "";
    @Output() private queryChange: EventEmitter<string> = new EventEmitter<string>();

    private noMatches: boolean = false;
    private filteredItems = [];

    constructor() { }

    private get query() : string { return this._query; }
    private set query(q: string) { this._query = q; this.queryChange.emit(this.query); }

    public refreshItems()
    {
        this.filterItems();
    }

    private clearFilteredItems() { this.filteredItems = []; }

    private oneMatchHandler() { this.noMatches = false; this.clearFilteredItems(); }

    private filterItems()
    {
        if(this.query.trim() == "") return this.clearFilteredItems();
        if(this.items.indexOf(this.query) != -1) return this.oneMatchHandler();

        this.filteredItems = this.items
        .map(i => i.match(RegExp(this.query, "i")))
        .filter(i => i != null)
        .sort((a,b) => a.index == b.index ? 0 : a.index > b.index ? 1 : -1)
        .map(i => i.input);

        if(this.filteredItems.length == 0) { this.noMatches = true; return; }
        else this.noMatches = false;
        if(this.limit == -1) return;
        if(this.filteredItems.length > this.limit)
            this.filteredItems = this.filteredItems.slice(0, this.limit);
    }

    private handleFocus()
    {
        console.log("Focus");
        this.filterItems();
    }

    private handleBlur()
    {
        console.log("Blur");
        // this.clearFilteredItems();
    }

    private handleInput(e)
    {
        console.log("Input");
        this.filterItems();
    }

    private handleClick(item)
    {
        console.log("Click: ", item);
        this.query = item;
    }

}
