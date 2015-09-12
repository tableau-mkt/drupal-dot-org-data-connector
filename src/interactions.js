(function($, wdcw) {
  $(document).ready(function interactionDocumentReady() {
    var $contentType = $('select[name="ContentType"]'),
        $entity = $('select[name="Entity"]'),
        updateExplainApi;

    $contentType.conditionize();
    $entity.change(function entityChange() {
      $contentType.conditionize();
    });

    updateExplainApi = function updateExplainApi() {
      $('#explain_api').val(wdcw.buildApiUrlFrom({
        Entity: $('[name="Entity"]').val(),
        ContentType: $('[name="ContentType"]').val(),
        QueryParameters: $('[name="QueryParameters"]').val()
      }));
    };

    updateExplainApi();
    $('select').change(updateExplainApi);
    $('input').keyup(updateExplainApi);
  });
})(jQuery, wdcw);
