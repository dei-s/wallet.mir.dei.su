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

(function() {
    'use strict';

    angular
        .module('app.ui', [])
        .constant('ui.events', {
            SPLASH_COMPLETED: 'splash-completed',
            LOGIN_SUCCESSFUL: 'login-successful',
            LEASING_CANCEL: 'leasing-cancel'
        });

    angular
        .module('app.ui')
        // actual values are set in the application config phase
        .constant('constants.application', {
            CLIENT_VERSION: '',
            NODE_ADDRESS: '',
            COINOMAT_ADDRESS: ''
        });
})();

(function () {
    'use strict';

    angular
        .module('app.ui')
        .service('utilsService', ['constants.network', function (networkConstants) {
            this.isTestnet = function () {
                return networkConstants.NETWORK_NAME === 'devel' || networkConstants.NETWORK_NAME === 'testnet';
            };

            this.testnetSubstitutePair = function (pair) {
                var realIds = {};
                realIds[Currency.BTC.id] = '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS';
                realIds[Currency.USD.id] = 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck';
                realIds[Currency.EUR.id] = 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU';
                realIds[Currency.CNY.id] = 'DEJbZipbKQjwEiRjx2AqQFucrj5CZ3rAc4ZvFM8nAsoA';

                return {
                    amountAsset: {id: realIds[pair.amountAsset.id] || ''},
                    priceAsset: {id: realIds[pair.priceAsset.id] || realIds[Currency.BTC.id]}
                };
            };
        }]);
})();

(function () {
    'use strict';

    function ApplicationContextFactory(constants) {

        var assets = {};

        return {
            account: {},
            cache: {
                assets: assets,
                updateAsset: function (assetId, balance, reissuable, totalTokens) {
                    var asset = assets[assetId];
                    if (asset) {
                        asset.balance = Money.fromCoins(balance, asset.currency);
                        asset.totalTokens = Money.fromCoins(totalTokens, asset.currency);
                        asset.reissuable = reissuable;
                    }
                },
                putAsset: function (issueTransaction) {
                    var currency = Currency.create({
                        id: issueTransaction.assetId,
                        displayName: issueTransaction.name,
                        precision: issueTransaction.decimals
                    });
                    var asset = {
                        currency: currency,
                        description: issueTransaction.description,
                        timestamp: issueTransaction.timestamp,
                        sender: issueTransaction.sender,
                        totalTokens: Money.fromCoins(issueTransaction.quantity, currency)
                    };
                    var balance;

                    if (angular.isDefined(assets[currency.id])) {
                        balance = assets[currency.id].balance;
                    } else {
                        balance = new Money(0, currency);
                    }

                    asset.balance = balance;

                    assets[currency.id] = asset;
                },
                getAssetsList: function () {
                    return Object.keys(assets).map(function (key) {
                        return assets[key];
                    });
                }
            }
        };
    }

    ApplicationContextFactory.$inject = ['constants.transactions'];

    angular
        .module('app.ui')
        .factory('applicationContext', ApplicationContextFactory);
})();

(function () {
    'use strict';

    function CoinomatRestangularFactory(constants, rest) {
        return rest.withConfig(function(configurer) {
            configurer.setBaseUrl(constants.COINOMAT_ADDRESS);
        });
    }

    function DatafeedRestangularFactory(constants, rest) {
        return rest.withConfig(function(configurer) {
            configurer.setBaseUrl(constants.DATAFEED_ADDRESS);
        });
    }

    function MatcherRestangularFactory(constants, rest) {
        return rest.withConfig(function(configurer) {
            configurer.setBaseUrl(constants.MATCHER_ADDRESS);
        });
    }

    CoinomatRestangularFactory.$inject = ['constants.application', 'Restangular'];
    DatafeedRestangularFactory.$inject = ['constants.application', 'Restangular'];
    MatcherRestangularFactory.$inject = ['constants.application', 'Restangular'];

    angular
        .module('app.ui')
        .factory('CoinomatRestangular', CoinomatRestangularFactory)
        .factory('DatafeedRestangular', DatafeedRestangularFactory)
        .factory('MatcherRestangular', MatcherRestangularFactory);
})();

(function () {
    'use strict';

    var SCREENS = {
        splash: 'splash-screen',
        accounts: 'accounts-screen',
        main: 'main-screen'
    };

    function HomeController($scope, $window, events, applicationConstants, utilsService,
                            dialogService, applicationContext, notificationService, apiService) {

        $scope.isTestnet = utilsService.isTestnet;

        var home = this;
        home.screen = SCREENS.splash;
        home.featureUnderDevelopment = featureUnderDevelopment;
        home.logout = logout;

        home.title = utilsService.isTestnet() ? 'TESTNET ' : '';
        home.version = applicationConstants.CLIENT_VERSION;

        $scope.$on(events.SPLASH_COMPLETED, function () {
            home.screen = SCREENS.accounts;
        });

        $scope.clipboardOk = function (message) {
            message = message || 'Address copied successfully';
            notificationService.notice(message);
        };

        $scope.$on(events.LOGIN_SUCCESSFUL, function (event, account) {
            // putting the current account to the app context
            applicationContext.account = account;

            NProgress.start();
            apiService.assets.balance(applicationContext.account.address)
                .then(function (response) {
                    _.forEach(response.balances, function (balanceItem) {
                        applicationContext.cache.putAsset(balanceItem.issueTransaction);
                    });
                })
                .finally(function () {
                    home.screen = SCREENS.main;
                    NProgress.done();
                });
        });

        function featureUnderDevelopment() {
            dialogService.open('#feat-not-active');
        }

        function logout() {
            if ($window.chrome && $window.chrome.runtime && typeof $window.chrome.runtime.reload === 'function') {
                $window.chrome.runtime.reload();
            } else {
                $window.location.reload();
            }
        }
    }

    HomeController.$inject = ['$scope', '$window', 'ui.events', 'constants.application', 'utilsService',
        'dialogService', 'applicationContext', 'notificationService', 'apiService'];

    angular
        .module('app.ui')
        .controller('homeController', HomeController);
})();

(function () {
    'use strict';

    angular
        .module('app.ui')
        .controller('splashController', ['$scope', '$timeout', 'ui.events', function ($scope, $timeout, events) {
            NProgress.start();

            $timeout(function () {
                NProgress.done();
                $scope.$emit(events.SPLASH_COMPLETED);
            }, 1);
        }]);
})();

(function() {
    'use strict';

    angular
        .module('app.shared', []);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .constant('constants.tooltip', {
            contentAsHTML: false,
            delay: 1000
        });
})();

(function () {
    'use strict';

    // TODO : move to the future `appState` service.

    var predefinedAssets = [
        Currency.BTC,
        Currency.USD,
        Currency.EUR,
        Currency.CNY,
        Currency.WCT,
        Currency.MRT
    ];

    angular
        .module('app.shared')
        .factory('assetStoreFactory', [
            '$q', 'apiService', 'matcherApiService', function ($q, apiService, matcherApiService) {
                function AssetStore(address) {
                    this.address = address;
                    this.balances = {};
                    this.promise = $q.when();
                }

                AssetStore.prototype._getBalances = function () {
                    var self = this;
                    this.promise = this.promise
                        .then(function () {
                            return apiService.assets.balance(self.address);
                        })
                        .then(function (response) {
                            response.balances.forEach(function (asset) {
                                self.balances[asset.assetId] = Money.fromCoins(asset.balance, Currency.create({
                                    id: asset.assetId,
                                    displayName: asset.issueTransaction.name,
                                    shortName: asset.issueTransaction.name,
                                    precision: asset.issueTransaction.decimals
                                }));
                            });
                        })
                        .then(apiService.address.balance.bind(apiService.address, self.address))
                        .then(function (response) {
                            self.balances[Currency.MIR.id] = Money.fromCoins(response.balance, Currency.MIR);
                        });
                };

                AssetStore.prototype._getPredefined = function () {
                    var self = this;
                    this.promise = this.promise
                        .then(function () {
                            predefinedAssets.forEach(function (asset) {
                                if (!self.balances[asset.id]) {
                                    self.balances[asset.id] = Money.fromCoins(0, asset);
                                }
                            });
                        });
                };

                AssetStore.prototype._getTradedAssets = function () {
                    var self = this;
                    this.promise = this.promise
                        .then(matcherApiService.loadAllMarkets)
                        .then(function (markets) {
                            markets.forEach(function (market) {
                                var amountAsset = market.amountAsset;
                                if (!self.balances[amountAsset.id]) {
                                    self.balances[amountAsset.id] = Money.fromCoins(0, amountAsset);
                                }

                                var priceAsset = market.priceAsset;
                                if (!self.balances[priceAsset.id]) {
                                    self.balances[priceAsset.id] = Money.fromCoins(0, priceAsset);
                                }
                            });
                        });
                };

                AssetStore.prototype.getAll = function () {
                    var self = this;

                    self._getBalances();
                    self._getPredefined();
                    self._getTradedAssets();
                    self.promise = self.promise.then(function () {
                        return Object.keys(self.balances).map(function (key) {
                            return self.balances[key];
                        });
                    });

                    return self.promise;
                };

                AssetStore.prototype.syncGet = function (id) {
                    return this.balances[id];
                };

                AssetStore.prototype.syncGetAsset = function (id) {
                    var item = this.syncGet(id);
                    if (item && item.currency) {
                        return item.currency;
                    }
                };

                AssetStore.prototype.syncGetBalance = function (id) {
                    var item = this.syncGet(id);
                    if (item && item.amount) {
                        return item.amount.toNumber();
                    } else {
                        return 0;
                    }
                };

                var stores = {};

                return {
                    createStore: function (address) {
                        if (!stores[address]) {
                            stores[address] = new AssetStore(address);
                        }
                        return stores[address];
                    }
                };
            }
        ]);
})();

(function () {
    'use strict';

    var allowedParams = ['amount', 'label', 'message'];

    angular
        .module('app.shared')
        .service('bitcoinUriService', [function () {

            this.generate = function (address, params) {

                if (!address || typeof address !== 'string') {
                    return '';
                }

                var uri = 'bitcoin:' + address,
                    keys = Object.keys(params || {});

                if (keys.length) {
                    uri += keys.reduce(function (queryString, key) {
                        if (allowedParams.indexOf(key) > -1) {
                            return queryString + key + '=' + params[key] + '&';
                        } else {
                            return queryString;
                        }
                    }, '?');
                    uri = uri.slice(0, -1); // Remove trailing '&'
                }

                return uri;

            };

            // this.validate = function (uri) {};

        }]);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .service('dialogService', ['$document', function ($document) {
            this.open = function (elementAccessor, options) {
                angular.element(elementAccessor).modal(options);
            };

            this.openNonCloseable = function (elementAccessor) {
                this.open(elementAccessor, {
                    escapeClose: false,
                    clickClose: false,
                    showClose: false
                });
            };

            this.close = function () {
                angular.element.modal.close();
            };

            /**
                jquery.modal pollutes document body with copied modal dialog divs
                This creates several items with the same "id" and dialogService opens
                dialogs with outdated data
             */
            this.cleanup = function () {
                var result = $document.find('body > div.modal.recyclable');
                _.forEach(result, function (divNode) {
                    divNode.remove();
                });
            };
        }]);
})();

(function () {
    'use strict';

    var prefix = 'Mir';

    angular
        .module('app.shared')
        .service('documentTitleService', [function () {
            this.set = function (title) {
                document.title = prefix + (title ? ' | ' + title : '');
            };
        }]);
})();

(function () {
    'use strict';

    var DELAY = 500;

    function debounce(notifier) {
        var lastCalls = {};
        return function (message) {
            var now = Date.now();
            lastCalls[message] = lastCalls[message] || 0;
            if (lastCalls[message] + DELAY < now) {
                lastCalls[message] = now;
                notifier(message);
            }
        };
    }

    angular
        .module('app.shared')
        .service('notificationService', [function () {
            this.notice = debounce(function (message) {
                angular.element.growl.notice({message : message});
            });

            this.error = debounce(function (message) {
                angular.element.growl.error({message : message});
            });

            this.warning = debounce(function (message) {
                angular.element.growl.warning({message : message});
            });
        }]);
})();

(function () {
    'use strict';

    var spamAssets = {
    };
    var hasBeenUpdated = false; // set this to false to update asset list from github
    var isPendingUpdate = false;
    var SPAM_ASSET_LIST_URL = 'https://raw.githubusercontent.com/wavesplatform/waves-community/' +
        'master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Waves%20Community.csv';

    angular
        .module('app.shared')
        .service('spamAssetService', ['$http', function ($http) {
            var self = this;

            this.parseAssetList = function (communityContent) {
                var lines = communityContent.split('\n');
                var result = {};
                _.forEach(lines, function (line) {
                    var parts = line.split(',');
                    if (parts.length > 0) {
                        var assetId = parts[0].trim();
                        if (assetId) {
                            result[assetId] = true;
                        }
                    }
                });

                return result;
            };

            this.isSpam = function (assetId) {
                if (!assetId) {
                    return false;
                }

                var result = !!spamAssets[assetId];

                if (!hasBeenUpdated && !isPendingUpdate) {
                    isPendingUpdate = true;
                    $http.get(SPAM_ASSET_LIST_URL).then(function (response) {
                        spamAssets = self.parseAssetList(response.data);
                    }).catch(function () {
                        // do nothing
                    }).then(function () {
                        // if we failed to update spam asset list, there is no need to try again
                        isPendingUpdate = false;
                        hasBeenUpdated = true;
                    });
                }

                return result;
            };
        }]);
})();

(function () {
    'use strict';

    var DEFAULT_ASSET_ID_FIELD_NAME = 'assetId';

    function AntiSpamFilter(spamAssetService) {
        return function filterInput(input, fieldName) {
            if (!input) {
                return [];
            }

            fieldName = fieldName || DEFAULT_ASSET_ID_FIELD_NAME;

            return _.filter(input, function (tx) {
                return !spamAssetService.isSpam(tx[fieldName]);
            });
        };
    }

    AntiSpamFilter.$inject = ['spamAssetService'];

    angular
        .module('app.shared')
        .filter('antiSpam', AntiSpamFilter);
})();

(function () {
    'use strict';

    function PadderFilter() {
        return function filterInput(input, maxLength) {
            var spaces = '',
                i = input.length;

            while (i++ < maxLength) {
                spaces +=  '&nbsp;';
            }

            return spaces + input;
        };
    }

    angular
        .module('app.shared')
        .filter('padder', PadderFilter);
})();

(function () {
    'use strict';

    function PageController($attrs, documentTitleService) {
        // documentTitleService.set($attrs.pageTitle); // TODO : uncomment this when all pages are using that component.
    }

    PageController.$inject = ['$attrs', 'documentTitleService'];

    angular
        .module('app.shared')
        .component('wavesPage', {
            controller: PageController,
            bindings: {
                pageTitle: '@'
            }
        });
})();

(function () {
    'use strict';

    var BACKGROUND = '#fff',
        FOREGROUND = '#000',
        SIZE = 150;

    function QrCodeController($element) {

        var ctrl = this,
            canvas = $element.children('canvas'),
            qr = new QRious({
                element: canvas.get(0),
                size: ctrl.size || SIZE
            });

        ctrl.setCode = function () {
            ctrl.removeCode();
            if (ctrl.value) {
                qr.background = ctrl.background || BACKGROUND;
                qr.foreqround = ctrl.foreground || FOREGROUND;
                qr.size = ctrl.size || SIZE;
                qr.value = ctrl.value;
                canvas.removeClass('hidden');
            }
        };

        ctrl.removeCode = function () {
            canvas.addClass('hidden');
        };

        ctrl.$onInit = ctrl.setCode.bind(ctrl);

        ctrl.$onChanges = function (changes) {
            if (changes.value) {
                ctrl.setCode();
            }
        };

    }

    angular
        .module('app.shared')
        .component('wavesQrCode', {
            controller: QrCodeController,
            bindings: {
                size: '<',
                background: '<',
                foreground: '<',
                value: '<'
            },
            template: '<canvas class="hidden"></canvas>'
        });
})();

(function () {
    'use strict';

    function ScrollboxController() {}

    angular
        .module('app.shared')
        .component('wavesScrollbox', {
            controller: ScrollboxController,
            transclude: true,
            template: '<div ng-transclude></div>'
        });
})();

