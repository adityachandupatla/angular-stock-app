export class Utility {
    static beautify(somenum: number): string {
        return somenum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
}