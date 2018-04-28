<?php
ob_start();
session_start();
require_once 'dbconnect.php';
// if session is not set this will redirect to login page
if( !isset($_SESSION['user']) ) {
header("Location: index.php");
exit;
}
// select loggedin users detail
$res=mysql_query("SELECT * FROM users WHERE userId=".$_SESSION['user']);
$userRow=mysql_fetch_array($res);
?>
<?php
$lolserver= "na1";
$id="$userRow[id]";
$summonername= "$userRow[userName]";
$name= "$userRow[userName]";
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Welcome - 
      <?php echo $userRow['userName']; ?> 
    </title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" type="text/css"  />
    <link rel="stylesheet" href="style.css" type="text/css" />
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.bundle.js" >
    </script>
    
    <style>
      /* header/copyright link */
      .link {
        text-decoration: none;
        color: #55acee;
        border-bottom: 2px dotted #55acee;
        transition: .3s;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        cursor: url(http://cur.cursors-4u.net/symbols/sym-1/sym46.cur), auto;
      }
      .link:hover {
        color: #2ecc71;
        border-bottom: 2px dotted #2ecc71;
      }
      /* start da css for da buttons */
      .btn2 {
        border-radius: 5px;
        padding: 5px 5px;
        font-size: 15px;
        text-decoration: none;
        margin: 2px;
        color: #fff;
        position: relative;
        display: inline-block;
      }
      .btn2:active {
        transform: translate(0px, 5px);
        -webkit-transform: translate(0px, 5px);
        box-shadow: 0px 1px 0px 0px;
      }
      .blue {
        background-color: #55acee;
        box-shadow: 0px 5px 0px 0px #3C93D5;
      }
      .blue:hover {
        background-color: #6FC6FF;
      }
      .green {
        background-color: #2ecc71;
        box-shadow: 0px 5px 0px 0px #15B358;
      }
      .green:hover {
        background-color: #48E68B;
      }
      .red {
        background-color: #e74c3c;
        box-shadow: 0px 5px 0px 0px #CE3323;
      }
      .red:hover {
        background-color: #FF6656;
      }
      .purple {
        background-color: #9b59b6;
        box-shadow: 0px 5px 0px 0px #82409D;
      }
      .purple:hover {
        background-color: #B573D0;
      }
      .orange {
        background-color: #e67e22;
        box-shadow: 0px 5px 0px 0px #CD6509;
      }
      .orange:hover {
        background-color: #FF983C;
      }
      .yellow {
        background-color: #f1c40f;
        box-shadow: 0px 5px 0px 0px #D8AB00;
      }
      .yellow:hover {
        background-color: #FFDE29;
      }
      /* copyright stuffs.. */
      p {
        text-align: center;
        color: #55acee;
        padding-top: 20px;
      }
      .profilepic {
        background-color: #23242b;
      }
      .borderImage{
        position:absolute;
        width:120px;
        height:120px;
        background-position:center bottom;
        background-repeat:no-repeat;
      }
      @font-face {
        font-family: Jura;
        src: url('NEWPOR_I.ttf');
      }
    </style>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation
            </span>
            <span class="icon-bar">
            </span>
            <span class="icon-bar">
            </span>
            <span class="icon-bar">
            </span>
          </button>
          <a class="navbar-brand" href="http://www.codingcage.com">masteryngame
          </a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active">
              <?php if($userRow['confirmed']==1){echo " confirmed (play now)";}else{echo "  <li><a href='#myDialog' data-toggle='modal' data-target='#myDialog'>(Confirm Here)</a></li>";} ?>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="glyphicon glyphicon-user">
                </span>&nbsp;Hi' 
                <?php echo $userRow['userName']; if($userRow['confirmed']==1){echo " (confirmed) ";}else{echo "  (not confimred)";}  ?>&nbsp;
                <span class="caret">
                </span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a href="logout.php?logout">
                    <span class="glyphicon glyphicon-log-out">
                    </span>&nbsp;Sign Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
    </nav> 
    <div id="wrapper">
      <div class="container">
        <div class="page-header">
          <h3>Ctestg
          </h3>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <h1>testdsfsdf
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div id="myDialog" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <i class="fa fa-times">
              </i>
            </button>
            <div class="modal-title" id="Dialog_title">
              <h4>Confirm your account : 
                <?php echo $userRow[userName]; ?>
              </h4>
            </div>
            <div id="my_doc_content">
            </div>
          </div>
          <div style = "">
            <br>
            <br>
 <br>
   
       
	
            <br>
            <br>
            <br>
            <div class="ProfileIcon" style ="position:absolute; left:20px; top:75px;">
              <br>
              <img src="//opgg-static.akamaized.net/images/profile_icons/profileIcon<?php echo $userRow[Icon];?>.jpg" class="ProfileImage" width="100px" height ="100px">
              <div class="borderImage" style="margin-left:-10px; margin-top:-110px; background-image: url(//opgg-static.akamaized.net/images/borders2/<?php echo strtolower($userRow[tier]);?>.png);">
              </div>
          
<div style =" background:white; position:absolute; top:110px; left:20px;">Level : 
                <?php echo $userRow[level]; ?>	
<br><button></button>
              </div>
<div style =" position:absolute; top:0px; left:120px;">
               

              </div>
            </div>
            <div style = "display: inline-block; margin-left:80px; margin-top:20px;">
              <script src="http://www.chartjs.org/dist/2.7.1/Chart.bundle.js">
              </script>
              <script src="http://www.chartjs.org/samples/latest/utils.js">
              </script>
              <script>
                var randomScalingFactor = function() {
                  return Math.round(Math.random() * 100);
                };
                var config = {
                  type: 'doughnut',
                  data: {
                    datasets: [{
                      data: [
                        <?php echo $userRow[losses];
                      ?>,
                      <?php echo $userRow[wins];
                      ?>
                      ],
                      backgroundColor: [
                      window.chartColors.red,
                      window.chartColors.blue
                      ],
                      label: 'Dataset 1'
                    }
                              ],
                    labels: [
                      "Losses",
                      "Wins"
                    ]
                  }
                  ,
                  options: {
                    responsive: true,
                    legend: {
                      display: false,
                    }
                    ,
                    title: {
                      display: false,
                      text: ''
                    }
                    ,
                    animation: {
                      animateScale: true,
                      animateRotate: true
                    }
                    ,
                    cutoutPercentage:60,
                    tooltips: {
                      enabled: false,
                      mode: 'single',
                    }
                  }
                };
                window.onload = function() {
                  var ctx = document.getElementById("chart-area").getContext("2d");
                  window.myDoughnut = new Chart(ctx, config);
                };
                document.getElementById('randomizeData').addEventListener('click', function() {
                  config.data.datasets.forEach(function(dataset) {
                    dataset.data = dataset.data.map(function() {
                      return randomScalingFactor();
                    }
                                                   );
                  }
                                              );
                  window.myDoughnut.update();
                }
                                                                         );
              </script>
              <div id="canvas-holder" style=" position:absolute; width:220px; left:70px; top:90px;">
                <div style = "position:absolute; left:90px; top:20px; font-size:160%;">
                  <p>
                    <b>
                      <?php echo round($userRow[wins]/($userRow[wins]+$userRow[losses])*100);?>%
                    </b>
                  </p>
                </div>
                <canvas id="chart-area"/>
              </div>
              <br>
            </div>
	    <div style = "position:absolute; left:250px; top:70px; width:400px; height:160px; background:gray;"></div>
	<div style = "position:absolute; left:250px; top:180px; width:400px; height:52px; background:black;"><button>Update(socket or ajax request)</button></div>
            
            <div style = "position:absolute; left:250px; top:55px;">
              <img src ="https://opgg-static.akamaized.net/images/medals/<?php echo strtolower($userRow[tier]);?>_1.png"" width="130px" height="130px">
            </div>
            <div style = "position:absolute; left:400px; top:80px; font-size:100%;">
            <p><b><?php echo $userRow[leagueName]; ?></b></p>
	    </div>
	    <div style = "position:absolute; left:400px; top:105px; font-size:100%;">
            <p><b><?php echo $userRow[tier]; echo " "; echo $userRow[rank];?></b></p>
	    </div>
	    <div style = "position:absolute; left:400px; top:125px; font-size:100%;">
            <p><b><?php echo $userRow[lp]; ?>LP</b></p>
	    </div>
	    <style>
div.split{
width:300px;
height:300px;
position:relative;}

div.split:after{
content:"";
position:absolute;
border-top:3px solid red;
  width:185px;
  transform: rotate(310deg);
  transform-origin: 0% 0%;
}
</style>
	    <div style = "position:absolute; left:610px; top:210px; font-size:150%;">
            </div>
<div style = "position:absolute; left:780px; top:100px; font-size:150%;"><button onclick="confirm()">Yes</button><br><br><button>no</button>
</div>


<script>
var rune ="<?php echo $userRow[lp]; ?>";
function confirm()
{

    
	
	//encrypt later make it an automated hash right now i need a new method to get confirmations
	if(rune=="54")
	{
		alert("Your account is now confirmed");
	}
	else
	{
		alert("Please change your rune page name to dsdf");

	}
 
}
</script>

	    
</div>
<div id="my_doc_content"></div>
<div class="modal-footer">
<button type="button" class="btn btn-default" data-dismiss="modal" onclick="rg.closeDialog('myDialog');">Close</button>
</div>
</div>
</div>
</div>
</div>
<script src="assets/jquery-1.11.3-jquery.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
</body>
</html>
<?php ob_end_flush(); ?>
