var exec = require('cordova/exec');

exports.subscribe = function (token, code, success, error) {
    exec(success, error, 'SubscriptionPay', 'subscribe', [token, code]);
};