(function () {
    'use strict';

    function WavesDialogController($scope, dialogService) {
        var defaults = {
            isError: false,
            cancelButtonVisible: true,
            closeable: true,
            showButtons: true,
            okButtonCaption: 'OK',
            okButtonEnabled: true,
            cancelButtonCaption: 'CANCEL'
        };

        _.defaults($scope, defaults);

        var imageSuffix = $scope.isError ? '-danger' : '';
        $scope.image = 'modal-header' + imageSuffix;
        if (!$scope.closeable) {
            $scope.image = 'modal-header-round';
        }

        $scope.image += '.svg';

        $scope.onOk = function () {
            var shouldClose;

            if ($scope.dialogOk) {
                shouldClose = $scope.dialogOk();
            }

            if (angular.isUndefined(shouldClose) || shouldClose !== false) {
                dialogService.close();
            }
        };

        $scope.onCancel = function () {
            if ($scope.dialogCancel) {
                $scope.dialogCancel();
            }

            dialogService.close();
        };
    }

    function WavesDialogLink(scope, element) {
        element.addClass('wavesPop');

        if (!scope.global) {
            element.addClass('recyclable');
        }
    }

    angular
        .module('app.shared')
        .directive('wavesDialog', function WavesDialogDirective() {

            return {
                restrict: 'A',
                controller: ['$scope', 'dialogService', WavesDialogController],
                transclude: true,
                scope: {
                    closeable: '=?',
                    cancelButtonVisible: '=?',
                    showButtons: '=?',
                    tooltip: '=?',
                    dialogOk: '&onDialogOk',
                    dialogCancel: '&onDialogCancel',
                    okButtonCaption: '@',
                    okButtonEnabled: '=?',
                    cancelButtonCaption: '@',
                    isError: '=?',
                    global: '=?',
                    noSupportLink: '=?'
                },
                link: WavesDialogLink,
                templateUrl: 'shared/dialog.directive'
            };
        });
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .directive('focusMe', ['$timeout', function WavesFocusDirective($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attributes) {
                    scope.$watch(attributes.focusMe, function (newValue) {
                        $timeout(function () {
                            return newValue && element[0].focus();
                        });
                    }, true);
                }
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .directive('tooltipster', ['constants.tooltip', function WavesTooltipsterDirective(constants) {

            return {
                restrict: 'A',
                link: function (scope, element, attributes) {
                    var text;
                    if (angular.isDefined(attributes.title))
                        text = attributes.title;
                    else if (angular.isDefined(attributes.tooltipTitle))
                        text = attributes.tooltipTitle;

                    if (angular.isUndefined(text))
                        throw new Error('Tooltip text is undefined. ' +
                            'Tooltipster directive is unnecessary for element: ' + element);

                    var tooltipOptions = _.clone(constants);
                    if (angular.isDefined(attributes.tooltipTheme))
                        tooltipOptions.theme = attributes.tooltipTheme;
                    tooltipOptions.content = text;

                    if (angular.isDefined(attributes.tooltipHtml) || attributes.tooltipHtml === true)
                        tooltipOptions.contentAsHTML = true;

                    element.tooltipster(tooltipOptions);

                    scope.$on('$destroy', function DestroyTooltip() {
                        element.tooltipster('destroy');
                    });
                }
            };
        }]);
})();

(function () {
    'use strict';

    function WavesTransactionLoadingService($q, constants, apiService) {
        var self = this;

        // returns promise that loads and merges unconfirmed and confirmed transactions
        this.loadTransactions = function (account, limit) {
            var unconfirmed;
            return apiService.transactions.unconfirmed()
                .then(function (response) {
                    unconfirmed = response;

                    return apiService.transactions.list(account.address, limit);
                })
                .then(function (response) {
                    // FIXME : redo this when the API is fixed.
                    if (response[0] instanceof Array) {
                        response = response[0];
                    }

                    return self.mergeTransactions(account, unconfirmed, response);
                });
        };

        this.refreshAssetCache = function (cache, transactions) {
            var sequence = $q.resolve();
            _.forEach(transactions, function (tx) {
                var assetId;
                if (tx.assetId) {
                    assetId = tx.assetId;
                } else if (tx.order1 && tx.order1.assetPair.amountAsset) {
                    assetId = tx.order1.assetPair.amountAsset;
                }
                var feeAssetId;
                if (tx.feeAsset) {
                    feeAssetId = tx.feeAsset;
                }

                var cached;

                if (assetId) {
                    cached = cache.assets[assetId];
                    if (!cached) {
                        sequence = sequence
                            .then(function () {
                                return apiService.transactions.info(assetId);
                            })
                            .then(function (response) {
                                cache.putAsset(response);
                            });
                    }
                }

                if (feeAssetId) {
                    cached = cache.assets[feeAssetId];
                    if (!cached) {
                        sequence = sequence
                            .then(function () {
                                return apiService.transactions.info(feeAssetId);
                            })
                            .then(function (response) {
                                cache.putAsset(response);
                            });
                    }
                }
            });

            return sequence;
        };

        // TODO : refactor with a map.
        this.mergeTransactions = function (account, unconfirmed, confirmed) {
            var rawAddress = account.address;
            unconfirmed = _.filter(unconfirmed, function (transaction) {
                if (transaction.type === constants.EXCHANGE_TRANSACTION_TYPE) {
                    return transaction.order1.senderPublicKey === account.keyPair.public ||
                        transaction.order2.senderPublicKey === account.keyPair.public ||
                        transaction.sender === rawAddress;
                } else {
                    return (transaction.sender === rawAddress || transaction.recipient === rawAddress);
                }
            });
            var unconfirmedSignatures = _.map(unconfirmed, function (transaction) {
                return transaction.signature;
            });
            confirmed = _.filter(confirmed, function (transaction) {
                return unconfirmedSignatures.indexOf(transaction.signature) === -1;
            });
            unconfirmed = _.map(unconfirmed, function (transaction) {
                transaction.unconfirmed = true;

                return transaction;
            });

            return _.union(unconfirmed, confirmed);
        };
    }

    WavesTransactionLoadingService.$inject = ['$q', 'constants.transactions', 'apiService'];

    angular
        .module('app.shared')
        .service('transactionLoadingService', WavesTransactionLoadingService);
})();

(function () {
    'use strict';

    function TransactionFilter(constants, applicationContext, formattingService) {
        var TRANSACTION_SPEC = {};
        TRANSACTION_SPEC[constants.PAYMENT_TRANSACTION_TYPE] = {
            type: 'Payment',
            processor: processPaymentTransaction
        };
        TRANSACTION_SPEC[constants.ASSET_ISSUE_TRANSACTION_TYPE] = {
            type: 'Asset Issue',
            processor: processAssetIssueTransaction
        };
        TRANSACTION_SPEC[constants.ASSET_TRANSFER_TRANSACTION_TYPE] = {
            type: 'Transfer',
            processor: processAssetTransferTransaction
        };
        TRANSACTION_SPEC[constants.ASSET_REISSUE_TRANSACTION_TYPE] = {
            type: 'Asset Reissue',
            processor: processAssetReissueTransaction
        };
        TRANSACTION_SPEC[constants.START_LEASING_TRANSACTION_TYPE] = {
            type: 'Start Leasing',
            processor: processStartLeasingTransaction
        };
        TRANSACTION_SPEC[constants.CANCEL_LEASING_TRANSACTION_TYPE] = {
            type: 'Cancel Leasing',
            processor: processCancelLeasingTransaction
        };
        TRANSACTION_SPEC[constants.CREATE_ALIAS_TRANSACTION_TYPE] = {
            type: 'Create Alias',
            processor: processCreateAliasTransaction
        };
        TRANSACTION_SPEC[constants.EXCHANGE_TRANSACTION_TYPE] = {
            type: '',
            processor: processExchangeTransaction
        };
        TRANSACTION_SPEC[constants.MASS_PAYMENT_TRANSACTION_TYPE] = {
            type: 'Mass Payment',
            processor: processMassPaymentTransaction
        };

        function buildTransactionType (number) {
            var spec = TRANSACTION_SPEC[number];

            return spec ? spec.type : '';
        }

        function transformAddress(rawAddress) {
            var result = angular.isDefined(rawAddress) ? rawAddress : 'n/a';

            if (result === applicationContext.account.address) {
                result = 'You';
            }

            return result;
        }

        function processTransaction(transaction) {
            var spec = TRANSACTION_SPEC[transaction.type];
            if (angular.isUndefined(spec) || angular.isUndefined(spec.processor)) {
                return;
            }

            spec.processor(transaction);
        }

        function processPaymentTransaction(transaction) {
            transaction.formatted.amount = Money.fromCoins(transaction.amount, Currency.MIR).formatAmount();
            transaction.formatted.asset = Currency.MIR.displayName;
        }

        function processAssetIssueTransaction(transaction) {
            var asset = Currency.create({
                id: transaction.id,
                displayName: transaction.name,
                precision: transaction.decimals
            });
            transaction.formatted.amount = Money.fromCoins(transaction.quantity, asset).formatAmount();
            transaction.formatted.asset = asset.displayName;
        }

        function processCreateAliasTransaction(transaction) {
            transaction.formatted.asset = Currency.MIR.displayName;
        }

        function processAssetTransferTransaction(transaction) {
            var currency;
            if (transaction.assetId) {
                var asset = applicationContext.cache.assets[transaction.assetId];
                if (asset) {
                    currency = asset.currency;
                }
            } else {
                currency = Currency.MIR;
            }

            if (!currency) {
                return;
            }

            transaction.formatted.amount = Money.fromCoins(transaction.amount, currency).formatAmount();
            transaction.formatted.asset = currency.displayName;
        }

        function processAssetReissueTransaction(transaction) {
            var asset = applicationContext.cache.assets[transaction.assetId];
            if (angular.isUndefined(asset)) {
                return;
            }

            transaction.formatted.amount = Money.fromCoins(transaction.quantity, asset.currency).formatAmount();
            transaction.formatted.asset = asset.currency.displayName;
        }

        function processStartLeasingTransaction(transaction) {
            transaction.formatted.amount = Money.fromCoins(transaction.amount, Currency.MIR).formatAmount();
            transaction.formatted.asset = Currency.MIR.displayName;
        }

        function processCancelLeasingTransaction(transaction) {
            transaction.formatted.asset = Currency.MIR.displayName;
        }

        function processMassPaymentTransaction(transaction) {
            var currency = Currency.MIR;
            var assetId = transaction.assetId;
            if (assetId) {
                var asset = applicationContext.cache.assets[assetId];
                if (asset) {
                    currency = asset.currency;
                }
            }

            transaction.formatted.asset = currency.displayName;
            transaction.formatted.amount = Money.fromCoins(transaction.totalAmount, currency).formatAmount();
        }

        function processExchangeTransaction(transaction) {
            var type = 'Exchange';

            var buyOrder = transaction.order1;
            var assetId = buyOrder.assetPair.amountAsset;
            var totalFee = 0;
            if (buyOrder.senderPublicKey === applicationContext.account.keyPair.public) {
                type = type + ' ' + 'Buy';
                totalFee += transaction.buyMatcherFee;
            }

            var sellOrder = transaction.order2;
            if (sellOrder.senderPublicKey === applicationContext.account.keyPair.public) {
                type = type + ' ' + 'Sell';
                totalFee += transaction.sellMatcherFee;
            }

            transaction.formatted.type = type;
            transaction.formatted.fee = Money.fromCoins(totalFee, Currency.MIR).formatAmount(true);

            var currency;
            if (assetId) {
                var asset = applicationContext.cache.assets[assetId];
                if (asset) {
                    currency = asset.currency;
                }
            } else {
                currency = Currency.MIR;
            }

            if (currency) {
                transaction.formatted.asset = currency.displayName;
                transaction.formatted.amount = Money.fromCoins(transaction.amount, currency).formatAmount();
            }
        }

        function formatFee(transaction) {
            var currency = Currency.MIR;
            var assetId = transaction.feeAsset;
            if (assetId) {
                var asset = applicationContext.cache.assets[assetId];
                if (asset) {
                    currency = asset.currency;
                }
            }

            return Money.fromCoins(transaction.fee, currency).formatAmount(true);
        }

        function getFeeAsset(transaction) {
            var currency = Currency.MIR;
            var assetId = transaction.feeAsset;
            if (assetId) {
                var asset = applicationContext.cache.assets[assetId];
                if (asset) {
                    currency = asset.currency;
                }
            }

            return currency;
        }

        function formatTransaction(transaction) {
            // in the future currency should be a part of transaction itself
            var currentAddress = applicationContext.account.address;
            var type = transaction.sender === currentAddress ? 'Outgoing' : 'Incoming';

            transaction.formatted = {
                type: type + ' ' + buildTransactionType(transaction.type),
                datetime: formattingService.formatTimestamp(transaction.timestamp),
                isOutgoing: transaction.sender === currentAddress,
                sender: transformAddress(transaction.sender),
                recipient: transformAddress(transaction.recipient),
                amount: 'N/A',
                fee: formatFee(transaction),
                feeAsset: getFeeAsset(transaction),
                asset: 'Loading'
            };

            processTransaction(transaction);

            return transaction;
        }

        return function filterInput(input) {
            return _.map(input, formatTransaction);
        };
    }

    TransactionFilter.$inject = ['constants.transactions', 'applicationContext', 'formattingService'];

    angular
        .module('app.shared')
        .filter('transaction', TransactionFilter);
})();

(function () {
    'use strict';

    var DEFAULT_STRIP_ZEROES = true;
    var DEFAULT_USE_THOUSANDS_SEPARATOR = true;

    function MoneyShortFilter() {
        return function filterInput(input, stripZeroes, useThousandsSeparator) {
            if (!input || !input.formatAmount) {
                return '';
            }

            if (angular.isUndefined(stripZeroes)) {
                stripZeroes = DEFAULT_STRIP_ZEROES;
            }

            if (angular.isUndefined(useThousandsSeparator)) {
                useThousandsSeparator = DEFAULT_USE_THOUSANDS_SEPARATOR;
            }

            return input.formatAmount(stripZeroes, useThousandsSeparator);
        };
    }

    angular
        .module('app.shared')
        .filter('moneyShort', MoneyShortFilter);
})();

(function () {
    'use strict';

    var DEFAULT_STRIP_ZEROES = false;
    var DEFAULT_USE_THOUSANDS_SEPARATOR = true;

    function MoneyLongFilter() {
        return function filterInput(input, stripZeroes, useThousandsSeparator) {
            if (!input || !input.formatAmount) {
                return '';
            }

            if (angular.isUndefined(stripZeroes)) {
                stripZeroes = DEFAULT_STRIP_ZEROES;
            }

            if (angular.isUndefined(useThousandsSeparator)) {
                useThousandsSeparator = DEFAULT_USE_THOUSANDS_SEPARATOR;
            }

            var result = input.formatAmount(stripZeroes, useThousandsSeparator);
            var currency = input.currency.shortName ? input.currency.shortName : input.currency.displayName;

            return result + ' ' + currency;
        };
    }

    angular
        .module('app.shared')
        .filter('moneyLong', MoneyLongFilter);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .factory('autocomplete.fees', function AutocompleteFeesFactory() {
            var result = {
                fees: [
                    {
                        amount: 0.001,
                        displayText: '0.001 WAVE (Economic)'
                    },
                    {
                        amount: 0.0015,
                        displayText: '0.0015 WAVE (Standard)'
                    },
                    {
                        amount: 0.002,
                        displayText: '0.002 WAVE (Premium)'
                    }
                ],
                selectedFee: undefined,
                searchText: undefined
            };

            result.getFeeAmount = function() {
                return result.selectedFee ?
                    result.selectedFee.amount :
                    result.searchText;
            };

            result.defaultFee = function (feeAmount) {
                var feeIndex = 0;

                if (angular.isNumber(feeAmount)) {
                    var index = _.findIndex(result.fees, function (fee) {
                        return fee.amount === feeAmount;
                    });

                    if (index >= 0) {
                        feeIndex = index;
                    }
                }

                result.selectedFee = result.fees[feeIndex];
            };

            result.querySearch = function (searchText) {
                if (!searchText) {
                    return result.fees;
                }

                return _.filter(result.fees, function (item) {
                    return item.amount.toString().indexOf(searchText) !== -1;
                });
            };

            return result;
        })
        .factory('autocomplete.assets', function AutocompleteAssetsFactory() {
            function createAutocomplete() {
                var result = {
                    assets: [],
                    selectedAsset: undefined,
                    searchText: undefined
                };

                result.querySearch = function (searchText) {
                    if (!searchText) {
                        return result.assets.slice(0, 10);
                    }

                    var searchTextLC = searchText.toLowerCase(),
                        list = [],
                        ids = {};

                    // Adding assets which match by name.
                    list = list.concat(result.assets.filter(function (asset) {
                        ids[asset.id] = asset.displayName.toLowerCase().indexOf(searchTextLC) > -1;
                        return ids[asset.id];
                    }));

                    // Adding assets which match by ID.
                    list = list.concat(result.assets.filter(function (asset) {
                        if (ids[asset.id] === true) {
                            return false;
                        } else {
                            ids[asset.id] = asset.id.indexOf(searchText) > -1;
                            return ids[asset.id];
                        }
                    }));

                    return list;
                };

                return result;
            }

            return {
                create: function () {
                    return createAutocomplete();
                }
            };
        });
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .factory('transactionBroadcast', ['notificationService', function (notificationService) {
            function Instance(method, successCallback) {
                var self = this;
                var transaction;

                this.pending = false;
                this.setTransaction = function (value) {
                    transaction = value;
                };

                this.broadcast = function () {
                    // checking if transaction was saved
                    if (angular.isUndefined(transaction)) {
                        return;
                    }

                    // prevent method execution when there is a pending request
                    if (self.pending) {
                        return;
                    }

                    // start pending request
                    self.pending = true;

                    method(transaction).then(function (response) {
                        successCallback(transaction, response);
                    }, function (response) {
                        if (response.data) {
                            notificationService.error('Error:' + response.data.error + ' - ' + response.data.message);
                        } else {
                            notificationService.error('Request failed. Status: ' + response.status + ' - ' +
                                response.statusText);
                        }
                    }).finally(function () {
                        self.pending = false;
                        transaction = undefined;
                    });
                };
            }

            return {
                instance: Instance
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .directive('decimalInputRestrictor', [function WavesDecimalInputRestrictorDirective() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attributes, ngModelController) {
                    var pattern = /[^0-9.]+/g;

                    function fromUser (text) {
                        if (!text)
                            return text;

                        var transformedInput = text.replace(pattern, '');
                        if (transformedInput !== text) {
                            ngModelController.$setViewValue(transformedInput);
                            ngModelController.$render();
                        }

                        return transformedInput;
                    }

                    ngModelController.$parsers.push(fromUser);
                }
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .directive('integerInputRestrictor', [function WavesIntegerInputRestrictorDirective() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attributes, ngModelController) {
                    var pattern = /[^0-9]+/g;

                    function fromUser (text) {
                        if (!text)
                            return text;

                        var transformedInput = text.replace(pattern, '');
                        if (transformedInput !== text) {
                            ngModelController.$setViewValue(transformedInput);
                            ngModelController.$render();
                        }

                        return transformedInput;
                    }

                    ngModelController.$parsers.push(fromUser);
                }
            };
        }]);
})();

(function () {
    'use strict';

    var url = 'mir.one/client';

    function SupportLinkController() {}

    angular
        .module('app.shared')
        .component('wavesSupportLink', {
            controller: SupportLinkController,
            template: '<a href="http://' + url + '" target="_blank">' + url + '</a>'
        });
})();

(function () {
    'use strict';

    var ADDRESS_STUB = 'n/a';

    function TransactionMenuController($scope, constants, events, notificationService) {
        var ctrl = this;

        ctrl.idCopied = idCopied;
        ctrl.dataCopied = dataCopied;
        ctrl.fullTransactionData = fullTransactionData;
        ctrl.hasRecipient = hasRecipient;
        ctrl.addressCopied = addressCopied;
        ctrl.isLeasing = isLeasing;
        ctrl.cancelLeasing = cancelLeasing;

        function addressCopied () {
            return notificationService.notice('Address has been copied');
        }

        function idCopied () {
            notificationService.notice('Transaction ID has been copied');
        }

        function dataCopied () {
            notificationService.notice('Full transaction data have been copied');
        }

        function hasRecipient () {
            return !!ctrl.transaction.recipient;
        }

        function isLeasing () {
            return ctrl.transaction.type === constants.START_LEASING_TRANSACTION_TYPE;
        }

        function cancelLeasing () {
            $scope.$emit(events.LEASING_CANCEL, {
                startLeasingTransaction: ctrl.transaction
            });
        }

        function fullTransactionData () {
            var recipient = hasRecipient() ? ctrl.transaction.recipient : ADDRESS_STUB;
            var attachment = '';
            if (ctrl.transaction.attachment) {
                attachment = ' | ATTACHMENT: ' + ctrl.transaction.attachment;
            }

            return 'TX ID: ' + ctrl.transaction.id +
                ' | TYPE: ' + ctrl.transaction.formatted.type +
                ' | DATE: ' + ctrl.transaction.formatted.datetime +
                ' | SENDER ADDRESS: ' + ctrl.transaction.sender +
                ' | TX AMOUNT: ' + ctrl.transaction.formatted.amount + ' ' + ctrl.transaction.formatted.asset +
                ' | RECIPIENT ADDRESS: ' + recipient +
                ' | TX FEE: ' + ctrl.transaction.formatted.fee + ' ' + ctrl.transaction.formatted.feeAsset.displayName +
                (ctrl.transaction.formatted.feeAsset.id ? ' (' + ctrl.transaction.formatted.feeAsset.id + ')' : '') +
                attachment;
        }
    }

    TransactionMenuController.$inject = ['$scope', 'constants.transactions', 'ui.events', 'notificationService'];

    angular
        .module('app.shared')
        .component('txMenu', {
            controller: TransactionMenuController,
            bindings: {
                transaction: '<'
            },
            templateUrl: 'shared/transaction.menu.component'
        });
})();

(function () {
    'use strict';

    var FEE_CURRENCY = Currency.MIR;
    var DEFAULT_ERROR_MESSAGE = 'The Internet connection is lost';

    // TODO : add the `exceptField` attribute or a list of all the needed fields.

    function WavesTransactionHistoryController($scope, events, constants, applicationContext,
                                               apiService, leasingRequestService, notificationService, dialogService) {
        var ctrl = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);

        ctrl.cancelLeasing = cancelLeasing;
        ctrl.confirm = {
            fee: minimumFee
        };

        $scope.$on(events.LEASING_CANCEL, function (event, eventData) {
            ctrl.startLeasingTransaction = eventData.startLeasingTransaction;

            ctrl.confirm.recipient = ctrl.startLeasingTransaction.recipient;
            ctrl.confirm.amount = ctrl.startLeasingTransaction.formatted.amount;
            ctrl.confirm.asset = ctrl.startLeasingTransaction.formatted.asset;

            dialogService.open('#cancel-leasing-confirmation');
        });

        function cancelLeasing () {
            var cancelLeasing = {
                startLeasingTransactionId: ctrl.startLeasingTransaction.id,
                fee: minimumFee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            var transaction = leasingRequestService.buildCancelLeasingRequest(cancelLeasing, sender);

            apiService.leasing.cancel(transaction)
                .then(function () {
                    notificationService.notice('Leasing transaction of ' +
                        ctrl.startLeasingTransaction.formatted.amount + ' ' +
                        ctrl.startLeasingTransaction.formatted.asset + ' has been cancelled.');
                })
                .catch(function (exception) {
                    if (exception) {
                        if (exception.data) {
                            notificationService.error(exception.data.message);
                        } else if (exception.message) {
                            notificationService.error(exception.message);
                        } else if (exception.statusText) {
                            notificationService.error(exception.statusText);
                        } else {
                            notificationService.error(DEFAULT_ERROR_MESSAGE);
                        }
                    } else {
                        notificationService.error(DEFAULT_ERROR_MESSAGE);
                    }

                    dialogService.close();
                });

            return true;
        }
    }

    WavesTransactionHistoryController.$inject = ['$scope', 'ui.events', 'constants.ui', 'applicationContext',
        'apiService', 'leasingRequestService', 'notificationService', 'dialogService'];

    angular
        .module('app.shared')
        .component('wavesTransactionHistory', {
            controller: WavesTransactionHistoryController,
            bindings: {
                heading: '@',
                transactions: '<',
                limitTo: '<'
            },
            templateUrl: 'shared/transaction.history.component'
        });
})();

(function() {
    'use strict';

    angular.module('app.login', ['waves.core.services', 'app.ui', 'app.shared']);
})();

(function () {
    'use strict';

    angular
        .module('app.login')
        .constant('ui.login.modes', {
            REGISTER: 'register',
            CREATE_SEED: 'create-seed',
            LIST: 'list',
            LOGIN: 'login'
        });

    angular
        .module('app.login')
        .constant('ui.login.events', {
            CHANGE_MODE: 'change-mode',
            GENERATE_SEED: 'generate-seed',  // parameter - seed
            LOGIN: 'login'                   // parameter - account object
        });
})();

(function () {
    'use strict';

    function LoginContextFactory(moduleEvents, applicationEvents, modes) {
        return {
            showAccountsListScreen: function($scope) {
                $scope.$emit(moduleEvents.CHANGE_MODE, modes.LIST);
            },

            showInputSeedScreen: function ($scope) {
                $scope.$emit(moduleEvents.CHANGE_MODE, modes.CREATE_SEED);
            },

            showLoginScreen: function ($scope, account) {
                $scope.$emit(moduleEvents.CHANGE_MODE, modes.LOGIN, account);
            },

            showRegisterScreen: function ($scope, seed) {
                $scope.$emit(moduleEvents.CHANGE_MODE, modes.REGISTER, seed);
            },

            notifyGenerateSeed: function ($scope) {
                $scope.$emit(moduleEvents.GENERATE_SEED);
            },

            notifySignedIn: function ($scope, rawAddress, seed, keys) {
                var applicationState = {
                    address: rawAddress,
                    seed: seed,
                    keyPair: keys
                };

                $scope.$emit(applicationEvents.LOGIN_SUCCESSFUL, applicationState);
            }
        };
    }

    LoginContextFactory.$inject = ['ui.login.events', 'ui.events', 'ui.login.modes'];

    angular
        .module('app.login')
        .factory('loginContext', LoginContextFactory);
})();

(function () {
    'use strict';

    function AccountsController($scope, modes, events, passPhraseService, dialogService, cryptoService, loginContext) {
        var accounts = this;

        // by default start in list mode
        switchToMode(modes.LIST);

        $scope.$on(events.CHANGE_MODE, function (event, mode, param) {
            switchToMode(mode, param);
        });

        $scope.$on(events.GENERATE_SEED, function () {
            var seed = passPhraseService.generate();
            switchToMode(modes.REGISTER, seed);
            dialogService.openNonCloseable('#login-wPop-new');
        });

        function switchToMode(mode, param) {
            switch (mode) {
                case modes.REGISTER:
                    switchToRegisterMode(param);
                    break;

                case modes.CREATE_SEED:
                    switchToCreateSeedMode();
                    break;

                case modes.LIST:
                    switchToListMode();
                    break;

                case modes.LOGIN:
                    switchToLoginMode(param);
                    break;

                default:
                    throw new Error('Unsupported account operation: ' + mode);
            }

            accounts.mode = mode;
        }

        function switchToListMode() {
            accounts.caption = 'ACCOUNTS';
        }

        function switchToCreateSeedMode() {
            accounts.caption = 'SET UP YOUR SEED';
        }

        function switchToRegisterMode(seed) {
            accounts.caption = 'REGISTER ACCOUNT';
            accounts.displayAddress = cryptoService.buildRawAddressFromSeed(seed);
            // setting a seed to register a new account
            loginContext.seed = seed;
        }

        function switchToLoginMode(account) {
            accounts.caption = 'SIGN IN';
            accounts.displayAddress = account.address;
            // setting an account which we would like to sign in
            loginContext.currentAccount = account;
        }
    }

    AccountsController.$inject = [
        '$scope',
        'ui.login.modes',
        'ui.login.events',
        'passPhraseService',
        'dialogService',
        'cryptoService',
        'loginContext'
    ];

    angular
        .module('app.login')
        .controller('accountsController', AccountsController);
})();

(function () {
    'use strict';

    function AccountListController($scope, accountService, dialogService, loginContext) {
        var list = this;
        list.accounts = [];
        list.removeCandidate = {};

        list.removeAccount = removeAccount;
        list.createAccount = createAccount;
        list.importAccount = importAccount;
        list.signIn = signIn;
        list.showRemoveWarning = showRemoveWarning;

        accountService.getAccounts().then(function (accounts) {
            list.accounts = accounts;
        });

        function showRemoveWarning(index) {
            list.removeIndex = index;
            list.removeCandidate = list.accounts[index];
            dialogService.open('#account-remove-popup');
        }

        function removeAccount() {
            if (list.removeCandidate) {
                accountService.removeAccountByIndex(list.removeIndex).then(function () {
                    list.removeCandidate = undefined;
                    list.removeIndex = undefined;
                });
            }
        }

        function createAccount() {
            loginContext.notifyGenerateSeed($scope);
        }

        function importAccount() {
            loginContext.showInputSeedScreen($scope);
        }

        function signIn(account) {
            loginContext.showLoginScreen($scope, account);
        }
    }

    AccountListController.$inject = ['$scope', 'accountService', 'dialogService', 'loginContext'];

    angular
        .module('app.login')
        .controller('accountListController', AccountListController);
})();

(function () {
    'use strict';

    var WALLET_NAME_MAXLENGTH = 16;

    function AccountRegisterController($scope, accountService, cryptoService, loginContext) {
        var ctrl = this;

        ctrl.validationOptions = {
            onfocusout: false,
            rules: {
                walletName: {
                    maxlength: WALLET_NAME_MAXLENGTH
                },
                walletPassword: {
                    required: true,
                    minlength: 8,
                    password: true
                },
                walletPasswordConfirm: {
                    equalTo: '#walletPassword'
                }
            },
            messages: {
                walletName: {
                    maxlength: 'A wallet name is too long. Maximum name length is ' +
                        WALLET_NAME_MAXLENGTH + ' characters'
                },
                walletPassword: {
                    required: 'A password is required to store your seed safely',
                    minlength: 'Password must be 8 characters or longer'
                },
                walletPasswordConfirm: {
                    equalTo: 'Passwords do not match'
                }
            }
        };
        ctrl.saveAccountAndSignIn = saveAccountAndSignIn;
        ctrl.cancel = cancel;
        ctrl.seed = function (seed) {
            return arguments.length ? (loginContext.seed = seed) : loginContext.seed;
        };

        function cleanup() {
            ctrl.name = '';
            ctrl.password = '';
            ctrl.confirmPassword = '';
        }

        function saveAccountAndSignIn(form) {
            if (!form.validate()) {
                return false;
            }

            var seed = loginContext.seed;
            var cipher = cryptoService.encryptWalletSeed(seed, ctrl.password).toString();
            var keys = cryptoService.getKeyPair(seed);
            var checksum = cryptoService.seedChecksum(seed);
            var address = cryptoService.buildRawAddress(keys.public);

            var account = {
                name: ctrl.name,
                cipher: cipher,
                checksum: checksum,
                publicKey: keys.public,
                address: address
            };

            accountService.addAccount(account);

            loginContext.notifySignedIn($scope, address, seed, keys);

            cleanup();

            return true;
        }

        function cancel() {
            loginContext.showAccountsListScreen($scope);
            cleanup();
        }
    }

    AccountRegisterController.$inject = ['$scope', 'accountService', 'cryptoService', 'loginContext'];

    angular
        .module('app.login')
        .controller('accountRegisterController', AccountRegisterController);
})();

(function () {
    'use strict';

    var SEED_MINIMUM_LENGTH = 25;

    function AccountSeedController($scope, loginContext, utilityService,
                                   cryptoService, dialogService, passPhraseService) {
        var vm = this;

        vm.validationOptions = {
            onfocusout: false,
            rules: {
                walletSeed: {
                    required: true,
                    minlength: SEED_MINIMUM_LENGTH
                }
            },
            messages: {
                walletSeed: {
                    required: 'Wallet seed is required',
                    minlength: 'Wallet seed is too short. A secure wallet seed should contain more than ' +
                       SEED_MINIMUM_LENGTH + ' characters'
                }
            }
        };
        vm.registerAccount = registerAccount;
        vm.back = goBack;
        vm.refreshAddress = refreshAddress;
        vm.checkSeedAndRegister = checkSeedAndRegister;
        vm.generateSeed = generateSeed;

        function cleanup() {
            //it seems we won't need this code if we switch to recreation of controllers on each event
            vm.seed = '';
            vm.displayAddress = '';
        }

        function refreshAddress() {
            vm.displayAddress = cryptoService.buildRawAddressFromSeed(vm.seed);
        }

        function checkSeedAndRegister(form) {
            if (!form.validate()) {
                return false;
            }

            if (utilityService.endsWithWhitespace(vm.seed)) {
                dialogService.openNonCloseable('#seed-whitespace-popup');
            } else {
                registerAccount();
            }

            return true;
        }

        function generateSeed() {
            vm.seed = passPhraseService.generate();
            refreshAddress();
        }

        function registerAccount() {
            loginContext.showRegisterScreen($scope, vm.seed);
            cleanup();
        }

        function goBack() {
            loginContext.showAccountsListScreen($scope);
            cleanup();
        }
    }

    AccountSeedController.$inject = ['$scope',
        'loginContext',
        'utilityService',
        'cryptoService',
        'dialogService',
        'passPhraseService'];

    angular
        .module('app.login')
        .controller('accountSeedController', AccountSeedController);
})();

(function () {
    'use strict';

    function AccountLoginController ($scope, cryptoService, loginContext, notificationService) {
        var vm = this;

        vm.signIn = signIn;
        vm.cancel = cancel;

        function cleanup() {
            vm.password = '';
        }

        function performSignIn() {
            var account = loginContext.currentAccount;
            if (angular.isUndefined(account)) {
                throw new Error('Account to log in hasn\'t been selected');
            }

            var decryptedSeed = cryptoService.decryptWalletSeed(account.cipher, vm.password, account.checksum);
            if (!decryptedSeed) {
                notificationService.error('Wrong password! Please try again.');
            }
            else {
                var keys = cryptoService.getKeyPair(decryptedSeed);
                loginContext.notifySignedIn($scope, account.address, decryptedSeed, keys);
            }
        }

        function signIn() {
            performSignIn();
            cleanup();
        }

        function cancel() {
            loginContext.showAccountsListScreen($scope);
            cleanup();
        }
    }

    AccountLoginController.$inject = ['$scope', 'cryptoService', 'loginContext', 'notificationService'];

    angular
        .module('app.login')
        .controller('accountLoginController', AccountLoginController);
})();

(function() {
    'use strict';

    angular.module('app.navigation', ['waves.core.services', 'app.ui', 'app.shared'])
        .constant('navigation.events', {
            NAVIGATION_CREATE_ALIAS: 'navigation-create-alias'
        });
})();

(function () {
    'use strict';

    angular
        .module('app.navigation')
        .controller('navigationController', ['$scope', function ($scope) {
            var nav = this;

            nav.currentTab = 'wallet';
            nav.changeTab = changeTab;

            function changeTab (pageId) {
                nav.currentTab = pageId;
            }
        }]);
})();

(function () {
    'use strict';

    function MainMenuController($scope, $interval, events, applicationContext,
                                cryptoService, dialogService, notificationService, apiService) {
        var ctrl = this,
            refreshPromise,
            delayRefresh = 10 * 1000;

        ctrl.blockHeight = 0;
        ctrl.address = applicationContext.account.address;
        ctrl.addressQr = 'waves://' + ctrl.address;

        function initializeBackupFields() {
            ctrl.seed = applicationContext.account.seed;
            ctrl.encodedSeed = cryptoService.base58.encode(converters.stringToByteArray(ctrl.seed));
            ctrl.publicKey = applicationContext.account.keyPair.public;
            ctrl.privateKey = applicationContext.account.keyPair.private;
        }

        function buildBackupClipboardText() {
            var text = 'Seed: ' + ctrl.seed + '\n';
            text += 'Encoded seed: ' + ctrl.encodedSeed + '\n';
            text += 'Private key: ' + ctrl.privateKey + '\n';
            text += 'Public key: ' + ctrl.publicKey + '\n';
            text += 'Address: ' + ctrl.address;
            return text;
        }

        refreshBlockHeight();
        refreshPromise = $interval(refreshBlockHeight, delayRefresh);

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        ctrl.showAddressQr = showAddressQr;
        ctrl.showBackupDialog = showBackupDialog;
        ctrl.showProfileDialog = showProfileDialog;
        ctrl.backup = backup;

        function showAddressQr() {
            dialogService.open('#address-qr-modal');
        }

        function showProfileDialog() {
            $scope.$broadcast(events.NAVIGATION_CREATE_ALIAS, {});
        }

        function showBackupDialog() {
            initializeBackupFields();
            dialogService.open('#header-wPop-backup');
        }

        function backup() {
            var clipboard = new Clipboard('#backupForm', {
                text: function () {
                    return buildBackupClipboardText();
                }
            });

            clipboard.on('success', function(e) {
                notificationService.notice('Account backup has been copied to clipboard');
                e.clearSelection();
            });

            angular.element('#backupForm').click();
            clipboard.destroy();
        }

        function refreshBlockHeight() {
            apiService.blocks.height().then(function (response) {
                ctrl.blockHeight = response.height;
                applicationContext.blockHeight = response.height;
            });
        }
    }

    MainMenuController.$inject = ['$scope', '$interval', 'navigation.events', 'applicationContext',
                                  'cryptoService', 'dialogService', 'notificationService', 'apiService'];

    angular
        .module('app.navigation')
        .controller('mainMenuController', MainMenuController);
})();

(function () {
    'use strict';

    var DEFAULT_FEE = Money.fromTokens(0.001, Currency.MIR);
    var ALIAS_MINIMUM_LENGTH = 4;
    var ALIAS_MAXIMUM_LENGTH = 30;

    function WavesCreateAliasController($scope, $timeout, events, applicationContext,
                                        dialogService, notificationService, transactionBroadcast,
                                        formattingService, aliasRequestService, apiService) {
        var ctrl = this;

        ctrl.fee = DEFAULT_FEE;
        ctrl.aliasList = null;

        ctrl.validationOptions = {
            onfocusout: false,
            rules: {
                aliasName: {
                    required: true,
                    minlength: ALIAS_MINIMUM_LENGTH,
                    maxlength: ALIAS_MAXIMUM_LENGTH
                }
            },
            messages: {
                aliasName: {
                    required: 'Symbolic name is required',
                    minlength: 'Alias name is too short. Please enter at least ' + ALIAS_MINIMUM_LENGTH + ' symbols',
                    maxlength: 'Alias name is too long. Please use no more than ' + ALIAS_MAXIMUM_LENGTH + ' symbols'
                }
            }
        };

        ctrl.broadcast = new transactionBroadcast.instance(apiService.alias.create, function (tx) {
            var formattedTime = formattingService.formatTimestamp(tx.timestamp),
                displayMessage = 'Created alias \'' + tx.alias + '\'<br/>Date: ' + formattedTime;
            notificationService.notice(displayMessage);
        });

        ctrl.confirmCreateAlias = confirmCreateAlias;
        ctrl.broadcastTransaction = broadcastTransaction;

        $scope.$on(events.NAVIGATION_CREATE_ALIAS, function () {
            reset();
            getExistingAliases();
            dialogService.open('#create-alias-dialog');
        });

        function getExistingAliases() {
            apiService.alias
                .getByAddress(applicationContext.account.address)
                .then(function (aliasList) {
                    ctrl.aliasList = aliasList;
                });
        }

        function broadcastTransaction () {
            ctrl.broadcast.broadcast();
        }

        function confirmCreateAlias (form) {
            if (!form.validate(ctrl.validationOptions)) {
                return false;
            }

            var createAlias = {
                alias: ctrl.alias,
                fee: ctrl.fee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            // Create the transaction and waiting for confirmation
            ctrl.broadcast.setTransaction(aliasRequestService.buildCreateAliasRequest(createAlias, sender));

            // Open confirmation dialog (async because this method is called while another dialog is open)
            $timeout(function () {
                dialogService.open('#create-alias-confirmation');
            }, 1);

            return true;
        }

        function reset () {
            ctrl.alias = '';
        }
    }

    WavesCreateAliasController.$inject = ['$scope', '$timeout', 'navigation.events', 'applicationContext',
                                          'dialogService', 'notificationService', 'transactionBroadcast',
                                          'formattingService', 'aliasRequestService', 'apiService'];

    angular
        .module('app.navigation')
        .controller('createAliasController', WavesCreateAliasController);
})();

(function () {
    'use strict';

    function WavesTabController($scope, dialogService) {
        $scope.isSelected = function () {
            return $scope.pageId === $scope.currentPageId;
        };

        $scope.onClick = function () {
            $scope.onSelect({pageId: $scope.pageId});

            // cleaning unused modal dialog divs, created by previous tab
            dialogService.cleanup();
        };
    }

    function WavesTabLink(scope, element) {
        element.addClass('tabs-radio');
    }

    angular
        .module('app.navigation')
        .directive('wavesTab', function WavesTabDirective() {
            return {
                restrict: 'A',
                controller: ['$scope', 'dialogService', WavesTabController],
                scope: {
                    pageId: '@',
                    caption: '<',
                    onSelect: '&',
                    currentPageId: '<'
                },
                link: WavesTabLink,
                templateUrl: 'navigation/tab.directive'
            };
        });
})();

(function() {
    'use strict';

    angular.module('app.wallet', ['app.shared'])
        .constant('wallet.events', {
            WALLET_SEND: 'wallet-send',
            WALLET_WITHDRAW: 'wallet-withdraw',
            WALLET_DEPOSIT: 'wallet-deposit',
            WALLET_CARD_DEPOSIT: 'wallet-card-deposit'
        });
})();

(function () {
    'use strict';

    function WalletBoxController() {
        var ctrl = this;

        var mapping = {};
        mapping[Currency.MIR.displayName] = {
            image: 'wB-bg-MIR.svg',
            displayName: Currency.MIR.displayName
        };
        mapping[Currency.BTC.displayName] = {
            image: 'wB-bg-BTC.svg',
            displayName: Currency.BTC.displayName
        };
        mapping[Currency.USD.displayName] = {
            image: 'wB-bg-USD.svg',
            displayName: Currency.USD.displayName
        };
        mapping[Currency.EUR.displayName] = {
            image: 'wB-bg-EUR.svg',
            displayName: Currency.EUR.displayName
        };
        mapping[Currency.ETH.displayName] = {
            image: 'wB-bg-ETH.svg',
            displayName: Currency.ETH.displayName
        };
        mapping[Currency.LTC.displayName] = {
            image: 'wB-bg-LTC.svg',
            displayName: Currency.LTC.displayName
        };
        mapping[Currency.ZEC.displayName] = {
            image: 'wB-bg-ZEC.svg',
            displayName: Currency.ZEC.displayName
        };
        mapping[Currency.TRY.displayName] = {
            image: 'wB-bg-WTRY.png',
            displayName: Currency.TRY.displayName
        };
        mapping[Currency.BCH.displayName] = {
            image: 'wB-bg-BCH.svg',
            displayName: 'BCH'
        };
				mapping[Currency.PROTON.displayName] = {
            image: 'wB-bg-PROTON.svg',
            displayName: Currency.PROTON.displayName
        };

        ctrl.$onChanges = function (changesObject) {
            if (changesObject.balance) {
                var balance = changesObject.balance.currentValue;
                ctrl.integerBalance = balance.formatIntegerPart();
                ctrl.fractionBalance = balance.formatFractionPart();
            }
        };
        ctrl.$onInit = function () {
            ctrl.image = mapping[ctrl.balance.currency.displayName].image;
            ctrl.displayName = mapping[ctrl.balance.currency.displayName].displayName;
        };
    }

    WalletBoxController.$inject = [];

    angular
        .module('app.wallet')
        .component('walletBox', {
            controller: WalletBoxController,
            bindings: {
                balance: '<',
                onSend: '&',
                onWithdraw: '&',
                onDeposit: '&',
                detailsAvailable: '<?'
            },
            templateUrl: 'wallet/box.component'
        });
})();

(function () {
    'use strict';

    var TRANSACTIONS_TO_LOAD = 100;

    function WavesWalletListController($scope, $interval, events, applicationContext,
                                       apiService, transactionLoadingService, dialogService) {
        var ctrl = this;
        var refreshPromise;
        var refreshDelay = 10 * 1000;

        function sendCommandEvent(event, currency) {
            var assetWallet = findWalletByCurrency(currency);
            var wavesWallet = findWalletByCurrency(Currency.MIR);

            $scope.$broadcast(event, {
                assetBalance: assetWallet.balance,
                wavesBalance: wavesWallet.balance
            });
        }

        function findWalletByCurrency(currency) {
            return _.find(ctrl.wallets, function (w) {
                return w.balance.currency === currency;
            });
        }

        ctrl.wallets = [
            {
                balance: new Money(0, Currency.MIR),
                depositWith: Currency.BTC
            },
						{
                balance: new Money(0, Currency.PROTON),
                depositWith: Currency.BTC
            }
        ];

        ctrl.transactions = [];
        ctrl.send = send;
        ctrl.withdraw = withdraw;
        ctrl.deposit = deposit;
        ctrl.depositFromCard = depositFromCard;

        loadDataFromBackend();
        patchCurrencyIdsForTestnet();

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        function send (wallet) {
            sendCommandEvent(events.WALLET_SEND, wallet.balance.currency);
        }

        function withdraw (wallet) {
            var id = wallet.balance.currency.id,
                type;

            if (id === Currency.BTC.id ||
                id === Currency.ETH.id ||
                id === Currency.MIR.id ||
                id === Currency.LTC.id ||
                id === Currency.ZEC.id ||
                id === Currency.BCH.id
            ) {
                type = 'crypto';
            } else if (id === Currency.EUR.id || id === Currency.USD.id) {
                type = 'fiat';
            } else if (id === Currency.TRY.id) {
                dialogService.open('#digilira-dialog');
							} else if (id === Currency.PROTON.id) {
									dialogService.open('#feat-not-active');
            } else {
                throw new Error('Add an option here!');
            }

            sendCommandEvent(events.WALLET_WITHDRAW + type, wallet.balance.currency);
        }

        function deposit (wallet) {
            if (wallet.balance.currency === Currency.MIR) {
                dialogService.open('#feat-not-active');
            } else if (wallet.balance.currency === Currency.TRY) {
                dialogService.open('#digilira-dialog');
						} else if (wallet.balance.currency === Currency.PROTON) {
									dialogService.open('#feat-not-active');
            } else {
                $scope.$broadcast(events.WALLET_DEPOSIT + wallet.balance.currency.id, {
                    assetBalance: wallet.balance,
                    depositWith: wallet.depositWith
                });
            }
        }

        function depositFromCard (currency) {
            dialogService.close();

            $scope.$broadcast(events.WALLET_CARD_DEPOSIT, {
                currency: currency
            });
        }

        function loadDataFromBackend() {
            refreshWallets();
            refreshTransactions();

            refreshPromise = $interval(function() {
                refreshWallets();
                refreshTransactions();
            }, refreshDelay);
        }

        function refreshWallets() {
            apiService.address.balance(applicationContext.account.address)
                .then(function (response) {
                    var wavesWallet = findWalletByCurrency(Currency.MIR);
                    wavesWallet.balance = Money.fromCoins(response.balance, Currency.MIR);
                });

            apiService.assets.balance(applicationContext.account.address).then(function (response) {
                _.forEach(response.balances, function (assetBalance) {
                    var id = assetBalance.assetId;

                    // adding asset details to cache
                    applicationContext.cache.putAsset(assetBalance.issueTransaction);
                    applicationContext.cache.updateAsset(id, assetBalance.balance,
                        assetBalance.reissuable, assetBalance.quantity);
                });

                _.forEach(ctrl.wallets, function (wallet) {
                    var asset = applicationContext.cache.assets[wallet.balance.currency.id];
                    if (asset) {
                        wallet.balance = asset.balance;
                    }
                });
            });
        }

        function refreshTransactions() {
            var txArray;
            transactionLoadingService.loadTransactions(applicationContext.account, TRANSACTIONS_TO_LOAD)
                .then(function (transactions) {
                    txArray = transactions;

                    return transactionLoadingService.refreshAssetCache(applicationContext.cache, transactions);
                })
                .then(function () {
                    ctrl.transactions = txArray;
                });
        }

        // Assets ID substitution for testnet
        function patchCurrencyIdsForTestnet() {
            if ($scope.isTestnet()) {
                Currency.EUR.id = '2xnE3EdpqXtFgCP156qt1AbyjpqdZ5jGjWo3CwTawcux';
                Currency.USD.id = 'HyFJ3rrq5m7FxdkWtQXkZrDat1F7LjVVGfpSkUuEXQHj';
                Currency.BTC.id = 'Fmg13HEHJHuZYbtJq8Da8wifJENq8uBxDuWoP9pVe2Qe';
                Currency.ETH.id = '3fVdr1oiX39uS82ZGUPnu7atNQtFHZfPnseRDUcDxrhp';
                Currency.LTC.id = 'NO_ID_YET'; // FIXME
                Currency.ZEC.id = 'NO_ID_YET'; // FIXME
                Currency.invalidateCache();
            }
        }
    }

    WavesWalletListController.$inject = ['$scope', '$interval', 'wallet.events', 'applicationContext',
                                         'apiService', 'transactionLoadingService', 'dialogService'];

    angular
        .module('app.wallet')
        .controller('walletListController', WavesWalletListController);
})();

(function () {
    'use strict';

    var DEFAULT_FEE_AMOUNT = '0.001';
    var FEE_CURRENCY = Currency.MIR;

    function WalletSendController($scope, $timeout, constants, events, autocomplete,
                                  applicationContext, apiService, dialogService,
                                  transactionBroadcast, assetService, notificationService,
                                  formattingService, addressService) {
        var ctrl = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);

        ctrl.autocomplete = autocomplete;

        ctrl.confirm = {
            recipient: ''
        };

        ctrl.broadcast = new transactionBroadcast.instance(apiService.assets.transfer,
            function (transaction) {
                var amount = Money.fromCoins(transaction.amount, ctrl.assetBalance.currency);
                var address = transaction.recipient;
                var displayMessage = 'Sent ' + amount.formatAmount(true) + ' of ' +
                    ctrl.assetBalance.currency.displayName +
                    '<br/>Recipient ' + address.substr(0,15) + '...<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            }
        );

        ctrl.validationOptions = {
            rules: {
                sendRecipient: {
                    required: true
                },
                sendAmount: {
                    required: true,
                    decimal: 8, // stub value updated on validation
                    min: 0,     // stub value updated on validation
                    max: constants.JAVA_MAX_LONG // stub value updated on validation
                },
                sendFee: {
                    required: true,
                    decimal: Currency.MIR.precision,
                    min: minimumFee.toTokens()
                },
                sendAttachment: {
                    maxbytelength: constants.MAXIMUM_ATTACHMENT_BYTE_SIZE
                }
            },
            messages: {
                sendRecipient: {
                    required: 'Recipient account number is required'
                },
                sendAmount: {
                    required: 'Amount to send is required'
                },
                sendFee: {
                    required: 'Transaction fee is required',
                    decimal: 'Transaction fee must be a number with no more than ' +
                        minimumFee.currency.precision + ' digits after the decimal point (.)',
                    min: 'Transaction fee is too small. It should be greater or equal to ' +
                        minimumFee.formatAmount(true)
                },
                sendAttachment: {
                    maxbytelength: 'Attachment is too long'
                }
            }
        };

        ctrl.submitTransfer = submitTransfer;
        ctrl.broadcastTransaction = broadcastTransaction;

        resetForm();

        $scope.$on(events.WALLET_SEND, function (event, eventData) {

            resetForm();

            ctrl.feeAssetBalance = eventData.wavesBalance;
            ctrl.assetBalance = eventData.assetBalance;
            ctrl.feeAndTransferAssetsAreTheSame = eventData.assetBalance.currency === FEE_CURRENCY;
            ctrl.currency = eventData.assetBalance.currency.displayName;

            // Update validation options and check how they affect form validation
            ctrl.validationOptions.rules.sendAmount.decimal = ctrl.assetBalance.currency.precision;
            var minimumPayment = Money.fromCoins(1, ctrl.assetBalance.currency);
            ctrl.validationOptions.rules.sendAmount.min = minimumPayment.toTokens();
            ctrl.validationOptions.rules.sendAmount.max = ctrl.assetBalance.toTokens();
            ctrl.validationOptions.messages.sendAmount.decimal = 'The amount to send must be a number ' +
                'with no more than ' + minimumPayment.currency.precision +
                ' digits after the decimal point (.)';
            ctrl.validationOptions.messages.sendAmount.min = 'Payment amount is too small. ' +
                'It should be greater or equal to ' + minimumPayment.formatAmount(false);
            ctrl.validationOptions.messages.sendAmount.max = 'Payment amount is too big. ' +
                'It should be less or equal to ' + ctrl.assetBalance.formatAmount(false);

            dialogService.open('#wB-butSend-WAV');
        });

        function submitTransfer(transferForm) {
            if (!transferForm.validate(ctrl.validationOptions)) {
                // Prevent dialog from closing
                return false;
            }

            var amount = Money.fromTokens(ctrl.amount, ctrl.assetBalance.currency);
            var transferFee = Money.fromTokens(ctrl.autocomplete.getFeeAmount(), FEE_CURRENCY);
            var paymentCost = transferFee;

            if (ctrl.feeAndTransferAssetsAreTheSame) {
                paymentCost = paymentCost.plus(amount);
            }

            if (paymentCost.greaterThan(ctrl.feeAssetBalance)) {
                notificationService.error('Not enough ' + FEE_CURRENCY.displayName + ' for the transfer');
                return false;
            }

            var assetTransfer = {
                recipient: addressService.cleanupOptionalPrefix(ctrl.recipient),
                amount: amount,
                fee: transferFee
            };

            if (ctrl.attachment) {
                assetTransfer.attachment = converters.stringToByteArray(ctrl.attachment);
            }

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            // Create a transaction and wait for confirmation
            ctrl.broadcast.setTransaction(assetService.createAssetTransferTransaction(assetTransfer, sender));

            // Set data to the confirmation dialog
            ctrl.confirm.amount = assetTransfer.amount;
            ctrl.confirm.fee = assetTransfer.fee;
            ctrl.confirm.recipient = assetTransfer.recipient;

            // Open confirmation dialog (async because this method is called while another dialog is open)
            $timeout(function () {
                dialogService.open('#send-payment-confirmation');
            }, 1);

            // Close payment dialog
            return true;
        }

        function broadcastTransaction() {
            ctrl.broadcast.broadcast();
        }

        function resetForm() {
            ctrl.recipient = '';
            ctrl.amount = '0';
            ctrl.confirm.amount = Money.fromTokens(0, Currency.MIR);
            ctrl.confirm.fee = Money.fromTokens(DEFAULT_FEE_AMOUNT, FEE_CURRENCY);
            ctrl.autocomplete.defaultFee(Number(DEFAULT_FEE_AMOUNT));
        }
    }

    WalletSendController.$inject = ['$scope', '$timeout', 'constants.ui', 'wallet.events', 'autocomplete.fees',
        'applicationContext', 'apiService', 'dialogService', 'transactionBroadcast', 'assetService',
        'notificationService', 'formattingService', 'addressService'];

    angular
        .module('app.wallet')
        .controller('walletSendController', WalletSendController);
})();

(function () {
    'use strict';

    var DEFAULT_FEE_AMOUNT = '0.001',
        DEFAULT_ERROR_MESSAGE = 'Connection is lost';

    function WavesWalletWithdrawController ($scope, constants, events, autocomplete, dialogService, $element,
                                            coinomatService, transactionBroadcast, notificationService,
                                            apiService, formattingService, assetService, applicationContext) {

        var ctrl = this;
        var type = $element.data('type');

        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, Currency.MIR);
        var notPermittedBitcoinAddresses = {};

        ctrl.broadcast = new transactionBroadcast.instance(apiService.assets.transfer,
            function (transaction) {
                var amount = Money.fromCoins(transaction.amount, ctrl.assetBalance.currency);
                var address = transaction.recipient;
                var displayMessage = 'Sent ' + amount.formatAmount(true) + ' of ' +
                    ctrl.assetBalance.currency.displayName +
                    '<br/>Gateway ' + address.substr(0,15) + '...<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            });

        ctrl.autocomplete = autocomplete;

        ctrl.validationOptions = {
            onfocusout: function (element) {
                return !(element.name in ['withdrawFee']); // FIXME
            },
            rules: {
                withdrawAddress: {
                    required: true
                },
                withdrawAmount: {
                    required: true,
                    decimal: 8,
                    min: 0,
                    max: constants.JAVA_MAX_LONG
                },
                withdrawFee: {
                    required: true,
                    decimal: Currency.MIR.precision,
                    min: minimumFee.toTokens()
                },
                withdrawTotal: {
                    required: true,
                    decimal: 8,
                    min: 0,
                    max: constants.JAVA_MAX_LONG
                }
            },
            messages: {
                withdrawAddress: {
                    required: 'Bitcoin address is required'
                },
                withdrawAmount: {
                    required: 'Amount to withdraw is required'
                },
                withdrawFee: {
                    required: 'Gateway transaction fee is required',
                    decimal: 'Transaction fee must be with no more than ' +
                        minimumFee.currency.precision + ' digits after the decimal point (.)',
                    min: 'Transaction fee is too small. It should be greater or equal to ' +
                        minimumFee.formatAmount(true)
                },
                withdrawTotal: {
                    required: 'Total amount is required'
                }
            }
        };

        ctrl.confirm = {
            amount: {},
            fee: {},
            gatewayAddress: '',
            address: ''
        };

        ctrl.confirmWithdraw = confirmWithdraw;
        ctrl.refreshAmount = refreshAmount;
        ctrl.refreshTotal = refreshTotal;
        ctrl.broadcastTransaction = broadcastTransaction;
        ctrl.gatewayEmail = 'support@coinomat.com';

        resetForm();

        $scope.$on(events.WALLET_WITHDRAW + type, function (event, eventData) {
            ctrl.assetBalance = eventData.assetBalance;
            ctrl.wavesBalance = eventData.wavesBalance;

            if (ctrl.assetBalance.currency === Currency.BTC ||
                ctrl.assetBalance.currency === Currency.ETH ||
                ctrl.assetBalance.currency === Currency.LTC ||
                ctrl.assetBalance.currency === Currency.ZEC ||
                ctrl.assetBalance.currency === Currency.BCH
            ) {
                withdrawCrypto();
            } else if (ctrl.assetBalance.currency === Currency.EUR) {
                withdrawEUR();
            } else if (ctrl.assetBalance.currency === Currency.USD) {
                withdrawUSD();
            } else {
                $scope.home.featureUnderDevelopment();
            }
        });

        function withdrawCrypto() {
            coinomatService.getWithdrawRate(ctrl.assetBalance.currency)
                .then(function (response) {
                    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
                    var minimumPayment = Money.fromCoins(1, ctrl.assetBalance.currency);
                    minimumPayment = Money.fromTokens(Math.max(minimumPayment.toTokens(), response.in_min),
                        ctrl.assetBalance.currency);
                    var maximumPayment = Money.fromTokens(Math.min(ctrl.assetBalance.toTokens(),
                        response.in_max), ctrl.assetBalance.currency);
                    ctrl.sourceCurrency = ctrl.assetBalance.currency.displayName;
                    ctrl.isEthereum = (ctrl.assetBalance.currency === Currency.ETH);
                    ctrl.exchangeRate = response.xrate;
                    ctrl.feeIn = response.fee_in;
                    ctrl.feeOut = response.fee_out;
                    ctrl.targetCurrency = response.to_txt;
                    ctrl.total = response.in_def;
                    ctrl.minimumPayment = minimumPayment;
                    /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
                    ctrl.validationOptions.rules.withdrawAmount.decimal = ctrl.assetBalance.currency.precision;
                    ctrl.validationOptions.rules.withdrawAmount.max = maximumPayment.toTokens();
                    ctrl.validationOptions.rules.withdrawAmount.min = minimumPayment.toTokens();
                    ctrl.validationOptions.messages.withdrawAddress.required = minimumPayment.currency.displayName +
                        ' address is required';
                    ctrl.validationOptions.messages.withdrawAmount.decimal = 'The amount to withdraw must be ' +
                        'a number with no more than ' + minimumPayment.currency.precision +
                        ' digits after the decimal point (.)';
                    ctrl.validationOptions.messages.withdrawAmount.min = 'Withdraw amount is too small. ' +
                        'It should be greater or equal to ' + minimumPayment.formatAmount();
                    ctrl.validationOptions.messages.withdrawAmount.max = 'Withdraw amount is too big. ' +
                        'It should be less or equal to ' + maximumPayment.formatAmount();

                    refreshAmount();

                    dialogService.open('#withdraw-crypto-dialog');
                }).catch(function (exception) {
                if (exception && exception.data && exception.data.error) {
                    notificationService.error(exception.error);
                } else {
                    notificationService.error(DEFAULT_ERROR_MESSAGE);
                }
            }).then(function () {
                return coinomatService.getDepositDetails(Currency.BTC, Currency.BTC,
                    applicationContext.account.address);
            }).then(function (depositDetails) {
                notPermittedBitcoinAddresses[depositDetails.address] = 1;

                return coinomatService.getDepositDetails(Currency.BTC, Currency.MIR,
                    applicationContext.account.address);
            }).then(function (depositDetails) {
                notPermittedBitcoinAddresses[depositDetails.address] = 1;
            });
        }

        function withdrawEUR() {
            ctrl.sourceCurrency = Currency.EUR.displayName;
            dialogService.open('#withdraw-fiat-dialog');
        }

        function withdrawUSD() {
            ctrl.sourceCurrency = Currency.USD.displayName;
            dialogService.open('#withdraw-fiat-dialog');
        }

        function validateRecipientBTCAddress(recipient) {
            if (!recipient.match(/^[0-9a-z]{27,34}$/i)) {
                throw new Error('Bitcoin address is invalid. Expected address length is from 27 to 34 symbols');
            }

            if (notPermittedBitcoinAddresses[recipient]) {
                throw new Error('Withdraw on deposit bitcoin accounts is not permitted');
            }
        }

        function validateWithdrawCost(withdrawCost, availableFunds) {
            if (withdrawCost.greaterThan(availableFunds)) {
                throw new Error('Not enough Mir for the withdraw transfer');
            }
        }

        function confirmWithdraw (amountForm) {
            if (!amountForm.validate(ctrl.validationOptions)) {
                return false;
            }

            try {
                var withdrawCost = Money.fromTokens(ctrl.autocomplete.getFeeAmount(), Currency.MIR);
                validateWithdrawCost(withdrawCost, ctrl.wavesBalance);
                if (ctrl.assetBalance.currency === Currency.BTC) {
                    validateRecipientBTCAddress(ctrl.recipient);
                } else if (ctrl.assetBalance.currency === Currency.ETH) {
                    // TODO
                }
            } catch (e) {
                notificationService.error(e.message);
                return false;
            }

            var total = Money.fromTokens(ctrl.total, ctrl.assetBalance.currency);
            var fee = Money.fromTokens(ctrl.autocomplete.getFeeAmount(), Currency.MIR);
            ctrl.confirm.amount = total;
            ctrl.confirm.fee = fee;
            ctrl.confirm.recipient = ctrl.recipient;

            coinomatService.getWithdrawDetails(ctrl.assetBalance.currency, ctrl.recipient)
                .then(function (withdrawDetails) {
                    ctrl.confirm.gatewayAddress = withdrawDetails.address;

                    var assetTransfer = {
                        recipient: withdrawDetails.address,
                        amount: total,
                        fee: fee,
                        attachment: converters.stringToByteArray(withdrawDetails.attachment)
                    };
                    var sender = {
                        publicKey: applicationContext.account.keyPair.public,
                        privateKey: applicationContext.account.keyPair.private
                    };
                    // creating the transaction and waiting for confirmation
                    ctrl.broadcast.setTransaction(assetService.createAssetTransferTransaction(assetTransfer, sender));

                    resetForm();

                    dialogService.open('#withdraw-confirmation');
                })
                .catch(function (exception) {
                    notificationService.error(exception.message);
                });

            return true;
        }

        function broadcastTransaction () {
            ctrl.broadcast.broadcast();
        }

        function refreshTotal () {
            var amount = ctrl.exchangeRate * ctrl.amount;
            var total = Money.fromTokens(amount + ctrl.feeIn + ctrl.feeOut, ctrl.assetBalance.currency);
            ctrl.total = total.formatAmount(true, false);
        }

        function refreshAmount () {
            var total = Math.max(0, ctrl.exchangeRate * (ctrl.total - ctrl.feeIn) - ctrl.feeOut);
            var amount = Money.fromTokens(total, ctrl.assetBalance.currency);
            ctrl.amount = amount.formatAmount(true, false);
        }

        function resetForm () {
            ctrl.recipient = '';
            ctrl.address = '';
            ctrl.autocomplete.defaultFee(Number(DEFAULT_FEE_AMOUNT));
        }
    }

    WavesWalletWithdrawController.$inject = [
        '$scope', 'constants.ui', 'wallet.events', 'autocomplete.fees', 'dialogService', '$element',
        'coinomatService', 'transactionBroadcast', 'notificationService',
        'apiService', 'formattingService', 'assetService', 'applicationContext'
    ];

    angular
        .module('app.wallet')
        .controller('walletWithdrawController', WavesWalletWithdrawController);
})();

(function () {
    'use strict';

    var DEFAULT_ERROR_MESSAGE = 'Connection is lost';

    function WavesWalletDepositController($scope, events, coinomatService, dialogService, notificationService,
                                          applicationContext, bitcoinUriService, utilsService, $element) {

        var ctrl = this;
        var currencyId = Currency[$element.data('currency')].id;

        ctrl.btc = {
            bitcoinAddress: '',
            bitcoinAmount: '',
            bitcoinUri: '',
            minimumAmount: 0.001
        };

        ctrl.eth = {
            ethereumAddress: '',
            minimumAmount: 0.001
        };

        ctrl.ltc = {
            litecoinAddress: '',
            minimumAmount: 0.001
        };

        ctrl.zec = {
            zcashAddress: '',
            minimumAmount: 0.001
        };

        ctrl.bch = {
            cashAddress: '',
            minimumAmount: 0.001
        };

        ctrl.fiat = {
            verificationLink: 'https://go.idnow.de/coinomat/userdata/' + applicationContext.account.address,
            email: 'support@coinomat.com'
        };

        ctrl.refreshBTCUri = function () {
            var params = null;
            if (ctrl.btc.bitcoinAmount >= ctrl.btc.minimumAmount) {
                params = {
                    amount: ctrl.btc.bitcoinAmount
                };
            }
            ctrl.btc.bitcoinUri = bitcoinUriService.generate(ctrl.btc.bitcoinAddress, params);
        };

        $scope.$on(events.WALLET_DEPOSIT + currencyId, function (event, eventData) {
            ctrl.depositWith = eventData.depositWith;
            ctrl.assetBalance = eventData.assetBalance;
            ctrl.currency = ctrl.assetBalance.currency.displayName;

            // Show deposit popups only on mainnet
            if (ctrl.assetBalance.currency === Currency.BTC && !utilsService.isTestnet()) {
                depositBTC();
            } else if (ctrl.assetBalance.currency === Currency.ETH && !utilsService.isTestnet()) {
                depositETH();
            } else if (ctrl.assetBalance.currency === Currency.LTC && !utilsService.isTestnet()) {
                depositLTC();
            } else if (ctrl.assetBalance.currency === Currency.ZEC && !utilsService.isTestnet()) {
                depositZEC();
            } else if (ctrl.assetBalance.currency === Currency.BCH && !utilsService.isTestnet()) {
                depositBCH();
            } else if (ctrl.assetBalance.currency === Currency.EUR) {
                depositEUR();
            } else if (ctrl.assetBalance.currency === Currency.USD) {
                depositUSD();
            } else {
                $scope.home.featureUnderDevelopment();
            }
        });

        function catchErrorMessage(e) {
            if (e && e.message) {
                notificationService.error(e.message);
            } else {
                notificationService.error(DEFAULT_ERROR_MESSAGE);
            }
        }

        function depositBTC() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-btc-dialog');
                    ctrl.btc.bitcoinAddress = depositDetails.address;
                    ctrl.btc.bitcoinUri = bitcoinUriService.generate(ctrl.btc.bitcoinAddress);
                })
                .catch(catchErrorMessage);
        }

        function depositETH() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-eth-dialog');
                    ctrl.eth.ethereumAddress = depositDetails.address;
                })
                .catch(catchErrorMessage);
        }

        function depositLTC() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-ltc-dialog');
                    ctrl.ltc.litecoinAddress = depositDetails.address;
                })
                .catch(catchErrorMessage);
        }

        function depositZEC() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-zec-dialog');
                    ctrl.zec.zcashAddress = depositDetails.address;
                })
                .catch(catchErrorMessage);
        }

        function depositBCH() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-bch-dialog');
                    ctrl.bch.cashAddress = depositDetails.address;
                })
                .catch(catchErrorMessage);
        }

        function depositEUR() {
            dialogService.open('#deposit-eur-dialog');
        }

        function depositUSD() {
            dialogService.open('#deposit-usd-dialog');
        }
    }

    WavesWalletDepositController.$inject = [
        '$scope', 'wallet.events', 'coinomatService', 'dialogService', 'notificationService',
        'applicationContext', 'bitcoinUriService', 'utilsService', '$element'
    ];

    angular
        .module('app.wallet')
        .controller('walletDepositController', WavesWalletDepositController);
})();

