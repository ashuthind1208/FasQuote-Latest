<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CreateChangeRequest.aspx.cs" Inherits="ChangeRequest.CreateChangeRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <div class="row">
        <div class="col-md-12">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active pr-3" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link  pr-4" id="schedule-tab" data-toggle="tab" href="#schedule" role="tab" aria-controls="schedule" aria-selected="false">Schedule</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link  pr-3" id="impacts-tab" data-toggle="tab" href="#impacts" role="tab" aria-controls="impacts" aria-selected="false">Impacts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link pr-3" id="commplan-tab" data-toggle="tab" href="#commplan" role="tab" aria-controls="commplan" aria-selected="true">Communication Plan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link pr-4" id="attachments-tab" data-toggle="tab" href="#attachments" role="tab" aria-controls="attachments" aria-selected="false">Links & Attachments</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link pr-3" id="approval-tab" data-toggle="tab" href="#approval" role="tab" aria-controls="approval" aria-selected="false">Approval</a>
                </li>
            </ul>
            <div class="tab-content mt-2" id="myTabContent">
                <div class="tab-pane border show fade active p-3" id="description" role="tabpanel" aria-labelledby="description-tab">
                    <div class="row pl-2 pr-2 pt-3">
                        <div class="col-2">
                            <span>Change Name</span>
                        </div>
                        <div class="col-8">
                            <input class="form-control form-control-sm" type="text" />
                        </div>
                        <div class="col-2"></div>
                    </div>
                    <div class="row pl-2 pr-2 pt-3">
                        <div class="col-2"><span>Driver</span></div>
                        <div class="col-4">
                            <select class="form-control form-control-sm">
                                <option>Select</option>
                                <option>Upgrade</option>
                            </select>
                        </div>
                        <div class="col-6"></div>
                    </div>
                    <div class="row pl-2 pr-2 pt-3">
                        <div class="col-6"><span>Priority</span></div>
                        <div class="col-6"><span>Risk</span></div>
                    </div>
                    <div class="row pl-2 pr-2 pt-3">
                        <div class="col-6">
                            <input type="radio" name="rbPriority" value="emergency" />&nbsp;<span class="mr-3">Emergency</span>
                            <input type="radio" name="rbPriority" value="high" />&nbsp;<span class="mr-3">High</span>
                            <input type="radio" name="rbPriority" value="normal" />&nbsp;<span class="mr-3">Normal</span>
                            <input type="radio" name="rbPriority" value="low" />&nbsp;<span class="mr-3">Low</span>
                        </div>
                        <div class="col-6">
                            <input type="radio" name="rbRisk" value="emergency" />&nbsp;<span class="mr-3">Emergency</span>
                            <input type="radio" name="rbRisk" value="high" />&nbsp;<span class="mr-3">High</span>
                            <input type="radio" name="rbRisk" value="normal" />&nbsp;<span class="mr-3">Normal</span>
                            <input type="radio" name="rbRisk" value="low" />&nbsp;<span class="mr-3">Low</span>
                        </div>
                    </div>
                    <div class="row pl-2 pr-2 pt-3">
                        <div class="col-12"><span>Details</span></div>
                    </div>
                    <div class="row pl-2 pr-2 pt-3">
                        <div class="col-10">
                            <textarea rows="8" class="form-control form-control-sm"></textarea>
                        </div>
                    </div>
                    <div class="row pl-2 pr-2 pt-3">
                        <div class="col-2"><span>System</span></div>
                        <div class="col-3">
                            <select class="form-control form-control-sm">
                                <option>Select</option>
                                <option>AD</option>
                                <option>Billback</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <input class="form-control form-control-sm" type="text" />
                        </div>
                    </div>
                    <div class="row pl-2 pr-2 pt-3">
                        <div class="col-12"><span>What other applications reside on the server(s) impacted by this change</span></div>
                    </div>
                    <div class="row pl-2 pr-2 pt-3">
                        <div class="col-10">
                            <input class="form-control form-control-sm" type="text" />
                        </div>
                    </div>


                </div>
                <div class="tab-pane border fade" id="schedule" role="tabpanel" aria-labelledby="schedule-tab">
                    <div class="row">
                        <div class="col-2"><span>Planned Date & Time</span></div>
                        <div class="col-3">
                            <input class="form-control form-control-sm" type="text" />
                        </div>
                        <div class="col-3">
                            <input class="form-control form-control-sm" type="text" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <input type="radio" name="rbPlannedDate" value="flexible" />&nbsp;<span>Flexible</span>
                            <input type="radio" name="rbPlannedDate" value="hard" />&nbsp;<span>Hard</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12"><span>Downtime/Outage</span></div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <input type="radio" name="rbDowntime" value="Yes" />&nbsp;<span>Yes</span>
                            <input type="radio" name="rbDowntime" value="No" />&nbsp;<span>No</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <span>From</span>
                        </div>
                        <div class="col-2">
                            <span>To</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <input class="form-control form-control-sm" type="text" />
                        </div>
                        <div class="col-2">
                            <input class="form-control form-control-sm" type="text" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <span>Deadline</span>
                        </div>
                        <div class="col-2">
                            <input class="form-control form-control-sm" type="text" />
                        </div>
                    </div>
                </div>
                <div class="tab-pane border fade" id="impacts" role="tabpanel" aria-labelledby="impacts-tab">
                    <div class="row">
                        <div class="col-4">
                            <span>Other Services Impacted</span>
                        </div>
                        <div class="col-4">
                            <span>Office Locations Impacted</span>
                        </div>
                        <div class="col-4">
                            <span>Users Impacted</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <select size="4" multiple class="form-control form-control-sm">
                                <option>Select</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>AD</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>Billback</option>
                            </select>
                        </div>
                        <div class="col-4">
                            <select size="4" multiple class="form-control form-control-sm">
                                <option>Select</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>AD</option>
                                <option>AD</option>
                                <option>Billback</option>
                                <option>Billback</option>
                            </select>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12">
                                    <input type="radio" name="rbuserImpacted" value="Yes" />&nbsp;<span>Yes</span>
                                    <input type="radio" name="rbuserImpacted" value="No" />&nbsp;<span>No</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <span>How Many</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-5">
                                    <input class="form-control form-control-sm" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                            <span>Impact Details</span>
                        </div>
                        <div class="col-5">
                            <span>Backout Plan</span>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-5">
                            <textarea cols="50" rows="8"></textarea>
                        </div>
                        <div class="col-6">
                            <textarea cols="55" rows="8"></textarea>
                        </div>

                    </div>
                </div>
                <div class="tab-pane border" id="commplan" role="tabpanel" aria-labelledby="commplan-tab">
                    <div class="row">
                        <div class="col-4">
                            <span>Communication Plan</span>
                        </div>
                        <div class="col-8"><span>Media</span></div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <input type="radio" name="rbPCommPlan" value="Yes" />&nbsp;<span>Yes</span>
                            <input type="radio" name="rbComPlan" value="No" />&nbsp;<span>No</span>
                        </div>
                        <div class="col-4">
                            <input type="checkbox" name="chkMedia" value="Email" />&nbsp;<span>Email</span>
                            <input type="checkbox" name="chkMedia" value="Printed Material" />&nbsp;<span>Printed Material</span>
                            <input type="checkbox" name="chkMedia" value="Voice Mail" />&nbsp;<span>Voice Mail</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <span>Audience</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <input class="form-control form-control-sm" type="text" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <span>Affected process/procedure:</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <input type="radio" name="rbAffectedProcess" value="Yes" />&nbsp;<span>Yes</span>
                            <input type="radio" name="rbAffectedProcess" value="No" />&nbsp;<span>No</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <span>If yes, then indicate process/procedure name/process to be informed</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <textarea cols="70" rows="8"></textarea>
                        </div>
                    </div>

                </div>
                <div class="tab-pane border fade" id="attachments" role="tabpanel" aria-labelledby="attachments-tab">
                    <div class="row">
                        <div class="col-4">
                            <input type="file" class="form-control form-control-sm" />
                        </div>
                        <div class="col-2">
                            <input type="button" /></div>
                        <div class="col-6"></div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <select size="10"></select></div>
                        <div class="col-10">
                            <textarea id="mytextarea" name="linksTextarea"></textarea></div>
                    </div>
                </div>
                <div class="tab-pane border fade" id="approval" role="tabpanel" aria-labelledby="approval-tab">
                    <div class="row">
                        <div class="col-2">Reviewer</div>
                        <div class="col-10">Change Request Update</div>
                    </div>
                    <div class="row">
                        <div class="col-2">                            <select size="4" multiple class="form-control form-control-sm">
                                <option>Select</option>
                                <option>Greg</option>
                                <option>Barb</option>
                                <option>Peter</option>

                            </select></div>
                        <div class="col-10"><textarea rows="10" cols="70"></textarea></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     <!-- Back Next Buttons Starts -->
    <div class="row mt-3 mb-5" style="background-color:#cccccc;">
        <div class="col-lg-6 d-flex  float-left">
            <a id="lnkBack" href="#" style="width: 180px" class="backNextButton"><%--<i class="fa fa-chevron-left fa-md"></i>&nbsp;&nbsp;--%>Back</a>
        </div>
        <div class="col-lg-6 d-flex justify-content-end ">
            <a href="#" id="lnkNext" style="width: 180px" class="backNextButton">Next<%--&nbsp;&nbsp;<i class="fa fa-chevron-right fa-md"></i>--%></a>
            <a href="#" id="lnkFinish" style="width: 180px; display: none;" class="backNextButton">Finish & save</a>

        </div>
    </div>
    <!-- Back Next Buttons Ends -->
</asp:Content>
