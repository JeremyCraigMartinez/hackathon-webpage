$(document).ready(function () {
    
    function updateElementIndex(el, prefix, ndx) {
        var id_regex = new RegExp('(' + prefix + '-\\d+-)');
        var replacement = prefix + '-' + ndx + '-';
        if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex,
        replacement));
        if (el.id) el.id = el.id.replace(id_regex, replacement);
        if (el.name) el.name = el.name.replace(id_regex, replacement);
    }

    
    var initial_flag = true;
    function addForm(btn, prefix, class_name) {
        var formCount = parseInt($('#id_' + prefix + '-TOTAL_FORMS').val());

        console.log(class_name);
        console.log($("."+class_name));

        if ($("."+class_name).first().hasClass('hidden')){ //enter if nothing is showing
            console.log("here")
            $("."+class_name).first().removeClass("hidden");
            $("."+class_name+" input").first().val("True");
        }

        else {
            var old_last = $("."+class_name).last();
            var form = $("."+class_name).last().clone(true);// Last item1
            
            // BAD DESIGN - dependent on the id of the last input in the div
            // need to change to more backwards compatible
            var last_id = $(form).find("input").last().attr("id");// Grab first input id (it contains the important part: the number)

            form.find('input').val(''); // clear all previous values
            form.find('select').val(''); // clear all previous values

            var ids = []

            var id = (+(last_id.split("-")[1])+1) // Grab the number and increase it.
            $.each(form.find('input, select'), function (index, item) {// Change id of all inputs inside the cloned element.
                var new_id = $(item).attr("id").replace("id_"+prefix+"-" + last_id.split("-")[1], "id_"+prefix+"-" + id);// Replace ids with the new number.
                ids.push(new_id);

                var new_name = $(item).attr("name").replace(prefix+"-" + last_id.split("-")[1], prefix+"-" + id);

                $(item).attr("id",new_id);// Asign the new id to the inputs. You'll have to do more or less the same to the labels if you like.
                

                $(item).attr("name",new_name);
            });

            $(form).removeAttr('id').hide().insertAfter($(old_last)).slideDown(300);// Insert after the last item1 element. Otherwise it'll insert after all elements with class .item1

            $("#id_" + prefix + "-TOTAL_FORMS").val(formCount + 1);

/*
            console.log($(form).first());
            if ($(form).first().hasClass('flag_input')){
                console.log($(form).first());
                $(form).first().remove();
            }
 */
            if ($(form).find("input").first().hasClass("flag_input")){
                $(form).find("input").first().remove();
            }


            for (each_id in ids){
                $("#"+ids[each_id]).removeClass("alert-block alert-danger");
            }
        }
        initial_flag = false;
        return false;
    }

    var initial_CUR_flag = true;
    $("#add1").click(function () {
        if (initial_CUR_flag == true){
            initial_CUR_flag = false;
            initial_flag = true;
        }
        return addForm(this, "cur", "item1");
    });
    var initial_EX_flag = true;
    $("#add2").click(function () {
        if (initial_EX_flag == true){
            initial_EX_flag = false;
            initial_flag = true;
        }
        return addForm(this, "ex", "item2");
    });
});