(function () {
    'use strict';

    var DEFAULT_AMOUNT_TO_PAY = 50;

    function FiatCurrency (code, displayName) {
        this.code = code;
        if (displayName) {
            this.displayName = displayName;
        } else {
            this.displayName = code;
        }
    }

    function WavesCardDepositController ($scope, $window, $q, events, dialogService,
                                         fiatService, applicationContext, notificationService) {
        var deferred;
        var ctrl = this;
        ctrl.currencies = [new FiatCurrency('EURO', 'Euro'), new FiatCurrency('USD')];
        ctrl.limits = {};
        ctrl.updateReceiveAmount = updateReceiveAmount;
        ctrl.updateLimitsAndReceiveAmount = updateLimitsAndReceiveAmount;
        ctrl.redirectToMerchant = redirectToMerchant;

        reset();

        $scope.$on(events.WALLET_CARD_DEPOSIT, function (event, eventData) {
            dialogService.open('#card-deposit-dialog');

            reset();
            ctrl.crypto = eventData.currency;

            updateLimitsAndReceiveAmount();
        });

        function reset() {
            ctrl.payAmount = DEFAULT_AMOUNT_TO_PAY;
            ctrl.payCurrency = ctrl.currencies[0];
            ctrl.crypto = {};
            ctrl.getAmount = '';
        }

        function updateLimitsAndReceiveAmount() {
            fiatService.getLimits(applicationContext.account.address, ctrl.payCurrency.code, ctrl.crypto)
                .then(function (response) {
                    ctrl.limits = {
                        min: Number(response.min),
                        max: Number(response.max)
                    };

                    if (ctrl.payAmount < ctrl.limits.min) {
                        ctrl.payAmount = ctrl.limits.min;
                    } else if (ctrl.payAmount > ctrl.limits.max) {
                        ctrl.payAmount = ctrl.limits.max;
                    }
                }).catch(function (response) {
                    remotePartyErrorHandler('get limits', response);
                });

            updateReceiveAmount();
        }

        function remotePartyErrorHandler(operationName, response) {
            if (response) {
                if (response.data) {
                    notificationService.error(response.data.message);
                } else if (response.statusText) {
                    notificationService.error('Failed to ' + operationName + '. Error code: ' + response.status +
                        '<br/>Message: ' + response.statusText);
                }
            } else {
                notificationService.error('Operation failed: ' + operationName);
            }
        }

        function updateReceiveAmount() {
            if (deferred) {
                deferred.reject();
                deferred = undefined;
            }

            var amount = Number(ctrl.payAmount);
            if (isNaN(amount) || ctrl.payAmount <= 0) {
                ctrl.getAmount = '';
                return;
            }

            deferred = $q.defer();
            deferred.promise.then(function (response) {
                if (response) {
                    ctrl.getAmount = response + ' ' + ctrl.crypto.shortName;
                } else {
                    ctrl.getAmount = '';
                }
            }).catch(function (value) {
                if (value) {
                    remotePartyErrorHandler('get rates', value);
                }
            });

            fiatService.getRate(applicationContext.account.address, ctrl.payAmount, ctrl.payCurrency.code, ctrl.crypto)
                .then(deferred.resolve).catch(deferred.reject);
        }

        function redirectToMerchant() {
            try {
                validateAmountToPay();

                var url = fiatService.getMerchantUrl(applicationContext.account.address,
                    ctrl.payAmount, ctrl.payCurrency.code, ctrl.crypto);
                $window.open(url, '_blank');

                return true;
            } catch (e) {
                notificationService.error(e.message);
                return false;
            }
        }

        function validateAmountToPay() {
            if (Number(ctrl.payAmount) < ctrl.limits.min) {
                throw new Error('Minimum amount to pay is ' + ctrl.limits.min + ' ' + ctrl.payCurrency.displayName);
            }
            if (Number(ctrl.payAmount) > ctrl.limits.max) {
                throw new Error('Maximum amount to pay is ' + ctrl.limits.max + ' ' + ctrl.payCurrency.displayName);
            }
        }
    }

    WavesCardDepositController.$inject = ['$scope', '$window', '$q', 'wallet.events', 'dialogService',
                                          'coinomatFiatService', 'applicationContext', 'notificationService'];

    angular
        .module('app.wallet')
        .controller('cardDepositController', WavesCardDepositController);
})();

