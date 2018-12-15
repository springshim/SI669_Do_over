export class Detail {

    public constructor(public detailTitle: string,
                        private detailId: number,
                        public checked: Boolean,
                        public priority: string) {

    }

    public setTitle(newTitle: string): void {
        this.detailTitle = newTitle;
    }

    public getTitle(): string {
        return this.detailTitle;
    }

    public getId(): number {
        return this.detailId;
    }

    public getChecked(): Boolean {
        return this.checked;
    }

    public getPriority(): string {
        return this.priority;
    }

}
