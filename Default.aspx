<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ChangeRequest._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="row">
        <div class="col-lg-12 pr-5 ml-3">
            <div class="row">
                <div class="col-lg-12 border-fasQuoteOrangeWidth" style="background-color: #3c3c3c">
                    <h4 class="pb-2 pt-3 text-light"><i class="fa fa-home fa-lg my-0 " aria-hidden="true"></i>&nbsp;&nbsp;<span>Dashboard</span></h4>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="row mt-2">
                        <div class="col-2">
                            <div class="bg-light mb-2 mt-2 ml-3 mr-0">
                                <div class="card-body p-3 bg-primary text-center">
                                    <h1 class="card-title font-weight-bold">6</h1>
                                    <span class="small card-text">Open</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="bg-light mb-2 mt-2 ml-2 mr-1">
                                <div class="card-body p-3 bg-secondary text-center">
                                    <h1 class="card-title font-weight-bold">14</h1>
                                    <span class="small card-text">Pending</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="bg-light mb-2 mt-2 ml-1 mr-1">
                                <div class="card-body p-3 bg-danger text-center">
                                    <h1 class="card-title font-weight-bold">23</h1>
                                    <span class="small card-text">Approved</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="bg-light mb-2 mt-2 ml-1 mr-1">
                                <div class="card-body p-3 bg-success text-center">
                                    <h1 class="card-title font-weight-bold">2</h1>
                                    <span class="small card-text">Completed</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="bg-light mb-2 mt-2 ml-1 mr-2">
                                <div class="card-body p-3 bg-info text-center">
                                    <h1 class="card-title font-weight-bold">9</h1>
                                    <span class="small card-text">Rejected</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="bg-light mb-2 mt-2 ml-1 mr-2">
                                <div class="card-body p-3 bg-dark text-light text-center">
                                    <h1 class="card-title font-weight-bold">26</h1>
                                    <span class="small card-text">Archived</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-2 mb-2 ml-1">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body" style="overflow: scroll">
                                    <h5 class="card-title font-weight-bold">Recently Submitted CRs</h5>
                                    <hr />
                                    <div class="row pt-3">
                                        <div class="col-lg-12">
                                            <span class="card-text font-weight-bold">Update SharePoint Servers&nbsp;(<small class="card-text">Maintainance</small>)</span><br />
                                            <small class="card-text text-success pr-3">Low</small><br />
                                            <small class="card-text ">Aashoodeep Singh</small>

                                        </div>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col-lg-12">
                                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <hr />
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 p-2 pr-4 mb-2 mt-2">
                    <div id="my-calendar"></div>
                    <!-- show date events with a modal window -->
                    <script type="application/javascript">

                        $(document).ready(function () {
                            $("#my-calendar").zabuto_calendar({
                                modal: true,
                                ajax: {
                                    url: "JSON_Events/cr_Events.json",
                                    modal: true
                                },
                                language: "en",
                                cell_border: true,
                                today: true,
                                show_days: false,
                                weekstartson: 0,
                                nav_icon: {
                                    prev: '<i class="fa fa-chevron-circle-left"></i>',
                                    next: '<i class="fa fa-chevron-circle-right"></i>'
                                },
                                legend: [
                                    { type: "text", label: "Special event", badge: "00" },
                                    { type: "block", label: "Regular event", classname: "purple" },
                                    { type: "spacer" },
                                    { type: "text", label: "Bad" },
                                    { type: "list", list: ["grade-1", "grade-2", "grade-3", "grade-4"] },
                                    { type: "text", label: "Good" }
                                ],
                            });
                        });
                    </script>
                </div>
            </div>
            <div class="row ml-1 mr-1 mt-2">
                <div class="col-md-4">
                    <div id="barGraph"></div>
                </div>
                <div class="col-md-4">
                    <div id="pieChart"></div>
                </div>
                <div class="col-md-4">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active pr-2" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Submitted CRs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pr-3" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Approved CRs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pr-3" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Completed CRs</a>
                        </li>
                    </ul>
                    <div class="tab-content mt-2" id="myTabContent">
                        <div class="tab-pane border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane border fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <table class="table table-hover table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane border fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <p class="card-text p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                            <p class="card-text p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="Scripts/custom/crPieChart.js"></script>
    <script src="Scripts/custom/crBarGraph.js"></script>
</asp:Content>
