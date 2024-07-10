let counter = 1;

	$('#button-add-custom-keyword').bind("click", function(){
		if($('#search-input').val().length > 2) {
			if(confirm('Are you sure the keyword you want to assign does not exist in the vocabularies? Findablity is greatly improved using shared terminology.')) {
				addFreeTextElements($('#search-input').val());
				$('#search-input').val('');
			}
		}
	});

	function addFreeTextElements(text) {
		var now = Date.now();

		$("#sampleKeywords-modal-list-group").append(
			'<li class="list-group-item" id="sampleKeywords-modal-list-group-item-' + now +'"><i class="bi bi-pen"> ' + text + '<a href="#" id="sampleKeywords-modal-list-group-item-delete-' + now + '" title="remove keyword"><i class="bi bi-x text-danger"></i></a>' +
			'<input type="hidden" name="sampleKeywordsText[]" value="' + text +'">' +
			'<input type="hidden" name="sampleKeywordsUri[]" value="">' +
			'<input type="hidden" name="sampleKeywordsVocabUri[]" value=""></li>'
		);

		$('#sampleKeywords-modal-list-group-item-delete-' + now).bind("click", function() {
			$('#sampleKeywords-modal-list-group-item-' + now).remove();
			$('#sampleKeywords-form-list-group-item-' + now).remove();
		});

		counter = counter + 1;
	}

	function addModalElement(node) {
	    console.log(node);
		$("#sampleKeywords-modal-list-group").append(
			'<li class="list-group-item" id="sampleKeywords-modal-list-group-item-' + node.id +'".><i class="bi bi-book"> ' + node.text + '<a href="#" id="sampleKeywords-modal-list-group-item-delete-' + node.id + '" title="remove keyword"><i class="bi bi-x text-danger"></i></a>' +
			'<input type="hidden" name="sampleKeywordsText[]" value="' + node.text +'">' +
			'<input type="hidden" name="sampleKeywordsUri[]" value="' + node.original.extra.uri +'">' +
			'<input type="hidden" name="sampleKeywordsVocabUri[]" value="' + node.original.extra.vocab_uri + '"></li>'
		);

		$('#sampleKeywords-modal-list-group-item-delete-' + node.id).bind("click", function(){
			$('#sampleKeywords-modal-list-group-item-' + node.id).remove();
			$("#sampleKeywords-tree").jstree("uncheck_node", node.id);
		});

		counter = counter + 1;
	}

	var vocabData;

	vocabData = (function() {
	  var vocabData = null;
	  $.ajax({
	    'async': false,
	    'global': false,
	    'url': "https://raw.githubusercontent.com/UtrechtUniversity/msl_vocabularies/main/vocabularies/combined/editor/1.3/editor_1-3.json",
	    'dataType': "json",
	    'success': function(data) {
	      vocabData = data;
	    }
	  });
	  return vocabData;
	})();

	$.jstree.defaults.core.themes.responsive = true;
	$('#sampleKeywords-tree').jstree({
		plugins: ["checkbox", "wholerow", "search"],
		"types": {
			"file": {
				"icon": "jstree-file"
			}
		},
		'core': {
			'data': vocabData
		},
		checkbox: {
			three_state : false, // to avoid that fact that checking a node also check others
			whole_node : false,  // to avoid checking the box just clicking the node
			tie_selection : false, // for checking without selecting and selecting without checking
			cascade: ''
		},
		"search": {
			"case_sensitive": false,
			"show_only_matches": true
		}
	})
	.on("check_node.jstree uncheck_node.jstree", function(e, data) {
		if(e.type == "check_node") {
			addModalElement(data.node);
            // check all parent nodes
			data.node.parents.forEach((element) => {
			    $('#sampleKeywords-tree').jstree('check_node', element);
			});

		} else if (e.type == "uncheck_node") {
			$('#sampleKeywords-modal-list-group-item-' + data.node.id).remove();
		}
	});


	$(document).ready(function () {
        $("#search-input").keyup(function () {
            var searchString = $(this).val();
            $('#sampleKeywords-tree').jstree('search', searchString);
        });
    });