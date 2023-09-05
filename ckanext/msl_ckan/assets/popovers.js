$(document).ready(function() {
  $('[data-toggle=tooltip]').tooltip();

  $('[data-toggle=popover-keyword]').popover({
    container: "body",
    placement: "bottom",
    trigger: "hover",
    html: true,
    title: 'keyword information',
    content: function() {
        let identifier = this.id;
        let uri = this.dataset.uri;

        if($('#' + identifier + '-cache').html().length > 0) {
          return "<div id='" + identifier + "-popover-content'>" + $('#' + identifier + '-cache').html() + "</div>";
        }

        $.ajax({
          url: "http://epos.test:89/api/vocabularies/term?uri=" + uri,
          type: 'GET',
          dataType: 'json',
          async: true,
          beforeSend: function () {
            if($('#' + identifier + '-cache').html().length > 0) {
              $('#' + identifier + '-popover-content').html( $('#' + identifier + '-cache').html() );
              return false;
            }

            return true;
          },
          success: function(res) {
            content = "";
            content += "name: ";
            content += res.name;
            content += "<br>uri: ";
            content += res.uri;
            content += "<br>parent: ";
            if(res.parent) {
              content += res.parent.name;
            } else {
              content += 'none';
            }
            content += '<br>synonyms: ';
            res.synonyms.forEach((synonym) => {
              content += '"' + synonym.name + '" ';
            });
            content += '<br>vocabulary name: ';
            content += res.vocabulary.name;

            $('#' + identifier + '-cache').html(content);
            $('#' + identifier + '-popover-content').html(content);
          }
        });

        return "<div id='" + identifier + "-popover-content'>loading <i class='fa fa-spinner fa-spin' style='font-size:24px'></div>";
    }
  });

  $('[data-highlight=text-keyword]').hover(
    function() {
        $("span[data-uris*='\"" + this.dataset.uri + "\"']").addClass("keyword-highlight");
    }, function() {
        $("span[data-uris*='\"" + this.dataset.uri + "\"']").removeClass("keyword-highlight");
    }
  )

  $('[data-toggle=domain-highlight]').hover(
    function() {
        $("a[data-associated-subdomains*='\"" + this.dataset.domain + "\"']").addClass("keyword-highlight");
    }, function() {
        $("a[data-associated-subdomains*='\"" + this.dataset.domain + "\"']").removeClass("keyword-highlight");
    }
  )
});
