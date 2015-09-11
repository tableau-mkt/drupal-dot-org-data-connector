var DrupalOrgMeta = {};

/**
 * Drupal.org Comment (https://www.drupal.org/api-d7/comment.json)
 */
DrupalOrgMeta.getComment = function getComment() {
  return {
    "cid": "int",
    "name": "string",
    "homepage": "string",
    "subject": "string",
    "comment_body": {
      "value": "string",
      "format": "string"
    },
    "url": "string",
    "edit_url": "string",
    "author": {
      "uri": "string",
      "id": "int",
      "resource": "string"
    },
    "created": "datetime"
  }
};

/**
 * Drupal.org node (https://www.drupal.org/api-d7/node.json)
 */
DrupalOrgMeta.getNode = function getNode(type) {
  var response = {};

  switch (type) {
    case 'book':
      _.extend(response, DrupalOrgMeta.getNode('defaults'),  {
        "book": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        },
        "taxonomy_vocabulary_5": "string",
        "taxonomy_vocabulary_31": "string",
        "taxonomy_vocabulary_38": "string",
        "taxonomy_vocabulary_54": "string",
        "taxonomy_vocabulary_56": "string",
        "book_ancestors": "string"
      });
      return response;
      break;

    case 'book_listing':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {
        "taxonomy_vocabulary_5": "string",
        "taxonomy_vocabulary_38": "string",
        "taxonomy_vocabulary_54": "string",
        "taxonomy_vocabulary_56": "string",
        "taxonomy_vocabulary_60": "string",
        "taxonomy_vocabulary_62": "string",
        "field_book_description": {
          "value": "string",
          "format": "string"
        },
        "field_book_isbn_10": "int",
        "field_book_isbn_13": "int",
        "field_book_listing_authors": {
          "value": "string",
          "format": "string"
        },
        "field_book_listing_date": "string",
        "field_book_page_count": "int",
        "field_book_purchase_link": "string",
        "field_book_subtitle": "string",
        "field_cover_image": {
          "file": {
            "uri": "string",
            "id": "int",
            "resource": "string"
          }
        },
        "field_official_website": {
          "title": "string",
          "url": "string"
        },
        "field_publisher": "string",
        "book_ancestors": "string"
      });
      return response;
      break;

    case 'casestudy':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {
        "taxonomy_vocabulary_50": "string",
        "field_link": {
          "url": "string"
        },
        "field_community": {
          "value": "string",
          "format": "string"
        },
        "field_developed": {
          "value": "string",
          "format": "string"
        },
        "field_developed_org": "string",
        "field_goals": {
          "value": "string",
          "format": "string"
        },
        "field_module": "string",
        "field_module_selection": {
          "value": "string",
          "format": "string"
        },
        "field_overview": {
          "value": "string",
          "format": "string"
        },
        "field_profiles": "string",
        "field_status": "string"
      });
      return response;
      break;

    case 'changenotice':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {
        "field_project": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        },
        "field_change_to": "string",
        "field_change_to_branch": "string",
        "field_coder_recorded": "bool",
        "field_coder_update_recorded": "bool",
        "field_description": {
          "value": "string",
          "format": "string"
        },
        "field_examples_recorded": "string",
        "field_impacts": "string",
        "field_issues": "string",
        "field_module_recorded": "bool",
        "field_online_recorded": "bool",
        "field_other_details": {
          "value": "string",
          "format": "string"
        },
        "field_other_recorded": "bool",
        "field_theme_recorded": "bool",
        "field_update_progress": "string",
        "field_change_record_status": "bool"
      });
      return response;
      break;

    case 'forum':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {
        "taxonomy_forums": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        },
        "taxonomy_vocabulary_5": "string"
      });
      return response;
      break;

    case 'image':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {
        "taxonomy_vocabulary_5": "string",
        "taxonomy_vocabulary_2": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        }
      });
      return response;
      break;

    case 'organization':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {
        "taxonomy_vocabulary_48": "string",
        "taxonomy_vocabulary_50": "string",
        "taxonomy_vocabulary_52": "string",
        "field_budget": "string",
        "field_contributions": {
          "value": "string",
          "format": "string"
        },
        "field_link": {
          "url": "string"
        },
        "field_logo": {
          "file": {
            "uri": "string",
            "id": "int",
            "resource": "string"
          },
          "alt": "string",
          "title": "string"
        },
        "field_org_marketplace_request": "bool",
        "field_org_training_request": "bool",
        "field_organization_headquarters": "string",
        "field_organization_issue": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        },
        "field_organization_list_rule": "string",
        "field_organization_security": "string",
        "field_organization_training_desc": {
          "value": "string",
          "format": "string"
        },
        "field_organization_training_list": "string",
        "field_organization_training_url": {
          "url": "string"
        },
        "field_organization_technologies": "string",
        "field_organization_support": "string",
        "field_short_description": {
          "value": "string",
          "format": "string"
        },
        "field_hosting_type": "string"
      });
      return response;
      break;

    case 'packaging_whitelist':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {
        "taxonomy_vocabulary_58": "string"
      });
      return response;
      break;

    case 'page':
    case 'story':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {});
      return response;
      break;

    case 'project_issue':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {
        "taxonomy_vocabulary_9": "string",
        "field_issue_status": "int",
        "field_issue_priority": "int",
        "field_issue_category": "int",
        "field_issue_component": "string",
        "field_project": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        },
        "field_issue_parent": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        },
        "field_issue_related": "string",
        "field_issue_version": "string",
        "field_issue_credit": "string"
      });
      return response;
      break;

    case 'project_core':
    case 'project_drupalorg':
    case 'project_theme':
    case 'project_theme_engine':
    case 'project_translation':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), DrupalOrgMeta.getNode('project_shared'));
      return response;
      break;

    case 'project_distribution':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), DrupalOrgMeta.getNode('project_shared'), {
        "field_supporting_organizations": "string"
      });
      return response;
      break;

    case 'project_module':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), DrupalOrgMeta.getNode('project_shared'), {
        "taxonomy_vocabulary_3": "string",
        "field_supporting_organizations": "string"
      });
      return response;
      break;

    case 'project_release':
      _.extend(response, DrupalOrgMeta.getNode('defaults'), {
        "taxonomy_vocabulary_6": {
          "uri": "string",
          "id": "nid",
          "resource": "string"
        },
        "taxonomy_vocabulary_7": "string",
        "field_release_project": {
          "uri": "string",
          "id": "nid",
          "resource": "string"
        },
        "field_release_version": "string",
        "field_release_version_major": "int",
        "field_release_version_minor": "int",
        "field_release_version_patch": "int",
        "field_release_version_extra": "string",
        "field_release_version_ext_weight": "int",
        "field_release_version_ext_delta": "int",
        "field_release_vcs_label": "string",
        "field_release_build_type": "string",
        "field_release_update_status": "int",
        "field_release_files": "string"
      });
      return response;
      break;

    // Common fields across various project nodes.
    case 'project_shared':
      return {
        "taxonomy_vocabulary_44": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        },
        "taxonomy_vocabulary_46": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        },
        "field_project_type": "string",
        "field_project_machine_name": "string",
        "field_project_has_issue_queue": "bool",
        "field_project_components": "string",
        "field_project_default_component": "string",
        "field_project_has_releases": "bool",
        "field_release_version_format": "string",
        "field_project_homepage": {
          "url": "string"
        },
        "field_project_changelog": {
          "url": "string"
        },
        "field_project_demo": {
          "url": "string"
        },
        "field_project_documentation": {
          "url": "string"
        },
        "field_project_screenshots": {
          "url": "string"
        },
        "field_project_license": {
          "url": "string"
        },
        "field_download_count": "int"
      };
      break;

    // Common properties across all nodes.
    default:
      return {
        "nid": "int",
        "vid": "int",
        "is_new": "bool",
        "type": "string",
        "title": "string",
        "language": "string",
        "url": "string",
        "edit_url": "string",
        "body": {
          "value": "string",
          "summary": "string",
          "format": "string"
        },
        "status": "int",
        "promote": "int",
        "sticky": "int",
        "author": {
          "uri": "string",
          "id": "int",
          "resource": "string"
        },
        "comment": "int",
        "comments": "string",
        "comment_count": "int",
        "last_comment_timestamp": "int",
        "created": "datetime",
        "changed": "datetime"
      };
  }
};

