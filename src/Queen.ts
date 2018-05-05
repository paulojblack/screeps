export default class Queen implements IQueen {
    public Provinces: { [roomName: string]: Province };

    constructor() {
        this.Provinces = {};
    }

    public awaken(): void {
        this.mapTheRealm();
    }

    public ponder(): void {

    }

    public demand(): void {

    }

    public journal(): void {

    }

    public sleep(): void {

    }

    private mapTheRealm() {
        const territories: { [roomName: string]: string[] } = {};

        for (const name in Game.rooms) {
            if (Game.rooms[name].my) {
                this.Provinces[name] = {};
                this.Provinces[name].Territories = []
                global.log.printObject(this.Provinces[name]);
                // colonyOutposts[name] = [];		// Make a blank list of outposts
                // this.colonyMap[name] = name;	// Register capitols to their own colonies
            }
        }
    }
}
