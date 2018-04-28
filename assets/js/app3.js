//GLOBAL VARIABLES
var SOCKET = null;
var watchingGame = 0;
var watchingGameID = 0;
var spinArray = ['animation900', 'animation1080'];
var gameJoin = 0;
var tradeInterval;

var joinItems = [];

var Gapa01;
var Gapa02;

var invRefreshTime = 0;

//JACKPOT
var myJackpotData;
var deletedFirst = 0;
//JACKPOT


//CHAT FUNCTIONS
var hideLink = false;

//CHAT FUNCTIONS

$(document).ready(function() {
    connect();


    //JACKPOT
    $('.round').on('click', '.time', function() {
        var $closest = $(this).closest('.bet').find('.items');
        if($closest.hasClass('opened'))
        {
            $closest.slideUp();
            $closest.removeClass('opened');
        }
        else
        {
            $closest.slideDown();
            $closest.addClass('opened');
        }
    });

    if(PAGE == 'jackpot') createJackpotData();

    var itemsData = [];
    itemsData.push({
        'id': 1992928238,
        'price': 21.9,
        'name': 'Ak-47 | Case Hardened',
        'icon_url': '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhhwszHeDFH6OO6nYeDg8j4MqnWkyUIusYpjriToImhjQHg_EZkN2r0cY-RdAI3Z1jT-gS3kO_njZW_7pjB1zI97T2FIK3X'
    });
    itemsData.push({
        'id': 1992928238,
        'price': 21.9,
        'name': 'Ak-47 | Case Hardened',
        'icon_url': '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhhwszHeDFH6OO6nYeDg8j4MqnWkyUIusYpjriToImhjQHg_EZkN2r0cY-RdAI3Z1jT-gS3kO_njZW_7pjB1zI97T2FIK3X'
    });
    itemsData.push({
        'id': 1992928238,
        'price': 21.9,
        'name': 'Ak-47 | Case Hardened',
        'icon_url': '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhhwszHeDFH6OO6nYeDg8j4MqnWkyUIusYpjriToImhjQHg_EZkN2r0cY-RdAI3Z1jT-gS3kO_njZW_7pjB1zI97T2FIK3X'
    });
    itemsData.push({
        'id': 1992928238,
        'price': 21.9,
        'name': 'Ak-47 | Case Hardened',
        'icon_url': '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhhwszHeDFH6OO6nYeDg8j4MqnWkyUIusYpjriToImhjQHg_EZkN2r0cY-RdAI3Z1jT-gS3kO_njZW_7pjB1zI97T2FIK3X'
    });
    addJackpotBet({        'avatar': 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/31/31592af48ecf8e689eac507063ef3893055daaa0_full.jpg',
        'name': 'Echo',
        'steamid': 829192928291918,
        'level': 102}, itemsData);
    //addJackpotBet(34, 'Duzbee');
    //addJackpotBet(12, 'NimeniAltu');

    //BOT-MESSAGE
    if(getCookie('hide') == '')
    {
        setCookie('hide', 'false');
        hideLink = false;
    }
    else if(getCookie('hide') == 'true')
    {
        hideLink = true;
    }
    else if(getCookie('hide') == 'false')
    {
        hideLink == false;
    }

    $('#coinflip').on('hidden.bs.modal', function () {
      watchingGameID = 0;
      wachingGame = 0;
      $('#coin').remove();
    });

    $('#CFjoinGame').on('hidden.bs.modal', function () {
        $('.container1').empty();
        setTimeout(function() {
            for(var i in joinItems)
            {
                $('.container1').append('<div class="col-xs-4 col-sm-2 col-item" data-itemid="' + joinItems[i].id + '" data-amount="' + joinItems[i].pret + '"><div class="item"><img src="https://steamcommunity-a.akamaihd.net/economy/image/' + joinItems[i].url + '/120fx100f" alt="" class="img-responsive" rel="nofollow"><div class="info"><div class="price"><span>$' + joinItems[i].pret + '</span></div><div class="name">' + joinItems[i].name + '</div></div></div></div>');
            }
        }, 500);
    });

    $('#theMessage').val('');

    $('#sendMsg').click(function() {
        var mesaj = $('#theMessage').val();
        $('#theMessage').val('');

        sendMessage(mesaj.replace(/<(?:.|\n)*?>/gm, ''));
    });

    $('#createCF').click(function() {
        $('#CFcreate').modal();
    });

    $('#mChatRules').click(function() {
        $('#chatRules').modal();
    });

    $('#settingsMenu').click(function() {
        $('#settingsModal').modal();
    });

    $('#rclose').click(function() {
        $('#chatRules').modal('hide');
    });

	$('#button1').click(function() {
        var td = $('#input1').val();
        if(!td.includes('://') || td == '')
        {
            $.notify('Error: Tradelink cannot be empty!', 'success');
        }
        else
        {
            $.ajax({
                url: 'setTradelink.php?link=' + td
            });
            $('#tradeLink').modal('hide');
        }
	});

    $("#jackpotButton").click(function() {
        wantJInventory();
    });

    $('#jackpotButton').click(function() {
        $('#jJackpot').modal();
    });

    $('#showTradeURL').click(function() {
        $('#tradeLink').modal();
    });

    $('#hidetheLink').click(function() {
        $('#hidetheLink').attr(this.checked);
    });

    $.ajaxSetup({ cache: false });
    $('#invRefresh').click(function() {
        $('.container1').empty();
        wantInventory();
    });

    $.ajaxSetup({ cache: false });
    $('#invRefresh2').click(function() {
        $('.container2').empty();
        showCreateInv();
    });

    $.ajaxSetup({ cache: false });
    $('#invRefresh3').click(function() {
        $('.container3').empty();
        wantJInventory();
    });

    if(getCookie('hide') == 'true')
    {
        $('#hidetheLink').attr('checked', 'true');
    }
    else if(getCookie('hide') == 'false')
    {
        $('#hidetheLink').attr('checked', 'false');
    }

    $('#submitSettings').click(function() {
        if(($('#hidetheLink').prop('checked')) == true) {
            setCookie('hide', 'true');
            $('#settingsModal').modal('hide');
            hideLink = true;
            
        }
        else
        {
            setCookie('hide', 'false');
            $('#settingsModal').modal('hide');
            hideLink = false;
        }
    });

    $('#Message').submit(function () {
     return false;
    });
});