(function() {
    'use strict';

    angular.module('app.tokens', ['app.shared']);
})();

(function () {
    'use strict';

    var ASSET_DESCRIPTION_MAX = 1000;
    var ASSET_NAME_MIN = 4;
    var ASSET_NAME_MAX = 16;
    var TOKEN_DECIMALS_MAX = 8;
    var FIXED_ISSUE_FEE = new Money(1, Currency.MIR);

    function TokenCreateController($scope, $interval, constants, applicationContext, assetService,
                                   dialogService, apiService, notificationService,
                                   formattingService, transactionBroadcast) {
        var refreshPromise;
        var refreshDelay = 15 * 1000;
        var transaction;
        var ctrl = this;

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        ctrl.wavesBalance = new Money(0, Currency.MIR);
        ctrl.issuanceValidationOptions = {
            rules: {
                assetName: {
                    required: true,
                    minbytelength: ASSET_NAME_MIN,
                    maxbytelength: ASSET_NAME_MAX
                },
                assetDescription: {
                    maxbytelength: ASSET_DESCRIPTION_MAX
                },
                assetTotalTokens: {
                    required: true,
                    min: 0
                },
                assetTokenDecimalPlaces: {
                    required: true,
                    min: 0,
                    max: TOKEN_DECIMALS_MAX
                }
            },
            messages: {
                assetName: {
                    required: 'Asset name is required',
                    minbytelength: 'Asset name is too short. Please give your asset a longer name',
                    maxbytelength: 'Asset name is too long. Please give your asset a shorter name'
                },
                assetDescription: {
                    maxbytelength: 'Maximum length of asset description exceeded. Please make a shorter description'
                },
                assetTotalTokens: {
                    required: 'Total amount of issued tokens in required',
                    min: 'Total issued tokens amount must be greater than or equal to zero'
                },
                assetTokenDecimalPlaces: {
                    required: 'Number of token decimal places is required',
                    min: 'Number of token decimal places must be greater or equal to zero',
                    max: 'Number of token decimal places must be less than or equal to ' + TOKEN_DECIMALS_MAX
                }
            }
        };
        ctrl.asset = {
            fee: FIXED_ISSUE_FEE
        };
        ctrl.confirm = {};
        ctrl.broadcast = new transactionBroadcast.instance(apiService.assets.issue,
            function (transaction, response) {
                resetForm();

                applicationContext.cache.putAsset(response);

                var displayMessage = 'Asset ' + ctrl.confirm.name + ' has been issued!<br/>' +
                    'Total tokens amount: ' + ctrl.confirm.totalTokens + '<br/>' +
                    'Date: ' + formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            });
        ctrl.broadcastIssueTransaction = broadcastIssueTransaction;
        ctrl.assetIssueConfirmation = assetIssueConfirmation;
        ctrl.resetForm = resetForm;

        loadDataFromBackend();
        resetForm();

        function assetIssueConfirmation(form, event) {
            event.preventDefault();

            if (!form.validate()) {
                return;
            }

            if (ctrl.asset.fee.greaterThan(ctrl.wavesBalance)) {
                notificationService.error('Not enough funds for the issue transaction fee');
                return;
            }

            var decimalPlaces = Number(ctrl.asset.decimalPlaces);
            var maxTokens = Math.floor(constants.JAVA_MAX_LONG / Math.pow(10, decimalPlaces));
            if (ctrl.asset.totalTokens > maxTokens) {
                notificationService.error('Total issued tokens amount must be less than ' + maxTokens);

                return;
            }

            var asset = {
                name: ctrl.asset.name,
                description: ctrl.asset.description,
                totalTokens: ctrl.asset.totalTokens,
                decimalPlaces: Number(ctrl.asset.decimalPlaces),
                reissuable: ctrl.asset.reissuable,
                fee: ctrl.asset.fee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            ctrl.confirm.name = ctrl.asset.name;
            ctrl.confirm.totalTokens = ctrl.asset.totalTokens;
            ctrl.confirm.reissuable = ctrl.asset.reissuable ? 'RE-ISSUABLE' : 'NON RE-ISSUABLE';

            ctrl.broadcast.setTransaction(assetService.createAssetIssueTransaction(asset, sender));

            dialogService.open('#create-asset-confirmation');
        }

        function broadcastIssueTransaction() {
            ctrl.broadcast.broadcast();
        }

        function resetForm() {
            ctrl.asset.name = '';
            ctrl.asset.description = '';
            ctrl.asset.totalTokens = '0';
            ctrl.asset.decimalPlaces = '0';
            ctrl.asset.reissuable = false;
        }

        function loadDataFromBackend() {
            refreshBalance();

            refreshPromise = $interval(function() {
                refreshBalance();
            }, refreshDelay);
        }

        function refreshBalance() {
            apiService.address.balance(applicationContext.account.address)
                .then(function (response) {
                    ctrl.wavesBalance = Money.fromCoins(response.balance, Currency.MIR);
                });
        }
    }

    TokenCreateController.$inject = ['$scope', '$interval', 'constants.ui', 'applicationContext',
        'assetService', 'dialogService', 'apiService', 'notificationService',
        'formattingService', 'transactionBroadcast'];

    angular
        .module('app.tokens')
        .controller('tokenCreateController', TokenCreateController);
})();

(function() {
    'use strict';

    angular.module('app.dex', ['app.shared', 'ngSanitize']);
})();

(function () {
    'use strict';

    var POLLING_DELAY = 5000,
        HISTORY_LIMIT = 50;

    function DexController($scope, $interval, applicationContext, assetStoreFactory, datafeedApiService,
                           dexOrderService, dexOrderbookService, notificationService, utilsService, dialogService) {

        var ctrl = this,
            intervalPromise,

            assetStore = assetStoreFactory.createStore(applicationContext.account.address),

            sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

        ctrl.assetsList = [];

        ctrl.pair = {
            amountAsset: Currency.MIR,
            priceAsset: Currency.PROTON
        };

        emptyDataFields();

        var favoritePairs = [
            { amountAsset: Currency.MIR, priceAsset: Currency.PROTON }
        ];

        ctrl.favoritePairs = favoritePairs;

        ctrl.createOrder = function (type, price, amount, fee, callback) {
            // TODO : add a queue for the orders which weren't yet accepted

            function emptyBadOrderFields() {
                ctrl.badOrderQuestion = '';
                ctrl.placeBadOrder = ctrl.refuseBadOrder = function () {};
            }

            var amountName = ctrl.pair.amountAsset.displayName,
                priceName = ctrl.pair.priceAsset.displayName,
                badSellOrder = (type === 'sell' && ctrl.buyOrders.length && price < ctrl.buyOrders[0].price * 0.9),
                badBuyOrder = (type === 'buy' && ctrl.sellOrders.length && price > ctrl.sellOrders[0].price * 1.1);

            if (badSellOrder || badBuyOrder) {

                ctrl.badOrderQuestion = 'Are you sure you want to ' + type + ' ' +
                    amountName + ' at price ' + price + ' ' + priceName + '?';

                ctrl.placeBadOrder = function () {
                    emptyBadOrderFields();
                    ctrl.realCreateOrder(type, price, amount, fee, callback);
                };

                ctrl.refuseBadOrder = function () {
                    emptyBadOrderFields();
                    callback();
                };

                dialogService.open('#dex-bad-order-confirmation');

            } else {
                ctrl.realCreateOrder(type, price, amount, fee, callback);
            }

        };

        ctrl.realCreateOrder = function (type, price, amount, fee, callback) {
            // TODO : add a queue for the orders which weren't yet accepted
            dexOrderService
                .addOrder(ctrl.pair, {
                    orderType: type,
                    amount: Money.fromTokens(amount, ctrl.pair.amountAsset),
                    price: OrderPrice.fromTokens(price, ctrl.pair),
                    fee: Money.fromTokens(fee, Currency.MIR)
                }, sender)
                .then(function () {
                    refreshOrderbooks();
                    refreshUserOrders();
                    notificationService.notice('Order has been created!');
                    if (callback) {
                        callback();
                    }
                })
                .catch(function (e) {
                    var errorMessage = e.data ? e.data.message : null;
                    notificationService.error(errorMessage || 'Order has not been created!');
                    if (callback) {
                        callback();
                    }
                });
        };

        ctrl.cancelOrder = function (order) {
            // TODO : add a queue for the orders which weren't yet canceled

            // TODO : add different messages for cancel and delete actions
            dexOrderService
                .removeOrder(ctrl.pair, order, sender)
                .then(function () {
                    refreshOrderbooks();
                    refreshUserOrders();
                    notificationService.notice('Order has been canceled!');
                })
                .catch(function (e) {
                    console.log(e);
                    notificationService.error('Order could not be canceled!');
                });
        };

        ctrl.changePair = function (pair) {
            ctrl.pair = pair;
            emptyDataFields();
            refreshAll();
        };

        ctrl.fillBuyForm = fillBuyForm;

        ctrl.fillSellForm = fillSellForm;

        assetStore
            .getAll()
            .then(function (assetsList) {
                ctrl.assetsList = assetsList;
            })
            .then(function () {
                return dexOrderbookService.getOrderbook(ctrl.pair.amountAsset, ctrl.pair.priceAsset);
            })
            .then(function (orderbook) {
                ctrl.pair = {
                    // Here we just get assets by their IDs
                    amountAsset: assetStore.syncGetAsset(orderbook.pair.amountAsset),
                    priceAsset: assetStore.syncGetAsset(orderbook.pair.priceAsset)
                };

                ctrl.buyOrders = orderbook.bids;
                ctrl.sellOrders = orderbook.asks;
                refreshUserOrders();
                refreshTradeHistory();
            })
            .catch(function (e) {
                console.log(e);
            });

        // Events are from asset pickers
        $scope.$on('asset-picked', function (e, newAsset, type) {
            // Define in which widget the asset was changed
            ctrl.pair[type] = newAsset;
            emptyDataFields();
            refreshAll();
        });

        // Enable polling for orderbooks and newly created assets
        intervalPromise = $interval(function () {
            refreshAll();
        }, POLLING_DELAY);

        ctrl.$onDestroy = function () {
            $interval.cancel(intervalPromise);
        };

        function emptyDataFields() {
            ctrl.buyOrders = [];
            ctrl.sellOrders = [];
            ctrl.userOrders = [];

            ctrl.buyFormValues = {};
            ctrl.sellFormValues = {};

            ctrl.tradeHistory = [];
            ctrl.lastTradePrice = 0;

            fillBuyForm();
            fillSellForm();

            // That forces children components to react on the pair change
            ctrl.pair = _.clone(ctrl.pair);
        }

        function refreshAll() {
            refreshOrderbooks();
            refreshUserOrders();
            refreshTradeHistory();
        }

        function refreshOrderbooks() {
            if (!ctrl.pair.amountAsset || !ctrl.pair.priceAsset) {
                return;
            }

            dexOrderbookService
                .getOrderbook(ctrl.pair.amountAsset, ctrl.pair.priceAsset)
                .then(function (orderbook) {
                    ctrl.buyOrders = orderbook.bids;
                    ctrl.sellOrders = orderbook.asks;
                    return orderbook.pair;
                })
                .then(function (pair) {
                    // Placing each asset in the right widget
                    if (ctrl.pair.amountAsset.id !== pair.amountAsset && ctrl.pair.priceAsset.id !== pair.priceAsset) {
                        var temp = ctrl.pair.amountAsset;
                        ctrl.pair.amountAsset = ctrl.pair.priceAsset;
                        ctrl.pair.priceAsset = temp;
                    }
                })
                .catch(function (e) {
                    console.log(e);
                });
        }

        function refreshUserOrders() {
            if (!ctrl.pair.amountAsset || !ctrl.pair.priceAsset) {
                return;
            }

            dexOrderService
                .getOrders(ctrl.pair)
                .then(function (orders) {
                    // TODO : add here orders from pending queues
                    ctrl.userOrders = orders;
                });
        }

        function refreshTradeHistory() {
            var pair = ctrl.pair;
            if (pair) {
                if (utilsService.isTestnet()) {
                    pair = utilsService.testnetSubstitutePair(pair);
                }

                datafeedApiService
                    .getTrades(pair, HISTORY_LIMIT)
                    .then(function (response) {
                        ctrl.tradeHistory = response.map(function (trade) {
                            return {
                                timestamp: trade.timestamp,
                                type: trade.type,
                                typeTitle: trade.type === 'buy' ? 'Buy' : 'Sell',
                                price: trade.price,
                                amount: trade.amount,
                                total: trade.price * trade.amount
                            };
                        });

                        ctrl.lastTradePrice = ctrl.tradeHistory[0].price;
                    });
            }
        }

        function fillBuyForm(price, amount, total) {
            ctrl.buyFormValues = {
                price: price,
                amount: amount,
                total: total
            };
        }

        function fillSellForm(price, amount, total) {
            ctrl.sellFormValues = {
                price: price,
                amount: amount,
                total: total
            };
        }
    }

    DexController.$inject = ['$scope', '$interval', 'applicationContext', 'assetStoreFactory', 'datafeedApiService',
        'dexOrderService', 'dexOrderbookService', 'notificationService', 'utilsService', 'dialogService'];

    angular
        .module('app.dex')
        .component('wavesDex', {
            controller: DexController,
            templateUrl: 'dex/component'
        });
})();

(function () {
    'use strict';

    var ASSET_ID_BYTE_LENGTH = 32;

    function AssetPickerController($scope, $element, autocomplete, apiService, utilityService) {
        var ctrl = this,
            autocompleteElement = $element.find('md-autocomplete');

        ctrl.isAssetLoading = false;
        ctrl.isPickingInProgress = false;
        ctrl.autocomplete = autocomplete.create();

        ctrl.$onChanges = function () {
            if (ctrl.assets && ctrl.pickedAsset) {
                if (!ctrl.isPickingInProgress) {
                    ctrl.autocomplete.selectedAsset = ctrl.pickedAsset;
                }

                ctrl.autocomplete.assets = ctrl.assets.map(function (asset) {
                    return asset.currency;
                }).filter(function (asset) {
                    return asset.verified && (asset !== ctrl.hiddenAsset);
                });
            }
        };

        autocompleteElement.on('focusin', function () {
            ctrl.isPickingInProgress = true;
        });

        autocompleteElement.on('focusout', function () {
            ctrl.isPickingInProgress = false;
            ctrl.autocomplete.selectedAsset = ctrl.pickedAsset;
        });

        ctrl.changeAsset = function () {
            var asset = ctrl.autocomplete.selectedAsset;
            if (asset && asset !== ctrl.pickedAsset) {
                ctrl.isPickingInProgress = false;
                $scope.$emit('asset-picked', asset, ctrl.type);
            }
        };

        ctrl.findAssets = function (query) {
            var assets = ctrl.autocomplete.querySearch(query);
            if (assets.length === 0 && isValidAssetId(query)) {
                ctrl.isAssetLoading = true;
                apiService.transactions.info(query).then(function (response) {
                    var currency = Currency.create({
                        id: response.id,
                        displayName: response.name,
                        precision: response.decimals
                    });

                    ctrl.autocomplete.assets.push(currency);
                    ctrl.autocomplete.selectedAsset = currency;

                    // That strangely unfocuses the element thus avoiding an empty dropdown.
                    autocompleteElement.focus();
                }).finally(function () {
                    ctrl.isAssetLoading = false;
                });
                return [];
            } else {
                ctrl.isAssetLoading = false;
                return assets;
            }
        };

        function isValidAssetId(str) {
            if (utilityService.isValidBase58String(str)) {
                return utilityService.base58StringToByteArray(str).length === ASSET_ID_BYTE_LENGTH;
            }
        }
    }

    AssetPickerController.$inject = ['$scope', '$element', 'autocomplete.assets', 'apiService', 'utilityService'];

    angular
        .module('app.dex')
        .component('wavesDexAssetPicker', {
            controller: AssetPickerController,
            bindings: {
                name: '@',
                type: '@',
                assets: '<',
                hiddenAsset: '<',
                pickedAsset: '<'
            },
            templateUrl: 'dex/asset.picker.component'
        });
})();

(function () {
    'use strict';

    var CANDLE_NUMBER = 100,
        CANDLE_FRAME = 30,
        POLLING_DELAY = 5000;

    function isCandleEmpty(c) {
        return +c.open === 0 && +c.high === 0 && +c.low === 0 && +c.close === 0 && +c.vwap === 0;
    }

    function adjustCandles(candles) {

        var i = candles.length;
        while (isCandleEmpty(candles[--i])) {}

        var fix = candles[i].open;
        while (++i < candles.length) {
            candles[i].open = candles[i].high = candles[i].low = candles[i].close = candles[i].vwap = fix;
        }

        return candles;

    }

    function ChartController($element, $interval, datafeedApiService, utilsService, chartsFactory) {
        var ctrl = this,
            intervalPromise;

        setTimeout(function () {
            // That instantiation is placed here because of the synchronous width resolving issue.
            ctrl.chart = chartsFactory.create('candlestick', $element);
            refreshCandles();
        }, 100);

        intervalPromise = $interval(refreshCandles, POLLING_DELAY);

        ctrl.$onChanges = function (changes) {
            if (ctrl.chart && changes.pair) {
                ctrl.chart.clear();
                refreshCandles();
            }
        };

        ctrl.$onDestroy = function () {
            $interval.cancel(intervalPromise);
        };

        function refreshCandles() {
            var pair = ctrl.pair;
            if (pair) {
                if (utilsService.isTestnet()) {
                    pair = utilsService.testnetSubstitutePair(pair);
                }

                datafeedApiService
                    .getLastCandles(pair, CANDLE_NUMBER, CANDLE_FRAME)
                    .then(function (response) {
                        response = adjustCandles(response);
                        ctrl.chart.draw(response);
                    });
            }
        }
    }

    ChartController.$inject = ['$element', '$interval', 'datafeedApiService', 'utilsService', 'chartsFactory'];

    angular
        .module('app.dex')
        .component('wavesDexChart', {
            controller: ChartController,
            bindings: {
                pair: '<'
            },
            templateUrl: 'dex/chart.component'
        });
})();

(function () {
    'use strict';

    angular
        .module('app.dex')
        .factory('chartsFactory', [function () {
            function CandlestickChart($element) {
                var w = $element.width(),
                    h = $element.height(),
                    elem = $element.children('.chart').get(0),
                    margins = {left: 60, top: 20, right: 60, bottom: 30};

                this.width = w - margins.left - margins.right;
                this.height = h - margins.top - margins.bottom;

                this.x = techan.scale.financetime().range([0, this.width]);
                this.y = d3.scaleLinear().range([this.height, 0]);
                this.yVolume = d3.scaleLinear().range([this.y(0), this.y(0.2)]);

                this.candlestick = techan.plot.candlestick().xScale(this.x).yScale(this.y);
                this.accessor = this.candlestick.accessor();
                this.volume = techan.plot.volume()
                    .accessor(this.accessor)
                    .xScale(this.x)
                    .yScale(this.yVolume);

                this.xAxis = d3.axisBottom(this.x);
                this.yAxis = d3.axisLeft(this.y);
                this.yAxisRight = d3.axisRight(this.y);
                this.volumeAxis = d3.axisRight(this.yVolume).ticks(2).tickFormat(d3.format(',.3s'));

                this.svg = d3
                    .select(elem)
                    .append('svg')
                    .attr('width', this.width + margins.left + margins.right)
                    .attr('height', this.height + margins.top + margins.bottom);

                this.chart = this.svg
                    .append('g')
                    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

                this.chart.append('g')
                    .attr('class', 'candlestick');

                this.chart.append('g')
                    .attr('class', 'volume');

                this.chart.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + this.height + ')');

                this.chart.append('g')
                    .attr('class', 'y axis');

                this.chart.append('g')
                    .attr('class', 'y axis-right')
                    .attr('transform', 'translate(' + this.width + ',0)');

                this.chart.append('g')
                    .attr('class', 'volume axis');

                this.chart.append('text')
                    .attr('class', 'note')
                    .attr('transform', 'translate(' + (this.width - 250) + ',10)')
                    .text('Candles cover 30 minute intervals');

                this.chart.append('text')
                    .attr('class', 'ticker')
                    .attr('transform', 'translate(' + (this.width - 250) + ',30)');
            }

            CandlestickChart.prototype.clear = function () {
                this.draw([]);
            };

            CandlestickChart.prototype.draw = function (data) {
                data = this.prepareData(data);

                this.x.domain(data.map(this.accessor.d));
                this.y.domain(techan.scale.plot.ohlc(data, this.accessor).domain());
                this.yVolume.domain(techan.scale.plot.volume(data).domain());

                this.chart.selectAll('g.candlestick').datum(data).call(this.candlestick);
                this.chart.selectAll('g.volume').datum(data).call(this.volume);
                this.chart.selectAll('g.x.axis').call(this.xAxis);
                this.chart.selectAll('g.y.axis').call(this.yAxis);
                this.chart.selectAll('g.y.axis-right').call(this.yAxisRight);
                this.chart.selectAll('g.volume.axis').call(this.volumeAxis);

                var now = new Date(),
                    hh = now.getHours(),
                    mm = now.getMinutes(),
                    ss = now.getSeconds();
                hh = hh < 10 ? '0' + hh : hh;
                mm = mm < 10 ? '0' + mm : mm;
                ss = ss < 10 ? '0' + ss : ss;
                this.chart.selectAll('text.ticker').text('Last updated: ' + hh + ':' + mm + ':' + ss);
            };

            CandlestickChart.prototype.prepareData = function (rawData) {
                var self = this,
                    lastTradePrice = 0;
                return rawData.map(function (candle) {
                    var adjustedHigh = Math.min(+candle.high, +candle.vwap * 1.5),
                        adjustedLow = Math.max(+candle.low, +candle.vwap / 2);

                    return {
                        date: candle.timestamp,
                        open: +candle.open,
                        high: adjustedHigh,
                        low: adjustedLow,
                        close: +candle.close,
                        volume: +candle.volume
                    };
                }).sort(function (a, b) {
                    return d3.ascending(self.accessor.d(a), self.accessor.d(b));
                }).map(function (c) {
                    if (c.open === 0 && c.high === 0 && c.low === 0 && c.close === 0) {
                        c.open = c.high = c.low = c.close = lastTradePrice;
                    } else {
                        lastTradePrice = c.close;
                    }

                    return c;
                });
            };

            return {
                create: function (type, $element) {
                    if (type === 'candlestick') {
                        return new CandlestickChart($element);
                    }
                }
            };
        }]);
})();

