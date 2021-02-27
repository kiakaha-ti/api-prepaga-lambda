class StrategyManager{
    constructor() {
        this._strategy = []
    }

    addStrategy(strategy){
        this._strategy= [...this._strategy, strategy]
    }

    getStrategy(uri){
        return this._strategy.find(strategy => strategy._uri===uri)
    }
}

module.exports = StrategyManager;