function sendMessage(msg)
{
    if(SOCKET)
    {
        var utilizator = getCookie('hash');
        SOCKET.emit('nMsg', {
            message: msg,
            user: utilizator,
            hide: hideLink
        });
    }
}


function createJackpotData()
{
    var ctx = $('#jackpot')[0].getContext("2d");
    myJackpotData = new Chart(ctx, JackpotEmpty);
}

var JackpotColors = {
    red: '#FF0000',
    orange: '#FF9D00',
    yellow: '#FFF700',
    green: '#1AFF00',
    blue: '#147AFF',
    purple: '#C414FF',
    aqua: '#14FFE4',
    lightgreen: '#99FF14',
    roses: '#D55AED',
    unnamedcolor: '#CC3798',
    brown: '#965821',
    darkyellow: '#A8A142',
    greencacaniu: '#A1ED8E',
    bluespalacit: '#37DBB5'
};
var colorNames = Object.keys(JackpotColors);
var JackpotEmpty = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [100],
            backgroundColor: ['rgb(219,219,219)']
        }],
        labels: ['No-one']
    },
    options: {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        },
        cutoutPercentage: 60
    }
};


function addJackpotBet(playerData, itemsData)
{
    var amount = playerData.amount;
    var name = playerData.name;
    var avatar = playerData.avatar;
    var steamid = playerData.steamid;
    var level = playerData.level;
    var totalItems = 0;
    var priceItems = 0;
    var itemsSet = "";
    var verticalSet = "";

    if(JackpotEmpty.data.labels[0] == 'No-one')
    {
        JackpotEmpty.data.labels.splice(0, 1);
        JackpotEmpty.data.datasets[0].data.splice(0, 1);
        JackpotEmpty.data.datasets[0].backgroundColor.splice(0, 1);
    }

    var colorName = colorNames[JackpotEmpty.data.datasets[0].data.length % colorNames.length];;
    var newColor = JackpotColors[colorName];

    for(var i in itemsData)
    {

        totalItems++;
        priceItems += parseFloat(itemsData[i].price);
        itemsSet += '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-4" data-price="' + parseFloat(itemsData[i].price) + '"><div class="item"><img src="https://steamcommunity-a.akamaihd.net/economy/image/' + itemsData[i].icon_url + '/120fx100f" alt="" class="img-responsive" rel="nofollow"><div class="price">$' + parseFloat(itemsData[i].price) + '</div><div class="name">' + itemsData[i].name + '</div></div></div>';
        verticalSet += '<div class="item-wrapper WinnerFadeIn" style="display: block;"><div class="item" data-price="' + parseFloat(itemsData[i].price) + '"><img src="https://steamcommunity-a.akamaihd.net/economy/image/' + itemsData[i].icon_url +'/120fx100f" alt="" class="img-responsive" rel="nofollow"><div class="price">$' + parseFloat(itemsData[i].price) + '</div><div class="name">' + itemsData[i].name + '</div></div></div>'
    }

    $('.round').prepend('<div class="bet WinnerFadeIn" style="display: block;"><table class="table-bet"><tbody><tr><td class="level hidden-xs hidden-sm"><span>lvl ' + level + '</span></td><td class="icon"><a href="https://steamcommunity.com/profiles/' + steamid + '" target="_blank" title="Steam profile" rel="nofollow"><img src="' + avatar + '" alt="Icon" rel="nofollow" style="border-bottom:3px solid ' + newColor + ';"></a></td><td><a href="https://steamcommunity.com/profiles/' + steamid + '" target="_blank" title="Steam profile" class="name" rel="nofollow">' + name + '</a> deposited ' + totalItems + ' skins valued at $' + priceItems + '</td><td class="time"><i class="fa fa-arrow-down"></i></td></tr></tbody></table><div class="items">' + itemsSet + '<div class="clearfix"></div></div></div>');
    $('#round-items').prepend(verticalSet);

    JackpotEmpty.data.labels.push(name + ' - $' + priceItems);

    JackpotEmpty.data.datasets.forEach(function(dataset) {
        dataset.data.push(priceItems);
        dataset.backgroundColor.push(newColor);
    });

    myJackpotData.update();
}