(function () {
    'use strict';

    function FavoritesController() {
        var ctrl = this;

        ctrl.onClick = function (pair) {
            ctrl.switchPair({
                amountAsset: pair.amountAsset,
                priceAsset: pair.priceAsset
            });
        };
    }

    angular
        .module('app.dex')
        .component('wavesDexFavorites', {
            controller: FavoritesController,
            bindings: {
                pairs: '<',
                switchPair: '<'
            },
            templateUrl: 'dex/favorites.component'
        });
})();

(function () {
    'use strict';

    function HistoryController() {}

    angular
        .module('app.dex')
        .component('wavesDexHistory', {
            controller: HistoryController,
            bindings: {
                pair: '<',
                trades: '<'
            },
            templateUrl: 'dex/history.component'
        });
})();

(function () {
    'use strict';

    var FEE = 0.003,
        BALANCE_UPDATE_DELAY = 5000;

    function OrderCreatorController($interval, applicationContext, matcherApiService) {

        var ctrl = this,
            intervalPromise;

        ctrl.buy = {
            price: '',
            amount: '',
            total: '',
            fee: FEE,
            blocked: false
        };

        ctrl.sell = {
            price: '',
            amount: '',
            total: '',
            fee: FEE,
            blocked: false
        };

        ctrl.submitBuyOrder = function () {
            if (!ctrl.buy.amount || !ctrl.buy.price) {
                return;
            }

            ctrl.buy.blocked = true;
            ctrl.submit('buy', ctrl.buy.price, ctrl.buy.amount, FEE, function () {
                ctrl.buy.blocked = false;
                refreshBalances();
            });
        };

        ctrl.submitSellOrder = function () {
            if (!ctrl.sell.amount || !ctrl.sell.price) {
                return;
            }

            ctrl.sell.blocked = true;
            ctrl.submit('sell', ctrl.sell.price, ctrl.sell.amount, FEE, function () {
                ctrl.sell.blocked = false;
                refreshBalances();
            });
        };

        // Those two methods are called to update `total` after user's input:

        ctrl.updateBuyTotal = function () {
            ctrl.buy.total = ctrl.buy.price * ctrl.buy.amount || '';
        };

        ctrl.updateSellTotal = function () {
            ctrl.sell.total = ctrl.sell.price * ctrl.sell.amount || '';
        };

        // Those two methods calculate the amount as current balance divided by last history price:

        ctrl.buyFullBalance = function () {
            var price = ctrl.buy.price || ctrl.lastPrice,
                balance = ctrl.priceAssetBalance.toTokens();

            if (price && balance) {
                ctrl.buy.price = price;
                ctrl.buy.amount = Money.fromTokens(balance / price, ctrl.pair.amountAsset).toTokens();
                ctrl.updateBuyTotal();
            }
        };

        ctrl.sellFullBalance = function () {
            var price = ctrl.sell.price || ctrl.lastPrice,
                balance = ctrl.amountAssetBalance.toTokens();

            if (price && balance) {
                ctrl.sell.price = price;
                ctrl.sell.amount = balance;
                ctrl.updateSellTotal();
            }
        };

        intervalPromise = $interval(refreshBalances, BALANCE_UPDATE_DELAY);

        ctrl.$onDestroy = function () {
            $interval.cancel(intervalPromise);
        };

        ctrl.$onChanges = function (changes) {
            refreshBalances();

            // Those lines write directly to the `total` field when it's calculated in an orderbook:

            if (changes.outerBuyValues) {
                ctrl.buy.price = ctrl.outerBuyValues.price || '';
                ctrl.buy.amount = ctrl.outerBuyValues.amount || '';
                ctrl.buy.total = ctrl.outerBuyValues.total || ctrl.buy.price * ctrl.buy.amount || '';
            }

            if (changes.outerSellValues) {
                ctrl.sell.price = ctrl.outerSellValues.price || '';
                ctrl.sell.amount = ctrl.outerSellValues.amount || '';
                ctrl.sell.total = ctrl.outerSellValues.total || ctrl.sell.price * ctrl.sell.amount || '';
            }
        };

        function refreshBalances() {
            var amountAsset = ctrl.pair.amountAsset,
                priceAsset = ctrl.pair.priceAsset;

            matcherApiService
                .getTradableBalance(amountAsset.id, priceAsset.id, applicationContext.account.address)
                .then(function (data) {
                    ctrl.amountAssetBalance = Money.fromCoins(data[amountAsset.id], amountAsset);
                    ctrl.priceAssetBalance = Money.fromCoins(data[priceAsset.id], priceAsset);
                });
        }
    }

    OrderCreatorController.$inject = ['$interval', 'applicationContext', 'matcherApiService'];

    angular
        .module('app.dex')
        .component('wavesDexOrderCreator', {
            controller: OrderCreatorController,
            bindings: {
                pair: '<',
                submit: '<',
                lastPrice: '<',
                outerBuyValues: '<buyValues',
                outerSellValues: '<sellValues'
            },
            templateUrl: 'dex/order.creator.component'
        });
})();

(function () {
    'use strict';

    var ACCEPTED = 'Accepted',
        PARTIALLY = 'PartiallyFilled',
        FILLED = 'Filled',
        CANCELLED = 'Cancelled',
        NOT_FOUND = 'NotFound',

        ORDER_CANCELED = 'OrderCanceled',
        ORDER_DELETED = 'OrderDeleted';

    function DexOrderService(matcherRequestService, matcherApiService, applicationContext) {

        // TODO : clean that all from the state.

        this.addOrder = function (pair, order, sender) {
            return matcherApiService
                .loadMatcherKey()
                .then(function (matcherKey) {
                    order.matcherKey = matcherKey;
                    var signedRequest = matcherRequestService.buildCreateOrderRequest(order, sender);
                    return matcherApiService.createOrder(signedRequest);
                }).catch(function (e) {
                    throw new Error(e);
                });
        };

        this.removeOrder = function (pair, order, sender) {
            var signedRequest = matcherRequestService.buildCancelOrderRequest(order.id, sender);
            if (order.status === ACCEPTED || order.status === PARTIALLY) {
                return matcherApiService
                    .cancelOrder(pair.amountAsset.id, pair.priceAsset.id, signedRequest)
                    .then(function (response) {
                        if (response.status !== ORDER_CANCELED) {
                            throw new Error();
                        }
                    }).catch(function (e) {
                        throw new Error(e);
                    });
            } else if (order.status === FILLED || order.status === CANCELLED) {
                return matcherApiService
                    .deleteOrder(pair.amountAsset.id, pair.priceAsset.id, signedRequest)
                    .then(function (response) {
                        if (response.status !== ORDER_DELETED) {
                            throw new Error();
                        }
                    }).catch(function (e) {
                        throw new Error(e);
                    });
            }
        };

        this.getOrders = function (pair) {
            return matcherApiService
                .loadUserOrders(pair.amountAsset.id, pair.priceAsset.id, {
                    publicKey: applicationContext.account.keyPair.public,
                    privateKey: applicationContext.account.keyPair.private
                })
                .then(function (response) {
                    return response.map(function (o) {
                        if (o.amount === null || o.price === null || o.filled === null || o.timestamp === null) {
                            console.error('Bad order!', o);
                            o.amount = o.amount || 0;
                            o.price = o.price || 0;
                            o.filled = o.filled || 0;
                            o.timestamp = o.timestamp || 0;
                        }

                        var orderPrice = OrderPrice.fromBackendPrice(o.price, pair).toTokens();

                        return {
                            id: o.id,
                            type: o.type,
                            price: Money.fromTokens(orderPrice, pair.priceAsset),
                            amount: Money.fromCoins(o.amount, pair.amountAsset),
                            filled: Money.fromCoins(o.filled, pair.amountAsset),
                            status: o.status || NOT_FOUND,
                            timestamp: o.timestamp
                        };
                    });
                })
                .catch(function (e) {
                    throw new Error(e);
                });
        };
    }

    DexOrderService.$inject = ['matcherRequestService', 'matcherApiService', 'applicationContext'];

    angular
        .module('app.dex')
        .service('dexOrderService', DexOrderService);
})();

