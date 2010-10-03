function addProject(url)
{
	var params = Form.serialize('add_project_form');
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		evalScripts: true,
		parameters: params,
		onLoading: function (transport) {
			$('project_add_indicator').show();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				failedMessage(json.error);
				$('project_add_indicator').hide();
			}
			else
			{
				Form.reset('add_project_form');
				$('noprojects_tr').hide();
				$('project_add_indicator').hide();
				successMessage(json.title, json.message);
				$('project_table').insert({bottom: json.content});
			}
		},
		onFailure: function (transport) {
			$('project_add_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function removeProject(url, pid)
{
	new Ajax.Request(url, {
	asynchronous:true,
	method: "post",
	requestHeaders: {Accept: 'application/json'},
	onLoading: function (transport) {
		$('project_delete_controls_' + pid).hide();
		$('project_delete_indicator_' + pid).show();
	},
	onSuccess: function(transport) {
		var json = transport.responseJSON;
		if (json.failed)
		{
			$('project_delete_controls_' + pid).show();
			$('project_delete_indicator_' + pid).hide();
			failedMessage(json.error);
		}
		else
		{
			$('project_delete_indicator_' + pid).remove();
			$('project_delete_confirm_' + pid).remove();
			$('project_box_' + pid).remove();
			if ($('project_table').childElements().size() == 0)
			{
				$('noprojects_tr').show();
			}
			successMessage(json.title);
		}
	},
	onFailure: function (transport) {
		$('project_delete_controls_' + pid).show();
		$('project_delete_error_' + pid).show();
		var json = transport.responseJSON;
		if (json && (json.failed || json.error))
		{
			failedMessage(json.error);
		}
	}
	});
}

function addMilestone(url)
{
	var params = Form.serialize('add_milestone_form');
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		evalScripts: true,
		parameters: params,
		onLoading: function (transport) {
			$('milestone_add_indicator').show();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				failedMessage(json.error);
				$('milestone_add_indicator').hide();
			}
			else
			{
				Form.reset('add_milestone_form');
				$('no_milestones').hide();
				$('milestone_add_indicator').hide();
				successMessage(json.title, json.message);
				$('milestone_list').insert({bottom: json.content});
			}
		},
		onFailure: function (transport) {
			$('milestone_add_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function doBuildAction(url, bid, action, update)
{
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		evalScripts: true,
		onLoading: function (transport) {
			$('build_'+bid+'_indicator').show();
			$('build_'+bid+'_info').hide();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
				$('build_'+bid+'_indicator').hide();
				$('build_'+bid+'_info').show();
			}
			else
			{
				$('build_'+bid+'_indicator').hide();
				$('build_'+bid+'_info').show();
				if (update == 'all')
				{
					$('build_table').update(transport.responseText);
				}
				else
				{
					$('build_list_' + bid).update(transport.responseText);
				}
			}
		},
		onFailure: function (transport) {
			$('build_'+bid+'_indicator').hide();
			$('build_'+bid+'_info').show();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function updateBuild(url, bid)
{
	var params = Form.serialize('edit_build_'+bid);
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		evalScripts: true,
		parameters: params,
		onLoading: function (transport) {
			$('build_'+bid+'_indicator').show();
			$('build_'+bid+'_info').hide();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
				$('build_'+bid+'_indicator').hide();
				$('build_'+bid+'_info').show();
			}
			else
			{
				$('build_'+bid+'_indicator').hide();
				$('build_'+bid+'_info').show();
				$('build_list_' + bid).update(transport.responseText);
			}
		},
		onFailure: function (transport) {
			$('build_'+bid+'_indicator').hide();
			$('build_'+bid+'_info').show();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function saveProjectOther(url)
{
	var params = Form.serialize('project_other');
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		evalScripts: true,
		parameters: params,
		requestHeaders: {Accept: 'application/json'},
		onLoading: function (transport) {
			$('settings_save_indicator').show();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				$('settings_save_indicator').hide();
				failedMessage(json.error);
			}
			else
			{
				$('settings_save_indicator').hide();
				successMessage(json.title, json.message);
			}	
		},
		onFailure: function (transport) {
			$('settings_save_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function addToOpenBuild(url, bid)
{
	var params = Form.serialize('addtoopen_build_'+bid);
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		evalScripts: true,
		parameters: params,
		requestHeaders: {Accept: 'application/json'},
		onLoading: function (transport) {
			$('build_'+bid+'_indicator').show();
			$('build_'+bid+'_info').hide();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				$('build_'+bid+'_indicator').hide();
				$('build_'+bid+'_info').show();
				$('addtoopen_build_'+bid).hide();
				failedMessage(json.title, json.message);
			}
			else
			{
				$('build_'+bid+'_indicator').hide();
				$('build_'+bid+'_info').show();
				$('addtoopen_build_'+bid).hide();
				successMessage(json.title, json.message);
			}
		},
		onFailure: function (transport) {
			$('build_'+bid+'_indicator').hide();
			$('build_'+bid+'_info').show();
			$('addtoopen_build_'+bid).hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function deleteBuild(url, bid)
{
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		evalScripts: true,
		requestHeaders: {Accept: 'application/json'},
		onLoading: function (transport) {
			$('build_'+bid+'_indicator').addClassName('selected_red');
			$('build_'+bid+'_indicator').show();
			$('build_'+bid+'_info').hide();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (!json.deleted)
			{
				$('build_'+bid+'_indicator').removeClassName('selected_red');
				$('build_'+bid+'_indicator').hide();
				$('build_'+bid+'_info').show();
				$('del_build_'+bid).hide();
				failedMessage(json.error);
			}
			else
			{
				if ($('build_list_'+bid))
				{
					$('build_list_'+bid).remove();
				}
				else
				{
					$('buildbox_'+bid).remove();
				}
				if ($('build_table').childElements().size() == 0)
				{
					$('no_builds').show();
				}
				successMessage(json.message);
			}
		},
		onFailure: function (transport) {
			$('build_'+bid+'_indicator').removeClassName('selected_red');
			$('build_'+bid+'_indicator').hide();
			$('build_'+bid+'_info').show();
			$('del_build_'+bid).hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function switchEditionTab(select_tab)
{
	$('edition_settings').hide();
	$('tab_edition_settings').removeClassName('selected');
	$('edition_components').hide();
	$('tab_edition_components').removeClassName('selected');
	$('edition_builds').hide();
	$('tab_edition_builds').removeClassName('selected');
	$('edition_'+select_tab).show();
	$('tab_edition_'+select_tab).addClassName('selected');
}

function addEdition(url)
{
	var params = Form.serialize('add_edition_form');
		new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		evalScripts: true,
		parameters: params,
		onLoading: function (transport) {
			$('edition_add_indicator').show();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				failedMessage(json.error);
				$('edition_add_indicator').hide();
			}
			else
			{
				Form.reset('add_edition_form');
				$('edition_add_indicator').hide();
				$('no_editions').hide();
				successMessage(json.title, json.message);
				$('edition_table').update($('edition_table').innerHTML + json.html);
			}
		},
		onFailure: function (transport) {
			$('edition_add_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function addBuild(url)
{
	var params = Form.serialize('add_build_form');
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		parameters: params,
		onLoading: function (transport) {
			$('build_add_indicator').show();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				failedMessage(json.error);
				$('build_add_indicator').hide();
			}
			else
			{
				$('build_table').update($('build_table').innerHTML + json.html);
				$('no_builds').hide();
				$('build_add_indicator').hide();
				successMessage(json.title, json.message);
			}
		},
		onFailure: function (transport) {
			$('build_add_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function addComponent(url)
{
	var params = Form.serialize('add_component_form');
		new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		evalScripts: true,
		parameters: params,
		onLoading: function (transport) {
			$('component_add_indicator').show();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				failedMessage(json.error);
				$('project_add_indicator').hide();
			}
			else
			{
				Form.reset('add_component_form');
				$('component_add_indicator').hide();
				successMessage(json.title, json.message);
				$('no_components').hide();
				$('component_table').update($('component_table').innerHTML + json.html);
			}
		},
		onFailure: function (transport) {
			$('component_add_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function submitProjectSettings(url)
{
	_submitProjectDetails(url, 'project_settings');
}

function submitProjectInfo(url)
{
	_submitProjectDetails(url, 'project_info');
}

function _submitProjectDetails(url, form)
{
	var params = Form.serialize(form);
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		requestHeaders: {Accept: 'application/json'},
		parameters: params,
		onLoading: function (transport) {
			$(form + '_indicator').show();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				$(form + '_indicator').hide();
				failedMessage(json.error);
			}
			else
			{
				$(form + '_indicator').hide();
				$('project_name_span').update($('project_name').getValue());
				successMessage(json.title, json.message);
			}
		},
		onFailure: function (transport) {
			$(form + '_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function submitEditionSettings(url)
{
	_postFormWithJSONFeedback(url, 'edition_settings_form', 'edition_save_indicator');
}

function addEditionComponent(url, cid)
{
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		requestHeaders: {Accept: 'application/json'},
		onLoading: function (transport) {
			$('project_component_'+cid).fade();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				failedMessage(json.error);
			}
			else
			{
				$('edition_component_count').value++;
				$('edition_component_'+cid).appear();
				$('edition_no_components').hide();
			}
		},
		onFailure: function (transport, response) {
			$('project_component_'+cid).appear();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function removeEditionComponent(url, cid)
{
	new Ajax.Request(url, {
	asynchronous:true,
	method: "post",
	requestHeaders: {Accept: 'application/json'},
		onLoading: function (transport) {
			$('edition_component_'+cid).fade();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				failedMessage(json.error);
			}
			else
			{
				$('edition_component_count').value--;
				if ($('edition_component_count').value == 0)
				{
					$('edition_no_components').appear();
				}
				$('project_component_'+cid).show();
			}
		},
		onFailure: function (transport, response) {
			$('edition_component_'+cid).appear();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function updateComponent(url, cid)
{
	var params = Form.serialize('edit_component_' + cid + '_form');
		new Ajax.Request(url, {
		asynchronous:true,
		requestHeaders: {Accept: 'application/json'},
		method: "post",
		parameters: params,
		onLoading: function (transport) {
			$('component_'+cid+'_indicator').show();
			$('component_'+cid+'_icon').hide();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				failedMessage(json.error);
				$('component_'+cid+'_indicator').hide();
				$('component_'+cid+'_icon').show();
			}
			else
			{
				$('component_'+cid+'_name').update(json.newname);
				$('component_'+cid+'_indicator').hide();
				$('component_'+cid+'_icon').show();
				$('edit_component_' + cid).hide();
				$('show_component_' + cid).show();
			}
		},
		onFailure: function (transport) {
			$('component_'+cid+'_indicator').hide();
			$('component_'+cid+'_icon').show();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function updateMilestone(url, mid)
{
	var params = Form.serialize('edit_milestone_' + mid);
		new Ajax.Updater('milestone_span_' + mid, url, {
		asynchronous:true,
		method: "post",
		parameters: params,
		evalScripts: true,
		onLoading: function (transport) {
			$('milestone_'+mid+'_indicator').show();
		},
		onFailure: function (transport) {
			$('milestone_'+mid+'_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function deleteMilestone(url, mid)
{
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		requestHeaders: {Accept: 'application/json'},
		onLoading: function (transport) {
			$('milestone_'+mid+'_indicator').show();
		},
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json.failed)
			{
				$('milestone_'+mid+'_indicator').hide();
				failedMessage(json.error);
			}
			else
			{
				$('milestone_'+mid+'_indicator').hide();
				$('milestone_span_' + mid).remove();
				if ($('milestone_list').childElements().size() == 0)
				{
					$('no_milestones').show();
				}
			}
		},
		onFailure: function (transport) {
			$('milestone_'+mid+'_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function findDevs(url)
{
	var params = Form.serialize('find_dev_form');
	new Ajax.Updater('find_dev_results', url, {
		asynchronous:true,
		method: "post",
		parameters: params,
		onLoading: function (transport) {
			$('find_dev_indicator').show();
		},
		onComplete: function (transport) {
			$('find_dev_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		},
		onFailure: function (transport) {
			$('find_dev_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function updateFieldFromObject(object, field)
{
	if (object.id == 0)
	{
		$(field + '_name').hide();
		$('no_' + field).show();
	}
	else
	{
		$(field + '_name').update(object.name);
		$('no_' + field).hide();
		$(field + '_name').show();
	}
}

function setUser(url, field)
{
	new Ajax.Request(url, {
		method: 'post',
		requestHeaders: {Accept: 'application/json'},
		onLoading: function(transport) {
			$(field + '_spinning').show();
		},
		onSuccess: function(transport) {
			var json = transport.responseJSON;
			$(field + '_spinning').hide();
			$(field + '_change').hide();
			if (json.failed)
			{
				failedMessage(json.error);
			}
			else
			{
				updateFieldFromObject(json.field, field);
			}
		},
		onFailure: function(transport) {
			$(field + '_spinning').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function assignToProject(url, form_id)
{
	var params = Form.serialize(form_id);
	new Ajax.Updater('assignees_list', url, {
		asynchronous:true,
		method: "post",
		parameters: params,
		onLoading: function (transport) {
			$('assign_dev_indicator').show();
		},
		onComplete: function (transport) {
			$('assign_dev_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		},
		onFailure: function (transport) {
			$('assign_dev_indicator').hide();
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function removeFromProject(url, aid)
{
	new Ajax.Request(url, {
		asynchronous:true,
		method: "post",
		onSuccess: function (transport) {
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
			else
			{
				if ($('assignment_product_' + aid).parentNode.childElements().size() == 1)
				{
					$('assignment_product_' + aid).parentNode.remove();
				}
				$('assignment_product_' + aid).remove();
			}
		},
		onFailure: function (transport) {
			var json = transport.responseJSON;
			if (json && (json.failed || json.error))
			{
				failedMessage(json.error);
			}
		}
	});
}

function editEdition(url, edition_id)
{
	_updateDivWithJSONFeedback(url, 'backdrop_detail_content', 'backdrop_detail_indicator', false);
}

function backToEditProject(url, project_id)
{
	_updateDivWithJSONFeedback(url, 'backdrop_detail_content', 'backdrop_detail_indicator', false);
}