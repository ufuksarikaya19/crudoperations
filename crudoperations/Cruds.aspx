<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Cruds.aspx.cs" Inherits="crudoperations.Cruds" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="Scripts/crudsJs.js"></script>
    <script type="text/javascript" src="Scripts/notify.min.js"></script>
    <link type="text/css" href="Content/general.css" rel="stylesheet" />

    <div class="modal fade" id="ModalSelectData" tabindex="-1" role="dialog" aria-labelledby="ModalSelectDataLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Kayıtlar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div id="gvDatas"></div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onclick="openNewUserModal()" class="btn btn-primary">Yeni User</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="ModalInsertOrUpdate" tabindex="-1" role="dialog" aria-labelledby="ModalInsertOrUpdateLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <label id="lblinsertorUpdate" class="modal-title"></label>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                 
                        <div class="form-group">
                            <label for="txtId" class="col-form-label">Id:</label>
                            <input type="text" disabled class="form-control" id="txtId" />
                        </div>
                        <div class="form-group">
                            <label for="txtName" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="txtName" />
                        </div>
                        <div class="form-group">
                            <label for="txtLastName" class="col-form-label">LastName:</label>
                            <input type="text" class="form-control" id="txtLastName" />
                        </div>
                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="saveBtn" onclick="saveUser(0)" class="btn btn-primary">Save</button>
                    <button type="button" id="updateBtn" onclick="saveUser(1)" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>


</asp:Content>


