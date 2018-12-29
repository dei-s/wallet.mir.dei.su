/******************************************************************************
 * Copyright © 2016 The Waves Developers.                                     *
 *                                                                            *
 * See the LICENSE files at                                                   *
 * the top-level directory of this distribution for the individual copyright  *
 * holder information and the developer policies on copyright and licensing.  *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * Waves software, including this file, may be copied, modified, propagated,  *
 * or distributed except according to the terms contained in the LICENSE      *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

/**
 * @requires {decimal.js}
 */
var Currency = (function () {
	var currencyCache = {};

	function Currency(data) {
		data = data || {};

		this.id = data.id; // base58 encoded asset id of the currency
		this.displayName = data.displayName;
		this.shortName = data.shortName || data.displayName;
		this.precision = data.precision; // number of decimal places after a decimal point
		this.verified = data.verified || false;

		if (data.roundingMode !== undefined) {
			this.roundingMode = data.roundingMode;
		} else {
			this.roundingMode = Decimal.ROUND_HALF_UP;
		}

		return this;
	}

	Currency.prototype.toString = function () {
		if (this.shortName)
			return this.shortName;

		return this.displayName;
	};

	var MIR = new Currency({
		id: '',
		displayName: 'МИР',
		shortName: 'MIR',
		precision: 8,
		verified: true
	});

	var LBR = new Currency({
		id: '55WhEqBaGb6Z9DK3bHJQkk4jEDwRejc1xJttyxiykMnL',
		displayName: 'LBR',
		shortName: 'LBR',
		precision: 8,
		verified: true
	});

	function isCached(assetId) {
		return currencyCache.hasOwnProperty(assetId);
	}

	function invalidateCache() {
		currencyCache = {};
		currencyCache[LBR.id] = LBR;
		currencyCache[MIR.id] = MIR;
	}

	invalidateCache();

	return {
		create: function (data) {
			// if currency data.id is not set - it's a temporary instance
			if (!_.has(data, 'id')) {
				return new Currency(data);
			}

			if (!currencyCache[data.id]) {
				currencyCache[data.id] = new Currency(data);
			}

			return currencyCache[data.id];
		},
		invalidateCache: invalidateCache,
		isCached: isCached,
		LBR: LBR,
		MIR: MIR
	};
})();

// set up decimal to format 0.00000001 as is instead of 1e-8
Decimal.config({toExpNeg: -(Currency.MIR.precision + 1)});
