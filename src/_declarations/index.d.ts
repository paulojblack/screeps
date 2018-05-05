// type shim for nodejs' `require()` syntax
// for stricter node.js typings, remove this and install `@types/node`
declare const require: (module: string) => any;

declare var global: any;

declare namespace NodeJS {
    interface Global {
        Queen: IQueen
        log: any;

        // Profiler: any;
        deref(ref: string): RoomObject | null;

        // derefRoomPosition(protoPos: protoPos): RoomPosition;
    }
}

interface IQueen {
    Provinces: { [roomName: string]: Province }
    // Court: { [lordName: string]: any}

}


interface Province {
    Territories?: string[]?

}