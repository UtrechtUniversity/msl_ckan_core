$(document).ready(function() {
  $('[data-toggle=tooltip]').tooltip();

  $('[data-toggle=popover-keyword]').popover({
    container: "body",
    placement: "bottom",
    trigger: "focus",
    html: true,
    sanitize: false,
    title: 'keyword information',
    content: function() {
        let identifier = this.id;
        let uri = this.dataset.uri;
        let filterUrl = this.dataset.filterlink;

        if($('#' + identifier + '-cache').html().length > 0) {
            if(this.dataset.sources) {
                matchSources = JSON.parse(this.dataset.sources);
                if(matchSources.length > 0) {
                    return "<div id='" + identifier + "-popover-content'>" + $('#' + identifier + '-cache').html() + "</div>" +
                    "<table class=\"table table-condensed\"><tr><td class=\"w-auto\">Match origins: </td><td>" + matchSources.join(", ") + "</td></tr></table>";
                } else {
                    return "<div id='" + identifier + "-popover-content'>" + $('#' + identifier + '-cache').html() + "</div>";
                }
            } else {
                return "<div id='" + identifier + "-popover-content'>" + $('#' + identifier + '-cache').html() + "</div>";
            }
        }

        $.ajax({
          url: vocabularyApiEndpoint + "/term?uri=" + uri,
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
            content = "<a class=\"btn btn-sm btn-primary pull-right\" style=\"background-color: #27A468; border-color: #27A468; margin-bottom: 2px;\" href=\"" + filterUrl + "\">View data publications with keyword</a>"
            content += "<table class=\"table table-condensed\">";
            content += "<tr><td class=\"w-auto\">name</td><td>" + res.name + "</td></tr>";
            content += "<tr><td class=\"w-auto\">indicators</td><td>";
            res.synonyms.forEach((synonym) => {
              content += '"' + synonym.name + '" ';
            });
            content += "</td></tr>";
            content += "<tr><td class=\"w-auto\">parent term</td><td>";
            if(res.parent) {
              content += res.parent.name;
            } else {
              content += 'none';
            }
            content += "</td></tr>";
            content += "<tr><td class=\"w-auto\">occurs in vocabulary</td><td>" + res.vocabulary.name + "</td></tr>";
            content += "<tr><td class=\"w-auto\">uri</td><td>" + res.uri + "</td></tr>";
            content += "</table>";

            $('#' + identifier + '-cache').html(content);
            $('#' + identifier + '-popover-content').html(content);
          }
        });

        if(this.dataset.sources) {
            matchSources = JSON.parse(this.dataset.sources);
            if(matchSources.length > 0) {
                return "<div id='" + identifier + "-popover-content'>loading <i class='fa fa-spinner fa-spin' style='font-size:24px'></i></div>" +
                "<table class=\"table table-condensed\"><tr><td class=\"w-auto\">Match origins: </td><td>" + matchSources.join(", ") + "</td></tr></table>";
            } else {
                return "<div id='" + identifier + "-popover-content'>loading <i class='fa fa-spinner fa-spin' style='font-size:24px'></i></div>";
            }
        } else {
            return "<div id='" + identifier + "-popover-content'>loading <i class='fa fa-spinner fa-spin' style='font-size:24px'></i></div>";
        }
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
