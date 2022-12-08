


$(document).ready(function () {

    $('#ModalSelectData').modal();
    getUserList();
});

function openNewUserModal() {
    clearTexts();
    $('#lblinsertorUpdate').text('Kayıt Ekle');
    $('#saveBtn').removeClass('hidden');
    $('#updateBtn').addClass('hidden');
    $('#ModalInsertOrUpdate').modal();
}

function saveUser(type) {
    let name = $('#txtName').val();
    let lastname = $('#txtLastName').val();
    let id = $('#txtId').val();
    try {
        $.ajax({
            type: "POST",
            url: "Cruds.aspx/SaveUser",
            data: JSON.stringify({ pGuid: id, pName: name, pLastName: lastname, pType: type }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var retVal = jQuery.parseJSON(data.d);
                if (retVal === "OK") {
                    if (type === 0) alert('insert başarılı');
                    else alert('Update başarılı');
                    getUserList();
                }
                $('#ModalInsertOrUpdate').modal('toggle');
            }
        });
    }

    catch (error) {
        alert(error);
    }

}
function clearTexts() {
    $('#txtId').val('');
    $('#txtName').val('');
    $('#txtLastName').val('');
}

function updateUser(userGuid) {
    $.ajax({
        type: "POST",
        url: "Cruds.aspx/GetUserItem",
        data: JSON.stringify({ id: userGuid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var retVal = jQuery.parseJSON(data.d);
            $('#lblinsertorUpdate').text('Kayıt Düzenle');
            $('#saveBtn').addClass('hidden');
            $('#updateBtn').removeClass('hidden');

            clearTexts();


            $('#txtId').val(retVal.Id);
            $('#txtName').val(retVal.Name);
            $('#txtLastName').val(retVal.LastName);

            $('#ModalInsertOrUpdate').modal();
        }
    });
}

function deleteUser(userGuid) {
    $.ajax({
        type: "POST",
        url: "Cruds.aspx/DeleteUser",
        data: JSON.stringify({ id: userGuid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var retVal = jQuery.parseJSON(data.d);
            if (retVal === "OK") {
                alert('Silme başarılı');
                getUserList();
            }
        }
    });
}


function getUserList() {
    $('#gvDatas').empty();
    try {
        $.ajax({
            type: "POST",
            url: "Cruds.aspx/GetUsers",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d !== "[]") {
                    var ret = data.d;
                    var datas = JSON.parse(ret);
                    var text = '';
                    text += '<div class="Table Table-Rounded">';
                    text += '   <div class="Heading HeadingBg">';
                    text += '       <div class="Cell text-center"><p>Id</p></div>';
                    text += '       <div class="Cell text-center"><p>Name</p></div>';
                    text += '       <div class="Cell text-center"><p>LastName</p></div>';
                    text += '       <div class="Cell text-center"><p></p></div>';
                    text += '       <div class="Cell text-center"><p></p></div>';
                    text += '   </div>';
                    var i = 0;
                    $.each(datas, function () {
                        text += '   <div class="Row ' + ((i % 2 === 0) ? "RowBg" : "RowBgTwo") + '">';
                        text += '      <div class="Cell ws-normal m-wb-break-all t-wb-break-all text-center"><p>' + this['Id'] + '</p></div>';
                        text += '      <div class="Cell ws-normal m-wb-break-all t-wb-break-all text-center"><p>' + this['Name'] + '</p></div>';
                        text += '      <div class="Cell ws-normal m-wb-break-all t-wb-break-all text-center"><p>' + this['LastName'] + '</p></div>';
                        text += '      <div class="Cell text-center"><input type="button" value="Güncelle" onclick="updateUser(\'' + this['Id'] + '\');" /></div>';
                        text += '      <div class="Cell text-center"><input type="button" value="Sil" onclick="deleteUser(\'' + this['Id'] + '\');" /></div>';
                        text += '   </div>';
                        i++;
                    });
                    text += '</div>';
                    $('#gvDatas').append(text);
                }
            }
        });
    }

    catch (error) {
        alert(error);
    }
}
