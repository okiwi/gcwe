describe('api service', function () {
    var logger;

    beforeEach(module('app'));

    beforeEach(inject(function (_logger_) {
        logger = _logger_;
    }));

    it('should have error and success method', function () {
        logger.error();
        logger.success();
        logger.info();
        logger.warning();
    });

});