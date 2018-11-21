Object.defineProperty(Flag.prototype, 'pathToParent', {
    get() {
        const flag = this;
        if (!flag._sources) {
            if (!flag.memory.sourceIds) {
                flag.memory.sourceIds = flag.pos.find(FIND_SOURCES)
                    .map(source => source.id);
            }
            flag._sources = flag.memory.sourceIds.map(id => Game.getObjectById(id));
        }
        return flag._sources;
    },
    set(newValue) {
        flag.memory.sources = newValue.map(source => source.id);
        flag._sources = newValue;
    },
    enumerable: false,
    configurable: true
});
