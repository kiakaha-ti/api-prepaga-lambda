class StrategyManager{
    constructor() {
        this._strategy = []
    }

    addStrategy(strategy){
        this._strategy= [...this._strategy, strategy]
    }

    getStrategy(uri){
        const strategy = this._strategy.find(strategy => strategy._uri===uri)
        if (strategy){
            return strategy
        } else {
            return this._strategy.find(strategy => strategy._uri==='default')
        }
    }
}

module.exports = StrategyManager;
