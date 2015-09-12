var module = module || {},
    window = window || {},
    jQuery = jQuery || {},
    tableau = tableau || {},
    wdcw = window.wdcw || {},
    util = util || {},
    DrupalOrgMeta = DrupalOrgMeta || {};

module.exports = function($, tableau, wdcw, util, DrupalOrgMeta) {

  /**
   * Run during initialization of the web data connector.
   *
   * @param {string} phase
   *   The initialization phase. This can be one of:
   *   - tableau.phaseEnum.interactivePhase: Indicates when the connector is
   *     being initialized with a user interface suitable for an end-user to
   *     enter connection configuration details.
   *   - tableau.phaseEnum.gatherDataPhase: Indicates when the connector is
   *     being initialized in the background for the sole purpose of collecting
   *     data.
   *   - tableau.phaseEnum.authPhase: Indicates when the connector is being
   *     accessed in a stripped down context for the sole purpose of refreshing
   *     an OAuth authentication token.
   * @param {function} setUpComplete
   *   A callback function that you must call when all setup tasks have been
   *   performed.
   */
  wdcw.setup = function setup(phase, setUpComplete) {
    // You may need to perform set up or other initialization tasks at various
    // points in the data connector flow. You can do so here.
    switch (phase) {
      case tableau.phaseEnum.interactivePhase:
        // Perform set up tasks that relate to when the user will be prompted to
        // enter information interactively.
        break;

      case tableau.phaseEnum.gatherDataPhase:
        // Perform set up tasks that should happen when Tableau is attempting to
        // retrieve data from your connector (the user is not prompted for any
        // information in this phase.
        break;

      case tableau.phaseEnum.authPhase:
        // Perform set up tasks that should happen when Tableau is attempting to
        // refresh OAuth authentication tokens.
        break;
    }

    // Always register when initialization tasks are complete by calling this.
    // This can be especially useful when initialization tasks are asynchronous
    // in nature.
    setUpComplete();
  };

  /**
   * Run when the web data connector is being unloaded. Useful if you need
   * custom logic to clean up resources or perform other shutdown tasks.
   *
   * @param {function} tearDownComplete
   *   A callback function that you must call when all shutdown tasks have been
   *   performed.
   */
  wdcw.teardown = function teardown(tearDownComplete) {
    // Once shutdown tasks are complete, call this. Particularly useful if your
    // clean-up tasks are asynchronous in nature.
    tearDownComplete();
  };

  /**
   * Primary method called when Tableau is asking for the column headers that
   * this web data connector provides. Takes a single callable argument that you
   * should call with the headers you've retrieved.
   *
   * @param {function(Array<{name, type, incrementalRefresh}>)} registerHeaders
   *   A callback function that takes an array of objects as its sole argument.
   *   For example, you might call the callback in the following way:
   *   registerHeaders([
   *     {name: 'Boolean Column', type: 'bool'},
   *     {name: 'Date Column', type: 'date'},
   *     {name: 'DateTime Column', type: 'datetime'},
   *     {name: 'Float Column', type: 'float'},
   *     {name: 'Integer Column', type: 'int'},
   *     {name: 'String Column', type: 'string'}
   *   ]);
   *
   *   Note: to enable support for incremental extract refreshing, add a third
   *   key (incrementalRefresh) to the header object. Candidate columns for
   *   incremental refreshes must be of type datetime or integer. During an
   *   incremental refresh attempt, the most recent value for the given column
   *   will be passed as "lastRecord" to the tableData method. For example:
   *   registerHeaders([
   *     {name: 'DateTime Column', type: 'datetime', incrementalRefresh: true}
   *   ]);
   */
  wdcw.columnHeaders = function columnHeaders(registerHeaders) {
    var entityType = this.getConnectionData()['Entity'],
        entityBundle = this.getConnectionData()['ContentType'],
        processedColumns = [];

    switch (entityType) {
      case 'comment':
        processedColumns = util.flattenHeaders(DrupalOrgMeta.getComment());
        break;

      case 'node':
        processedColumns = util.flattenHeaders(DrupalOrgMeta.getNode(entityBundle));
        break;

      case 'taxonomy_term':
        processedColumns = util.flattenHeaders(DrupalOrgMeta.getTerm());
        break;

      case 'user':
        processedColumns = util.flattenHeaders(DrupalOrgMeta.getUser());
    }

    registerHeaders(processedColumns);
  };


  /**
   * Primary method called when Tableau is asking for your web data connector's
   * data. Takes a callable argument that you should call with all of the
   * data you've retrieved. You may optionally pass a token as a second argument
   * to support paged/chunked data retrieval.
   *
   * @param {function(Array<{object}>, {string})} registerData
   *   A callback function that takes an array of objects as its sole argument.
   *   Each object should be a simple key/value map of column name to column
   *   value. For example, you might call the callback in the following way:
   *   registerData([
   *     {'String Column': 'String Column Value', 'Integer Column': 123}
   *   ]});
   *
   *   It's possible that the API you're interacting with supports some mechanism
   *   for paging or filtering. To simplify the process of making several paged
   *   calls to your API, you may optionally pass a second argument in your call
   *   to the registerData callback. This argument should be a string token that
   *   represents the last record you retrieved.
   *
   *   If provided, your implementation of the tableData method will be called
   *   again, this time with the token you provide here. Once all data has been
   *   retrieved, pass null, false, 0, or an empty string.
   *
   * @param {string} lastRecord
   *   Optional. If you indicate in the call to registerData that more data is
   *   available (by passing a token representing the last record retrieved),
   *   then the lastRecord argument will be populated with the token that you
   *   provided. Use this to update/modify the API call you make to handle
   *   pagination or filtering.
   *
   *   If you indicated a column in wdcw.columnHeaders suitable for use during
   *   an incremental extract refresh, the last value of the given column will
   *   be passed as the value of lastRecord when an incremental refresh is
   *   triggered.
   */
  wdcw.tableData = function tableData(registerData, lastRecord) {
    var connectionData = this.getConnectionData(),
        url = lastRecord && lastRecord.indexOf('http') === 0 ? lastRecord : wdcw.buildApiUrlFrom(connectionData),
        multiValueFields = DrupalOrgMeta.multiValueFields(),
        maxNumberOfRows = connectionData['maxNumberOfRows'],
        rowsProcessed = 0;

    $.getJSON(url, function getJsonSuccess(data) {
      var records = data.list || [],
          processedData = [];

      records.forEach(function shapeApiData(record) {
        if (record.created) {
          record.created = new Date(record.created * 1000).toISOString();
        }
        if (record.changed) {
          record.changed = new Date(record.changed * 1000).toISOString();
        }

        multiValueFields.forEach(function shapeMultiValueFields(field) {
          if (record[field.name]) {
            record[field.name] = _.pluck(record[field.name], field.pluck);
          }
        });

        processedData.push(util.flattenData(record));
        rowsProcessed += processedData.length;
      });

      if (rowsProcessed >= maxNumberOfRows || data.last === data.self) {
        registerData(processedData);
      }
      else {
        registerData(processedData, data.next);
      }
    });
  };

  // You can write private methods for use above like this:

  /**
   * Helper function to build an API endpoint.
   *
   * @param {object} connectionData
   *   Connection data for this connector.
   */
  wdcw.buildApiUrlFrom = function buildApiUrlFrom(connectionData) {
    var entityType = connectionData.Entity,
        entityBundle = connectionData.ContentType,
        queryParams = connectionData.QueryParameters,
        path = 'https://www.drupal.org/api-d7/' + entityType + '.json',
        separator = '?';

    if (entityType === 'node' && entityBundle) {
      path += separator + 'type=' + entityBundle;
      separator = '&';
    }

    return path + separator + queryParams;
  };

  return wdcw;
};

// Set the global wdcw variable as expected.
wdcw = module.exports(jQuery, tableau, wdcw, util, DrupalOrgMeta);
