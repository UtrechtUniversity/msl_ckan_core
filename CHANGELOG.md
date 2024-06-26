# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Update MSL coordination contact information
- Adjust keyword tooltip naming
- Use vocabulary display names in popovers instead of names
- Implement new tags field to store matched vocabulary URIs
- Add child-URIs to enriched keywords in data model
- Add collapsing panels for new tag field display and harmonized keywords sections
- Add highlighting to keyword panel sections when collapsed

### Fixed
- bugfix: both vocabulary options (original/enriched) being checked at initial load
- bugfix: button in vocabulary term missing after using cached popovers

## [1.4.0] - 2024-02-24

- Several small UI changes
- Rename search ordering options
- Change facet names
- Change color of disables nodes in tree(s)
- Add expand and close all buttons to tree(s)
- Add logos to data repositories
- Redirect users when switching trees while filters have been applied before
- Enable facet count(s) in original keyword tree
- New organization schema replacing ckan default version to add custom fields
- Replace breadcrumb on detail page with back to search results page if user originates from search results
- Add checkbox to hide empty nodes from filter tree(s)
- Change schema, configurations and views to remove specific vocabulary fields in schema. 
Replaced by original and enriched repeatable fields with keyword URI and vocabulary URIs
- Update e-mails used in portal to general msl data address
- Update explaining tooltips
- Several updates to lab views
- Add new in development notice
- Rework connection between labs and data-publications for filtering
- Popovers added to keyword to retrieve and display keyword information keyword api
- Highlighting of detected enriched keywords within description and title
- Highlighting of keywords indicating enriched subdomain by hovering subdomain
- Display of source(s) of keyword matching in enriched keyword popover(s)
- Several schema changes to store extra keyword information
- Add ckan ini setting to store vocabulary api endpoint, add function to retrieve setting in templates
- Update vocabulary data to 1.2
- Include SOLR schema within project
- Replace hoverable enriched keyword popup with clickable popup to prevent mass api calls en add clickable options
- Changed vocabulary page information and added keywords form to export selections to csv using direct download option

## [1.3.0] - 2023-03-29
- Add msl_download_link field to solr indexing
- Several UI changes

## [1.2.0] - 2023-03-08

- Update filtertree to reflect changes to geochem vocab
- Adjust typo when adding data repositories
- Fixed several typos
- Adjust citation information in recent additions sections
- Add new background images for index page and cycle backgrounds
- Update styling of about page
- Adjust sorting methods in search results overview
- Split keyword display into originally assigned keywords and detected vocab terms
- update filtertree with new sorted parts
- Add vocabulary section
- Change breadcrump for data publications
- Add search option for filters
- Relocate javascript files to webassets
- Change schema and views to work with empty description/notes field
- Add top level filtering and display document count
- Change schemas etc. to store and work with interpreted/original keywords
- Add tooltips to explain vocabularies and keyword detection

## [1.1.0] - 2022-11-11

- Add changelog in CHANGELOG.md
- Update schema to contain specific fields for identifiers instead of previously used identifier/identifiertype fields
- Add publication date field to schema
- Change templating to work with changes to schema
- Change schema, views and configs to implement four new vocabularies: geological age, geological setting, 
paleomagnetism and geochemistry
- Several changes to GUI

## [1.0.1] - 2022-05-24

- First release