(function () {
    'use strict';

    function denormalizeOrders(orders) {
        if (!orders || !orders.length) {
            return [];
        }

        var currentSum = 0;
        return orders.map(function (order) {
            var total = order.price * order.amount;
            currentSum += total;
            return {
                id: order.id,
                price: order.price,
                amount: order.amount,
                total: total,
                sum: currentSum
            };
        });
    }

    function calculateStringLength(n, precision) {
        // Get initial string length with a given precision.
        var len = n.toFixed(precision).length;
        // Add some length for commas (e.g. 10,000,000.0000).
        return len + Math.floor(n.toFixed(0).length / 3);
    }

    function getMaxLengths(orders, pair) {
        var price = 0,
            amount = 0,
            total = 0,
            sum = 0;

        // Get max value for each column.
        orders.forEach(function (order) {
            if (order.price > price) {
                price = order.price;
            }
            if (order.amount > amount) {
                amount = order.amount;
            }
            if (order.total > total) {
                total = order.total;
            }
            if (order.sum > sum) {
                sum = order.sum;
            }
        });

        return {
            price: calculateStringLength(price, pair.priceAsset.precision),
            amount: calculateStringLength(amount, pair.amountAsset.precision),
            total: calculateStringLength(total, pair.priceAsset.precision),
            sum: calculateStringLength(sum, pair.priceAsset.precision)
        };
    }

    function OrderbookController() {
        var ctrl = this;

        ctrl.lineClick = function (index) {
            var order = ctrl.orders[index],
                cumulativeAmount = ctrl.orders.slice(0, index + 1).reduce(function (amountSum, order) {
                    return amountSum + order.amount;
                }, 0);

            ctrl.onClick(Number(order.price).toFixed(8), cumulativeAmount, order.sum);
        };

        ctrl.$onChanges = function (changes) {
            if (!changes.rawOrders) {
                return;
            }

            var denormPreviousValue = denormalizeOrders(changes.rawOrders.previousValue),
                denormCurrentValue = denormalizeOrders(changes.rawOrders.currentValue);

            if (!_.isEqual(denormPreviousValue, denormCurrentValue)) {
                ctrl.orders = denormCurrentValue;
                ctrl.lengths = getMaxLengths(ctrl.orders, ctrl.pair);
            }
        };
    }

    angular
        .module('app.dex')
        .component('wavesDexOrderbook', {
            controller: OrderbookController,
            bindings: {
                type: '@',
                name: '@',
                pair: '<',
                onClick: '<',
                rawOrders: '<orders'
            },
            templateUrl: 'dex/orderbook.component'
        });
})();

(function () {
    'use strict';

    function normalizeOrder(order, pair) {
        return {
            price: OrderPrice.fromBackendPrice(order.price, pair).toTokens(),
            amount: Money.fromCoins(order.amount, pair.amountAsset).toTokens()
        };
    }

    function DexOrderbookService(matcherApiService) {
        this.getOrderbook = function (assetOne, assetTwo) {
            var assets = {};
            assets[assetOne.id] = assetOne;
            assets[assetTwo.id] = assetTwo;
            return matcherApiService
                .loadOrderbook(assetOne.id, assetTwo.id)
                .then(function (orderbook) {
                    var pair = {
                        amountAsset: assets[orderbook.pair.amountAsset],
                        priceAsset: assets[orderbook.pair.priceAsset]
                    };

                    return {
                        timestamp: orderbook.timestamp,
                        pair: orderbook.pair,
                        bids: orderbook.bids.map(function (order) {
                            return normalizeOrder(order, pair);
                        }),
                        asks: orderbook.asks.map(function (order) {
                            return normalizeOrder(order, pair);
                        })
                    };
                });
        };
    }

    DexOrderbookService.$inject = ['matcherApiService'];

    angular
        .module('app.dex')
        .service('dexOrderbookService', DexOrderbookService);
})();

(function () {
    'use strict';

    var statuses = {
        'PartiallyFilled': {
            title: 'Partial',
            order: 2
        },
        'Accepted': {
            title: 'Opened',
            order: 4
        },
        'Filled': {
            title: 'Closed',
            order: 6
        },
        'Cancelled': {
            title: 'Canceled',
            order: 8
        },
        'NotFound': {
            title: 'NotFound',
            order: 10
        }
    };

    var types = {
        'buy': {
            title: 'Buy',
            order: 0
        },
        'sell': {
            title: 'Sell',
            order: 1
        }
    };

    function status(s) {
        return statuses[s] ? statuses[s].title : '---';
    }

    function type(t) {
        return types[t] ? types[t].title : '---';
    }

    function denormalizeUserOrders(orders) {
        if (!orders || !orders.length) {
            return [];
        }

        return orders.map(function (order) {
            var price = order.price.toTokens(),
                amount = order.amount.toTokens(),
                filled = order.filled.toTokens();

            return {
                id: order.id,
                status: order.status,
                statusTitle: status(order.status),
                type: order.type,
                typeTitle: type(order.type),
                price: price,
                amount: amount,
                total: price * amount,
                filled: filled,
                timestamp: order.timestamp
            };
        });
    }

    function sortUserOrders(orders) {
        return orders.sort(function (a, b) {
            var aVal = statuses[a.status].order + types[a.type].order,
                bVal = statuses[b.status].order + types[b.type].order;
            return aVal - bVal;
        });
    }

    function UserOrdersController() {
        var ctrl = this;

        ctrl.cancel = function (obj) {
            ctrl.cancelOrder(obj.order);
        };

        ctrl.$onChanges = function (changes) {
            if (!changes.rawOrders) {
                return;
            }

            var denormPreviousValue = denormalizeUserOrders(changes.rawOrders.previousValue),
                denormCurrentValue = denormalizeUserOrders(changes.rawOrders.currentValue);

            if (!_.isEqual(denormPreviousValue, denormCurrentValue)) {
                ctrl.orders = sortUserOrders(denormCurrentValue);
            }
        };
    }

    angular
        .module('app.dex')
        .component('wavesDexUserOrders', {
            controller: UserOrdersController,
            bindings: {
                pair: '<',
                rawOrders: '<orders',
                cancelOrder: '<'
            },
            templateUrl: 'dex/user.orders.component'
        });
})();

(function() {
    'use strict';

    angular.module('app.leasing', ['app.shared']);
})();

(function () {
    'use strict';

    var DEFAULT_CURRENCY = Currency.MIR;

    function WavesLeasingService (apiService) {
        function parseBalance(response) {
            return Money.fromCoins(response.balance, DEFAULT_CURRENCY);
        }

        this.loadBalanceDetails = function (address) {
            var details = {};
            return apiService.address.balance(address)
                .then(function (response) {
                    details.regular = parseBalance(response);

                    return apiService.address.effectiveBalance(address);
                })
                .then(function (response) {
                    details.effective = parseBalance(response);

                    return apiService.address.generatingBalance(address);
                })
                .then(function (response) {
                    details.generating = parseBalance(response);

                    return details;
                });
        };
    }

    WavesLeasingService.$inject = ['apiService'];

    angular
        .module('app.leasing')
        .service('leasingService', WavesLeasingService);
})();

(function () {
    'use strict';

    var POLLING_DELAY = 5000,
        DEFAULT_ERROR_MESSAGE = 'Failed to load balance details';

    function LeasingController($interval, constants, applicationContext,
                               leasingService, transactionLoadingService, notificationService) {
        var ctrl = this,
            intervalPromise;

        ctrl.transactions = [];
        ctrl.limitTo = 1000;
        ctrl.balanceDetails = null;

        refreshAll();
        intervalPromise = $interval(refreshAll, POLLING_DELAY);
        ctrl.$onDestroy = function () {
            $interval.cancel(intervalPromise);
        };

        function refreshAll() {
            refreshBalanceDetails();
            refreshLeasingTransactions();
        }

        function refreshBalanceDetails() {
            leasingService
                .loadBalanceDetails(applicationContext.account.address)
                .then(function (balanceDetails) {
                    ctrl.balanceDetails = balanceDetails;
                }).catch(function (e) {
                    if (e) {
                        if (e.data) {
                            notificationService.error(e.data.message);
                        } else if (e.message) {
                            notificationService.error(e.message);
                        } else if (e.statusText) {
                            notificationService.error(e.statusText);
                        } else {
                            notificationService.error(DEFAULT_ERROR_MESSAGE);
                        }
                    } else {
                        notificationService.error(DEFAULT_ERROR_MESSAGE);
                    }
                });
        }

        function refreshLeasingTransactions() {
            transactionLoadingService
                .loadTransactions(applicationContext.account, ctrl.limitTo)
                .then(function (transactions) {
                    ctrl.transactions = transactions.filter(function (tx) {
                        var startLeasing = constants.START_LEASING_TRANSACTION_TYPE,
                            cancelLeasing = constants.CANCEL_LEASING_TRANSACTION_TYPE;
                        return tx.type === startLeasing || tx.type === cancelLeasing;
                    });
                });
        }
    }

    LeasingController.$inject = ['$interval', 'constants.transactions', 'applicationContext',
                                 'leasingService', 'transactionLoadingService', 'notificationService'];

    angular
        .module('app.leasing')
        .component('wavesLeasing', {
            controller: LeasingController,
            templateUrl: 'leasing/component'
        });
})();