function onMessage(msg)
{
    var m = msg;
    console.log(m);
    if(m.type == "watchCF")
    {
        if(m.id == watchingGameID)
        {
            $('#coinflip #coin-flip-cont #coin').remove();
            $('#coinflip #coin-flip-cont').prepend('<div id="coin"></div>');

            var P1Skins = "";
            var P2Skins = "";

            var gameid = m.id;

            var timer11 = m.timer11;
            var timer01 = m.timer;
            var ttimer11 = m.ttimer11;

            var hash = m.hash;
            var secret = m.secret;
            var cChance;
            var pChance;

            var cname = m.cname;
            var cavatar = m.cavatar;
            var cskinsurl = m.cskinsurl.split('/');
            var cskinsnames = m.cskinsnames.split('/');
            var cskinsprices = m.cskinsprices.split('/');
            var cskins = m.cskins;
            var ctp = m.ctp;
            var pname = m.pname;
            var pavatar = m.pavatar;
            var pskinsurl = m.pskinsurl.split('/');
            var pskinsnames = m.pskinsnames.split('/');
            var pskinsprices = m.pskinsprices.split('/');
            var pskins = m.pskins;
            var ptp = m.ptp;
            var winner = m.winner;

            $('.gameSecrettt').text('');
            $('.gameSecrettt').attr('title', '');


            if(ptp == '0')
            {
                ptp = '0.00';
            }

            if(winner == '1' || winner == '2' || timer11 == '1')
            {
                var total = ctp + ptp;
                cChance = parseFloat((ctp / total) * 100).toFixed(2);
                pChance = parseFloat((ptp / total) * 100).toFixed(2);
                $('.P2-tItems').text(pskins);
                $('#ptp').text(' ' + ptp);
            }
            else if(winner == '-1')
            {
                cChance = '50.00';
                pChance = '50.00';
                $('.P2-tItems').text('0');
            }

            $('#coinflip-watch-gameid').text('Game #' + gameid);
            $('.gameHashh').text(textAbstract(hash, 20));
            $('#P1name').html('<span style="color: black; text-decoration: none;">' + cname + '</span>');
            $('#P1avatar').attr('src', cavatar);
            $('#P1avatar').attr('style', 'width: 130px');
            $('.P1-tItems').text(cskins);
            $('.P1chance').text(cChance + '%');
            $('#ctp').text(' ' + ctp);
            for(var i = 0; i < cskins; i++)
            {
                P1Skins += '<div class="row row-item"><div class="col-xs-12 col-md-3 col-item"><img src="https://steamcommunity-a.akamaihd.net/economy/image/' + cskinsurl[i] + '/120fx100f" alt="" class="img-responsive"></div><div class="col-xs-12 col-md-6 col-name">' + cskinsnames[i] + '</div> <div class="col-xs-12 col-md-3 col-amount"><i class="fa fa-dollar"></i> ' + cskinsprices[i] + '</div></div>';
            }
            $('#ItemsP1').html(P1Skins);

            if(!pname && timer11 == '0')
            {
                $('#P2name').html('<span style="color: black; text-decoration: none;">Waiting...</span>');
            }
            else
            {
                $('#P2name').html('<span style="color: black; text-decoration: none;">' + pname + '</span>');
            }
            if(!pavatar && timer11 == '0')
            {
                $('#P2avatar').attr('src', 'https://bubble-at4vegnhqpi2zkmsnjd.stackpathdns.com/img/nophoto_user.png');
                $('#P2avatar').attr('style', 'width: 130px');
                $('.P2chance').text('50.00%');
                $('.P2-tItems').text('0');
                $('#ptp').text(' 0.00');
            }
            else
            {
                $('#P2avatar').attr('src', pavatar);
                $('#P2avatar').attr('style', 'width: 130px');
                $('.P2chance').text(pChance + '%');
            }

            if(pname && winner == -1 && timer11 == '0')
            {
                P2Skins = '<br><br><span style="text-align: center;">User joining ...</span>';
                $("#coinflip #coin").countdown360({
                    radius      : 50,
                    seconds     : timer01,
                    fontColor   : '#FFFFFF',
                    fillStyle   : '#fe634a',
                    strokeStyle : '#dc393c',
                    autostart   : false,
                    label       : false,
                    smooth      : true,
                    onComplete  : function() {
                        $('#coinflip #coin').remove();
                    }
                }).start();
            }
            else
            {
                for(var i = 0; i < pskins; i++)
                {
                    P2Skins += '<div class="row row-item"><div class="col-xs-12 col-md-3 col-item"><img title="' + pskinsnames[i] + ' - $' + pskinsprices[i] + '" src="https://steamcommunity-a.akamaihd.net/economy/image/' + pskinsurl[i] + '/120fx100f" alt="" class="img-responsive"></div><div class="col-xs-12 col-md-6 col-name">' + pskinsnames[i] + '</div> <div class="col-xs-12 col-md-3 col-amount"><i class="fa fa-dollar"></i> ' + pskinsprices[i] + '</div></div>';
                }
            }

            if(timer11 == '1' && winner == -1)
            {
                $("#coinflip #coin").countdown360({
                    radius      : 50,
                    seconds     : ttimer11,
                    fontColor   : '#FFFFFF',
                    autostart   : false,
                    label       : false,
                    smooth      : true,
                    onComplete  : function () {
                        $('#coinflip #coin').empty();
                    }
                }).start();
            }

            $('#ItemsP2').html(P2Skins);

            if(winner != -1)
            {
                $('#coin').remove();
                $("#coinflip #coin-flip-cont").prepend('<div id="coin"><div class="front"></div><div class="back"></div></div>');
                watchingGame = 0;
                watchingGameID = 0;

                setTimeout(function(){
                    $('#coinflip .front').css('background-image', 'url('+cavatar+')')
                    $('#coinflip .back').css('background-image', 'url('+pavatar+')');
                    $('#coinflip #coin').addClass(getSpin(winner));
                    setTimeout(function() {
                            $('#coinflip .gameSecrettt').addClass('animated fadeIn');
                            $('#coinflip .gameSecrettt').html('Secret: ' + secret + '<br><a href="fair.php> <i class="fa fa-question-circle" title="Validate round"></i></a>');
                            $('#coinflip .gameSecrettt').attr('title', secret);
                    }, 3000);
                }, 50);
            }
        }
    }
    else if(m.type == 'msg')
    {
        if(m.tip == 'error') 
        {
            $.notify(m.msg, 'success');
        }
        else if(m.tip == 'alert')
        {
            $.notify(m.msg, 'success');
        }
        else if(m.tip == 'Inv')
        {
            var seconds = m.seconds;

            var InvTimer = setInterval(function() {
                if(seconds != 0)
                {
                    seconds = seconds - 1;
                    $('#invRefresh').html('Could refresh in ' + seconds + ' seconds.');
                    $('#invRefresh').attr('disabled', 'true');
                }
                else
                {
                    $('#invRefresh').html('<i class="fa fa-refresh"></i> Refresh inventory');
                    $('#invRefresh').removeAttr('disabled');
                    clearInterval(InvTimer);
                }
            }, 1000);
        }
        else if(m.tip == 'Inv2')
        {
            var seconds = m.seconds;

            var InvTimer = setInterval(function() {
                if(seconds != 0)
                {
                    seconds = seconds - 1;
                    $('#invRefresh2').html('Could refresh in ' + seconds + ' seconds.');
                    $('#invRefresh2').attr('disabled', 'true');
                }
                else
                {
                    $('#invRefresh2').html('<i class="fa fa-refresh"></i> Refresh inventory');
                    $('#invRefresh2').removeAttr('disabled');
                    clearInterval(InvTimer);
                }
            }, 1000);
        }
        else if(m.tip == 'jInv')
        {
            var seconds = m.seconds;

            var InvTimer = setInterval(function() {
                if(seconds != 0)
                {
                    seconds = seconds - 1;
                    $('#invRefresh3').html('Could refresh in ' + seconds + ' seconds.');
                    $('#invRefresh3').attr('disabled', 'true');
                }
                else
                {
                    $('#invRefresh3').html('<i class="fa fa-refresh"></i> Refresh inventory');
                    $('#invRefresh3').removeAttr('disabled');
                    clearInterval(InvTimer);
                }
            }, 1000);
        }
    }
    else if(m.type == 'addGame')
    {
        addGame(m.games);
    }
    else if(m.type == 'editGame')
    {
        editGame(m.games);
    }
    else if(m.type == 'removeGame')
    {
    	$('#game-'+m.id).removeClass('zoomIn');
    	$('#game-'+m.id).addClass('zoomOut');
    	setTimeout(function() {
        	$('#game-'+m.id).remove();
    	}, 300);
    }
    else if(m.type == 'addMessage')
    {
        var mesaj = m.msg;
        var nume = m.name;
        var avatar = m.avatar.toString();
        var steamid = m.steamid;
        var rank = m.rank;
        var hide = m.hide;
        var level = m.level;

        if(m.tip == 'clear')
        {
            $('#chatMessages').empty();
            $('#chatMessages').append('<li style="list-style-type: none;" class="msg"><span class="message" style="line-height: 1.5em; padding: 5px 10px; color: black;"><img title="' + steamid + '" style="margin-right: 5px;vertical-align: middle;height: 25px;border-radius: 50%;" src="' + avatar + '"><span style="color: black;"><b> ' + nume + ' </b></span><br><span style="font-size: 13px; margin: 5px 0 0 17px; margin-top: 2px;">' + mesaj + '</span></br></span></li>');   
            return;
        }

        if(rank == 69)
        {
            nume = '<span style="color:red">[Owner]</span> ' + nume;
        }

        if(hide == true)
        {
            $('#chatMessages').append('<li style="list-style-type: none;" class="msg"><span class="message" style="line-height: 1.5em; padding: 5px 10px; color: black;"><img title="' + steamid + '" style="margin-right: 5px;vertical-align: middle;height: 25px;border-radius: 50%;" src="' + avatar + '"><span style="color: black;"><b> [Lvl ' + level + '] ' + nume + ' </b></span><br><span style="font-size: 13px; margin: 5px 0 0 17px; margin-top: 2px;">' + mesaj + '</span></br></span></li>');   
        }
        else if(hide == false)
        {
            $('#chatMessages').append('<li style="list-style-type: none;" class="msg"><span class="message" style="line-height: 1.5em; padding: 5px 10px; color: black;"><img style="margin-right: 5px;vertical-align: middle;height: 25px;border-radius: 50%;" src="' + avatar + '"><a target="_blank" href="https://steamcommunity.com/profiles/' + steamid + '"><span style="color: black;"><b> [Lvl ' + level + '] ' + nume + ' </b></span><a/><br><span style="font-size: 13px; margin: 5px 0 0 17px; margin-top: 2px;">' + mesaj + '</span></br></span></li>');  
        }


        var objDiv = document.getElementById("chatMessages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    else if(m.type == 'connections')
    {
        $('.users-online-value').text(m.total);
    }
    else if(m.type == 'getInventory')
    {
        var id = m.id.split('/');
        var name = m.name.split('/');
        var pret = m.price.split('/');
        var url = m.img.split('/');

        if(id[0] == "")
        {
            $('.container1').append("<center><b>0 items compatible found in your inventory.");
            return;
        }

        var Games = [];

        for(var i in id)
        {
            Games.push({
                id: id[i],
                name: name[i],
                pret: pret[i],
                url: url[i]
            });
        }

        Games.sort(compare);

        joinItems = [];

        for(var i in Games)
        {
            joinItems.push({
                id: Games[i].id,
                name: Games[i].name,
                pret: Games[i].pret,
                url: Games[i].url
            });
        }

        function compare(a,b) {
          if (a.pret > b.pret)
            return -1;
          if (a.pret < b.pret)
            return 1;
          return 0;
        }

        for(var i in Games)
        {
            $('.container1').append('<div class="col-xs-4 col-sm-2 col-item" data-itemid="' + Games[i].id + '" data-amount="' + Games[i].pret + '"><div class="item"><img src="https://steamcommunity-a.akamaihd.net/economy/image/' + Games[i].url + '/120fx100f" alt="" class="img-responsive" rel="nofollow"><div class="info"><div class="price"><span>$' + Games[i].pret + '</span></div><div class="name">' + Games[i].name + '</div></div></div></div>');
        }
    }
    else if(m.type == 'getInventory2')
    {
        var id = m.id.split('/');
        var name = m.name.split('/');
        var pret = m.price.split('/');
        var url = m.img.split('/');

        if(id[0] == "")
        {
            $('.container2').append("<center><b>0 items compatible found in your inventory.");
            return;
        }

        var Games = [];

        for(var i in id)
        {
            Games.push({
                id: id[i],
                name: name[i],
                pret: pret[i],
                url: url[i]
            });
        }

        Games.sort(compare);

        function compare(a,b) {
          if (a.pret > b.pret)
            return -1;
          if (a.pret < b.pret)
            return 1;
          return 0;
        }

        for(var i in Games)
        {
            $('.container2').append('<div class="col-xs-4 col-sm-2 col-item" data-itemid="' + Games[i].id + '" data-amount="' + Games[i].pret + '"><div class="item"><img src="https://steamcommunity-a.akamaihd.net/economy/image/' + Games[i].url + '/120fx100f" alt="" class="img-responsive" rel="nofollow"><div class="info"><div class="price"><span>$' + Games[i].pret + '</span></div><div class="name">' + Games[i].name + '</div></div></div></div>');
        }
    }
    else if(m.type == 'jgetInventory')
    {
        var id = m.id.split('/');
        var name = m.name.split('/');
        var pret = m.price.split('/');
        var url = m.img.split('/');

        if(id[0] == "")
        {
            $('.container3').append("<center><b>0 items compatible found in your inventory.");
            return;
        }

        var Games = [];

        for(var i in id)
        {
            Games.push({
                id: id[i],
                name: name[i],
                pret: pret[i],
                url: url[i]
            });
        }

        Games.sort(compare);

        function compare(a,b) {
          if (a.pret > b.pret)
            return -1;
          if (a.pret < b.pret)
            return 1;
          return 0;
        }

        for(var i in Games)
        {
            $('.container3').append('<div class="col-xs-4 col-sm-2 col-item" data-itemid="' + Games[i].id + '" data-amount="' + Games[i].pret + '"><div class="item"><img src="https://steamcommunity-a.akamaihd.net/economy/image/' + Games[i].url + '/120fx100f" alt="" class="img-responsive" rel="nofollow"><div class="info"><div class="price"><span>$' + Games[i].pret + '</span></div><div class="name">' + Games[i].name + '</div></div></div></div>');
        }
    }
    else if(m.type == 'loadStatistics')
    {
        $('#cfTotalAmount').countTo({to: parseFloat(m.totalAmount).toFixed(2), speed: 600, refreshInterval: 50});
        $('.cfTotalItems').countTo({to: m.totalItems, speed: 600, refreshInterval: 50});
        $('.cfActiveGames').countTo({to: m.activeGames, speed: 600, refreshInterval: 50});
    }
    else if(m.type == 'modals')
    {
        if(m.tip == 'trade')
        {
            if(m.result == 'offerProcessing')
            {
                $('.modal').modal('hide');
                    setTimeout(function() {
                    $('#tradeModal').modal();
                    $('#tradeModal .modal-content').html('<p style="font-weight: bold;" id="myModalLabel" class="tradeAlert modal-title alert text-center alert-danger"><i class="fa fa-spinner fa-spin"></i> Processing trade offer...</p>');
                }, 500);
            }
            else if(m.result == 'offerSend')
            {
                var seconds = 90;
                $('.modal').modal('hide');
                setTimeout(function() {
                    $('#tradeModal').modal();
                    $('#tradeModal .modal-content').html('<style>a:hover { color: red }</style><p style="font-weight: bold;" id="myModalLabel" class="tradeAlert modal-title alert text-center alert-success">Trade #<u>' + m.tid + '</u> (<a target="_blank" href="https://steamcommunity.com/tradeoffer/' + m.tid + '">accept offer</a>) with code <u>' + m.code + '</u> has been sent!<br>Accept it in the next <span class="secondsTradeoffer">90</span> seconds or it will expire.</p>');
                    tradeInterval = setInterval(function() {
                        seconds = seconds - 1;
                        $('.secondsTradeoffer').text(seconds);
                        if(seconds == 0)
                        {
                            $('.modal').modal('hide');
                            setTimeout(function() {
                                $('#tradeModal').modal();
                                $('#tradeModal .modal-content').html('<p style="font-weight: bold;" id="myModalLabel" class="tradeAlert modal-title alert text-center alert-danger">Tradeoffer expired!</p>');
                                setTimeout(function() {
                                    $('.modal').modal('hide');
                                }, 2000);
                                clearInterval(tradeInterval);
                            }, 400);
                        }
                    }, 1000);
                }, 700);
            }
            else if(m.result == 'offerAccepted')
            {
                $('.modal').modal('hide');
                setTimeout(function() {
                    $('#tradeModal').modal();
                    $('#tradeModal .modal-content').html('<p style="font-weight: bold;" id="myModalLabel" class="tradeAlert modal-title alert text-center alert-success">Tradeoffer accepted.</p>');
                    setTimeout(function() {
                        $('#tradeModal').modal('hide');
                        clearInterval(tradeInterval);
                    }, 2000);
                }, 700);
            }
            else if(m.result == 'offerDeclined')
            {
                $('.modal').modal('hide');
                setTimeout(function() {
                    $('#tradeModal').modal();
                    $('#tradeModal .modal-content').html('<p style="font-weight: bold;" id="myModalLabel" class="tradeAlert modal-title alert text-center alert-danger">Tradeoffer declined.</p>');
                    setTimeout(function() {
                        $('#tradeModal').modal('hide');
                        clearInterval(tradeInterval);
                    }, 2000);
                }, 700);
            }
        }
    }
    else if(m.type == 'newJackpotRound')
    {
        $('#round-items').empty();
        $('#round-bets').empty();
        $('#round-bets').html('<div class="round"><div class="new"><h3>New round started</h3><h4>Hash: ' + m.hash + '</h4>/div></div>');
        $('.pot-items-value').text('0');
        $('.round-time').text('120');
        $('.pot-value').text('0.00');
    }
}

function getSpin(value) {
    var spin;

    $(' #coin .front').animate({
   'width': '+=30px',
   'height': '+=30px',
   'margin-left': '-=15px'
    }, 1500, function(){
   $(' #coin .front').animate({
    'width': '-=30px',
    'height': '-=30px',
    'margin-left': '+=15px'
   }, 1500);
    });
    $(' #coin .back').animate({
   'width': '+=30px',
   'height': '+=30px',
   'margin-left': '-=15px'
    }, 1500, function(){
   $(' #coin .back').animate({
    'width': '-=30px',
    'height': '-=30px',
    'margin-left': '+=15px'
   }, 1500);
    });


    if(value == '1') {
        return spin = spinArray[1];
    }else if(value == '2') {
        return spin = spinArray[0];
    }
}


function watchGame(gameID)
{
    if(SOCKET)
    {
        watchingGameID = gameID;
        watchingGame = 1;

        setTimeout(function() {
            SOCKET.emit('watchGame', {
                gameid: gameID
            });
            $('#coinflip').modal();
        }, 200);
    }
}

function joinGame(gameID, Gap01, Gap02)
{
    if(SOCKET)
    {
        gameJoin = gameID;

        Gapa01 = parseFloat(Gap01).toFixed(2);
        Gapa02 = parseFloat(Gap02).toFixed(2);

        $('#CFjoinGame').modal();

        $('.Gap01').text(parseFloat(Gap01).toFixed(2));
        $('.Gap02').text(parseFloat(Gap02).toFixed(2));

        $('.offerValidator').html('Needs: $' + Gap01 + '-' + Gap02);
    }
}

function connect()
{
	if (!SOCKET)
	{
        var hash = getCookie('hash');
        if (hash == "") {
            //$.notify('You must login!', 'success');
        }
        if (hash != "") {
            //$.notify('Connecting to server ...', 'success');
        }
        SOCKET = io(':3001');
        SOCKET.on('connect', function(msg) {
            if (hash != "") {
                //$.notify('Connected!', 'success');
            }
            SOCKET.emit('hash', {
                hash: hash
            });
            $('#games tr').remove();
        });
        SOCKET.on('connect_error', function(msg) {
            $.notify('Connection lost!', 'success');
        });
        SOCKET.on('message', function(msg) {
            onMessage(msg);
        });

        SOCKET.on('disconnect', function(m) {
            SOCKET.emit('disconnect', {
                uhash: hash
            });
        });
    }
    else
    {
        console.log("Error: connection already exists.");
    }
}

function setCookie(key,value){
	var exp = new Date();
	exp.setTime(exp.getTime()+(365*24*60*60*1000));
	document.cookie = key+"="+value+"; expires="+exp.toUTCString();
}
function getCookie(key){
	var patt = new RegExp(key+"=([^;]*)");
	var matches = patt.exec(document.cookie);
	if(matches){
		return matches[1];
	}
	return "";
}
function textAbstract(text, length) {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    return text + "...";
}

function addGame(gameInf)
{
    var f = "";
    var games = gameInf;
    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';

    var NeedsG01;
    var NeedsG02;

    if(games.csteamid && games.psteamid)
    {
        //TEXTDRAW1
        td1 = '<img title="' + games.cname + '" width="40px" height="40px" src="' + games.cavatar + '"> <font style="margin: 0 7px;" size="2">vs</font> <img title="' + games.pname + '" width="40px" height="40px" src="' + games.pavatar + '">';
        //TEXTDRAW2
        var cskinsImages = games.cskinsurl.split('/');
        var cskinsNames = games.cskinsnames.split('/');
        var cskinsPrices = games.cskinsprices.split('/');

        var pskinsImages = games.pskinsurl.split('/');
        var pskinsNames = games.pskinsnames.split('/');
        var pskinsPrices = games.pskinsprices.split('/');

        var totalSkins = games.cskins + games.pskins;
        if(games.winner == -1)
        {
            td2 += cskinsImages.length + ' items<br>';
        }
        else
        {
            td2 += totalSkins + ' items<br>';
        }

        td2 += '<div id="Skinss">';
        var allSkinsImages = cskinsImages.concat(pskinsImages);
        var allSkinsPrices = cskinsPrices.concat(pskinsPrices);
        var allSkinsNames = cskinsNames.concat(pskinsNames);

        var more = 0;


        if(games.winner == -1)
        {
            var items = [];
            for(var i = 0; i < cskinsNames.length; i++)
            {
                items.push({
                    name: cskinsNames[i],
                    price: cskinsPrices[i],
                    url: cskinsImages[i]
                });
            }

            items.sort(compare);

            function compare(a,b) {
                if (a.price > b.price)
                  return -1;
                if (a.price < b.price)
                  return 1;
                return 0;
            }

            for(var i = 0; i < items.length; i++)
            {
                if(i < 5)
                {
                    td2 += '<img  title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="https://steamcommunity-a.akamaihd.net/economy/image/' + items[i].url + '/70fx50f">';
                }
                else
                {
                    more++;
                }
            }

            if(more > 0)
            {
                td2 += '+' + more + ' more';
            }
        }
        else
        {
            var items = [];
            for(var i = 0; i < totalSkins; i++)
            {
                items.push({
                    name: allSkinsNames[i],
                    price: allSkinsPrices[i],
                    url: allSkinsImages[i]
                });
            }

            items.sort(compare);

            function compare(a,b) {
                if (a.price > b.price)
                  return -1;
                if (a.price < b.price)
                  return 1;
                return 0;
            }

            for(var i = 0; i < items.length; i++)
            {
                if(i < 5)
                {
                    td2 += '<img  title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="https://steamcommunity-a.akamaihd.net/economy/image/' + items[i].url + '/70fx50f">';
                }
                else
                {
                    more++;
                }
            }

            if(more > 0)
            {
                td2 += '+' + more + ' more';
            }
        }

        td2 += '</div>';
        //TEXTDRAW3
        var totalSkins = games.ctp + games.ptp;
        td3 = '$' + parseFloat(totalSkins).toFixed(2);
        //TEXTDRAW4
        td4 = '';
        td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ')" value="View" readonly />';
    }

    if(games.csteamid && !games.psteamid)
    {
        //TEXTDRAW1
        td1 = '<img title="' + games.cname + '" width="40px" height="40px" src="' + games.cavatar + '">';
        //TEXTDRAW2
        var cskinsImages = games.cskinsurl.split('/');
        var cskinsNames = games.cskinsnames.split('/');
        var cskinsPrices = games.cskinsprices.split('/');

        var totalSkins = games.cskins;

        td2 += totalSkins + ' items<br>';
        td2 += '<div id="Skinss">';
        var more = 0;

        var items = [];
        for(var i = 0; i < totalSkins; i++)
        {
            items.push({
                name: cskinsNames[i],
                price: cskinsPrices[i],
                url: cskinsImages[i]
            });
        }

        items.sort(compare);

        function compare(a,b) {
            if (a.price > b.price)
              return -1;
            if (a.price < b.price)
              return 1;
            return 0;
        }

        for(var i = 0; i < totalSkins; i++)
        {
            if(i < 5)
            {
                td2 += '<img  title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="https://steamcommunity-a.akamaihd.net/economy/image/' + items[i].url + '/70fx50f">';
            }
            else
            {
                more++;
            }
        }
        if(more > 0)
        {
            td2 += '+' + more + ' more';
        }
        td2 += '</div>';
        //TEXTDRAW3
        var calculate = 10/100*games.ctp;
        var Gap01 = games.ctp - calculate; 
        var Gap02 = games.ctp + calculate;
        NeedsG01 = Gap01;
        NeedsG02 = Gap02;
        td3 = '$' + games.ctp + '<br>Needs: $' + parseFloat(Gap01).toFixed(2) + ' - ' + parseFloat(Gap02).toFixed(2);
        //TEXTDRAW4
        td4 = '<input style="width:50px; height: 30px; font-size: 12px;" class="btn btn-primary cfRoundJoin" id="cfJoinGame" onclick="joinGame(' + games.id + ', ' + parseFloat(NeedsG01).toFixed(2) + ', ' + parseFloat(NeedsG02).toFixed(2) + ')" value="Join" readonly />';
        td4 += '<i class="btn duel-btn-lg fa fa-eye" id="cfViewGame" onclick="watchGame(' + games.id + ')"></i>';
    }

    if(games.csteamid && games.psteamid && games.winner != '-1')
    {
        if(games.winner == 1)
        {
            td4 = '<span id="Winner" class ="WinnerFadeIn"><img width="40px" height="40px" src="' + games.cavatar + '"></span>';
            td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ')" value="View" readonly />';

        }
        else if(games.winner == 2)
        {
            td4 = '<span id="Winner" class ="WinnerFadeIn"><img width="40px" height="40px" src="' + games.pavatar + '"></span>';
            td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ')" value="View" readonly />';
        }
    }

    if(games.csteamid == STEAMID)
    {
        if(games.csteamid && !games.psteamid)
        {
            var price = parseInt(games.ctp*100);
            f += '<tr data-price="' + price + '" style="border-left: 3px solid #1a8a49;" id="game-' + games.id + '" class="animated zoomIn">';
        }
        else if(games.csteamid && games.psteamid)
        {
            var price = parseInt((games.ctp + games.ptp)*100);
            f += '<tr data-price="' + price + '" style="border-left: 3px solid #1a8a49;" id="game-' + games.id + '" class="animated zoomIn">';
        }
    }
    else
    {
        if(games.csteamid && !games.psteamid)
        {
            var price = parseInt(games.ctp*100);
            f += '<tr data-price="' + price + '" id="game-' + games.id + '" class="animated zoomIn">';
        }
        else if(games.csteamid && games.psteamid)
        {
            var price = parseInt((games.ctp + games.ptp)*100);
            f += '<tr data-price="' + price + '" id="game-' + games.id + '" class="animated zoomIn">';
        }
    }

    if(games.csteamid && games.psteamid && games.winner == '-1')
    {
        td4 = '';
        td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ')" value="View" readonly />';
    }

    var td5 = '<div id="countdown'+games.id+'" style="width: 50px; height: 50px;"></div>';


    f += '<td id="td1-' + games.id + '">' + td1 + '</td>';
    f += '<td id="td2-' + games.id + '">' + td2 + '</td>';
    f += '<td id="td3-' + games.id + '">' + td3 + '</td>';
    f += '<td id="td5-' + games.id + '">' + td5 + '</td>';
    f += '<td class="cf-action" style="text-align: right" id="td4-' + games.id + '">' + td4 + '</td>';
    f += "</tr>";

  if($( "#games tr" ).length == 0) {
    $('#games').prepend(f);
  } else {
    $( "#games tr" ).each(function( index ) {
      if(price > parseInt($(this).attr('data-price'))) {
        $(this).before(f);
        return false;
      }
      if(index == $( "#games tr" ).length-1) {
        $("#games tr").last().after(f);         
      }
    });
  }

    if(games.psteamid && games.winner == -1 && games.timer11 == '0') {
      $("#countdown"+games.id).countdown360({
        radius      : 20,
        seconds     : games.timer,
        fontColor   : '#FFFFFF',
        fillStyle   : '#fe634a',
        strokeStyle : '#dc393c',
        autostart   : false,
        label       : false,
        smooth      : true,
        onComplete  : function() {
            $('#countdown'+games.id).empty();
        }
      }).start();
    }

    if(games.psteamid && games.timer11 == '1' && games.winner == '-1')
    {
        $("#countdown"+games.id).countdown360({
            radius      : 20,
            seconds     : games.ttimer11,
            fontColor   : '#FFFFFF',
            autostart   : false,
            label       : false,
            smooth      : true,
            onComplete  : function () {
            $('#countdown'+games.id).empty();
            }
        }).start()
    }
}


function editGame(gameInf)
{
    var games = gameInf;
    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';

    var NeedsG01;
    var NeedsG02;

    if(games.csteamid && games.psteamid)
    {
        //TEXTDRAW1
        td1 = '<img title="' + games.cname + '" width="40px" height="40px" src="' + games.cavatar + '"> <font style="margin: 0 7px;" size="2">vs</font> <img title="' + games.pname + '" width="40px" height="40px" src="' + games.pavatar + '">';
        //TEXTDRAW2
        var cskinsImages = games.cskinsurl.split('/');
        var cskinsNames = games.cskinsnames.split('/');
        var cskinsPrices = games.cskinsprices.split('/');

        var pskinsImages = games.pskinsurl.split('/');
        var pskinsNames = games.pskinsnames.split('/');
        var pskinsPrices = games.pskinsprices.split('/');

        var totalSkins = games.cskins + games.pskins;
        if(games.winner == -1 && games.timer11 == '0')
        {
            td2 += cskinsImages.length + ' items<br>';
        }
        else
        {
            td2 += totalSkins + ' items<br>';
        }

        td2 += '<div id="Skinss">';
        var allSkinsImages = cskinsImages.concat(pskinsImages);
        var allSkinsPrices = cskinsPrices.concat(pskinsPrices);
        var allSkinsNames = cskinsNames.concat(pskinsNames);

        var more = 0;

        if(games.winner == -1 && games.timer11 == '0')
        {
            var items = [];
            for(var i = 0; i < cskinsNames.length; i++)
            {
                items.push({
                    name: cskinsNames[i],
                    price: cskinsPrices[i],
                    url: cskinsImages[i]
                });
            }

            items.sort(compare);

            function compare(a,b) {
                if (a.price > b.price)
                  return -1;
                if (a.price < b.price)
                  return 1;
                return 0;
            }

            for(var i = 0; i < items.length; i++)
            {
                if(i < 5)
                {
                    td2 += '<img  title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="https://steamcommunity-a.akamaihd.net/economy/image/' + items[i].url + '/70fx50f">';
                }
                else
                {
                    more++;
                }
            }

            if(more > 0)
            {
                td2 += '+' + more + ' more';
            }
        }
        else
        {
            var items = [];
            for(var i = 0; i < totalSkins; i++)
            {
                items.push({
                    name: allSkinsNames[i],
                    price: allSkinsPrices[i],
                    url: allSkinsImages[i]
                });
            }

            items.sort(compare);

            function compare(a,b) {
                if (a.price > b.price)
                  return -1;
                if (a.price < b.price)
                  return 1;
                return 0;
            }

            for(var i = 0; i < items.length; i++)
            {
                if(i < 5)
                {
                    td2 += '<img  title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="https://steamcommunity-a.akamaihd.net/economy/image/' + items[i].url + '/70fx50f">';
                }
                else
                {
                    more++;
                }
            }

            if(more > 0)
            {
                td2 += '+' + more + ' more';
            }
        }

        td2 += '</div>';
        //TEXTDRAW3
        var totalSkins = games.ctp + games.ptp;
        td3 = '$' + parseFloat(totalSkins).toFixed(2);
        //TEXTDRAW4
        td4 = '';
        td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ')" value="View" readonly />';
    }
    
    if(games.csteamid && !games.psteamid)
    {
        //TEXTDRAW1
        td1 = '<img title="' + games.cname + '" width="40px" height="40px" src="' + games.cavatar + '">';
        //TEXTDRAW2
        var cskinsImages = games.cskinsurl.split('/');
        var cskinsNames = games.cskinsnames.split('/');
        var cskinsPrices = games.cskinsprices.split('/');

        var totalSkins = games.cskins;

        td2 += totalSkins + ' items<br>';

        td2 += '<div id="Skinss">';
        var more = 0;

        var items = [];
        for(var i = 0; i < totalSkins; i++)
        {
            items.push({
                name: cskinsNames[i],
                price: cskinsPrices[i],
                url: cskinsImages[i]
            });
        }

        items.sort(compare);

        function compare(a,b) {
            if (a.price > b.price)
              return -1;
            if (a.price < b.price)
              return 1;
            return 0;
        }

        for(var i = 0; i < totalSkins; i++)
        {
            if(i < 5)
            {
                td2 += '<img  title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="https://steamcommunity-a.akamaihd.net/economy/image/' + items[i].url + '/70fx50f">';
            }
            else
            {
                more++;
            }
        }
        if(more > 0)
        {
            td2 += '+' + more + ' more';
        }
        td2 += '</div>';
        //TEXTDRAW3
        var calculate = 10/100*games.ctp;
        var Gap01 = games.ctp - calculate; 
        var Gap02 = games.ctp + calculate;
        NeedsG01 = Gap01;
        NeedsG02 = Gap02;
        td3 = '$' + games.ctp + '<br>Needs: $' + parseFloat(Gap01).toFixed(2) + ' - ' + parseFloat(Gap02).toFixed(2);
        //TEXTDRAW4
        td4 = '<input style="width:50px; height: 30px; font-size: 12px;" class="btn btn-primary cfRoundJoin" id="cfJoinGame" onclick="joinGame(' + games.id + ', ' + parseFloat(NeedsG01).toFixed(2) + ', ' + parseFloat(NeedsG02).toFixed(2) + ')" value="Join" readonly />';
        td4 += '<i class="btn duel-btn-lg fa fa-eye" id="cfViewGame" onclick="watchGame(' + games.id + ')"></i>';
    }
    
    if(games.csteamid && games.psteamid && games.winner != '-1')
    {
        if(games.winner == 1)
        {
            setTimeout(function() {
                td4 = '<span id="Winner" class ="WinnerFadeIn"><img width="40px" height="40px" src="' + games.cavatar + '"></span>';
                td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ')" value="View" readonly />';
                $('#td4-'+games.id).html(td4);
            }, 3000);

        }
        else if(games.winner == 2)
        {
            setTimeout(function() {
                td4 = '<span id="Winner" class ="WinnerFadeIn"><img width="40px" height="40px" src="' + games.pavatar + '"></span>';
                td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ')" value="View" readonly />';
                $('#td4-'+games.id).html(td4);
            }, 3000);
        }
    }

    var td5 = '<div id="countdown'+games.id+'" style="width: 50px; height: 50px;"></div>';


    $('#td1-'+games.id).html(td1);
    $('#td2-'+games.id).html(td2);
    $('#td3-'+games.id).html(td3);
    $('#td4-'+games.id).html(td4);
    $('#td5-'+games.id).html(td5);

    if(games.psteamid && games.winner == -1 && games.timer11 == '0')
    {
        $("#countdown"+games.id).countdown360({
            radius      : 20,
            seconds     : 90,
            fontColor   : '#FFFFFF',
            fillStyle   : '#fe634a',
            strokeStyle : '#dc393c',
            autostart   : false,
            label       : false,
            smooth      : true,
            onComplete  : function() {
                $('#countdown'+games.id).empty();
            }
        }).start();
    }

    if(games.psteamid && games.timer11 == '1' && games.winner == '-1')
    {
        $("#countdown"+games.id).countdown360({
            radius      : 20,
            seconds     : 10,
            fontColor   : '#FFFFFF',
            autostart   : false,
            label       : false,
            smooth      : true,
            onComplete  : function () {
            $('#countdown'+games.id).empty();
            }
        }).start()
    }
}

function tradeItems(tid)
{
    $.ajax({
        url: 'http://46.101.118.105:3030/coinflip/sendTrade?tid='+tid,
        success: function(data){
            if(data.success)
            {
                alert(data.msg);
                $.ambiance(data.msg);
            }
            else
            {
                alert(data.error);
                $.ambiance(data.error);
            }
        }
    });
}