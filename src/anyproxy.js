module.exports = {
  *beforeSendRequest(requestDetail) {
      const newRequestOptions = requestDetail.requestOptions;
      requestDetail.protocol = 'http';
      newRequestOptions.hostname = 'killbill'
      newRequestOptions.port = '8080';
      newRequestOptions.path = '/plugins/killbill-payment-test/configure';
      newRequestOptions.method = 'POST';
      newRequestOptions.headers['X-Killbill-ApiKey'] = 'bob';
      newRequestOptions.headers['X-Killbill-ApiSecret'] ='lazar';
      newRequestOptions.headers['X-Killbill-CreatedBy'] = 'coder';
      requestDetail.requestOptions = newRequestOptions;
      requestDetail.requestData = '{"CONFIGURE_ACTION":"ACTION_RETURN_PLUGIN_STATUS_ERROR", "METHODS":"purchasePayment"}';
      return requestDetail;
  }
};
