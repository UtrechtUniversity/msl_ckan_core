  URLSearchParams.prototype.remove = function(key, value) {
    const entries = this.getAll(key);
    const newEntries = entries.filter(entry => entry !== value);
    this.delete(key);
    newEntries.forEach(newEntry => this.append(key, newEntry));
  }

  function processNodes(nodes, original = false) {
    for(var i = nodes.length - 1; i >= 0; i--) {
        node = nodes[i];
        if(node.extra.type == 'filter') {
          if(node.extra.filterName in activeFilters) {
            if(activeFilters[node.extra.filterName].includes(node.extra.filterValue)) {
              node.state.checked = true;
              activeNodes.push(node.id);
            }
          }
          if(node.extra.filterName in facets) {
            var result = facets[node.extra.filterName].items.find(obj => {
              return obj.name == node.extra.filterValue;
            })

            if(result) {
              node.state.disabled = false;
              if(!original) {
                node.text = node.text + ' <span class="badge bg-primary rounded-pill">' + result.count + '</span>';
              }
            }
          }
        }

        if(node.extra.includeFacet) {
            if(node.extra.facetName in facets) {
              for (let x = 0; x < facets[node.extra.facetName].items.length; x++) {

                var newNode = {
                  "text": facets[node.extra.facetName].items[x].display_name,
                  "id": node.extra.facetName + '-' + x,
                  "state": {
                      "opened": false,
                      "disabled": false,
                      "selected": false,
                      "checked": false
                  },
                  "extra": {
                      "type": "filter",
                      "url": "",
                      "filterName": node.extra.facetName,
                      "filterValue": facets[node.extra.facetName].items[x].name
                  },
                  "children": []
                };

                node.children.push(newNode);
              }
            }
        }

        /*
        if(original) {
          if(node.state.disabled) {
            nodes.splice(i, 1);
          }
        }
        */

        if(node.children.length > 0) {
            processNodes(node.children, original);
        }
    }
  }

  processNodes(dataInterpreted);
  processNodes(dataOriginal, true);

  $('#jstree-interpreted').jstree({
      core: {
        data: dataInterpreted,
        check_callback: false,
        themes: {
          dots: false,
          icons: false
        }
      },
      checkbox: {
        three_state : false, // to avoid that fact that checking a node also check others
        whole_node : false,  // to avoid checking the box just clicking the node
        tie_selection : false // for checking without selecting and selecting without checking
      },
      plugins: ['checkbox', 'search'],
        "search": {
        "case_sensitive": false,
        "show_only_matches": true
      }
  })
  .on("check_node.jstree uncheck_node.jstree", function(e, data) {
      if(data.node.original.extra.type == 'filter') {
        if(e.type == "check_node") {
          var url = new URL(window.location.href);
          var urlParams = new URLSearchParams(url.search);

          urlParams.append(data.node.original.extra.filterName, data.node.original.extra.filterValue);
          url.search = urlParams.toString();
        } else if (e.type == "uncheck_node") {
          var url = new URL(window.location.href);
          var urlParams = new URLSearchParams(url.search);

          urlParams.remove(data.node.original.extra.filterName, data.node.original.extra.filterValue);
          url.search = urlParams.toString();
        }

        window.location.href = url.toString();
      }
  }).bind('ready.jstree', function (event, data) {
    for (let i = 0; i < activeNodes.length; i++) {
      data.instance._open_to(activeNodes[i]);
    }
  }
);

$('#jstree-original').jstree({
      core: {
        data: dataOriginal,
        check_callback: false,
        themes: {
          dots: false,
          icons: false
        }
      },
      checkbox: {
        three_state : false, // to avoid that fact that checking a node also check others
        whole_node : false,  // to avoid checking the box just clicking the node
        tie_selection : false // for checking without selecting and selecting without checking
      },
      plugins: ['checkbox', 'search'],
        "search": {
        "case_sensitive": false,
        "show_only_matches": true
      }
  })
  .on("check_node.jstree uncheck_node.jstree", function(e, data) {
      if(data.node.original.extra.type == 'filter') {
        if(e.type == "check_node") {
          var url = new URL(window.location.href);
          var urlParams = new URLSearchParams(url.search);

          urlParams.append(data.node.original.extra.filterName, data.node.original.extra.filterValue);
          url.search = urlParams.toString();
        } else if (e.type == "uncheck_node") {
          var url = new URL(window.location.href);
          var urlParams = new URLSearchParams(url.search);

          urlParams.remove(data.node.original.extra.filterName, data.node.original.extra.filterValue);
          url.search = urlParams.toString();
        }

        window.location.href = url.toString();
      }
  }).bind('ready.jstree', function (event, data) {
    for (let i = 0; i < activeNodes.length; i++) {
      data.instance._open_to(activeNodes[i]);
    }
  }
);



$(document).ready(function () {
    var checked = localStorage.getItem('interpretedFilters');
    if(checked !== null) {
        if(checked === 'false' ) {
            $("#filterTreeToggleInterpreted").prop('checked', false);
            $("#filterTreeToggleOriginal").prop('checked', 'checked');
            $('#jstree-interpreted').hide();
            $('#jstree-original').show();
        } else {
            $("#filterTreeToggleInterpreted").prop('checked', 'checked');
            $("#filterTreeToggleOriginal").prop('checked', false);
        }
    }

    $("#field-giant-search-filters").keyup(function () {
        var searchString = $(this).val();
        if($("#filterTreeToggleInterpreted").is(':checked')) {
            $('#jstree-interpreted').jstree('search', searchString);
        } else {
            $('#jstree-original').jstree('search', searchString);
        }
    });

    $("#filterTreeToggleInterpreted").change(function () {
        if(this.checked) {
            localStorage.setItem('interpretedFilters', true);
            $("#filterTreeToggleOriginal").prop('checked', false);
            $('#jstree-interpreted').show();
            $('#jstree-original').hide();
        } else {
            localStorage.setItem('interpretedFilters', false);
            $("#filterTreeToggleOriginal").prop('checked', 'checked');
            $('#jstree-interpreted').hide();
            $('#jstree-original').show();
        }
    });

    $("#filterTreeToggleOriginal").change(function () {
        if(this.checked) {
            localStorage.setItem('interpretedFilters', false);
            $("#filterTreeToggleInterpreted").prop('checked', false);
            $('#jstree-interpreted').hide();
            $('#jstree-original').show();
        } else {
            localStorage.setItem('interpretedFilters', true);
            $("#filterTreeToggleInterpreted").prop('checked', 'checked');
            $('#jstree-interpreted').show();
            $('#jstree-original').hide();
        }
    });

    $('#expand_all').click(function () {
        if($("#filterTreeToggleInterpreted").is(':checked')) {
            $('#jstree-interpreted').jstree('open_all');
        } else {
            $('#jstree-original').jstree('open_all');
        }
    });

    $('#close_all').click(function () {
        if($("#filterTreeToggleInterpreted").is(':checked')) {
            $('#jstree-interpreted').jstree('close_all');
        } else {
            $('#jstree-original').jstree('close_all');
        }
    });

    $('[data-toggle=tooltip]').tooltip();
});