/**
 * Drupal.org taxonomy term (https://www.drupal.org/api-d7/taxonomy_term.json)
 */
DrupalOrgMeta.getTerm = function getTerm() {
  return {
    "tid": "int",
    "name": "string",
    "description": "string",
    "weight": "int",
    "url": "string",
    "node_count": "int",
    "parents_all": "string"
  };
};

/**
 * Drupal.org user (https://www.drupal.org/api-d7/user.json)
 */
DrupalOrgMeta.getUser = function getUser() {
  return {
    "uid": "int",
    "name": "string",
    "url": "string",
    "edit_url": "string",
    "field_first_name": "string",
    "field_last_name": "string",
    "field_irc_nick": "string",
    "field_terms_of_service": "bool",
    "field_country": "string",
    "field_gender": "string",
    "field_languages": "string",
    "field_contributed": "string",
    "field_events_attended": "string",
    "field_websites": "string",
    "field_industries_worked_in": "string",
    "field_organizations": "string",
    "field_mentors": "string",
    "field_areas_of_expertise": "string",
    "field_subscribe_to": {
      "subscribe": "bool"
    },
    "field_bio": {
      "value": "string",
      "format": "string"
    },
    "field_drupal_contributions": {
      "value": "string",
      "format": "string"
    },
    "created": "datetime"
  }
};

DrupalOrgMeta.multiValueFields = function multiValueFields() {
  return [{
    "name": "taxonomy_vocabulary_3",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_5",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_7",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_9",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_31",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_38",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_48",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_50",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_52",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_54",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_56",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_58",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_60",
    "pluck": "id"
  }, {
    "name": "taxonomy_vocabulary_62",
    "pluck": "id"
  }, {
    "name": "book_ancestors",
    "pluck": "id"
  }, {
    "name": "comments",
    "pluck": "id"
  }, {
    "name": "field_industries_worked_in",
    "pluck": "id"
  }, {
    "name": "field_organizations",
    "pluck": "id"
  }, {
    "name": "field_websites",
    "pluck": "url"
  }, {
    "name": "field_mentors",
    "pluck": "id"
  }, {
    "name": "field_areas_of_expertise",
    "pluck": "id"
  }, {
    "name": "parents_all",
    "pluck": "id"
  }, {
    "name": "field_book_purchase_link",
    "pluck": "url"
  }, {
    "name": "field_developed_org",
    "pluck": "id"
  }, {
    "name": "field_module",
    "pluck": "id"
  }, {
    "name": "field_profiles",
    "pluck": "id"
  }, {
    "name": "field_issues",
    "pluck": "id"
  }, {
    "name": "field_issue_related",
    "pluck": "id"
  }, {
    "name": "field_issue_credit",
    "pluck": "id"
  }, {
    "name": "field_supporting_organizations",
    "pluck": "id"
  }, {
    "name": "field_release_files",
    "pluck": "id"
  }];
};
