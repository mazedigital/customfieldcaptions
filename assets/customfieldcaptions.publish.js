/*-----------------------------------------------------------------------------
	Publish page
-----------------------------------------------------------------------------*/



(function ($) {

	$(document).ready(function() {
		// Add a input field for every field instance
		var $fields = $('#contents').find('div.field'),

			// Get JSON data for the fields
			data = Symphony.Context.get('custom_captions'),

			// Template to clone for each field instance
			caption_template = $('<span />').addClass('cc');

		if(data === undefined) return;

		$fields.each(function(i) {
			var $field = $(this),
				field_id = $field.attr('id').replace(/^field-/i, '');

			if(isNaN(parseInt(field_id)) || data[field_id].caption == undefined) return;

			template = caption_template.clone();
			template.html(data[field_id].caption);
			
			var fieldOnFocus = Symphony.Context.get('custom_captions_focus');
			if (!fieldOnFocus){
				$field.find('label > :input:last, label > .frame').before(template);
			} else {
				$field.find('label > :input:last, label > .frame').after(template);
				template.hide();
			}

		});

		$(document).on('focus','#contents div.field input, #contents div.field textarea',function(){
			$('.cc').hide();

			var $field = $(this).closest('div.field');
			var field_id = $field.attr('id').replace(/^field-/i, '');

			if(isNaN(parseInt(field_id)) || data[field_id].caption == undefined) return;

			var template = $field.find('.cc');

			$height = template[0].offsetHeight;
			template.show();
			template.css({'max-hieght': $height + 'px'});
		});

	});

})(jQuery);