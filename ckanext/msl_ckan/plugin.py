import os
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from ckan.common import config
import json
from flask import Blueprint, render_template, request, make_response


def get_filter_menu_interpreted():
    f = open(os.path.join(os.path.dirname(__file__), 'public/interpreted.json'))
    data = json.load(f)

    return data


def get_filter_menu_original():
    f = open(os.path.join(os.path.dirname(__file__), 'public/original.json'))
    data = json.load(f)

    return data


def get_label_for_uri(uri):
    f = open(os.path.join(os.path.dirname(__file__), 'public/uri-labels.json'))
    data = json.load(f)

    if uri in data:
        return data[uri]
    else:
        return uri


def get_vocabulary_api_endpoint():
    return config.get('mslvocabularies.endpoint_root', False)


class MslCkanPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IBlueprint)
    plugins.implements(plugins.ITemplateHelpers)

    # IConfigurer
    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('assets', 'ckanext-msl_ckan')

    def get_helpers(self):
        return {
            'msl_ckan_get_filter_menu_interpreted': get_filter_menu_interpreted,
            'msl_ckan_get_filter_menu_original': get_filter_menu_original,
            'msl_ckan_get_label_for_uri': get_label_for_uri,
            'msl_ckan_get_vocabulary_api_endpoint': get_vocabulary_api_endpoint
        }

    def vocab_view(self):
        return render_template("vocabs.html")

    def keyword_submit(self):
        textList = request.form.getlist('sampleKeywordsText[]')
        uriList = request.form.getlist('sampleKeywordsUri[]')
        vocabUriList = request.form.getlist('sampleKeywordsVocabUri[]')

        csv = 'label,uri,vocab-uri'

        for i in range(0, len(textList)):
            csv += '\n'
            csv += textList[i] + ',' + uriList[i] + ',' + vocabUriList[i]

        response = make_response(csv)
        cd = 'attachment; filename=keywords.csv'
        response.headers['Content-Disposition'] = cd
        response.mimetype = 'text/csv'

        return response

        #return request.form.getlist('sampleKeywords')
        return 'wut'

    def get_blueprint(self):
        blueprint = Blueprint(self.name, self.__module__)
        blueprint.template_folder = 'templates'

        blueprint.add_url_rule('/vocabularies', 'vocabularies', self.vocab_view)
        blueprint.add_url_rule('/keyword-export', 'keyword-export', self.keyword_submit, methods=['POST'])

        # add route for post request to process keyword form

        return blueprint