(function () {
    'use strict';

    var FEE_CURRENCY = Currency.MIR;

    function LeasingFormController($timeout, constants, applicationContext,
                                   apiService, dialogService, notificationService, transactionBroadcast,
                                   formattingService, addressService, leasingService, leasingRequestService) {
        var ctrl = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);

        ctrl.fee = minimumFee;
        ctrl.availableBalance = Money.fromCoins(0, Currency.MIR);

        ctrl.broadcast = new transactionBroadcast.instance(apiService.leasing.lease,
            function (transaction) {
                var amount = Money.fromCoins(transaction.amount, Currency.MIR);
                var address = transaction.recipient;
                var displayMessage = 'Leased ' + amount.formatAmount(true) + ' of ' +
                    amount.currency.displayName +
                    '<br/>Recipient ' + address.substr(0,15) + '...<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            }
        );

        ctrl.validationOptions = {
            rules: {
                leasingRecipient: {
                    required: true
                },
                leasingAmount: {
                    required: true,
                    decimal: 8, // stub value updated on validation
                    min: 0, // stub value updated on validation
                    max: constants.JAVA_MAX_LONG // stub value updated on validation
                }
            },
            messages: {
                leasingRecipient: {
                    required: 'Recipient account number is required'
                },
                leasingAmount: {
                    required: 'Amount to lease is required'
                }
            }
        };

        ctrl.confirm = {
            recipient: ''
        };

        ctrl.confirmLease = confirmLease;
        ctrl.broadcastTransaction = broadcastTransaction;

        reset();

        leasingService
            .loadBalanceDetails(applicationContext.account.address)
            .then(function (balanceDetails) {
                //FIXME: add here a correct value available to lease
                ctrl.availableBalance = balanceDetails.effective;

                reset();

                // Update validation options and check how they affect form validation
                ctrl.validationOptions.rules.leasingAmount.decimal = ctrl.availableBalance.currency.precision;
                var minimumPayment = Money.fromCoins(1, ctrl.availableBalance.currency);
                ctrl.validationOptions.rules.leasingAmount.min = minimumPayment.toTokens();
                ctrl.validationOptions.rules.leasingAmount.max = ctrl.availableBalance.toTokens();
                ctrl.validationOptions.messages.leasingAmount.decimal = 'The amount to leasing must be a number ' +
                    'with no more than ' + minimumPayment.currency.precision +
                    ' digits after the decimal point (.)';
                ctrl.validationOptions.messages.leasingAmount.min = 'Leasing amount is too small. ' +
                    'It should be greater or equal to ' + minimumPayment.formatAmount(false);
                ctrl.validationOptions.messages.leasingAmount.max = 'Leasing amount is too big. ' +
                    'It should be less or equal to ' + ctrl.availableBalance.formatAmount(false);
            });

        function confirmLease(form) {
            if (!form.validate(ctrl.validationOptions)) {
                return false;
            }

            var amount = Money.fromTokens(ctrl.amount, ctrl.availableBalance.currency);
            var transferFee = ctrl.fee;

            // We assume here that amount and fee are in Waves, however it's not hardcoded
            var leasingCost = amount.plus(transferFee);
            if (leasingCost.greaterThan(ctrl.availableBalance)) {
                notificationService.error('Not enough ' + FEE_CURRENCY.displayName + ' for the leasing transaction');
                return false;
            }

            var startLeasing = {
                recipient: addressService.cleanupOptionalPrefix(ctrl.recipient),
                amount: amount,
                fee: transferFee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            // Create a transaction and wait for confirmation
            ctrl.broadcast.setTransaction(leasingRequestService.buildStartLeasingRequest(startLeasing, sender));

            // Set data to the confirmation dialog
            ctrl.confirm.amount = startLeasing.amount;
            ctrl.confirm.fee = startLeasing.fee;
            ctrl.confirm.recipient = startLeasing.recipient;

            // Open confirmation dialog (async because this method is called while another dialog is open)
            $timeout(function () {
                dialogService.open('#start-leasing-confirmation');
            }, 1);

            // Close payment dialog
            return true;
        }

        function broadcastTransaction() {
            ctrl.broadcast.broadcast();
        }

        function reset() {
            ctrl.amount = '0';
            ctrl.recipient = '';
            ctrl.confirm.amount = Money.fromTokens(0, Currency.MIR);
            ctrl.confirm.fee = minimumFee;
        }
    }

    LeasingFormController.$inject = ['$timeout', 'constants.ui', 'applicationContext',
                                     'apiService', 'dialogService', 'notificationService', 'transactionBroadcast',
                                     'formattingService', 'addressService', 'leasingService', 'leasingRequestService'];

    angular
        .module('app.leasing')
        .component('wavesLeasingLeaseForm', {
            controller: LeasingFormController,
            templateUrl: 'leasing/lease.form.component'
        });
})();

(function () {
    'use strict';

    function WavesBalanceDetailsController () {
        var ctrl = this;

        ctrl.formattedBalance = {};

        ctrl.$onChanges = function () {
            if (ctrl.balanceDetails) {
                ctrl.formattedBalance = {
                    regular: formatMoney(ctrl.balanceDetails.regular),
                    effective: formatMoney(ctrl.balanceDetails.effective),
                    generating: formatMoney(ctrl.balanceDetails.generating)
                };
            }
        };

        function formatMoney(amount) {
            return amount.formatAmount(true) + ' ' + amount.currency.shortName;
        }
    }

    angular
        .module('app.leasing')
        .component('wavesLeasingBalanceDetails', {
            controller: WavesBalanceDetailsController,
            bindings: {
                balanceDetails: '<'
            },
            templateUrl: 'leasing/balance.details.component'
        });
})();

(function() {
    'use strict';

    angular.module('app.history', ['app.shared']);
})();

(function () {
    'use strict';

    var TRANSACTIONS_TO_LOAD = 200;

    function HistoryController($scope, $interval, applicationContext, transactionLoadingService) {
        var history = this;
        var refreshPromise;
        var refreshDelay = 10 * 1000;

        history.transactions = [];

        refreshTransactions();

        refreshPromise = $interval(refreshTransactions, refreshDelay);

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        function refreshTransactions() {
            var txArray;
            transactionLoadingService.loadTransactions(applicationContext.account, TRANSACTIONS_TO_LOAD)
                .then(function (transactions) {
                    txArray = transactions;

                    return transactionLoadingService.refreshAssetCache(applicationContext.cache, transactions);
                })
                .then(function () {
                    history.transactions = txArray;
                });
        }
    }

    HistoryController.$inject = ['$scope', '$interval', 'applicationContext', 'transactionLoadingService'];

    angular
        .module('app.history')
        .controller('historyController', HistoryController);
})();

(function() {
    'use strict';

    angular.module('app.community', ['app.shared']);
})();

(function () {
    'use strict';

    function CommunityController($scope, $interval, apiService, applicationContext) {
        var community = this;
        var refreshPromise;
        var REFRESH_DELAY = 10 * 1000;
        var BLOCKS_DEPTH = 50;

        community.candidate = {
            block: 0,
            size: 0
        };
        community.blocks = [];

        refreshData();

        refreshPromise = $interval(refreshData, REFRESH_DELAY);

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        function refreshData() {
            var blockHeight = applicationContext.blockHeight;

            var endBlock = blockHeight;
            var startBlock = Math.max(1, endBlock - BLOCKS_DEPTH);
            apiService.transactions.unconfirmed()
                .then(function (response) {
                    community.candidate.block = blockHeight + 1;
                    community.candidate.size = response.length;

                    return apiService.blocks.list(startBlock, endBlock);
                })
                .then(function (response) {
                    community.blocks = response;
                });
        }
    }

    CommunityController.$inject = ['$scope', '$interval', 'apiService', 'applicationContext'];

    angular
        .module('app.community')
        .controller('communityController', CommunityController);
})();

(function() {
    'use strict';

    angular.module('app.portfolio', ['app.shared'])
        .constant('portfolio.events', {
            ASSET_TRANSFER: 'asset-transfer',
            ASSET_REISSUE: 'asset-reissue',
            ASSET_DETAILS: 'asset-details',
            ASSET_MASSPAY: 'asset-masspay'
        });
})();

(function () {
    'use strict';

    function WavesAssetListController($scope, $timeout, $interval, events,
                                      applicationContext, apiService, formattingService) {
        var ctrl = this;
        var refreshPromise;
        var refreshDelay = 10 * 1000;

        ctrl.wavesBalance = new Money(0, Currency.MIR);
        ctrl.assets = [];
        ctrl.noData = true;
        ctrl.assetTransfer = assetTransfer;
        ctrl.assetDetails = assetDetails;
        ctrl.assetReissue = assetReissue;
        ctrl.assetMassPay = assetMassPay;
        loadDataFromBackend();

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        function loadDataFromBackend() {
            refreshAssets();
            refreshBalance();

            refreshPromise = $interval(function() {
                refreshAssets();
                refreshBalance();
            }, refreshDelay);
        }

        function assetTransfer(assetId) {
            $scope.$broadcast(events.ASSET_TRANSFER, {
                assetId: assetId,
                wavesBalance: ctrl.wavesBalance
            });
        }

        function assetDetails(assetId) {
            $scope.$broadcast(events.ASSET_DETAILS, assetId);
        }

        function assetReissue(assetId) {
            $scope.$broadcast(events.ASSET_REISSUE, {
                assetId: assetId,
                wavesBalance: ctrl.wavesBalance
            });
        }

        function assetMassPay(assetId) {
            $scope.$broadcast(events.ASSET_MASSPAY, {
                assetId: assetId,
                wavesBalance: ctrl.wavesBalance
            });
        }

        function loadAssetDataFromCache(asset) {
            var cached = applicationContext.cache.assets[asset.id];
            asset.balance = cached.balance;
            asset.name = cached.currency.displayName;
            asset.total = cached.totalTokens.formatAmount();
            asset.timestamp = formattingService.formatTimestamp(cached.timestamp);
            asset.reissuable = cached.reissuable;
            asset.sender = cached.sender;
        }

        function refreshBalance() {
            apiService.address.balance(applicationContext.account.address)
                .then(function (response) {
                    ctrl.wavesBalance = Money.fromCoins(response.balance, Currency.MIR);
                });
        }

        function refreshAssets() {
            var assets = [];
            apiService.assets.balance(applicationContext.account.address).then(function (response) {
                _.forEach(response.balances, function (assetBalance) {
                    var id = assetBalance.assetId;
                    var asset = {
                        id: id,
                        name: ''
                    };

                    // adding asset details to cache
                    applicationContext.cache.putAsset(assetBalance.issueTransaction);
                    applicationContext.cache.updateAsset(id, assetBalance.balance,
                        assetBalance.reissuable, assetBalance.quantity);

                    // adding an asset with positive balance only or your reissuable assets
                    var yourReissuableAsset = assetBalance.reissuable &&
                        assetBalance.issueTransaction.sender === applicationContext.account.address;
                    if (assetBalance.balance !== 0 || yourReissuableAsset) {
                        loadAssetDataFromCache(asset);
                        assets.push(asset);
                    }
                });

                var delay = 1;
                // handling the situation when some assets appeared on the account
                if (ctrl.assets.length === 0 && assets.length > 0) {
                    ctrl.noData = false;
                    delay = 500; // waiting for 0.5 sec on first data loading attempt
                }

                // handling the situation when all assets were transferred from the account
                if (ctrl.assets.length > 0 && assets.length === 0) {
                    ctrl.noData = true;
                    delay = 500;
                }

                // to prevent no data message and asset list from displaying simultaneously
                // we need to update
                $timeout(function() {
                    ctrl.assets = assets.sort(function (a, b) {
                        var aVerified = (a.balance.currency.verified === true) ? '1:' : '0:',
                            bVerified = (b.balance.currency.verified === true) ? '1:' : '0:';

                        // The verified assets go first, then we sort them by timestamp
                        aVerified += new Date(a.timestamp).getTime();
                        bVerified += new Date(b.timestamp).getTime();

                        return (bVerified > aVerified) ? 1 : -1;
                    });
                }, delay);
            });
        }
    }

    WavesAssetListController.$inject = ['$scope', '$timeout', '$interval', 'portfolio.events',
        'applicationContext', 'apiService', 'formattingService'];

    angular
        .module('app.portfolio')
        .controller('assetListController', WavesAssetListController);
})();

(function () {
    'use strict';

    var FEE_CURRENCY = Currency.MIR;

    function AssetTransferController($scope, $timeout, constants, events, autocomplete, applicationContext,
                                     assetService, apiService, dialogService, formattingService,
                                     notificationService, transactionBroadcast, addressService) {
        var ctrl = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);

        ctrl.availableBalance = 0;
        ctrl.feeAssetBalance = 0;

        ctrl.confirm = {
            recipient: ''
        };

        ctrl.broadcast = new transactionBroadcast.instance(apiService.assets.transfer,
            function (transaction) {
                var amount = Money.fromCoins(transaction.amount, ctrl.asset.currency);
                var address = transaction.recipient;
                var displayMessage = 'Sent ' + amount.formatAmount(true) + ' of ' +
                    ctrl.asset.currency.displayName +
                    '<br/>Recipient ' + address.substr(0,15) + '...<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            }
        );

        ctrl.autocomplete = autocomplete;

        ctrl.validationOptions = {
            rules: {
                assetRecipient: {
                    required: true
                },
                assetAmount: {
                    required: true,
                    decimal: 8, // stub value updated on validation
                    min: 0,     // stub value updated on validation
                    max: constants.JAVA_MAX_LONG // stub value updated on validation
                },
                assetFee: {
                    required: true,
                    decimal: Currency.MIR.precision,
                    min: minimumFee.toTokens()
                },
                assetAttachment: {
                    maxbytelength: constants.MAXIMUM_ATTACHMENT_BYTE_SIZE
                }
            },
            messages: {
                assetRecipient: {
                    required: 'Recipient account number is required'
                },
                assetAmount: {
                    required: 'Amount to send is required'
                },
                assetFee: {
                    required: 'Transaction fee is required',
                    decimal: 'Transaction fee must be with no more than ' +
                        minimumFee.currency.precision + ' digits after the decimal point (.)',
                    min: 'Transaction fee is too small. It should be greater or equal to ' +
                        minimumFee.formatAmount(true)
                },
                maxbytelength: {
                    maxbytelength: 'Attachment is too long'
                }
            }
        };

        ctrl.submitTransfer = submitTransfer;
        ctrl.broadcastTransaction = broadcastTransaction;

        resetPaymentForm();

        $scope.$on(events.ASSET_TRANSFER, function (event, eventData) {
            var asset = applicationContext.cache.assets[eventData.assetId];
            ctrl.availableBalance = asset.balance;
            ctrl.feeAssetBalance = eventData.wavesBalance;
            ctrl.asset = asset;

            resetPaymentForm();

            // Update validation options and check how they affect form validation
            ctrl.validationOptions.rules.assetAmount.decimal = asset.currency.precision;
            var minimumPayment = Money.fromCoins(1, asset.currency);
            ctrl.validationOptions.rules.assetAmount.min = minimumPayment.toTokens();
            ctrl.validationOptions.rules.assetAmount.max = ctrl.availableBalance.toTokens();
            ctrl.validationOptions.messages.assetAmount.decimal = 'The amount to send must be a number ' +
                'with no more than ' + minimumPayment.currency.precision +
                ' digits after the decimal point (.)';
            ctrl.validationOptions.messages.assetAmount.min = 'Payment amount is too small. ' +
                'It should be greater or equal to ' + minimumPayment.formatAmount(false);
            ctrl.validationOptions.messages.assetAmount.max = 'Payment amount is too big. ' +
                'It should be less or equal to ' + ctrl.availableBalance.formatAmount(false);

            dialogService.open('#asset-transfer-dialog');
        });

        function submitTransfer(transferForm) {
            if (!transferForm.validate(ctrl.validationOptions)) {
                // Prevent dialog from closing
                return false;
            }

            var transferFee = Money.fromTokens(ctrl.autocomplete.getFeeAmount(), FEE_CURRENCY);
            if (transferFee.greaterThan(ctrl.feeAssetBalance)) {
                notificationService.error('Not enough funds for the transfer transaction fee');
                return false;
            }

            var transferAmount = Money.fromTokens(ctrl.amount, ctrl.asset.currency);
            if (transferAmount.greaterThan(ctrl.availableBalance)) {
                notificationService.error('Transfer amount exceeds available asset balance');
                return false;
            }

            var assetTransfer = {
                recipient: addressService.cleanupOptionalPrefix(ctrl.recipient),
                amount: transferAmount,
                fee: transferFee
            };

            if (ctrl.attachment) {
                assetTransfer.attachment = converters.stringToByteArray(ctrl.attachment);
            }

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            // Create a transaction and wait for confirmation
            ctrl.broadcast.setTransaction(assetService.createAssetTransferTransaction(assetTransfer, sender));

            // Set data to the confirmation dialog
            ctrl.confirm.amount = assetTransfer.amount;
            ctrl.confirm.fee = assetTransfer.fee;
            ctrl.confirm.recipient = assetTransfer.recipient;

            // Open confirmation dialog (async because this method is called while another dialog is open)
            $timeout(function () {
                dialogService.open('#transfer-asset-confirmation');
            }, 1);

            // Close payment dialog
            return true;
        }

        function broadcastTransaction() {
            ctrl.broadcast.broadcast();
        }

        function resetPaymentForm() {
            ctrl.recipient = '';
            ctrl.amount = '0';
            ctrl.confirm.amount = Money.fromTokens(0, Currency.MIR);
            ctrl.confirm.fee = Money.fromTokens(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);
            ctrl.autocomplete.defaultFee(constants.MINIMUM_TRANSACTION_FEE);
        }
    }

    AssetTransferController.$inject = ['$scope', '$timeout', 'constants.ui', 'portfolio.events',
        'autocomplete.fees', 'applicationContext', 'assetService', 'apiService', 'dialogService',
        'formattingService', 'notificationService', 'transactionBroadcast', 'addressService'];

    angular
        .module('app.portfolio')
        .controller('assetTransferController', AssetTransferController);
})();

(function () {
    'use strict';

    function WavesAssetDetailsController($scope, $timeout, events, applicationContext, dialogService) {
        var details = this;

        function transformAddress(address) {
            return isMyAddress(address) ? 'You' : address;
        }

        function isMyAddress(address) {
            return address === applicationContext.account.address;
        }

        $scope.$on(events.ASSET_DETAILS, function (event, assetId) {
            var asset = applicationContext.cache.assets[assetId];
            if (angular.isUndefined(asset)) {
                throw new Error('Failed to find asset details by id ' + assetId);
            }

            details.assetId = assetId;
            details.name = asset.currency.displayName;
            details.description = asset.description;
            details.sender = transformAddress(asset.sender);
            details.isSenderCopiable = !isMyAddress(asset.sender);
            details.timestamp = asset.timestamp;
            details.totalTokens = asset.totalTokens.formatAmount();
            details.reissuable = asset.reissuable ? 'Yes' : 'No';

            $timeout(function () {
                dialogService.open('#asset-details-dialog');
            }, 1);
        });
    }

    WavesAssetDetailsController.$inject = ['$scope', '$timeout', 'portfolio.events', 'applicationContext',
        'dialogService'];

    angular
        .module('app.portfolio')
        .controller('assetDetailsController', WavesAssetDetailsController);
})();

(function () {
    'use strict';

    var FIXED_REISSUE_FEE = new Money(1, Currency.MIR);

    function WavesAssetReissueController($scope, $timeout, constants, events, applicationContext, assetService,
                                         dialogService, notificationService, formattingService, apiService,
                                         transactionBroadcast) {
        var reissue = this;
        reissue.confirm = {};
        reissue.broadcast = new transactionBroadcast.instance(apiService.assets.reissue,
            function (transaction, response) {
                var amount = Money.fromCoins(transaction.quantity, reissue.asset.currency);
                var displayMessage = 'Reissued ' + amount.formatAmount(true) + ' tokens of asset ' +
                    reissue.asset.currency.displayName + '<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            });
        reissue.fee = FIXED_REISSUE_FEE;
        reissue.validationOptions = {
            rules: {
                assetAmount: {
                    required: true,
                    decimal: 0,
                    min: 0
                }
            },
            messages: {
                assetAmount: {
                    required: 'Amount to reissue is required'
                }
            }
        };
        reissue.submitReissue = submitReissue;
        reissue.broadcastTransaction = broadcastTransaction;

        resetReissueForm();

        $scope.$on(events.ASSET_REISSUE, function (event, eventData) {
            var asset = applicationContext.cache.assets[eventData.assetId];
            if (!asset)
                throw new Error('Failed to find asset data by id ' + eventData.assetId);

            resetReissueForm();

            reissue.assetId = eventData.assetId;
            reissue.assetName = asset.currency.displayName;
            reissue.totalTokens = asset.totalTokens;
            reissue.asset = asset;
            reissue.wavesBalance = eventData.wavesBalance;

            // update validation options and check how it affects form validation
            reissue.validationOptions.rules.assetAmount.decimal = asset.currency.precision;
            var minimumPayment = Money.fromCoins(1, asset.currency);
            var maximumPayment = Money.fromCoins(constants.JAVA_MAX_LONG, asset.currency);
            reissue.validationOptions.rules.assetAmount.min = minimumPayment.toTokens();
            reissue.validationOptions.rules.assetAmount.max = maximumPayment.toTokens();
            reissue.validationOptions.messages.assetAmount.decimal = 'The amount to reissue must be a number ' +
                'with no more than ' + minimumPayment.currency.precision +
                ' digits after the decimal point (.)';
            reissue.validationOptions.messages.assetAmount.min = 'Amount to reissue is too small. ' +
                'It should be greater or equal to ' + minimumPayment.formatAmount(false);
            reissue.validationOptions.messages.assetAmount.max = 'Amount to reissue is too big. ' +
                'It should be less or equal to ' + maximumPayment.formatAmount(false);

            dialogService.open('#asset-reissue-dialog');
        });

        function submitReissue (form) {
            if (!form.validate(reissue.validationOptions))
                // prevent dialog from closing
                return false;

            if (reissue.fee.greaterThan(reissue.wavesBalance)) {
                notificationService.error('Not enough funds for the reissue transaction fee');

                return false;
            }

            var assetReissue = {
                totalTokens: Money.fromTokens(reissue.amount, reissue.asset.currency),
                reissuable: reissue.reissuable,
                fee: reissue.fee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };
            // creating the transaction and waiting for confirmation
            reissue.broadcast.setTransaction(assetService.createAssetReissueTransaction(assetReissue, sender));

            // setting data for the confirmation dialog
            reissue.confirm.amount = assetReissue.totalTokens;
            reissue.confirm.fee = assetReissue.fee;

            // open confirmation dialog
            // doing it async because this method is called while another dialog is open
            $timeout(function () {
                dialogService.open('#asset-reissue-confirm-dialog');
            }, 1);

            // it's ok to close reissue dialog
            return true;
        }

        function broadcastTransaction () {
            reissue.broadcast.broadcast();
        }

        function resetReissueForm() {
            reissue.amount = '0';
            reissue.confirm.amount = Money.fromTokens(0, Currency.MIR);
            reissue.confirm.fee = reissue.fee;
        }
    }

    WavesAssetReissueController.$inject = ['$scope', '$timeout', 'constants.ui', 'portfolio.events',
        'applicationContext', 'assetService', 'dialogService', 'notificationService',
        'formattingService', 'apiService', 'transactionBroadcast'];

    angular
        .module('app.portfolio')
        .controller('assetReissueController', WavesAssetReissueController);
})();

(function () {
    'use strict';

    function AssetFilter(applicationContext, addressService) {
        function transformAddress (rawAddress) {
            var result = angular.isDefined(rawAddress) ? rawAddress : 'n/a';

            if (isMyAddress(result))
                result = 'You';

            return result;
        }

        function isMyAddress(address) {
            return address === applicationContext.account.address;
        }

        function formatAsset (transaction) {
            transaction.formatted = {
                sender: transformAddress(transaction.sender),
                canReissue: transaction.reissuable && isMyAddress(transaction.sender)
            };

            return transaction;
        }

        return function filterInput (input) {
            return _.map(input, formatAsset);
        };
    }

    AssetFilter.$inject = ['applicationContext', 'addressService'];

    angular
        .module('app.portfolio')
        .filter('asset', AssetFilter);
})();

(function () {
    'use strict';

    var MAXIMUM_FILE_SIZE_BYTES = 256 * 1024;
    var MAXIMUM_TRANSACTIONS_PER_FILE = 500;
    var FIRST_TRANSACTIONS_COUNT = 10;
    var LOADING_STAGE = 'loading';
    var PROCESSING_STAGE = 'processing';
    var ZERO_MONEY = Money.fromTokens(0, Currency.MIR);

    function ValidationError(message) {
        this.message = message;
    }

    function WavesMassPaymentController ($scope, $window, $timeout, constants, events, applicationContext, autocomplete,
                                         notificationService, assetService, dialogService,
                                         transactionBroadcast, apiService) {
        var mass = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, Currency.MIR);
        var transactions;

        mass.summary = {
            totalAmount: ZERO_MONEY,
            totalFee: ZERO_MONEY
        };
        mass.confirm = {
            recipients: 0
        };
        mass.filename = '';
        mass.transfers = [];
        mass.inputPayments = [];
        mass.autocomplete = autocomplete;
        mass.stage = LOADING_STAGE;
        mass.loadingInProgress = false;
        mass.broadcast = new transactionBroadcast.instance(apiService.assets.massPay,
            function (transaction, response) {
                var displayMessage = 'Sent ' + mass.summary.totalAmount.formatAmount(true) + ' of ' +
                        mass.summary.totalAmount.currency.displayName + ' to ' + mass.summary.totalTransactions +
                        ' recipients';
                notificationService.notice(displayMessage);
            });
        mass.validationOptions = {
            rules: {
                massPayFee: {
                    required: true,
                    decimal: Currency.MIR.precision,
                    min: minimumFee.toTokens()
                }
            },
            messages: {
                massPayFee: {
                    required: 'Fee per transaction is required',
                    decimal: 'Fee must be with no more than ' +
                        minimumFee.currency.precision + ' digits after the decimal point (.)',
                    min: 'Fee per transaction is too small. It should be greater or equal to ' +
                        minimumFee.formatAmount(true)
                }
            }
        };
        mass.handleFile = handleFile;
        mass.loadInputFile = loadInputFile;
        mass.processInputFile = processInputFile;
        mass.submitPayment = submitPayment;
        mass.broadcastTransaction = broadcastTransaction;
        mass.transactionsToClipboard = transactionsToClipboard;
        mass.dataCopied = dataCopied;
        mass.cancel = cancel;

        cleanup();

        $scope.$on(events.ASSET_MASSPAY, function (event, eventData) {
            mass.wavesBalance = eventData.wavesBalance;
            mass.assetBalance = eventData.wavesBalance;
            if (eventData.assetId) {
                mass.assetBalance = applicationContext.cache.assets[eventData.assetId].balance;
            }

            mass.sendingWaves = mass.assetBalance.currency === Currency.MIR;

            cleanup();

            dialogService.open('#asset-mass-pay-dialog');
        });

        function fileErrorHandler(evt) {
            cleanup();

            switch (evt.target.error.code) {
                case evt.target.error.NOT_FOUND_ERR:
                    notificationService.error('File Not Found!');
                    break;
                case evt.target.error.NOT_READABLE_ERR:
                    notificationService.error('File is not readable');
                    break;
                case evt.target.error.ABORT_ERR:
                    break; // noop
                default:
                    notificationService.error('An error occurred reading this file.');
            }
        }

        function loadInputFile (fileName, content) {
            try {
                mass.inputPayments = [];
                if (fileName.endsWith('.json')) {
                    mass.inputPayments = parseJsonFile(content);
                }
                else if (fileName.endsWith('.csv')) {
                    mass.inputPayments = parseCsvFile(content);
                }
                else {
                    throw new Error('Unsupported file type: ' + fileName);
                }
            }
            catch (ex) {
                notificationService.error('Failed to parse file: ' + ex);
            }
        }

        function parseCsvFile (content) {
            var lines = content.split('\n');
            var result = [];
            _.forEach(lines, function (line) {
                line = line.trim();
                if (line.length < 1)
                    return;

                var parts = line.split(';');
                if (parts.length < 2) {
                    throw new Error('CSV file contains ' + parts.length + ' columns. Expected 2 or 3 columns');
                }
                var address = parts[0];
                var amount = parseFloat(parts[1]);
                var id;
                if (parts.length > 2) {
                    id = parts[2];
                }

                result.push({
                    recipient: address,
                    amount: amount,
                    id: id
                });
            });

            return result;
        }

        function parseJsonFile (content) {
            return $window.JSON.parse(content);
        }

        function loadTransactionsFromFile() {
            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            try {
                transactions = [];
                var transfersToDisplay = [];
                var transferCurrency = mass.assetBalance.currency;
                var totalTransactions = 0;
                var totalAmount = Money.fromCoins(0, transferCurrency);
                var totalFee = Money.fromCoins(0, Currency.MIR);
                var fee = Money.fromTokens(mass.autocomplete.getFeeAmount(), Currency.MIR);
                var minimumPayment = Money.fromCoins(1, transferCurrency);
                _.forEach(mass.inputPayments, function (transfer) {
                    if (isNaN(transfer.amount)) {
                        throw new ValidationError('Failed to parse payment amount for address ' + transfer.recipient);
                    }

                    var assetTransfer = {
                        recipient: transfer.recipient,
                        amount: Money.fromTokens(transfer.amount, transferCurrency),
                        fee: fee,
                        attachment: transfer.id ? converters.stringToByteArray(transfer.id) : undefined
                    };

                    if (assetTransfer.amount.lessThan(minimumPayment)) {
                        throw new ValidationError('Payment amount ' + transfer.amount + ' to address ' +
                            transfer.recipient + ' is less than minimum (' + minimumPayment.formatAmount(true) + ')');
                    }

                    if (transfersToDisplay.length < FIRST_TRANSACTIONS_COUNT)
                        transfersToDisplay.push({
                            recipient: transfer.recipient,
                            amount: assetTransfer.amount.formatAmount(true)
                        });

                    transactions.push(assetService.createAssetTransferTransaction(assetTransfer, sender));

                    // statistics
                    totalAmount = totalAmount.plus(assetTransfer.amount);
                    totalFee = totalFee.plus(assetTransfer.fee);
                    totalTransactions++;
                });

                mass.broadcast.setTransaction(transactions);

                mass.summary.totalAmount = totalAmount;
                mass.summary.totalTransactions = totalTransactions;
                mass.summary.totalFee = totalFee;
                mass.transfers = transfersToDisplay;
                mass.stage = PROCESSING_STAGE;

                // cleaning up
                mass.filename = '';
                mass.inputPayments = [];
            }
            catch (e) {
                if (e instanceof ValidationError) {
                    mass.invalidPayment = true;
                    mass.inputErrorMessage = e.message;
                }
                else {
                    throw e;
                }
            }

            mass.loadingInProgress = false;
        }

        function processInputFile(form) {
            if (!form.validate(mass.validationOptions)) {
                return;
            }

            if (!mass.inputPayments || mass.inputPayments.length === 0) {
                notificationService.error('Payments were not provided or failed to parse. Nothing to load');

                return;
            }

            if (mass.inputPayments.length > MAXIMUM_TRANSACTIONS_PER_FILE) {
                notificationService.error('Too many payments for a single file. Maximum payments count ' +
                    'in a file should not exceed ' + MAXIMUM_TRANSACTIONS_PER_FILE);

                return;
            }

            mass.loadingInProgress = true;
            // loading transactions asynchronously
            $timeout(loadTransactionsFromFile, 150);
        }

        function submitPayment() {
            var paymentCost = !mass.sendingWaves ?
                mass.summary.totalFee :
                mass.summary.totalFee.plus(mass.summary.totalAmount);

            if (paymentCost.greaterThan(mass.wavesBalance)) {
                notificationService.error('Not enough Mir to make mass payment');

                return false;
            }

            if (mass.summary.totalAmount.greaterThan(mass.assetBalance)) {
                notificationService.error('Not enough "' + mass.assetBalance.currency.displayName +
                    '" to make mass payment');

                return false;
            }

            // setting data for the confirmation dialog
            mass.confirm.amount = mass.summary.totalAmount;
            mass.confirm.fee = mass.summary.totalFee;
            mass.confirm.recipients = mass.summary.totalTransactions;

            dialogService.close();
            $timeout(function () {
                dialogService.open('#asset-mass-pay-confirmation');
            }, 1);

            return true;
        }

        function cancel () {
            dialogService.close();
        }

        function broadcastTransaction() {
            mass.broadcast.broadcast();
        }

        function handleFile(file) {
            if (file.size > MAXIMUM_FILE_SIZE_BYTES) {
                notificationService.error('File "' + file.name + '" is too big. Maximum file size is ' +
                    MAXIMUM_FILE_SIZE_BYTES / 1024 + 'Kb');

                return;
            }

            var reader = new $window.FileReader();

            reader.onloadend = function (event) {
                NProgress.done();

                if (event.target.readyState == FileReader.DONE)
                    mass.loadInputFile(file.name, event.target.result);
            };
            reader.onloadstart = function (event) {
                cleanup();
                NProgress.start();
            };
            reader.onabort = function (event) {
                notificationService.error('File read cancelled');
            };
            reader.onerror = fileErrorHandler;

            reader.readAsText(file);
        }

        function transactionsToClipboard() {
            return $window.JSON.stringify(transactions, null, ' ');
        }

        function dataCopied() {
            notificationService.notice('Transactions copied successfully');
        }

        function cleanup() {
            mass.summary.totalAmount = ZERO_MONEY;
            mass.summary.totalTransactions = 0;
            mass.summary.totalFee = ZERO_MONEY;
            mass.stage = LOADING_STAGE;
            mass.invalidPayment = false;

            mass.confirm.amount = Money.fromTokens(0, Currency.MIR);
            mass.confirm.recipients = 0;
            mass.confirm.fee = Money.fromTokens(0, Currency.MIR);

            mass.autocomplete.defaultFee(constants.MINIMUM_TRANSACTION_FEE);
        }
    }

    WavesMassPaymentController.$inject = ['$scope', '$window', '$timeout', 'constants.ui', 'portfolio.events',
        'applicationContext', 'autocomplete.fees',
        'notificationService', 'assetService', 'dialogService', 'transactionBroadcast', 'apiService'];

    angular
        .module('app.portfolio')
        .controller('massPaymentController', WavesMassPaymentController);
})();

(function () {
    'use strict';

    angular
        .module('app.portfolio')
        .directive('fileSelect', [function WavesFileSelectDirective() {
            return {
                restrict: 'A',
                scope: {
                    fileHandler: '&'
                },
                link: function (scope, element) {
                    element.on('change', function (changeEvent) {
                        var files = changeEvent.target.files;
                        if (files.length) {
                            scope.fileHandler({file: files[0]});
                        }
                    });
                }
            };
        }]);
})();

/******************************************************************************
 * Copyright Â© 2016 The Waves Core Developers.                                *
 *                                                                            *
 * See the LICENSE.txt files at                                               *
 * the top-level directory of this distribution for the individual copyright  *
 * holder information and the developer policies on copyright and licensing.  *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * Waves software, including this file, may be copied, modified, propagated,  *
 * or distributed except according to the terms contained in the LICENSE.txt  *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

(function ($, window) {
    'use strict';

    var $wrapW = $('#wrapper').width(),
        $mbBodyH = $('#mainBody').height();

    // GUI elements dynamic sizing and LeftBar visibility
    $(window).on('load resize', function (e) {

        var $wrapH = $('#wrapper').height(),
            $headerH = $('header').height(),
            $tabsH = $('#tabs').height(),
            $mainBodyH = $wrapH - $headerH - $tabsH,
            $mbBodyW = $wrapW;

        $('#mainBody').css('height', $mainBodyH);
        $('#mBBody').css('width', $mbBodyW);
    });
})(jQuery, window);

/**
 * Setup of main AngularJS application, with Restangular being defined as a dependency.
 *
 * @see controllers
 * @see services
 */

// mock methods to implement late binding
var __mockShowError = function(message) {};
var __mockValidateAddress = function(address) {};

var app = angular.module('app', [
    'restangular',
    'waves.core',

    'ngclipboard',
    'ngAnimate',
    'ngMaterial',
    'ngValidate',
    'app.ui',
    'app.shared',
    'app.login',
    'app.navigation',
    'app.wallet',
    'app.tokens',
    'app.dex',
    'app.leasing',
    'app.history',
    'app.community',
    'app.portfolio'
]).config(AngularApplicationConfig).run(AngularApplicationRun);

function AngularApplicationConfig($provide, $compileProvider, $validatorProvider, $qProvider,
                                  $sceDelegateProvider, $mdAriaProvider, networkConstants, applicationSettings) {
    'use strict';

    $provide.constant(networkConstants,
        angular.extend(networkConstants, {
            NETWORK_NAME: 'Mirnet',
            NETWORK_CODE: 'S'
        }));
    $provide.constant(applicationSettings,
        angular.extend(applicationSettings, {
            CLIENT_VERSION: '1.0.0', // W0.5.22a
            NODE_ADDRESS: 'https://node.mir.dei.su',
            COINOMAT_ADDRESS: 'https://coinomat.com',
            MATCHER_ADDRESS: 'http://185.181.164.136:6886',
            DATAFEED_ADDRESS: 'https://marketdata.wavesplatform.com'
        }));

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|file|chrome-extension):/);
    $qProvider.errorOnUnhandledRejections(false);
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://test.coinomat.com/api/**',
        'https://coinomat.com/api/**',
        'https://marketdata.wavesplatform.com/**'
    ]);

    // Globally disables all ARIA warnings.
    $mdAriaProvider.disableWarnings();

    $validatorProvider.setDefaults({
        errorClass: 'wInput-error',
        onkeyup: false,
        showErrors : function(errorMap, errorList) {
            errorList.forEach(function(error) {
                // can't use notificationService here cos services are not available in config phase
                __mockShowError(error.message);
            });

            var i, elements;
            for (i = 0, elements = this.validElements(); elements[i]; i++) {
                angular.element(elements[i]).removeClass(this.settings.errorClass);
            }

            for (i = 0, elements = this.invalidElements(); elements[i]; i++) {
                angular.element(elements[i]).addClass(this.settings.errorClass);
            }
        }
    });

    $validatorProvider.addMethod('address', function (value, element) {
        return this.optional(element) || __mockValidateAddress(value);
    }, 'Account number must be a sequence of 35 alphanumeric characters with no spaces, ' +
        'optionally starting with \'1W\'');

    $validatorProvider.addMethod('decimal', function (value, element, maxDigits) {
        maxDigits = angular.isNumber(maxDigits) ? maxDigits : Currency.MIR.precision;
        var regex = new RegExp('^(?:-?\\d+)?(?:\\.\\d{0,' + maxDigits + '})?$');
        return this.optional(element) || regex.test(value);
    }, 'Amount is expected with a dot (.) as a decimal separator with no more than {0} fraction digits');

    $validatorProvider.addMethod('password', function (value, element) {
        if (this.optional(element)) {
            return true;
        }

        var containsDigits = /[0-9]/.test(value);
        var containsUppercase = /[A-Z]/.test(value);
        var containsLowercase = /[a-z]/.test(value);

        return containsDigits && containsUppercase && containsLowercase;
    }, 'The password is too weak. A good password must contain at least one digit, ' +
        'one uppercase and one lowercase letter');

    $validatorProvider.addMethod('minbytelength', function (value, element, minLength) {
        if (this.optional(element)) {
            return true;
        }

        if (!angular.isNumber(minLength)) {
            throw new Error('minbytelength parameter must be a number. Got ' + minLength);
        }

        return converters.stringToByteArray(value).length >= minLength;
    }, 'String is too short. Please add more characters.');

    $validatorProvider.addMethod('maxbytelength', function (value, element, maxLength) {
        if (this.optional(element)) {
            return true;
        }

        if (!angular.isNumber(maxLength)) {
            throw new Error('maxbytelength parameter must be a number. Got ' + maxLength);
        }

        return converters.stringToByteArray(value).length <= maxLength;
    }, 'String is too long. Please remove some characters.');
}

