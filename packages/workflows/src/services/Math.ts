export class Math {
    public add = async (x: number, y: number): Promise<number> => {
        return Promise.resolve(x + y);
    };   
}
