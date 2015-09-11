(function($) {
  $(document).ready(function interactionDocumentReady() {
    var $contentType = $('select[name="ContentType"]'),
        $entity = $('select[name="Entity"]');

    $contentType.conditionize();
    $entity.change(function entityChange() {
      $contentType.conditionize();
    });

  });
})(jQuery);