AngularApplicationConfig.$inject = ['$provide', '$compileProvider', '$validatorProvider', '$qProvider',
    '$sceDelegateProvider', '$mdAriaProvider', 'constants.network', 'constants.application'];

function AngularApplicationRun(rest, applicationConstants, notificationService, addressService) {
    'use strict';

    // restangular configuration
    rest.setDefaultHttpFields({
        timeout: 10000 // milliseconds
    });
    var url = applicationConstants.NODE_ADDRESS;
    rest.setBaseUrl(url);

    // override mock methods cos in config phase services are not available yet
    __mockShowError = function (message) {
        notificationService.error(message);
    };
    __mockValidateAddress = function (address) {
        return addressService.validateAddress(address.trim());
    };
}

AngularApplicationRun.$inject = ['Restangular', 'constants.application', 'notificationService', 'addressService'];

angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dex/asset.picker.component',
    "<md-autocomplete class=\"assets-autocomplete\" ng-class=\"{amount: $ctrl.type === 'amountAsset', price: $ctrl.type === 'priceAsset'}\" placeholder=\"Choose an asset or copy-paste an ID here\" md-menu-class=\"assets-autocomplete-popup\" md-selected-item=\"$ctrl.autocomplete.selectedAsset\" md-selected-item-change=\"$ctrl.changeAsset()\" md-search-text=\"$ctrl.autocomplete.searchText\" md-search-text-change=\"\" md-items=\"item in $ctrl.findAssets($ctrl.autocomplete.searchText)\" md-item-text=\"item.displayName\" md-clear-button=\"false\" md-no-cache=\"true\" md-min-length=\"0\" md-has-not-found=\"true\" md-select-on-focus><md-item-template><div class=\"asset-tile\"><span class=\"label\" ng-class=\"{'verified': item.verified}\" md-highlight-text=\"$ctrl.autocomplete.searchText\" title=\"{{item.verified ? 'Asset is verified' : ''}}\">{{item.verified ? item.displayName : ''}}</span> <span class=\"muted\">{{item.id}}</span></div></md-item-template><md-not-found><span ng-if=\"$ctrl.isAssetLoading\">Loading...</span> <span ng-if=\"!$ctrl.isAssetLoading\">Nothing is found!</span></md-not-found></md-autocomplete>"
  );


  $templateCache.put('dex/chart.component',
    "<div class=\"chart\"></div>"
  );


  $templateCache.put('dex/component',
    "<div class=\"exchange\"><div class=\"choice\"><div class=\"picker-widget\"><waves-dex-asset-picker name=\"Amount asset\" type=\"amountAsset\" assets=\"$ctrl.assetsList\" hidden-asset=\"$ctrl.pair.priceAsset\" picked-asset=\"$ctrl.pair.amountAsset\"></waves-dex-asset-picker></div><div class=\"current-pair\">{{$ctrl.pair.amountAsset.shortName}}/{{$ctrl.pair.priceAsset.shortName}}</div><div class=\"picker-widget\"><waves-dex-asset-picker name=\"Price asset\" type=\"priceAsset\" assets=\"$ctrl.assetsList\" hidden-asset=\"$ctrl.pair.amountAsset\" picked-asset=\"$ctrl.pair.priceAsset\"></waves-dex-asset-picker></div></div><div class=\"charts\"><waves-dex-chart pair=\"$ctrl.pair\"></waves-dex-chart></div><div class=\"workplace\"><div class=\"orderbooks\"><div class=\"orderbook\"><waves-dex-orderbook type=\"buy\" name=\"{{$ctrl.pair.amountAsset.displayName}} buy orders\" pair=\"$ctrl.pair\" on-click=\"$ctrl.fillSellForm\" orders=\"$ctrl.buyOrders\"></waves-dex-orderbook></div><div class=\"orderbook\"><waves-dex-orderbook type=\"sell\" name=\"{{$ctrl.pair.amountAsset.displayName}} sell orders\" pair=\"$ctrl.pair\" on-click=\"$ctrl.fillBuyForm\" orders=\"$ctrl.sellOrders\"></waves-dex-orderbook></div><div class=\"orderbook\"><waves-dex-history pair=\"$ctrl.pair\" trades=\"$ctrl.tradeHistory\"></waves-dex-history></div></div><div class=\"user-orders\"><waves-dex-order-creator pair=\"$ctrl.pair\" submit=\"$ctrl.createOrder\" last-price=\"$ctrl.lastTradePrice\" buy-values=\"$ctrl.buyFormValues\" sell-values=\"$ctrl.sellFormValues\"></waves-dex-order-creator><waves-dex-user-orders pair=\"$ctrl.pair\" orders=\"$ctrl.userOrders\" cancel-order=\"$ctrl.cancelOrder\"></waves-dex-user-orders></div></div></div><aside class=\"pairs-lists\"><waves-dex-favorites pairs=\"$ctrl.favoritePairs\" switch-pair=\"$ctrl.changePair\"></waves-dex-favorites><div class=\"how-to\"><h3>Quick guide</h3><p>1. Choose a pair of assets you want to trade. Just start typing asset name, then pick the right one.</p><p>2. Take a look at orderbooks to get an understanding of the pair market.</p><p>3. Finally, fill the form and submit your order.</p></div></aside><div id=\"dex-bad-order-confirmation\" waves-dialog ok-button-caption=\"YES\" on-dialog-ok=\"$ctrl.placeBadOrder()\" cancel-button-caption=\"NO\" on-dialog-cancel=\"$ctrl.refuseBadOrder()\"><div class=\"dialog-confirmation\"><p class=\"dialog-text\">{{$ctrl.badOrderQuestion}}</p></div></div>"
  );


  $templateCache.put('dex/favorites.component',
    "<h2>Favorites</h2><div class=\"pairs-list\"><div class=\"pair\" ng-repeat=\"p in $ctrl.pairs\" ng-click=\"$ctrl.onClick(p)\">{{p.amountAsset.shortName}}/{{p.priceAsset.shortName}}</div></div>"
  );


  $templateCache.put('dex/history.component',
    "<h3>Trade history</h3><table><thead><tr><td>Date</td><td>Type</td><td>Price ({{$ctrl.pair.priceAsset.shortName}})</td><td>Amount ({{$ctrl.pair.amountAsset.shortName}})</td><td>Total ({{$ctrl.pair.priceAsset.shortName}})</td></tr></thead></table><waves-scrollbox><table><tbody><tr ng-repeat=\"trade in $ctrl.trades\"><td>{{trade.timestamp | formatting}}</td><td class=\"type\" ng-class=\"trade.type\">{{trade.typeTitle}}</td><td>{{trade.price | number:$ctrl.pair.priceAsset.precision}}</td><td>{{trade.amount | number:$ctrl.pair.amountAsset.precision}}</td><td>{{trade.total | number:$ctrl.pair.priceAsset.precision}}</td></tr><tr ng-if=\"!$ctrl.trades.length\"><td colspan=\"5\"><span>There was no trades for the current pair.</span></td></tr></tbody></table></waves-scrollbox>"
  );


  $templateCache.put('dex/order.creator.component',
    "<div class=\"half buy\"><h2><span>Buy {{$ctrl.pair.amountAsset.displayName}} </span><small ng-click=\"$ctrl.buyFullBalance()\">{{$ctrl.priceAssetBalance}}</small></h2><div class=\"fields\"><md-input-container><label>Price in {{$ctrl.pair.priceAsset.displayName}}</label><input type=\"text\" ng-model=\"$ctrl.buy.price\" ng-change=\"$ctrl.updateBuyTotal()\" decimal-input-restrictor></md-input-container><md-input-container><label>{{$ctrl.pair.amountAsset.displayName}} amount</label><input type=\"text\" ng-model=\"$ctrl.buy.amount\" ng-change=\"$ctrl.updateBuyTotal()\" decimal-input-restrictor></md-input-container><div><span>Total:&nbsp;</span> <span>{{$ctrl.buy.total | number:$ctrl.pair.priceAsset.precision}}&nbsp;</span> <span>{{$ctrl.pair.priceAsset.shortName}}</span></div><div><span><abbr title=\"Fee will be taken in the moment of order execution\">Fee</abbr>:&nbsp;</span> <span>{{$ctrl.buy.fee}}</span> <span>WAV</span></div></div><div class=\"button-container\"><button ng-disabled=\"$ctrl.buy.blocked\" ng-click=\"$ctrl.submitBuyOrder()\">Buy</button></div></div><div class=\"half sell\"><h2><span>Sell {{$ctrl.pair.amountAsset.displayName}} </span><small ng-click=\"$ctrl.sellFullBalance()\">{{$ctrl.amountAssetBalance}}</small></h2><div class=\"fields\"><md-input-container><label>Price in {{$ctrl.pair.priceAsset.displayName}}</label><input type=\"text\" ng-model=\"$ctrl.sell.price\" ng-change=\"$ctrl.updateSellTotal()\" decimal-input-restrictor></md-input-container><md-input-container><label>{{$ctrl.pair.amountAsset.displayName}} amount</label><input type=\"text\" ng-model=\"$ctrl.sell.amount\" ng-change=\"$ctrl.updateSellTotal()\" decimal-input-restrictor></md-input-container><div><span>Total:&nbsp;</span> <span>{{$ctrl.sell.total | number:$ctrl.pair.priceAsset.precision}}&nbsp;</span> <span>{{$ctrl.pair.priceAsset.shortName}}</span></div><div><span><abbr title=\"Fee will be taken in the moment of order execution\">Fee</abbr>:&nbsp;</span> <span>{{$ctrl.sell.fee}}</span> <span>WAV</span></div></div><div class=\"button-container\"><button ng-disabled=\"$ctrl.sell.blocked\" ng-click=\"$ctrl.submitSellOrder()\">Sell</button></div></div>"
  );


  $templateCache.put('dex/orderbook.component',
    "<h3>{{$ctrl.name}}</h3><table ng-class=\"$ctrl.type\"><thead><tr><td>Price</td><td>{{$ctrl.pair.amountAsset.shortName}}</td><td>{{$ctrl.pair.priceAsset.shortName}}</td><td>SUM ({{$ctrl.pair.priceAsset.shortName}})</td></tr></thead></table><waves-scrollbox><table ng-class=\"$ctrl.type\"><tbody><tr ng-repeat=\"order in $ctrl.orders\" ng-click=\"$ctrl.lineClick($index)\"><td ng-bind-html=\"order.price | number:$ctrl.pair.priceAsset.precision | padder:$ctrl.lengths.price\"></td><td ng-bind-html=\"order.amount | number:$ctrl.pair.amountAsset.precision | padder:$ctrl.lengths.amount\"></td><td ng-bind-html=\"order.total | number:$ctrl.pair.priceAsset.precision | padder:$ctrl.lengths.total\"></td><td ng-bind-html=\"order.sum | number:$ctrl.pair.priceAsset.precision | padder:$ctrl.lengths.sum\"></td></tr><tr ng-if=\"!$ctrl.orders.length\"><td colspan=\"4\"><span>Some orders will appear soon.</span></td></tr></tbody></table></waves-scrollbox>"
  );


  $templateCache.put('dex/pair.chart.component',
    "<img src=\"http://www.ifmr.co.in/blog/wp-content/uploads/2014/04/BitcoinPrice.png\">"
  );


  $templateCache.put('dex/user.orders.component',
    "<h3>My orders</h3><table class=\"user\"><thead><tr><td>Status</td><td>Type</td><td>Price</td><td>{{$ctrl.pair.amountAsset.shortName}}</td><td>{{$ctrl.pair.priceAsset.shortName}}</td><td></td></tr></thead></table><waves-scrollbox><table class=\"user\"><tbody><tr ng-repeat=\"order in $ctrl.orders\" ng-class=\"{\n" +
    "            'filled': order.status === 'Filled' || order.status === 'Cancelled',\n" +
    "            'not-found': order.status === 'NotFound'\n" +
    "          }\"><td>{{order.statusTitle}}</td><td class=\"type\" ng-class=\"order.type\">{{order.typeTitle}}</td><td>{{order.price | number:8}}</td><td>{{order.amount | number:8}}</td><td>{{order.total | number:8}}</td><td ng-click=\"$ctrl.cancel({order: order})\">&times;</td></tr><tr ng-if=\"!$ctrl.orders.length\"><td colspan=\"6\"><span>Create your first order!</span></td></tr></tbody></table></waves-scrollbox>"
  );


  $templateCache.put('leasing/balance.details.component',
    "<section-header>BALANCE DETAILS</section-header><table class=\"waves-table\"><tbody><tr><td>Regular</td><td>{{$ctrl.formattedBalance.regular}}</td></tr><tr><td>Effective</td><td>{{$ctrl.formattedBalance.effective}}</td></tr><tr><td>Generating</td><td>{{$ctrl.formattedBalance.generating}}</td></tr></tbody></table>"
  );


  $templateCache.put('leasing/component',
    "<div class=\"leasing\"><div class=\"tools\"><div class=\"column balance\"><waves-leasing-balance-details balance-details=\"$ctrl.balanceDetails\"></waves-leasing-balance-details></div><div class=\"column form\"><waves-leasing-lease-form></waves-leasing-lease-form></div><div class=\"column quick-note\"><section-header>QUICK NOTE</section-header><p>You can only transfer or trade Mir that arenâ€™t leased. The leased amount cannot be transferred or traded by you or anyone else.</p><p>You can cancel a leasing transaction as soon as it appears in the blockchain which usually occurs in a minute or less.</p><p>To cancel a lease, click on the black button in the far right column of the Leasing Transactions table below and select Cancel Leasing.</p><p>The generating balance will be updated after 1000 blocks.</p></div></div><waves-transaction-history heading=\"LEASING TRANSACTIONS\" transactions=\"$ctrl.transactions\" limit-to=\"$ctrl.limitTo\"></waves-transaction-history></div>"
  );


  $templateCache.put('leasing/lease.form.component',
    "<section-header>BALANCE LEASING</section-header><form name=\"$ctrl.form\" novalidate ng-validate=\"$ctrl.validationOptions\"><table class=\"form-table\"><tbody><tr><td>Recipient</td><td><input class=\"wInput form-control\" name=\"leasingRecipient\" type=\"text\" placeholder=\"Recipient address\" ng-model=\"$ctrl.recipient\"></td></tr><tr><td>Amount</td><td><input class=\"wInput form-control\" name=\"leasingAmount\" type=\"text\" placeholder=\"Leasing amount\" ng-model=\"$ctrl.amount\" decimal-input-restrictor></td></tr><tr><td class=\"fee\">Fee</td><td class=\"fee\">{{$ctrl.fee | moneyLong:true}}</td></tr><tr><td colspan=\"2\" class=\"button-container\"><button class=\"wButton wButton-neg fade\" ng-click=\"$ctrl.confirmLease($ctrl.form)\">LEASE</button></td></tr></tbody></table></form><div id=\"start-leasing-confirmation\" waves-dialog ok-button-caption=\"CONFIRM\" ok-button-enabled=\"!$ctrl.broadcast.pending\" on-dialog-ok=\"$ctrl.broadcastTransaction()\"><div class=\"dialog-confirmation\"><p class=\"dialog-text\">You are going to lease <span class=\"confirmation-value\">{{$ctrl.confirm.amount | moneyLong:true}}</span> with <span class=\"confirmation-value\">{{$ctrl.confirm.fee | moneyLong:true}}</span> fee to the address<br><span class=\"confirmation-value\">{{$ctrl.confirm.recipient}}</span></p><p class=\"dialog-text\">Please <span class=\"fontBold\">CONFIRM </span>to execute or <span class=\"fontBold\">CANCEL </span>to discard.</p></div></div>"
  );


  $templateCache.put('navigation/tab.directive',
    "<img ng-src=\"img/tabs-iconset-{{pageId}}.svg\" class=\"fFade\" alt=\"{{caption}}\" ng-click=\"onClick()\" ng-class=\"[{selected: isSelected()}]\">"
  );


  $templateCache.put('shared/dialog.directive',
    "<img class=\"wPop-header\" ng-src=\"img/{{image}}\"><div class=\"wavesPop-content\" ng-transclude></div><div class=\"wavesPop-content-buttons button-row\" ng-show=\"showButtons\"><button class=\"wButton wButton-dialog fade tooltip-1\" ng-class=\"[{wButtonDanger: isError}]\" title=\"{{::tooltip}}\" ng-click=\"onOk()\" ng-disabled=\"!okButtonEnabled\">{{::okButtonCaption}}</button> <span class=\"divider-2\" ng-if=\"cancelButtonVisible\"></span> <button ng-if=\"cancelButtonVisible\" class=\"wButton wButton-dialog fade\" ng-class=\"[{wButtonDanger: isError}]\" ng-click=\"onCancel()\">{{::cancelButtonCaption}}</button><waves-support-link ng-if=\"::!noSupportLink\" class=\"dark\"></waves-support-link></div>"
  );


  $templateCache.put('shared/transaction.history.component',
    "<section-header>{{::$ctrl.heading}}</section-header><waves-scrollbox class=\"transactions-table\"><table><thead><tr><td>DATE</td><td>TYPE</td><td>NAME</td><td>SENDER</td><td>RECIPIENT</td><td>FEE</td><td>UNITS</td><td></td></tr></thead><tbody><tr ng-repeat=\"tx in $ctrl.transactions | antiSpam | orderBy:'timestamp':true | limitTo:$ctrl.limitTo | transaction track by tx.timestamp\" ng-class=\"{'tx-unc': tx.unconfirmed, 'tx-in': !tx.formatted.isOutgoing, 'tx-out': tx.formatted.isOutgoing}\"><td>{{tx.formatted.datetime}}</td><td>{{tx.formatted.type}}</td><td>{{tx.formatted.asset}}</td><td>{{tx.formatted.sender}}</td><td>{{tx.formatted.recipient}}</td><td>{{tx.formatted.fee}} {{tx.formatted.feeAsset.shortName}}</td><td>{{tx.formatted.amount}}</td><td width=\"16\"><tx-menu transaction=\"tx\"></tx-menu></td></tr></tbody></table><div id=\"cancel-leasing-confirmation\" waves-dialog ok-button-caption=\"CONFIRM\" on-dialog-ok=\"$ctrl.cancelLeasing()\"><div class=\"dialog-confirmation\"><p class=\"dialog-text\">You are going to cancel leasing of <span class=\"confirmation-value\">{{$ctrl.confirm.amount}}</span> <span class=\"confirmation-value\">{{$ctrl.confirm.asset}}</span> with <span class=\"confirmation-value\">{{$ctrl.confirm.fee | moneyLong:true}}</span> fee<br>for the address <span class=\"confirmation-value\">{{$ctrl.confirm.recipient}}</span></p><p class=\"dialog-text\">Please <span class=\"fontBold\">CONFIRM </span>to execute or <span class=\"fontBold\">CANCEL </span>to discard.</p></div></div></waves-scrollbox>"
  );


  $templateCache.put('shared/transaction.menu.component',
    "<md-menu><md-button class=\"md-icon-button\" ng-click=\"$mdMenu.open($event)\"><img ng-src=\"img/wicon_txmenu.svg\" height=\"16\" width=\"16\"></md-button><md-menu-content width=\"2\"><md-menu-item><md-button ngclipboard data-clipboard-text=\"{{::$ctrl.transaction.sender}}\" ngclipboard-success=\"$ctrl.addressCopied()\"><span md-menu-align-target>Copy sender address</span></md-button></md-menu-item><md-menu-item><md-button ng-disabled=\"!$ctrl.hasRecipient()\" ngclipboard data-clipboard-text=\"{{::$ctrl.transaction.recipient}}\" ngclipboard-success=\"$ctrl.addressCopied()\"><span md-menu-align-target>Copy recipient address</span></md-button></md-menu-item><md-menu-item><md-button ngclipboard data-clipboard-text=\"{{::$ctrl.transaction.id}}\" ngclipboard-success=\"$ctrl.idCopied()\"><span md-menu-align-target>Copy TX ID</span></md-button></md-menu-item><md-menu-item><md-button ngclipboard ngclipboard-text-provider=\"$ctrl.fullTransactionData()\" ngclipboard-success=\"$ctrl.dataCopied()\"><span md-menu-align-target>Copy full TX data</span></md-button></md-menu-item><md-menu-item ng-if=\"$ctrl.isLeasing()\"><md-button ng-click=\"$ctrl.cancelLeasing()\"><span md-menu-align-target>Cancel Leasing</span></md-button></md-menu-item></md-menu-content></md-menu>"
  );


  $templateCache.put('wallet/box.component',
    "<img ng-src=\"img/{{::$ctrl.image}}\" alt=\"{{::$ctrl.displayName}}\"><div class=\"wB-name\">{{::$ctrl.displayName | uppercase}}</div><div class=\"wB-add\"></div><div class=\"wB-balInt\">{{$ctrl.integerBalance}}</div><div class=\"wB-balDec\">{{$ctrl.fractionBalance}}</div><div class=\"wB-buttons\"><a ng-click=\"$ctrl.onSend({currency: $ctrl.balance.currency})\"><div class=\"wB-but wB-butSend fade\"><p>SEND</p></div></a><a ng-click=\"$ctrl.onWithdraw({currency: $ctrl.balance.currency})\"><div class=\"wB-but wB-butRec fade\"><p>WITHDRAW</p></div></a><a ng-click=\"$ctrl.onDeposit({currency: $ctrl.balance.currency})\"><div class=\"wB-but wB-butTrade fade\"><p>DEPOSIT</p></div></a></div>"
  );

}]);
